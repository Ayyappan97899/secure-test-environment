const Attempt = require("../models/Attempt.model");
const { getClientIp } = require("../services/ipDetection.service");

exports.startAttempt = async (req, res) => {
  try {
    const ip = getClientIp(req);

    const attempt = await Attempt.create({
      ipAddress: ip,
      startedAt: new Date(),
    });

    res.status(201).json({
      attemptId: attempt._id,
      duration: attempt.duration, // ensure default duration exists in model
    });
  } catch (err) {
    console.error("Failed to start attempt:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.submitAttempt = async (req, res) => {
  try {
    const { attemptId } = req.params;
    const { answer } = req.body; // receive user's answer

    const attempt = await Attempt.findById(attemptId);
    if (!attempt) return res.status(404).json({ message: "Attempt not found" });

    if (attempt.status === "SUBMITTED") {
      return res.status(400).json({ message: "Already submitted" });
    }

    const now = new Date();
    const elapsed = (now - attempt.startedAt) / 1000;

    if (elapsed > attempt.duration) {
      console.log("⏰ Time exceeded — auto submitting");
      attempt.status = "EXPIRED";
    } else {
      attempt.status = "SUBMITTED";
    }

    attempt.submittedAt = now;
    attempt.answer = answer || attempt.answer; // save answer
    await attempt.save();

    res.json({
      message: "Attempt submitted successfully",
      attemptId: attempt._id,
      status: attempt.status,
    });
  } catch (err) {
    console.error("Failed to submit attempt:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
