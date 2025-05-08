const express = require("express");

const {
  getFilteredProducts,
  getProductDetails,
} = require("../../controllers/shop/products-controller");
const {
  authMiddleware,
  checkRole,
} = require("../../controllers/auth/auth-controller");

const router = express.Router();

router.get("/get", authMiddleware, checkRole("user"), getFilteredProducts);
router.get("/get/:id", authMiddleware, checkRole("user"), getProductDetails);

module.exports = router;
