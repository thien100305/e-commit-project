// src/models/game.js
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    username: String,
    rating: { type: Number, required: true },
    comment: String,
    date: { type: Date, default: Date.now }
});

const gameSchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    description: String,
    imageUrl: { type: String, default: 'https://placehold.co/300x200' },
    
    // --- THÊM DÒNG NÀY ---
    category: { 
        type: String, 
        required: true, 
        default: 'Hành động' // Mặc định nếu không chọn
    },
    // ---------------------

    reviews: [reviewSchema]
});

module.exports = mongoose.model('Game', gameSchema);