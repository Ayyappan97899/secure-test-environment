const express = require("express");
const cors = require("cors");

const attemptRoutes = require("./routes/attempt.routes");
const eventRoutes = require("./routes/events.routes");
const ipRoutes = require("./routes/ipMonitor.routes");

const app = express();

app.set("trust proxy", true);

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://securetest-environment.netlify.app",
    ],
    credentials: true,
  }),
);

app.use(express.json());

app.use("/attempt", attemptRoutes);
app.use("/events", eventRoutes);
app.use("/ip", ipRoutes);

module.exports = app;
