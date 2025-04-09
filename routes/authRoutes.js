const express = require("express");
const {
  signupController,
  loginController,
  logoutController,
} = require("../controllers/authControllers");
const verifyRefreshToken = require("../middlewares/verifyRefreshToken");
const refreshController = require("../controllers/refreshController");
const router = express.Router();

router.post("/refreshJWT", verifyRefreshToken, refreshController); // Add refreshController here
router.post("/signup", signupController);
router.post("/login", loginController);
router.post("/logout", logoutController);

module.exports = router;

//
