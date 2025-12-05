const request = require('supertest');
const mongoose = require('mongoose');
require('dotenv').config(); // Load biến môi trường

// Import app (đảm bảo đường dẫn đúng)
const app = require('../src/app'); 

// Tăng thời gian timeout cho test (đề phòng mạng lag)
jest.setTimeout(30000);

// 1. Chạy trước tất cả các bài test: Kết nối Database
beforeAll(async () => {
    // Nếu chưa kết nối thì mới kết nối
    if (mongoose.connection.readyState === 0) {
        const url = process.env.MONGODB_URI;
        if (!url) {
            console.error("❌ LỖI: Không tìm thấy MONGODB_URI trong .env hoặc GitHub Secrets");
        } else {
            await mongoose.connect(url);
        }
    }
});

// 2. Chạy sau tất cả: Ngắt kết nối để Jest không bị treo
afterAll(async () => {
    if (mongoose.connection.readyState !== 0) {
        await mongoose.disconnect();
    }
});

describe('Kiểm tra Trang Chủ', () => {
    
    test('Phải load được trang chủ (Status 200)', async () => {
        const res = await request(app).get('/');
        
        // Nếu server trả về 500, in lỗi ra để xem
        if (res.statusCode === 500) {
            console.error("🔥🔥 CHI TIẾT LỖI 500:", res.text || "Lỗi nội bộ server");
        }

        expect(res.statusCode).toEqual(200);
        // Kiểm tra xem trong HTML có chữ CyberStore không (để chắc chắn load đúng view)
        expect(res.text).toContain('CyberStore'); 
    });

    test('Phải load được trang Login (Status 200)', async () => {
        const res = await request(app).get('/login');
        expect(res.statusCode).toEqual(200);
    });
});