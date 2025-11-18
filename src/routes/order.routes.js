const router = require("express").Router();
const orderController = require("../controllers/order.controller");
const auth = require("../middlewares/auth.middleware");

router.post("/", auth, orderController.createOrder);
router.get("/user", auth, orderController.getOrdersByUser);

module.exports = router;
