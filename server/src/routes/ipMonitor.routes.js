const router = require("express").Router();
const { checkIp } = require("../controllers/ipMonitor.controller");

router.post("/check", checkIp);

module.exports = router;
