// src/routes/gameRoutes.js
const express = require('express');
const router = express.Router();

const gameController = require('../controllers/gameController');
const cartController = require('../controllers/cartController');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');

// --- 1. AUTHENTICATION ---
router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
router.get('/register', authController.getRegister);
router.post('/register', authController.postRegister);
router.post('/logout', authController.postLogout);

// --- 2. PUBLIC (AI CŨNG XEM ĐƯỢC) ---
router.get('/', gameController.getAllGames);
router.get('/game/:id', gameController.getGameDetail);

// Giỏ hàng
router.get('/cart', cartController.getCart);
router.get('/cart/add/:id', cartController.addToCart);
router.get('/cart/remove/:id', cartController.removeFromCart);

// --- 3. USER (PHẢI ĐĂNG NHẬP) ---
// Đánh giá game
router.post('/game/:id/review', authMiddleware.requireLogin, gameController.postReview);

// Mua Ngay & Thanh Toán
router.get('/checkout/quick/:id', authMiddleware.requireLogin, cartController.getQuickCheckout);
router.get('/cart/checkout', authMiddleware.requireLogin, cartController.getCheckoutPage);
router.post('/cart/checkout', authMiddleware.requireLogin, cartController.postCheckout);

// --- 4. ADMIN (CHỈ ADMIN MỚI VÀO ĐƯỢC) ---
// Quản lý Users (MỚI)
router.get('/admin/users', authMiddleware.requireAdmin, authController.getAllUsers);
router.post('/admin/users/delete/:id', authMiddleware.requireAdmin, authController.deleteUser);

// Quản lý Đơn hàng
router.get('/admin/orders', authMiddleware.requireAdmin, cartController.getOrdersPage);

// Quản lý Game (Thêm/Sửa/Xóa)
router.get('/admin/add-game', authMiddleware.requireAdmin, gameController.getAddGamePage);
router.post('/admin/add-game', authMiddleware.requireAdmin, gameController.postAddGame);
router.get('/admin/edit/:id', authMiddleware.requireAdmin, gameController.getEditGamePage);
router.post('/admin/edit/:id', authMiddleware.requireAdmin, gameController.postEditGame);
router.post('/admin/delete/:id', authMiddleware.requireAdmin, gameController.deleteGame);

module.exports = router;
