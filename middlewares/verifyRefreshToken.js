const jwt = require("jsonwebtoken");

const verifyRefreshToken = (req, res, next) => {
  const token = req.cookies.refreshToken;
  console.log("verifyRefreshToken token line 5", token);
  if (!token) {
    console.log("No refresh token provided 🟥 line 6", token);
    return res.status(403).json({ message: "Unauthorized" });
  }
  try {
  } catch (error) {
    console.error(
      "✨ 🌟 verifyRefreshToken error catch block line 8 🟥:",
      error
    );
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = verifyRefreshToken;
