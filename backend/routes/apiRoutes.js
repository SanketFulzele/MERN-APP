const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  addProduct,
  editProduct,
  deleteProduct,
  getLinkedinPosts,
  getPostReactions,
  getPostDetails,
} = require("../controllers/productsController");

router.get("/get-products", getAllProducts);
router.post("/add-products", addProduct);
router.put("/edit-products/:id", editProduct);
router.delete("/delete-products/:id", deleteProduct);

router.get("/linkedin-posts", getLinkedinPosts);
router.get("/post-reactions", getPostReactions);
router.get("/post-details", getPostDetails);

module.exports = router;