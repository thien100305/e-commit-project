// src/server.js
require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    // Ở đây bạn sẽ gọi hàm kết nối DB sau (ví dụ: connectDB());
});