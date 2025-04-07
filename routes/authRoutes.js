const express = require("express");
const {
  signupController,
  loginController,
} = require("../controllers/authControllers");
const verifyRefreshToken = require("../middlewares/verifyRefreshToken");
const router = express.Router();

router.post("/refreshJWT", verifyRefreshToken);
router.post("/signup", signupController);
router.post("/login", loginController);

module.exports = router;

//
