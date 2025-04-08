const jwt = require("jsonwebtoken");

/*
//* This controller handles the refresh token logic. It verifies the refresh token and generates a new access token if accessToken expires.
*/
const refreshController = (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    console.log(
      "refreshController No refresh token provided 🟥 line 6",
      refreshToken
    );
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, decoded) => {
      if (err) {
        console.log(err, "refreshController error 🟥 line 14 EXPIRED");
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
      "✨ 🌟 refreshController error catch block line 25 🟥:",
      error
    );
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = refreshController;
