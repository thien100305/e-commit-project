// src/models/user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    // --- THÊM CÁC TRƯỜNG MỚI ---
    email: { 
        type: String, 
        required: true, 
        unique: true // Email không được trùng
    },
    phone: { 
        type: String,
        required: true 
    },
    birthday: { 
        type: Date,
        required: true 
    },
    // ----------------------------
    role: { 
        type: String, 
        enum: ['user', 'admin'], 
        default: 'user' 
    }
});

module.exports = mongoose.model('User', userSchema);