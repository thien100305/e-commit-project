// src/config/db.js
const mongoose = require('mongoose');
require('dotenv').config(); // <--- Thêm dòng này để chắc chắn đọc được .env

const connectDB = async () => {
    try {
        // Debug: In ra xem nó đọc được gì (Sau khi chạy thành công thì xóa dòng này đi)
        console.log("Check URI:", process.env.MONGODB_URI); 

        if (!process.env.MONGODB_URI) {
            throw new Error("Biến môi trường MONGODB_URI chưa được khai báo!");
        }

        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Đã kết nối MongoDB thành công!');
    } catch (error) {
        console.error('❌ Lỗi kết nối MongoDB:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;