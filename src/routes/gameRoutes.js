// src/routes/gameRoutes.js
const express = require('express');
const router = express.Router();

// Import các Controller
const gameController = require('../controllers/gameController');
const cartController = require('../controllers/cartController');
const authController = require('../controllers/authController');

// Import Middleware bảo vệ (Check đăng nhập / Check Admin)
const authMiddleware = require('../middleware/auth');

// =========================================================
// 1. AUTHENTICATION (ĐĂNG NHẬP / ĐĂNG KÝ / ĐĂNG XUẤT)
// =========================================================
router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);

router.get('/register', authController.getRegister);
router.post('/register', authController.postRegister);

router.post('/logout', authController.postLogout);


// =========================================================
// 2. PUBLIC ROUTES (AI CŨNG TRUY CẬP ĐƯỢC)
// =========================================================

// Trang chủ & Chi tiết game
router.get('/', gameController.getAllGames);
router.get('/game/:id', gameController.getGameDetail);

// Thao tác Giỏ hàng cơ bản (Thêm/Xóa/Xem)
router.get('/cart', cartController.getCart);
router.get('/cart/add/:id', cartController.addToCart); // Thêm vào giỏ xong ở lại trang cũ
router.get('/cart/remove/:id', cartController.removeFromCart);


// =========================================================
// 3. USER ROUTES (PHẢI ĐĂNG NHẬP MỚI ĐƯỢC DÙNG)
// =========================================================

// Đánh giá game
router.post('/game/:id/review', authMiddleware.requireLogin, gameController.postReview);

// --- TÍNH NĂNG MUA HÀNG ---

// A. Mua Ngay (Quick Buy) - Đi thẳng đến trang thanh toán 1 món
router.get('/checkout/quick/:id', authMiddleware.requireLogin, cartController.getQuickCheckout);

// B. Thanh toán Giỏ hàng (Checkout Cart) - Thanh toán toàn bộ giỏ
router.get('/cart/checkout', authMiddleware.requireLogin, cartController.getCheckoutPage);
router.post('/cart/checkout', authMiddleware.requireLogin, cartController.postCheckout);


// =========================================================
// 4. ADMIN ROUTES (CHỈ ADMIN MỚI VÀO ĐƯỢC)
// =========================================================

// Quản lý đơn hàng
router.get('/admin/orders', authMiddleware.requireAdmin, cartController.getOrdersPage);

// Thêm game mới
router.get('/admin/add-game', authMiddleware.requireAdmin, gameController.getAddGamePage);
router.post('/admin/add-game', authMiddleware.requireAdmin, gameController.postAddGame);

// Sửa game
router.get('/admin/edit/:id', authMiddleware.requireAdmin, gameController.getEditGamePage);
router.post('/admin/edit/:id', authMiddleware.requireAdmin, gameController.postEditGame);

// Xóa game
router.post('/admin/delete/:id', authMiddleware.requireAdmin, gameController.deleteGame);

module.exports = router;