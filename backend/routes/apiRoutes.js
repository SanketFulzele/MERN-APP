const express = require("express");
const router = express.Router();

const { getCardsData } = require("../controllers/cardsController");
const { getAllCustomers, addCustomers, editCustomers, deleteCustomers } = require("../controllers/customerController");

router.get("/cards-list", getCardsData);

router.get("/customer-list", getAllCustomers);
router.post("/add-customer", addCustomers);
router.post("/edit-customer/:id", editCustomers);
router.post("/delete-customer/:id", deleteCustomers);

module.exports = router;