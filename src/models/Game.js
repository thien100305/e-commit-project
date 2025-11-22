// src/models/Game.js
const mongoose = require('mongoose');

// Schema con cho phần Đánh giá
const reviewSchema = new mongoose.Schema({
    username: String,
    rating: { type: Number, required: true }, // 1 đến 5 sao
    comment: String,
    date: { type: Date, default: Date.now }
});

const gameSchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    description: String,
    imageUrl: { type: String, default: 'https://placehold.co/300x200' },
    // Thêm mảng chứa các đánh giá
    reviews: [reviewSchema] 
});

module.exports = mongoose.model('Game', gameSchema);