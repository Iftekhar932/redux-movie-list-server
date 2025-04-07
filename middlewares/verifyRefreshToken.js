const jwt = require("jsonwebtoken");

const verifyRefreshToken = (req, res, next) => {
  const refreshToken = req.cookies.refreshToken; // Assuming the refresh token is stored in cookies
  console.log("verifyRefreshToken middleware called", refreshToken);
  if (!refreshToken) {
    return res
      .status(401)
      .json({ message: "Unauthorized: No refresh token provided" });
  }
  try {
    jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, decoded) => {
      if (err) {
        console.log("here");
        return res
          .status(403)
          .json({ message: "Forbidden: Invalid refresh token" });
      }

      req.user = decoded; // Attach the decoded token to the request object
      console.log("Decoded refresh token:", decoded);

      next();
    });
  } catch (error) {
    console.error("Error in verifyRefreshToken middleware:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = verifyRefreshToken;
