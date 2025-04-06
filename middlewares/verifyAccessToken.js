const jwt = require("jsonwebtoken");

const verifyAccessToken = (req, res, next) => {
  const token = req.headers["Authorization"].split(" ")[1];
  console.log("verifyAccessToken token line 5", token);
  if (!token) return res.status(403).json({ message: "Unauthorized" });

  try {
    jwt.verify(token, process.env.ACCESS_SECRET, (err, decoded) => {
      if (err) {
        console.log(err, "verifyAccessToken error 🟥 line 10");
        return res.status(403).json({ message: "Unauthorized" });
      }
    });
    next();
  } catch (error) {
    console.error(
      "✨ 🌟 verifyAccessToken error catch block line 16 🟥:",
      error
    );
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = verifyAccessToken;
