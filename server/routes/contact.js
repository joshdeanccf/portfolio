import { Router } from "express";
import rateLimit from "express-rate-limit";
import Message from "../models/Message.js";
const router = Router();
router.post(
  "/",
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    standardHeaders: "draft-7",
    legacyHeaders: false,
  }),
  async (req, res) => {
    const { name, email, message } = req.body || {};
    if (
      typeof name !== "string" ||
      !name.trim() ||
      name.length > 100 ||
      typeof email !== "string" ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      email.length > 200 ||
      typeof message !== "string" ||
      !message.trim() ||
      message.length > 3000
    )
      return res.status(400).json({
        error: "Please enter a valid name, email, and message.",
      });
    try {
      await Message.create({
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
      });
      res.status(201).json({ ok: true });
    } catch {
      res.status(500).json({ error: "Unable to save your message" });
    }
  },
);
export default router;
