// src/app.js
const express = require('express');
const path = require('path');
const app = express();

// Middleware cơ bản
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cấu hình Static Files (cho Dev 4)
app.use(express.static(path.join(__dirname, 'public')));

// Cấu hình View Engine (cho Dev 4)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Test Route cơ bản
app.get('/', (req, res) => {
    res.render('home', { title: 'Game Store' });
});

// Tích hợp Routes sẽ nằm ở đây (ví dụ: require('./routes/index'))

module.exports = app;