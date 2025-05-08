const express = require("express");

const {
  handleImageUpload,
  addProduct,
  editProduct,
  fetchAllProducts,
  deleteProduct,
} = require("../../controllers/admin/products-controller");

const { upload } = require("../../helpers/cloudinary");
const {
  authMiddleware,
  checkRole,
} = require("../../controllers/auth/auth-controller");

const router = express.Router();

router.post(
  "/upload-image",
  authMiddleware,
  checkRole("admin"),
  upload.single("my_file"),
  handleImageUpload
);
router.post("/add", authMiddleware, checkRole("admin"), addProduct);
router.put("/edit/:id", authMiddleware, checkRole("admin"), editProduct);
router.delete("/delete/:id", authMiddleware, checkRole("admin"), deleteProduct);
router.get("/get", authMiddleware, checkRole("admin"), fetchAllProducts);

module.exports = router;
