const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true }, // Required & unique
    password: { type: String, required: true, minlength: 6 }, // Required & minimum length
    isLoggedIn: { type: Date, default: Date.now, expires: 60 }, // Date when the user logged in, expires after 1 minutes
  },
  { strict: true }
); // Ensures only defined fields are allowed

const User = mongoose.model("User", userSchema);

module.exports = User;
