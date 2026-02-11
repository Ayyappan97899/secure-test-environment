const mongoose = require("mongoose");
const { MONGO_URI } = require("./env");

module.exports = async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB error", err);
    process.exit(1);
  }
};
