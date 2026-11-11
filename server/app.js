
import express from "express";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";
import { connectToDatabase } from "./db.js";
import projectRoutes from "./routes/projects.js";
import contactRoutes from "./routes/contact.js";

const app = express();

// Trust one reverse proxy hop (Vercel)
app.set("trust proxy", 1);

// Security headers
app.use(helmet());

// Allowed frontend origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://jdcf.vercel.app",
  ...(process.env.CLIENT_ORIGIN || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
];

// CORS configuration
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without an Origin header
      if (!origin) {
        return callback(null, true);
      }

      // Allow configured frontend origins
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.warn("CORS blocked origin:", origin);

      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 204,
  })
);

// Parse incoming JSON
app.use(express.json({ limit: "20kb" }));

// Health check
app.get("/api/health", async (req, res) => {
  try {
    await connectToDatabase();

    res.json({
      ok: true,
      database:
        mongoose.connection.readyState === 1
          ? "connected"
          : "disconnected",
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error);

    res.status(503).json({
      ok: false,
      database: "disconnected",
      message: "Database connection failed",
    });
  }
});

// API routes
app.use("/api/projects", projectRoutes);
app.use("/api/contact", contactRoutes);

// Handle unknown API routes
app.use("/api", (req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found",
  });
});

// General error handler
app.use((err, req, res, next) => {
  console.error("Server error:", err);

  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({
      success: false,
      message: "Origin not allowed",
    });
  }

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

export default app;
