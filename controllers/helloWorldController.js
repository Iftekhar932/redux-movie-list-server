const helloWorldController = (req, res) => {
  const accessToken = req.headers["authorization"].split(" ")[1];

  if (!accessToken) {
    console.log("🟥 Invalid accessToken");
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    res.status(200).json({
      message: "Hello Worlsd!",
      accessToken,
    });
  } catch (error) {
    console.error(
      "✨ 🌟 helloWorldController error catch block line 7 🟥:",
      error
    );
    res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports = helloWorldController;
