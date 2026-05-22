const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const randomUserRoutes = require("./routes/randomUserRoutes");
const apiRoutes = require("./routes/apiRoutes");

const app = express();

app.use(cors()); 
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/api", randomUserRoutes);
app.use("/route", apiRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});