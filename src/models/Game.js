const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    description: String,
    image: String,
    category: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Game", gameSchema);
