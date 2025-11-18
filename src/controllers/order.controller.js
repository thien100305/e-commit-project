const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Game = require("../models/Game");

module.exports = {
  createOrder: async (req, res) => {
    try {
      const cart = await Cart.findOne({ user: req.user.id }).populate("items.game");

      if (!cart || cart.items.length === 0)
        return res.status(400).json({ message: "Giỏ hàng trống" });

      const totalPrice = cart.items.reduce((sum, item) => {
        return sum + item.game.price * item.quantity;
      }, 0);

      const newOrder = await Order.create({
        user: req.user.id,
        items: cart.items,
        totalPrice,
        status: "success"
      });

      // Xóa giỏ sau thanh toán
      await Cart.findOneAndUpdate(
        { user: req.user.id },
        { items: [] }
      );

      res.json({
        message: "Thanh toán thành công",
        order: newOrder
      });

    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getOrdersByUser: async (req, res) => {
    try {
      const orders = await Order.find({ user: req.user.id }).populate("items.game");
      res.json(orders);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};
