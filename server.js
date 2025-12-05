require('dotenv').config();
const mongoose = require('mongoose');

// ⚠️ QUAN TRỌNG: Phải trỏ đúng vào file app bên trong thư mục src
const app = require('./src/app'); 

const PORT = process.env.PORT || 3000;

// --- ĐOẠN CODE DEBUG BẠN CẦN Ở ĐÂY ---
// Nó được đặt sau khi app được import (tức là sau khi đã nạp các routes)
// để có thể bắt được lỗi từ các routes đó.
app.use((err, req, res, next) => {
    console.error("\n\n__________________ 🔥 PHÁT HIỆN LỖI 🔥 __________________");
    console.error("Lỗi xảy ra tại:", req.method, req.path);
    console.error("Chi tiết lỗi:", err.stack || err); // In ra nguyên nhân gốc rễ
    console.error("________________________________________________________\n\n");
    
    // Tránh lỗi "Headers already sent" nếu server đã lỡ gửi phản hồi trước đó
    if (!res.headersSent) {
        res.status(500).send('Something broke inside server!');
    }
});
// -------------------------------------

// Kết nối Database
const connectDB = async () => {
    try {
        // Kiểm tra xem có URI kết nối chưa
        if (!process.env.MONGODB_URI) {
            throw new Error("Thiếu biến môi trường MONGODB_URI trong file .env");
        }

        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Đã kết nối MongoDB thành công!');
        
        // Chỉ chạy server khi đã kết nối DB
        // Lưu ý: Trong môi trường test (Jest), file test thường tự start server hoặc import app,
        // nhưng chạy ở đây để đảm bảo logic chạy thực tế vẫn đúng.
        app.listen(PORT, () => {
            console.log(`🚀 Server đang chạy tại: http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('❌ Lỗi kết nối MongoDB:', error.message);
        // Không exit process ngay để test runner có thể hiển thị log
        // process.exit(1); 
    }
};

connectDB();