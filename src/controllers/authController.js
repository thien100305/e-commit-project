// src/controllers/authController.js
const User = require('../models/user'); 
const bcrypt = require('bcryptjs');

// Trang Đăng nhập
exports.getLogin = (req, res) => res.render('auth/login', { error: null });

// Xử lý Đăng nhập
exports.postLogin = async (req, res) => {
    const { username, password } = req.body;

    // Check Admin cứng
    if (username === 'admin' && password === '123') {
        req.session.user = { username: 'Super Admin', role: 'admin', id: 'admin_fake' };
        return req.session.save(() => res.redirect('/'));
    }

    // Check User DB
    try {
        const user = await User.findOne({ username });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.render('auth/login', { error: 'Sai thông tin đăng nhập!' });
        }
        req.session.user = { username: user.username, role: 'user', id: user._id };
        req.session.save(() => res.redirect('/'));
    } catch (e) { res.status(500).send('Lỗi Server'); }
};

// Trang Đăng ký
exports.getRegister = (req, res) => res.render('auth/register', { error: null });

// Xử lý Đăng ký (Đầy đủ thông tin)
exports.postRegister = async (req, res) => {
    try {
        const { username, password, email, phone, birthday } = req.body;
        if (username.toLowerCase() === 'admin') return res.render('auth/register', { error: 'Tên admin bị cấm' });

        const hashedPassword = await bcrypt.hash(password, 12);
        await User.create({ username, password: hashedPassword, email, phone, birthday, role: 'user' });
        res.redirect('/login');
    } catch (e) {
        if (e.code === 11000) return res.render('auth/register', { error: 'Tên hoặc Email đã tồn tại' });
        res.render('auth/register', { error: 'Lỗi hệ thống' });
    }
};

// Đăng xuất
exports.postLogout = (req, res) => req.session.destroy(() => res.redirect('/'));

// --- ADMIN: QUẢN LÝ USER ---
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ role: 'user' }).sort({ _id: -1 });
        res.render('admin/users', { users });
    } catch (e) { res.send('Lỗi lấy user'); }
};

exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.redirect('/admin/users');
    } catch (e) { res.send('Lỗi xóa user'); }
};