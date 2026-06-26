const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const mernRoutes = require("./routes/mernRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const apiRoutes = require("./routes/apiRoutes");


dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());


app.use("/auth", authRoutes);
app.use("/mern", mernRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/api", apiRoutes);



app.get("/", (req, res) => {
  res.send("Backend is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});