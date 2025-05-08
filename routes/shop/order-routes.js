const express = require("express");

const {
  createOrder,
  getAllOrdersByUser,
  getOrderDetails,
  capturePayment,
} = require("../../controllers/shop/order-controller");
const {
  authMiddleware,
  checkRole,
} = require("../../controllers/auth/auth-controller");

const router = express.Router();

router.post("/create", authMiddleware, checkRole("user"), createOrder);
router.post("/capture", authMiddleware, checkRole("user"), capturePayment);
router.get(
  "/list/:userId",
  authMiddleware,
  checkRole("user"),
  getAllOrdersByUser
);
router.get("/details/:id", authMiddleware, checkRole("user"), getOrderDetails);

module.exports = router;
