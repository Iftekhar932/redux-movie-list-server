const express = require("express");
const {
  signupController,
  loginController,
} = require("../controllers/authControllers");
const refreshController = require("../controllers/refreshController");
const verifyAccessToken = require("../middlewares/verifyAccessToken");
const router = express.Router();

router.post("/signup", signupController);
router.post("/login", loginController);
// router.post("/refreshJWT", refreshController);

module.exports = router;

// ! test verifyAccessToken verifyRefreshToken middlewares
// !create routes for /refreshJWT in "auth_api.js"
//
