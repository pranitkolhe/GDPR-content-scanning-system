const express = require("express");
const cors = require("cors");

const scanRoutes = require("./src/routes/scan.routes");
const uploadRoutes = require("./src/routes/upload.routes");
const ruleRoutes = require("./src/routes/rule.routes");
const violationRoutes = require("./src/routes/violation.routes");
const redactionRoutes = require("./src/routes/redaction.routes");
const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "https://gdpr-content-scanning-system.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (Postman, curl, server-to-server)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
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