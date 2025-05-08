const express = require("express");

const {
  getAllOrdersOfAllUsers,
  getOrderDetailsForAdmin,
  updateOrderStatus,
} = require("../../controllers/admin/order-controller");
const {
  authMiddleware,
  checkRole,
} = require("../../controllers/auth/auth-controller");

const router = express.Router();

router.get("/get", authMiddleware, checkRole("admin"), getAllOrdersOfAllUsers);
router.get(
  "/details/:id",
  authMiddleware,
  checkRole("admin"),
  getOrderDetailsForAdmin
);
router.put(
  "/update/:id",
  authMiddleware,
  checkRole("admin"),
  updateOrderStatus
);

module.exports = router;
