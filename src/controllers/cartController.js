// src/controllers/cartController.js
const Game = require('../models/game');   // <-- Viết thường
const Order = require('../models/order'); // <-- Viết thường

exports.addToCart = async (req, res) => {
    const gameId = req.params.id;
    if (!req.session.cart) req.session.cart = [];
    const cart = req.session.cart;
    const idx = cart.findIndex(item => item.gameId == gameId);
    if (idx >= 0) {
        cart[idx].quantity += 1;
    } else {
        const game = await Game.findById(gameId);
        if (game) cart.push({ gameId: game._id, title: game.title, price: game.price, imageUrl: game.imageUrl, quantity: 1 });
    }
    res.redirect('back'); // Quay lại trang trước đó
};

exports.getCart = (req, res) => {
    const cart = req.session.cart || [];
    let totalPrice = 0;
    cart.forEach(item => totalPrice += item.price * item.quantity);
    res.render('cart/index', { cart, totalPrice });
};

exports.removeFromCart = (req, res) => {
    req.session.cart = (req.session.cart || []).filter(item => item.gameId != req.params.id);
    res.redirect('/cart');
};

exports.getCheckoutPage = (req, res) => {
    const cart = req.session.cart || [];
    if (cart.length === 0) return res.redirect('/cart');
    let totalPrice = 0;
    cart.forEach(item => totalPrice += item.price * item.quantity);
    res.render('cart/checkout', { cart, totalPrice });
};

exports.postCheckout = async (req, res) => {
    try {
        const cart = req.session.cart || [];
        if (cart.length === 0) return res.redirect('/cart');
        let totalPrice = 0;
        const orderItems = cart.map(item => {
            totalPrice += item.price * item.quantity;
            return { gameTitle: item.title, quantity: item.quantity, price: item.price };
        });
        await Order.create({ ...req.body, totalPrice, items: orderItems });
        req.session.cart = [];
        res.render('cart/success');
    } catch (e) { res.send('Lỗi: ' + e.message); }
};

exports.getOrdersPage = async (req, res) => {
    try {
        const orders = await Order.find().sort({ date: -1 });
        res.render('admin/orders', { orders });
    } catch (e) { res.send('Lỗi tải đơn hàng'); }
};