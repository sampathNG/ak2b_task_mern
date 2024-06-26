const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const databaseConnection = require("./models/dbConnect");
const userRoutes = require("./routes/authRoutes");
const todoRoutes = require("./routes/todoRoutes");
app.use("/", userRoutes);
app.use("/", todoRoutes);
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
