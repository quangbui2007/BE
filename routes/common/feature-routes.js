const express = require("express");

const {
  addFeatureImage,
  getFeatureImages,
} = require("../../controllers/common/feature-controller");
const {
  authMiddleware,
  checkRole,
} = require("../../controllers/auth/auth-controller");

const router = express.Router();

router.post("/add", authMiddleware, checkRole("admin"), addFeatureImage);
router.get("/get", authMiddleware, checkRole("admin"), getFeatureImages);

module.exports = router;
