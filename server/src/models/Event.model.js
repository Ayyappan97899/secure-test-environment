const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    attemptId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Attempt",
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    questionId: String,
    metadata: { type: Object, default: {} },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

// Indexes for performance
eventSchema.index({ attemptId: 1, timestamp: 1 });
eventSchema.index({ timestamp: 1 });

module.exports = mongoose.model("Event", eventSchema);
