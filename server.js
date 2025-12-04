// server.js (Nằm ở thư mục gốc, cùng cấp với package.json)
require('dotenv').config();
const mongoose = require('mongoose');

// ⚠️ QUAN TRỌNG: Phải trỏ đúng vào file app bên trong thư mục src
const app = require('./src/app'); 

const PORT = process.env.PORT || 3000;

// Kết nối Database
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Đã kết nối MongoDB thành công!');
        
        // Chỉ chạy server khi đã kết nối DB
        app.listen(PORT, () => {
            console.log(`🚀 Server đang chạy tại: http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('❌ Lỗi kết nối MongoDB:', error.message);
        process.exit(1);
    }
};

connectDB();