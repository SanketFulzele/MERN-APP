const express = require("express");
const router = express.Router();

const { getRandomUsers } = require("../controllers/randomUserController");

router.get("/random-users", getRandomUsers);

module.exports = router;