require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI,
  IP_CHECK_INTERVAL_MS: parseInt(process.env.IP_CHECK_INTERVAL_MS) || 30000,
};
