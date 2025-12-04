const router = require("express").Router();
const cartController = require("../controllers/cartController");
const auth = require("../middlewares/auth");

router.get("/", auth, cartController.getCart);
router.post("/add", auth, cartController.addToCart);
router.post("/remove", auth, cartController.removeFromCart);

module.exports = router;
