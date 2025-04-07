const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
  try {
    const accessToken = jwt.sign({ userId }, process.env.ACCESS_SECRET, {
      expiresIn: "15000", // 15 seconds just to test the refresh token and access token expiry
    });
    const refreshToken = jwt.sign({ userId }, process.env.REFRESH_SECRET, {
      expiresIn: "300000", // 300 seconds just to test the refresh token and access token expiry
    });
    return { accessToken, refreshToken };
  } catch (error) {
    console.error("Error generating token:", error);
    return null;
  }
};

module.exports = generateToken;
