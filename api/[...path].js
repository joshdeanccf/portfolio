import app from "../server/app.js";
import { connectToDatabase } from "../server/db.js";

export default async function handler(req, res) {
  try {
    await connectToDatabase();

    const requestUrl = req.url || "/";
    if (!requestUrl.startsWith("/api/")) {
      req.url = `/api${requestUrl.startsWith("/") ? "" : "/"}${requestUrl}`;
    }

    return app(req, res);
  } catch (error) {
    console.error("API request failed:", error.message);
    return res.status(503).json({ error: "API service is unavailable" });
  }
}