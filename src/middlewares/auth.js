// src/middleware/auth.js

// Bắt buộc phải đăng nhập (dùng cho Mua hàng/Đánh giá)
exports.requireLogin = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    next();
};

// Bắt buộc phải là ADMIN (dùng cho Sửa/Xóa/Thêm)
exports.requireAdmin = (req, res, next) => {
    // Nếu chưa đăng nhập HOẶC role không phải 'admin'
    if (!req.session.user || req.session.user.role !== 'admin') {
        return res.status(403).send('⛔ CẤM TRUY CẬP! Chỉ Admin mới được vào đây.');
    }
    next();
};