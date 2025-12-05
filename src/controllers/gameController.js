// src/controllers/gameController.js
const Game = require('../models/Game'); // (Lưu ý: Nếu file model bạn tên Game.js viết hoa thì sửa thành ../models/Game)

// --- KHÁCH HÀNG ---

// 1. Lấy danh sách game
// src/controllers/gameController.js (Chỉ sửa hàm getAllGames, các hàm khác giữ nguyên)

exports.getAllGames = async (req, res) => {
    try {
        const ITEMS_PER_PAGE = 8; 
        const page = parseInt(req.query.page) || 1; 
        
        // 1. Tạo bộ lọc tìm kiếm
        let query = {};
        
        // Nếu có tìm kiếm theo tên
        if (req.query.search) {
            query.title = { $regex: req.query.search, $options: 'i' };
        }
        
        // Nếu có lọc theo thể loại (category)
        if (req.query.category) {
            query.category = req.query.category;
        }

        // 2. Đếm tổng game khớp với bộ lọc
        const totalGames = await Game.countDocuments(query);
        const totalPages = Math.ceil(totalGames / ITEMS_PER_PAGE);
        
        // 3. Lấy danh sách game
        const games = await Game.find(query)
            .sort({ _id: -1 })
            .skip((page - 1) * ITEMS_PER_PAGE)
            .limit(ITEMS_PER_PAGE);
        
        // 4. Danh sách các thể loại (Để hiển thị bên Sidebar)
        const categories = [
            "Hành động", "Nhập vai (RPG)", "Thể thao", 
            "Chiến thuật", "Kinh dị", "Phiêu lưu", "Mô phỏng", "MOBA"
        ];

        res.render('game/index', { 
            games, 
            searchQuery: req.query.search || '', 
            currentCategory: req.query.category || '', // Để biết đang chọn cái nào
            categories: categories, // Truyền danh sách thể loại xuống View
            currentPage: page, 
            totalPages: totalPages 
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Lỗi Server');
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