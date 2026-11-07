import React from "react";
import "./skills-marquee.css";

// Edit the skill names here without changing App.jsx.
const skillGroups = [
  { category: "Programming Languages", tools: ["JavaScript", "Dart"] },
  { category: "Web Development", tools: ["React", "Node.js", "Express", "HTML & CSS"] },
  { category: "Mobile Development", tools: ["Flutter"] },
  { category: "Databases", tools: ["MongoDB", "Firebase"] },
  { category: "Blockchain", tools: ["Solana Blockchain"] },
  { category: "Development Tools", tools: ["GitHub", "Vercel", "Render", "MongoDB Atlas", "Visual Studio Code"] },
  { category: "Productivity & Design", tools: ["Microsoft Word", "Microsoft Excel", "Canva"] },
  { category: "AI & Prompt Engineering", tools: ["ChatGPT", "Claude", "Copilot", "Google Gemini"] },
];

export default function SkillsMarquee() {
  return (
    <div className="skills-row">
      <span>TOOLS & SKILLS</span>
      <div className="skill-groups">
        {skillGroups.map(({ category, tools }, index) => {
          // Repeat short lists so even a single skill makes a full marquee.
          const repeats = Math.max(3, Math.ceil(10 / tools.length));
          const items = Array.from({ length: repeats }, () => tools).flat();
          return (
            <div className="skill-group animated-skill-group" key={category}>
              <strong>{category}:</strong>
              <div className="skills-marquee-window" aria-label={`${category}: ${tools.join(", ")}`}>
                <div
                  className={`skills-marquee-track ${index % 2 ? "scroll-right" : "scroll-left"}`}
                  style={{ animationDuration: `${28 + index * 2}s` }}
                >
                  {[0, 1].map((copy) => (
                    <div className="skills-marquee-copy" key={copy} aria-hidden="true">
                      {items.map((tool, i) => (
                        <span className="skill-chip" key={`${copy}-${i}`}>{tool}</span>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
