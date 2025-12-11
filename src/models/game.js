const mongoose = require('mongoose');

// Schema con cho phần Đánh giá
const reviewSchema = new mongoose.Schema({
    username: String,
    rating: { type: Number, required: true }, 
    comment: String,
    date: { type: Date, default: Date.now }
});

const gameSchema = new mongoose.Schema({
    title: { type: String, required: true },
    
    category: { type: String, required: true }, 
    
    price: { type: Number, required: true },
    description: String,
    imageUrl: { type: String, default: 'https://placehold.co/300x200' },
    reviews: [reviewSchema] 
});

const Game = mongoose.models.Game || mongoose.model('Game', gameSchema);

module.exports = Game;