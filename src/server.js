const app = require('./app'); // Import app từ file app.js
require('dotenv').config(); // Tải các biến từ file .env

// Lấy PORT từ file .env, nếu không có thì mặc định là 3000
const PORT = process.env.PORT || 3000;

// Khởi chạy server và lắng nghe ở port đã định
app.listen(PORT, () => {
  console.log(`Server đang chạy mượt mà tại http://localhost:${PORT}`);
});