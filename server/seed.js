import "dotenv/config";
import mongoose from "mongoose";
import Project from "./models/Project.js";
const uri =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/my_portfolio";
await mongoose.connect(uri);
const count = await Project.countDocuments();
if (count) {
  console.log("Projects already exist; skipped seed.");
} else {
  await Project.insertMany([
    {
      title: "MONO STUDIO",
      category: "Branding / Web Experience",
      year: "2026",
      description:
        "An editorial portfolio concept with confident typography and precise interactions.",
      accent: "#d9d5ce",
      type: "editorial",
      tags: ["React", "UI/UX", "Motion"],
      order: 1,
    },
    {
      title: "NOVA DASH",
      category: "Dashboard / Product Design",
      year: "2026",
      description:
        "An intuitive analytics experience that transforms data into actionable insights.",
      accent: "#c4cbd0",
      type: "dashboard",
      tags: ["JavaScript", "Data", "Design"],
      order: 2,
    },
    {
      title: "FORM & FLOW",
      category: "Creative Development",
      year: "2025",
      description:
        "An expressive digital experience combining simplicity, structure, and movement.",
      accent: "#d9d0c5",
      type: "mobile",
      tags: ["React", "Frontend", "UX"],
      order: 3,
    },
  ]);
  console.log("Seeded three demo projects.");
}
await mongoose.disconnect();
