const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");
const { verifyToken, isAdmin } = require("../middlewares/auth.middleware");


router.get("/dashboard", verifyToken, isAdmin, adminController.dashboard);
router.get("/games", verifyToken, isAdmin, adminController.listGames);
router.get("/games/create", verifyToken, isAdmin, adminController.createGameForm);
router.post("/games/create", verifyToken, isAdmin, adminController.createGame);
router.get("/games/:id/edit", verifyToken, isAdmin, adminController.editGameForm);
router.post("/games/:id/edit", verifyToken, isAdmin, adminController.updateGame);
router.post("/games/:id/delete", verifyToken, isAdmin, adminController.deleteGame);


router.get("/orders", verifyToken, isAdmin, adminController.listOrders);
router.get("/users", verifyToken, isAdmin, adminController.listUsers);


module.exports = router;