const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      game: { type: mongoose.Schema.Types.ObjectId, ref: "Game", required: true },
      quantity: { type: Number, default: 1 }
    }
  ],
  totalPrice: Number,
  status: { type: String, default: "success" }, // thanh toán giả
}, { timestamps: true });

module.exports = mongoose.model("Order", OrderSchema);
