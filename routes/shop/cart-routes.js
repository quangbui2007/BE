const express = require("express");

const {
  addToCart,
  fetchCartItems,
  deleteCartItem,
  updateCartItemQty,
} = require("../../controllers/shop/cart-controller");
const {
  authMiddleware,
  checkRole,
} = require("../../controllers/auth/auth-controller");

const router = express.Router();

router.post("/add", authMiddleware, checkRole("user"), addToCart);
router.get("/get/:userId", authMiddleware, checkRole("user"), fetchCartItems);
router.put(
  "/update-cart",
  authMiddleware,
  checkRole("user"),
  updateCartItemQty
);
router.delete(
  "/:userId/:productId",
  authMiddleware,
  checkRole("user"),
  deleteCartItem
);

module.exports = router;
