// src/routes/gameRoutes.js
const express = require('express');
const router = express.Router();

const gameController = require('../controllers/gameController');
const cartController = require('../controllers/cartController');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');

// ==============================================
// 1. CÁC TRANG CÔNG KHAI (AI CŨNG VÀO ĐƯỢC)
// ==============================================

// Trang chủ & Chi tiết game
router.get('/', gameController.getAllGames);
router.get('/game/:id', gameController.getGameDetail);

// Đăng nhập & Đăng ký (QUAN TRỌNG: Phải có dòng này mới vào được Login)
router.get('/login', authController.getLogin); 
router.post('/login', authController.postLogin);

router.get('/register', authController.getRegister);
router.post('/register', authController.postRegister);

router.post('/logout', authController.postLogout);

// Giỏ hàng (Xem và Xóa thì ai cũng làm được)
router.get('/cart', cartController.getCart);
router.get('/cart/remove/:id', cartController.removeFromCart);
router.get('/cart/add/:id', cartController.addToCart);


// ==============================================
// 2. CÁC TRANG CẦN ĐĂNG NHẬP (USER & ADMIN)
// ==============================================

// Đánh giá game
router.post('/game/:id/review', authMiddleware.requireLogin, gameController.postReview);

// Thanh toán
router.get('/cart/checkout', authMiddleware.requireLogin, cartController.getCheckoutPage);
router.post('/cart/checkout', authMiddleware.requireLogin, cartController.postCheckout);


// ==============================================
// 3. CÁC TRANG ADMIN (CHỈ ADMIN MỚI VÀO ĐƯỢC)
// ==============================================
router.get('/admin/orders', authMiddleware.requireAdmin, cartController.getOrdersPage);

router.get('/admin/add-game', authMiddleware.requireAdmin, gameController.getAddGamePage);
router.post('/admin/add-game', authMiddleware.requireAdmin, gameController.postAddGame);

router.get('/admin/edit/:id', authMiddleware.requireAdmin, gameController.getEditGamePage);
router.post('/admin/edit/:id', authMiddleware.requireAdmin, gameController.postEditGame);

router.post('/admin/delete/:id', authMiddleware.requireAdmin, gameController.deleteGame);

module.exports = router;