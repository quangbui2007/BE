const express = require("express");

const {
  addFeatureImage,
  getFeatureImages,
  deleteFeatureImage,
} = require("../../controllers/common/feature-controller");
const {
  authMiddleware,
  checkRole,
} = require("../../controllers/auth/auth-controller");

const router = express.Router();

router.post("/add", authMiddleware, checkRole("admin"), addFeatureImage);
router.get("/get", authMiddleware, getFeatureImages);
router.post(
  "/delete/:id",
  authMiddleware,
  checkRole("admin"),
  deleteFeatureImage
);

module.exports = router;
