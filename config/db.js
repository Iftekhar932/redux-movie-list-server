// getting-started.js
const mongoose = require("mongoose");

const connectDB = async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/test");
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
};
module.exports = { connectDB };
