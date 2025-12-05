const request = require('supertest');
const mongoose = require('mongoose'); // Import Mongoose
require('dotenv').config(); // Import biến môi trường để lấy link DB
const app = require('../src/app');

// Tăng thời gian chờ lên 20 giây (vì kết nối DB Online hơi lâu)
jest.setTimeout(20000);

// TRƯỚC khi chạy test: Kết nối Database
beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
});

// SAU khi chạy xong: Ngắt kết nối để Jest dừng hẳn
afterAll(async () => {
    await mongoose.connection.close();
});

describe('Kiểm tra Trang Chủ', () => {
    
    // Bài test 1: Vào trang chủ
    it('Phải load được trang chủ (Status 200)', async () => {
        const res = await request(app).get('/');
        // Nếu DB chưa kết nối, dòng này sẽ bị timeout
        expect(res.statusCode).toEqual(200);
    });

    // Bài test 2: Vào trang Login
    it('Phải load được trang Login (Status 200)', async () => {
        const res = await request(app).get('/login');
        expect(res.statusCode).toEqual(200);
    });
    
});