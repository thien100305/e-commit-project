const express = require('express');
const path = require('path');
const app = express();

// ... các cấu hình khác của bạn (nếu có) ...

// === CẤU HÌNH CHO DEV 4 (FRONTEND) ===

// 1. Chỉ Express cách phục vụ file tĩnh (CSS, JS, Images)
// Nó sẽ tìm bất cứ file nào trong thư mục 'public'
app.use(express.static(path.join(__dirname, 'public')));

// 2. Cài đặt View Engine là EJS
app.set('view engine', 'ejs');

// 3. Chỉ Express nơi chứa các file 'views' (EJS templates)
app.set('views', path.join(__dirname, 'views'));

// ======================================

// ... các routes của bạn (Dev 1, 2, 3 sẽ thêm vào đây) ...

// VÍ DỤ: Tạo 1 route test cho trang chủ
app.get('/', (req, res) => {
  // 'index' chính là file 'src/views/index.ejs'
  // Dòng này render file EJS của bạn thành HTML và gửi về trình duyệt
  res.render('index', {
    // Bạn có thể truyền dữ liệu từ đây, ví dụ:
    pageTitle: 'Trang Chủ' 
  }); 
});

// ====== ROUTE TEST TẠM THỜI (Xóa sau khi Dev 1 làm xong) ======
app.get('/game/2', (req, res) => {
    
    // Tạo 1 game giả (Stellar Blade) để test
    const fakeGame = {
        _id: 'game_id_002', // ID giả
        name: 'Stellar Blade - Steam Key Asia Chính Hãng',
        category: 'Steam Key Chính Hãng',
        price: 1050000,
        imageUrl: 'https://image.api.playstation.com/vulcan/ap/rnd/202302/2301/b80d0d885a02e6488340d8a9e4004c35dd0e6d6349c1243e.jpg',
        description: `
            <p>Giải cứu nhân loại khỏi hiểm nguy trong Stellar Blade.</p>
        `
    };

    // Truyền 'fakeGame' vào file EJS của bạn
    res.render('game/detail', {
        game: fakeGame,
        pageTitle: fakeGame.name // Gửi title cho header
    });
});
// ==========================================================
module.exports = app;