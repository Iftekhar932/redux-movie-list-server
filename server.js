const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const port = 5000;

const authRoutes = require("./routes/authRoutes");

// const cookieParser = require("cookie-parser");
app.use(express.json()); // to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // to parse URL-encoded bodies

app.use(cors({ origin: "http://localhost:5173", credentials: true })); // allow cross-origin requests from the frontend

app.use("/auth", authRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
