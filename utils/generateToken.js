const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
  try {
    const accessToken = jwt.sign({ userId }, process.env.ACCESS_SECRET, {
      expiresIn: "10000", // 10 seconds just to test the refresh token and access token expiry
    });
    const refreshToken = jwt.sign({ userId }, process.env.REFRESH_SECRET, {
      expiresIn: "30000",
    });
    return { accessToken, refreshToken };
  } catch (error) {
    console.error("Error generating token:", error);
    return null;
  }
};

module.exports = generateToken;
