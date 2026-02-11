const express = require("express");
const router = express.Router();
const {
  startAttempt,
  submitAttempt,
} = require("../controllers/attempt.controller");

router.post("/start", startAttempt);
router.post("/submit/:attemptId", submitAttempt);

module.exports = router;
