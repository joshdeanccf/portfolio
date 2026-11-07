import "dotenv/config";
import app from "./app.js";
import { connectToDatabase } from "./db.js";

const PORT = process.env.PORT || 5000;

connectToDatabase()
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err.message));

app.listen(PORT, () =>
  console.log(`API listening on http://localhost:${PORT}`),
);
