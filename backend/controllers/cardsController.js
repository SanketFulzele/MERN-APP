const cards = require("../data/cards.json");

exports.getCardsData = (req, res) => {
    try {
        res.json(cards);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users" });
    }
}