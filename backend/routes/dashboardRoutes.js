const express = require("express");
const router = express.Router();

const {
  getCarouselData,
  addCarouselData
} = require("../controllers/dashboardController");

router.get("/carousel-data", getCarouselData);
router.post("/add-carousel-data", addCarouselData);

module.exports = router;