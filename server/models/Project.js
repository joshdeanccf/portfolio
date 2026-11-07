import mongoose from "mongoose";
const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, default: "Web Development" },
    year: { type: String, default: "2026" },
    description: { type: String, required: true },
    accent: { type: String, default: "#d9d5ce" },
    type: {
      type: String,
      enum: ["editorial", "dashboard", "mobile"],
      default: "editorial",
    },
    tags: [String],
    link: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);
export default mongoose.model("Project", projectSchema);
