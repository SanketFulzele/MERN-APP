const express = require("express");
const router = express.Router();

const { addUsers, getAllUsers, editUsers, deleteUsers } = require("../controllers/userController");
const validateUserEmail = require("../middlewares/emailValidationMiddleware");

router.post("/add-user", validateUserEmail, addUsers);
router.get("/all-user", getAllUsers);
router.put("/edit-user/:id", editUsers);
router.delete("/delete-user/:id", deleteUsers);

module.exports = router;