const mongoose = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcrypt");

const signupController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log(existingUser);
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPwd = await bcrypt.hash(password, 10);

    // create the user and store
    const user = new User({ email, password: hashedPwd });
    await user.save();

    // Send success response
    res.status(201).json({ message: "User Registered successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "User does not exist" });
    }

    // Check if password is correct
    const pwdMatch = await bcrypt.compare(password, existingUser.password);
    if (pwdMatch) {
      return res.status(200).json({ message: "Login successful" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { signupController, loginController };
