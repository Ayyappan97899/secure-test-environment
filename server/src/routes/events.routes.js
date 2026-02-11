const express = require("express");
const router = express.Router();
const { batchLogEvents } = require("../controllers/events.controller");

router.post("/batch", batchLogEvents);

module.exports = router;
