const Event = require("../models/Event.model");
const Attempt = require("../models/Attempt.model");
const { getClientIp } = require("../services/ipDetection.service");
const { classifyIpChange } = require("../services/ipClassifier.service");

exports.checkIp = async (req, res) => {
  try {
    const { attemptId } = req.body;

    if (!attemptId) {
      return res.status(400).json({ message: "attemptId is required" });
    }

    const attempt = await Attempt.findById(attemptId);

    if (!attempt) {
      return res.status(404).json({ message: "Attempt not found" });
    }

    if (attempt.status === "SUBMITTED") {
      return res.json({
        changed: false,
        message: "Attempt already submitted",
      });
    }

    const currentIp = getClientIp(req);
    const previousIp = attempt.ipAddress;

    // IP CHECK PERFORMED EVENT

    await Event.create({
      attemptId,
      type: "IP_CHECK_PERFORMED",
      metadata: { currentIp },
    });

    let changed = false;
    let classification = "UNKNOWN";

    if (previousIp && previousIp !== currentIp) {
      changed = true;

      classification = classifyIpChange(previousIp, currentIp);

      // IP CHANGE DETECTED EVENT

      await Event.create({
        attemptId,
        type: "IP_CHANGE_DETECTED",
        metadata: {
          oldIp: previousIp,
          newIp: currentIp,
        },
      });

      // IP CLASSIFICATION EVENT

      await Event.create({
        attemptId,
        type: "IP_CLASSIFIED",
        metadata: {
          classification,
        },
      });

      if (classification === "POTENTIALLY_SUSPICIOUS") {
        attempt.suspiciousCount += 1;
      }
    }

    attempt.ipAddress = currentIp;
    await attempt.save();

    return res.json({
      changed,
      oldIp: previousIp || null,
      newIp: currentIp,
      classification,
      suspiciousCount: attempt.suspiciousCount,
      status: attempt.status,
    });
  } catch (error) {
    console.error("IP Check Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
