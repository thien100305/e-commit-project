const Game = require('../models/Game');

// --- KHÁCH HÀNG ---

// 1. Lấy danh sách game

exports.getAllGames = async (req, res) => {
    try {
        const ITEMS_PER_PAGE = 8; 
        const page = parseInt(req.query.page) || 1; 
        
        // --- PHẦN QUAN TRỌNG NHẤT: BỘ LỌC TÌM KIẾM ---
        let query = {};

        // 1. Tìm kiếm theo Tên (name="search" từ ô input)
        if (req.query.search) {
            // $regex: tìm gần đúng
            // $options: 'i' -> không phân biệt hoa thường (tìm 'gta' vẫn ra 'GTA')
            query.title = { $regex: req.query.search, $options: 'i' };
        }
        
        // 2. Lọc theo Thể loại (name="category" từ menu dropdown)
        if (req.query.category) {
            query.category = { $regex: req.query.category, $options: 'i' };
        }
        // ----------------------------------------------

        // Đếm tổng game để phân trang
        const totalGames = await Game.countDocuments(query);
        const totalPages = Math.ceil(totalGames / ITEMS_PER_PAGE);
        
        // Lấy danh sách game
        const games = await Game.find(query)
            .sort({ _id: -1 }) // Game mới nhất lên đầu
            .skip((page - 1) * ITEMS_PER_PAGE)
            .limit(ITEMS_PER_PAGE);
        
        // Danh sách cứng thể loại để hiển thị menu
        const categories = [
            "Hành động", "Nhập vai (RPG)", "Thể thao", 
            "Chiến thuật", "Kinh dị", "Phiêu lưu", "Mô phỏng", "MOBA"
        ];

        res.render('game/index', { 
            games, 
            searchQuery: req.query.search || '',     // Giữ lại từ khóa ở ô input
            currentCategory: req.query.category || '', 
            categories: categories, 
            currentPage: page, 
            totalPages: totalPages 
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Lỗi Server: ' + error.message);
    }
};

// 2. Chi tiết game
exports.getGameDetail = async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);
        if (!game) return res.redirect('/');
        res.render('game/detail', { game });
    } catch (error) {
        console.error(error);
        res.redirect('/');
    }
};

// 3. Đánh giá Review (MỚI)
exports.postReview = async (req, res) => {
    try {
        const gameId = req.params.id;
        const { rating, comment } = req.body;
        const user = req.session.user;

        if (!user) return res.redirect('/login');

        const game = await Game.findById(gameId);
        
        // Thêm review vào mảng
        game.reviews.push({
            username: user.username,
            rating: Number(rating),
            comment: comment
        });

        await game.save();
        res.redirect(`/game/${gameId}`);
    } catch (error) {
        console.error(error);
        res.send('Lỗi khi đánh giá: ' + error.message);
    }
};

// --- ADMIN (Các hàm cũ giữ nguyên) ---
exports.getAddGamePage = (req, res) => res.render('admin/add-game', { pageTitle: 'Thêm Game' });

exports.postAddGame = async (req, res) => {
    try { await Game.create({ ...req.body, imageUrl: req.body.imageUrl || 'https://placehold.co/300x200' }); res.redirect('/'); } catch (e) { res.send(e.message); }
};

exports.getEditGamePage = async (req, res) => {
    try { const g = await Game.findById(req.params.id); if(!g) return res.redirect('/'); res.render('admin/edit-game', { game: g }); } catch (e) { res.redirect('/'); }
};

exports.postEditGame = async (req, res) => {
    try { await Game.findByIdAndUpdate(req.params.id, req.body); res.redirect('/'); } catch (e) { res.send(e.message); }
};

exports.deleteGame = async (req, res) => {
    try { await Game.findByIdAndDelete(req.params.id); res.redirect('/'); } catch (e) { res.send('Lỗi xóa'); }
};

