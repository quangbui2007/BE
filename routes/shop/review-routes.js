const express = require("express");

const {
  addProductReview,
  getProductReviews,
} = require("../../controllers/shop/product-review-controller");
const {
  checkRole,
  authMiddleware,
} = require("../../controllers/auth/auth-controller");

const router = express.Router();

router.post("/add", authMiddleware, checkRole("user"), addProductReview);
router.get("/:productId", authMiddleware, checkRole("user"), getProductReviews);

module.exports = router;
