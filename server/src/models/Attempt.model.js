const mongoose = require("mongoose");

const attemptSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ["STARTED", "SUBMITTED", "EXPIRED"],
      default: "STARTED",
    },
    startedAt: {
      type: Date,
      default: Date.now,
    },
    submittedAt: Date,
    duration: {
      type: Number,
      default: 300, // 5 minutes in seconds
    },
    ipAddress: String,
    suspiciousCount: { type: Number, default: 0 }, // count of suspicious events
    answer: { type: String, default: "" }, // user answer
    events: { type: Array, default: [] }, // optional logs
  },
  { timestamps: true },
);

module.exports = mongoose.model("Attempt", attemptSchema);
