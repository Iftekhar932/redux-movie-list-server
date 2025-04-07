// filepath: c:\Projects\redux-movie-list-server\routes\hello.js
const express = require("express");
const router = express.Router();
const helloWorldController = require("../controllers/helloWorldController");
const verifyRefreshToken = require("../middlewares/verifyRefreshToken");

// Define the /hello route
router.get("/hello", helloWorldController);

module.exports = router;
