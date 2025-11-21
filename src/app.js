// src/app.js
const express = require('express');
const path = require('path');
const session = require('express-session');
const gameRoutes = require('./routes/gameRoutes'); // Đảm bảo file này tồn tại

const app = express();

// Cấu hình View Engine
app.set('view engine', 'ejs');
// Vì app.js nằm trong src, nên views cũng nằm trong src/views => __dirname + '/views' là đúng
app.set('views', path.join(__dirname, 'views')); 

// Cấu hình Static Files (CSS/JS/Images)
// public nằm trong src/public
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session
app.use(session({
    secret: 'my_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));

// Middleware Global Variables
app.use((req, res, next) => {
    res.locals.cart = req.session.cart || [];
    res.locals.currentUser = req.session.user || null;
    res.locals.isAuthenticated = !!req.session.user;
    next();
});

// ⚠️ KẾT NỐI ROUTE (QUAN TRỌNG NHẤT)
app.use('/', gameRoutes);

module.exports = app;