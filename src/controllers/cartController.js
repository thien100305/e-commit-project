// src/controllers/cartController.js
const mongoose = require('mongoose'); // <-- Thêm thư viện này để kiểm tra ID
const Game = require('../models/game');
const Order = require('../models/order');

// 1. Thêm vào giỏ (ĐÃ FIX LỖI CAST ERROR)
exports.addToCart = async (req, res) => {
    try {
        const gameId = req.params.id;

        // --- BƯỚC KIỂM TRA AN TOÀN (FIX LỖI SẬP SERVER) ---
        // Nếu ID không phải là mã hex 24 ký tự hoặc là chữ "back", thì bỏ qua ngay
        if (!mongoose.Types.ObjectId.isValid(gameId)) {
            console.log(`⚠️ ID không hợp lệ: ${gameId} - Đang chuyển hướng về trang chủ.`);
            return res.redirect('/');
        }
        // --------------------------------------------------

        if (!req.session.cart) req.session.cart = [];
        const cart = req.session.cart;

        const game = await Game.findById(gameId);
        if (!game) return res.redirect('/');

        const existingItemIndex = cart.findIndex(item => item.gameId.toString() === gameId.toString());

        if (existingItemIndex >= 0) {
            cart[existingItemIndex].quantity += 1;
        } else {
            cart.push({
                gameId: game._id,
                title: game.title,
                price: game.price,
                imageUrl: game.imageUrl,
                quantity: 1
            });
        }

        req.session.save(() => {
            // Sử dụng cách chuyển hướng an toàn hơn 'back'
            // Nếu có trang trước đó thì quay lại, nếu không thì về trang chủ
            const backURL = req.header('Referer') || '/';
            res.redirect(backURL);
        });

    } catch (error) {
        console.error("❌ Lỗi addToCart:", error);
        res.redirect('/');
    }
};

// 2. Xem giỏ hàng
exports.getCart = (req, res) => {
    const cart = req.session.cart || [];
    let totalPrice = 0;
    cart.forEach(item => totalPrice += item.price * item.quantity);
    res.render('cart/index', { cart, totalPrice });
};

// 3. Xóa khỏi giỏ
exports.removeFromCart = (req, res) => {
    // Cũng kiểm tra ID khi xóa cho an toàn
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.redirect('/cart');
    }

    req.session.cart = (req.session.cart || []).filter(item => item.gameId.toString() !== req.params.id);
    req.session.save(() => res.redirect('/cart'));
};

// --- MUA NHANH (QUICK BUY) ---
exports.getQuickCheckout = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.redirect('/');
        
        const game = await Game.findById(req.params.id);
        if (!game) return res.redirect('/');

        const virtualCart = [{
            gameId: game._id, title: game.title, price: game.price, 
            imageUrl: game.imageUrl, quantity: 1
        }];

        res.render('cart/checkout', { 
            cart: virtualCart, totalPrice: game.price, quickBuyId: game._id 
        });
    } catch (error) {
        console.error(error);
        res.redirect('/');
    }
};

// 4. Trang thanh toán giỏ hàng
exports.getCheckoutPage = (req, res) => {
    const cart = req.session.cart || [];
    if (cart.length === 0) return res.redirect('/cart');
    let totalPrice = 0;
    cart.forEach(item => totalPrice += item.price * item.quantity);
    res.render('cart/checkout', { cart, totalPrice, quickBuyId: null });
};

// 5. Xử lý đặt hàng
exports.postCheckout = async (req, res) => {
    try {
        const { customerName, address, phone, quickBuyId } = req.body;
        let orderItems = [];
        let totalPrice = 0;

        if (quickBuyId) {
            // Mua ngay
            if (!mongoose.Types.ObjectId.isValid(quickBuyId)) return res.redirect('/');
            const game = await Game.findById(quickBuyId);
            if (game) {
                orderItems.push({ gameTitle: game.title, quantity: 1, price: game.price });
                totalPrice = game.price;
            }
        } else {
            // Mua giỏ hàng
            const cart = req.session.cart || [];
            if (cart.length === 0) return res.redirect('/cart');
            orderItems = cart.map(item => {
                totalPrice += item.price * item.quantity;
                return { gameTitle: item.title, quantity: item.quantity, price: item.price };
            });
            req.session.cart = [];
        }

        await Order.create({ customerName, address, phone, totalPrice, items: orderItems });
        req.session.save(() => {
            res.render('cart/success');
        });
    } catch (error) {
        console.error(error);
        res.send('Lỗi thanh toán: ' + error.message);
    }
};

// 6. Admin xem đơn
exports.getOrdersPage = async (req, res) => {
    try {
        const orders = await Order.find().sort({ date: -1 });
        res.render('admin/orders', { orders });
    } catch (e) { res.send('Lỗi: ' + e.message); }
};