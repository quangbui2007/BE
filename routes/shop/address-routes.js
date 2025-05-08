const express = require("express");

const {
  addAddress,
  fetchAllAddress,
  editAddress,
  deleteAddress,
} = require("../../controllers/shop/address-controller");
const { authMiddleware, checkRole } = require("../../controllers/auth/auth-controller");

const router = express.Router();

router.post("/add", authMiddleware, checkRole("user"), addAddress);
router.get("/get/:userId", authMiddleware, checkRole("user"), fetchAllAddress);
router.delete(
  "/delete/:userId/:addressId",
  authMiddleware,
  checkRole("user"),
  deleteAddress
);
router.put(
  "/update/:userId/:addressId",
  authMiddleware,
  checkRole("user"),
  editAddress
);

module.exports = router;
