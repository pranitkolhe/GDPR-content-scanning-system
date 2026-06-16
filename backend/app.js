const express = require("express");
const cors = require("cors");

const scanRoutes = require("./src/routes/scan.routes");
const uploadRoutes = require("./src/routes/upload.routes");
const ruleRoutes = require("./src/routes/rule.routes");
const violationRoutes = require("./src/routes/violation.routes");
const redactionRoutes = require("./src/routes/redaction.routes");
const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());


app.use("/", uploadRoutes);
app.use("/api", scanRoutes);
app.use("/api", ruleRoutes);
app.use("/api", violationRoutes);
app.use("/api", redactionRoutes);

module.exports = app;