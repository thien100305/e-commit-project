const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Public static files (nếu dùng giao diện ejs)
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/api/cart", require("./routes/cart.routes"));
app.use("/api/orders", require("./routes/order.routes"));

// Trang test server
app.get("/", (req, res) => {
  res.json({ message: "Server is running..." });
});

module.exports = app;
