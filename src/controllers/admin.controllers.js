const Game = require("../models/Game");
const User = require("../models/User");
const Order = require("../models/Order");


module.exports = {
dashboard: async (req, res) => {
const totalUsers = await User.countDocuments();
const totalGames = await Game.countDocuments();
const totalOrders = await Order.countDocuments();


const sales = await Order.aggregate([
{ $group: { _id: null, total: { $sum: "$totalPrice" } } }
]);


res.render("admin/dashboard", {
totalUsers,
totalGames,
totalOrders,
sales: sales[0]?.total || 0,
});
},


listGames: async (req, res) => {
const games = await Game.find();
res.render("admin/game-manager", { games });
},


createGameForm: (req, res) => {
res.render("admin/game-create");
},


createGame: async (req, res) => {
await Game.create(req.body);
res.redirect("/admin/games");
},


editGameForm: async (req, res) => {
const game = await Game.findById(req.params.id);
res.render("admin/game-edit", { game });
},


updateGame: async (req, res) => {
await Game.findByIdAndUpdate(req.params.id, req.body);
res.redirect("/admin/games");
},


deleteGame: async (req, res) => {
await Game.findByIdAndDelete(req.params.id);
res.redirect("/admin/games");
},


listOrders: async (req, res) => {
const orders = await Order.find().populate("user").populate("items.game");
res.render("admin/order-manager", { orders });
},


listUsers: async (req, res) => {
const users = await User.find();
res.render("admin/user-manager", { users });
},
};