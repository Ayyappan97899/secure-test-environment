const Attempt = require("../models/Attempt.model");
const Event = require("../models/Event.model");

exports.batchLogEvents = async (req, res) => {
  const { attemptId, events } = req.body;

  const attempt = await Attempt.findById(attemptId);

  if (!attempt || attempt.status === "SUBMITTED") {
    return res.status(403).json({ message: "Attempt locked" });
  }

  const formatted = events.map((event) => ({
    attemptId,
    type: event.type,
    questionId: event.questionId || null,
    metadata: event.metadata || {},
    timestamp: event.timestamp || new Date(),
  }));

  await Event.insertMany(formatted);

  res.json({ message: "Events logged successfully" });
};
