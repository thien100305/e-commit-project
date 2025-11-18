const Cart = require("../models/Cart");

module.exports = {
  getCart: async (req, res) => {
    try {
      const cart = await Cart.findOne({ user: req.user.id }).populate("items.game");
      res.json(cart || { items: [] });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  addToCart: async (req, res) => {
    try {
      const { gameId } = req.body;

      let cart = await Cart.findOne({ user: req.user.id });

      // Nếu giỏ chưa có, tạo mới
      if (!cart) {
        cart = await Cart.create({
          user: req.user.id,
          items: [{ game: gameId, quantity: 1 }]
        });
        return res.json(cart);
      }

      // Check game exist
      const item = cart.items.find(i => i.game.toString() === gameId);

      if (item) item.quantity += 1;
      else cart.items.push({ game: gameId, quantity: 1 });

      await cart.save();
      res.json(cart);

    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  removeFromCart: async (req, res) => {
    try {
      const { gameId } = req.body;

      let cart = await Cart.findOne({ user: req.user.id });

      cart.items = cart.items.filter(i => i.game.toString() !== gameId);

      await cart.save();
      res.json(cart);

    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};
