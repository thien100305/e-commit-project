// src/controllers/authController.js
const User = require('../models/user'); 
const bcrypt = require('bcryptjs');

// --- TRANG ĐĂNG NHẬP ---
exports.getLogin = (req, res) => {
    // Render file login.ejs trong thư mục views/auth
    res.render('auth/login', { error: null });
};

// --- XỬ LÝ ĐĂNG NHẬP ---
exports.postLogin = async (req, res) => {
    const { username, password } = req.body;

    // 1. Check Admin cứng (admin/123)
    if (username === 'admin' && password === '123') {
        req.session.user = { username: 'Super Admin', role: 'admin', id: 'admin_fake' };
        return req.session.save(() => res.redirect('/'));
    }

    // 2. Check User trong DB
    try {
        const user = await User.findOne({ username });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.render('auth/login', { error: 'Sai tài khoản hoặc mật khẩu!' });
        }
        
        req.session.user = { username: user.username, role: 'user', id: user._id };
        req.session.save(() => res.redirect('/'));
    } catch (error) {
        console.error(error);
        res.status(500).send('Lỗi Server');
    }
};

// --- ĐĂNG KÝ ---
exports.getRegister = (req, res) => {
    res.render('auth/register', { error: null });
};

exports.postRegister = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (username === 'admin') return res.render('auth/register', { error: 'Cấm đặt tên admin' });
        
        const hashedPassword = await bcrypt.hash(password, 12);
        await User.create({ username, password: hashedPassword, role: 'user' });
        res.redirect('/login');
    } catch (e) {
        res.render('auth/register', { error: 'Tên đã tồn tại' });
    }
};

// --- ĐĂNG XUẤT ---
exports.postLogout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
};