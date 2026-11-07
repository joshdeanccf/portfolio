import express from "express";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";
import projectRoutes from "./routes/projects.js";
import contactRoutes from "./routes/contact.js";

const app = express();
app.use(helmet());

const allowedOrigins = (process.env.CLIENT_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(cors({ origin: allowedOrigins }));
app.use(express.json({ limit: "20kb" }));
app.get("/api/health", (req, res) =>
  res.json({
    ok: true,
    database:
      mongoose.connection.readyState === 1 ? "connected" : "disconnected",
  }),
);
app.use("/api/projects", projectRoutes);
app.use("/api/contact", contactRoutes);

export default app;