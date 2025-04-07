const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const port = 5000;
const { connectDB } = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const hello = require("./routes/hello");
const cookieParser = require("cookie-parser");
const verifyAccessToken = require("./middlewares/verifyAccessToken");
const verifyRefreshToken = require("./middlewares/verifyRefreshToken");
const refreshController = require("./controllers/refreshController");

// connecting to mongodb
connectDB()
  .then(() => {
    console.log("Connected to mongoDB");
  })
  .catch((err) => console.log(err));

app.use(cookieParser()); // to parse cookies
app.use(express.json()); // to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // to parse URL-encoded bodies
app.use(cors({ origin: "http://localhost:5173", credentials: true })); // allow cross-origin requests from the frontend

app.use("/auth", authRoutes);
app.use("/products", verifyAccessToken, hello); // hello world route

// app.use("/refreshJWT", refreshController); // ! after re issuing of accessToken turn on refreshtoken verification

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
