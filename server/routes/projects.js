import { Router } from "express";
import Project from "../models/Project.js";
const router = Router();
router.get("/", async (req, res) => {
  try {
    res.json(await Project.find().sort({ order: 1, createdAt: -1 }).lean());
  } catch {
    res.status(500).json({ error: "Unable to fetch projects" });
  }
});
export default router;
