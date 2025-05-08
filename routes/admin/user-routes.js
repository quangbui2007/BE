const express = require("express");
const {
  authMiddleware,
  checkRole,
} = require("../../controllers/auth/auth-controller");
const { getListUsers } = require("../../controllers/admin/user-controller");

const router = express.Router();

router.get("/list", authMiddleware, checkRole("admin"), getListUsers);
module.exports = router;
