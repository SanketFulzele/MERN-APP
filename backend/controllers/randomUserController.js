const users = require("../data/randomUsers.json");

exports.getRandomUsers = (req, res) => {
  try {
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
};