// src/models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    totalPrice: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    items: [
        {
            gameTitle: String,
            quantity: Number,
            price: Number
        }
    ]
});

module.exports = mongoose.model('Order', orderSchema);