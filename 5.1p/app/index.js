import express from "express";
import winston from "winston";
import morgan from "morgan";
import os from "os";

const app = express();
app.use(express.json());

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  defaultMeta: { service: "calculator-microservice" },
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/combined.log" }),
  ],
});

app.use((req, res, next) => {
  logger.log({
    level: "info",
    message: "Incoming request",
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.originalUrl,
    ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
    userAgent: req.headers["user-agent"],
    hostname: os.hostname(),
    body: req.body,
  });
  next();
});

app.post("/add", (req, res) => {
  const a = parseInt(req.body.a);
  const b = parseInt(req.body.b);
  res.send({ result: a + b });
});

app.post("/subtract", (req, res) => {
  const a = parseInt(req.body.a);
  const b = parseInt(req.body.b);
  res.send({ result: a - b });
});

app.post("/multiply", (req, res) => {
  const a = parseInt(req.body.a);
  const b = parseInt(req.body.b);
  res.send({ result: a * b });
});

app.post("/divide", (req, res) => {
  const a = parseInt(req.body.a);
  const b = parseInt(req.body.b);

  if (b === 0) {
    const errMsg = "Division by zero attempted";
    logger.error(errMsg, {
      a,
      b,
      endpoint: "/divide",
      ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
    });
    return res.status(400).send({ error: "Cannot divide by zero" });
  }

  res.send({ result: a / b });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
