// src/middlewares/auth.middleware.js

module.exports = (req, res, next) => {
  console.log("Auth middleware đang chạy...");
  // Sau này có thể kiểm tra JWT hoặc session ở đây.
  next();
};
