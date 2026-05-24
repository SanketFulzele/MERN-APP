const Carousel = require("../model/Carousel");


exports.getCarouselData = async (req, res) => {
  try {
    const data = await Carousel.find();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// POST API
exports.addCarouselData = async (req, res) => {
  try {
    const carousel = await Carousel.create(req.body);

    res.status(201).json({
      message: "Carousel Data Added Successfully",
      data: carousel,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};