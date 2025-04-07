const jwt = require("jsonwebtoken");

const refreshController = (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    console.log("No refresh token provided 🟥 line 6", refreshToken);
    return res.status(401).json({ message: "Unauthorized" });
  }
  console.log("verifyRefreshToken token line 5", refreshToken);

  try {
    jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, decoded) => {
      if (err) {
        console.log(err, "verifyRefreshToken error 🟥 line 10 EXPIRED");
        return res.status(403).json({ message: "Forbidden" });
      }
      const userId = decoded.userId;
      const newAccessToken = jwt.sign({ userId }, process.env.ACCESS_SECRET, {
        expiresIn: "15000", // 15 seconds just to test the refresh token and access token expiry
      });
      res.status(200).json({ accessToken: newAccessToken });
    });
  } catch (error) {
    console.error(
      "✨ 🌟 verifyRefreshToken error catch block line 8 🟥:",
      error
    );
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = refreshController;
