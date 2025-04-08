const jwt = require("jsonwebtoken");

const verifyRefreshToken = (req, res, next) => {
  const refreshToken = req.cookies.refreshToken; // Assuming the refresh token is stored in cookies
  if (!refreshToken) {
    return res
      .status(401)
      .json({ message: "Unauthorized: No refresh token provided" });
  }
  try {
    jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, decoded) => {
      if (err) {
        return res
          .status(403)
          .json({ message: "Forbidden: Invalid refresh token" });
      }

      req.user = decoded; // Attach the decoded token to the request object
      

      next();
    });
  } catch (error) {
    console.error("Error in verifyRefreshToken middleware:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = verifyRefreshToken;
