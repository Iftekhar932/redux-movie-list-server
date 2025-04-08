const mongoose = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");

const signupController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPwd = await bcrypt.hash(password, 10);
    // create the user and store
    const user = new User({ email, password: hashedPwd });
    await user.save();

    // Generate tokens
    const { accessToken, refreshToken } = generateToken(user._id.toString());
    if (!accessToken || !refreshToken) {
      return res.status(500).json({ message: "Token generation failed" });
    }

    // set refresh-token in cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "development",
      sameSite: "strict",
      maxAge: 20 * 1000, // 20 seconds just to test the refresh token and access token expiry
    });

    // Send success response
    res.status(201).json({
      message: "User Registered successfully",
      userInfo: { id: user._id.toString(), email, accessToken },
    });
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

    if (pwdMatch == true) {
      // Update isLoggedIn field to current date and time
      existingUser.isLoggedIn = Date.now();
      const user = await existingUser.save();

      generateToken(existingUser._id.toString());
      // Generate tokens
      const { accessToken, refreshToken } = generateToken(
        existingUser._id.toString()
      );
      if (!accessToken || !refreshToken)
        return res.status(500).json({ message: "Token generation failed" });

      // Set refresh-token in cookie
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "development",
        sameSite: "strict",
        maxAge: 20 * 1000, // 20 seconds just to test the refresh token and access token expiry
      });

      return res.status(200).json({
        message: "Login successful",
        userInfo: { id: user._id.toString(), email, accessToken },
      });
    } else {
      return res.status(400).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { signupController, loginController };
