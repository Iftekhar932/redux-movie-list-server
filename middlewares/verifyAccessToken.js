const jwt = require("jsonwebtoken");

const verifyAccessToken = (req, res, next) => {
  const accessToken = req.headers["authorization"].split(" ")[1];
  if (!accessToken) return res.status(403).json({ message: "Unauthorized" });

  try {
    jwt.verify(accessToken, process.env.ACCESS_SECRET, (err, decoded) => {
      if (err) {
        console.log(err, "verifyAccessToken error 🟥 line 10 EXPIRED");
        return res.status(401).json({ message: "Unauthorized" });
      }
      req.user = decoded; // Attach userId to the request object
      console.log(req.user, "req.user line 12 💚");
      next();
    });
  } catch (error) {
    console.error(
      "✨ 🌟 verifyAccessToken error catch block line 16 🟥:",
      error
    );
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = verifyAccessToken;
