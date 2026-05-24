const express = require("express");
const router = express.Router();

const {
  getCarouselData,
  addCarouselData
} = require("../controllers/dashboardController");

const { auth } = require("../middlewares/authMiddleware");

router.get("/carousel-data", auth, getCarouselData);
router.post("/add-carousel-data", auth, addCarouselData);

module.exports = router;