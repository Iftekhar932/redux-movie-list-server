const mongoose = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcrypt");

const signupController = async (req, res) => {
  const { email, password } = req.body;
  console.log("🚀 ~ signupController ~ username:", email, password);
};

module.exports = { signupController };
