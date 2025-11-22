const router = require("express").Router();
const orderController = require("../controllers/authController");
const auth = require("../middlewares/auth");

router.post("/", auth, orderController.createOrder);
router.get("/user", auth, orderController.getOrdersByUser);

module.exports = router;
