// src/utils/skillsData.ts

import {
  FaReact,
  FaNodeJs,
  FaJs,
  FaHtml5,
  FaCss3Alt,
  FaGitAlt,
  FaGithub,
  FaBootstrap,
  FaDatabase,
  FaNpm,
} from "react-icons/fa";

import {
  SiMongodb,
  SiExpress,
  SiTailwindcss,
  SiTypescript,
  SiNextdotjs,
  SiPostman,
  SiSocketdotio,
  SiVscodium,
  SiVercel,
  SiRender,
  SiCloudinary,
  SiGithubactions,
} from "react-icons/si";

export interface Skill {
  name: string;
  level: "Expert" | "Advanced" | "Intermediate";
  color: string;
  icon: any;
  category: string;
  years?: number;
}

export const skills: Skill[] = [
  // =========================
  // Frontend
  // =========================
  { name: "React", level: "Expert", color: "#61DAFB", icon: FaReact, category: "Frontend", years: 2 },
  { name: "Next.js", level: "Advanced", color: "#000000", icon: SiNextdotjs, category: "Frontend", years: 1 },
  { name: "TypeScript", level: "Advanced", color: "#3178C6", icon: SiTypescript, category: "Frontend", years: 1 },
  { name: "JavaScript", level: "Expert", color: "#F7DF1E", icon: FaJs, category: "Frontend", years: 3 },
  { name: "HTML5", level: "Expert", color: "#E34F26", icon: FaHtml5, category: "Frontend", years: 3 },
  { name: "CSS3", level: "Advanced", color: "#1572B6", icon: FaCss3Alt, category: "Frontend", years: 3 },
  { name: "Tailwind CSS", level: "Advanced", color: "#06B6D4", icon: SiTailwindcss, category: "Frontend" },
  { name: "Bootstrap", level: "Advanced", color: "#7952B3", icon: FaBootstrap, category: "Frontend" },

  // =========================
  // Backend
  // =========================
  { name: "Node.js", level: "Advanced", color: "#339933", icon: FaNodeJs, category: "Backend", years: 2 },
  { name: "Express.js", level: "Advanced", color: "#000000", icon: SiExpress, category: "Backend", years: 2 },
  { name: "MongoDB", level: "Advanced", color: "#47A248", icon: SiMongodb, category: "Backend", years: 2 },
  { name: "Socket.IO", level: "Intermediate", color: "#010101", icon: SiSocketdotio, category: "Backend", years: 1 },
  { name: "REST APIs", level: "Advanced", color: "#FF6B6B", icon: FaDatabase, category: "Backend" },

  // =========================
  // Cloud & DevOps
  // =========================
  { name: "Vercel", level: "Advanced", color: "#000000", icon: SiVercel, category: "Cloud & DevOps" },
  { name: "Render", level: "Advanced", color: "#46E3B7", icon: SiRender, category: "Cloud & DevOps" },
  { name: "Cloudinary", level: "Advanced", color: "#3448C5", icon: SiCloudinary, category: "Cloud & DevOps", years: 1 },
  { name: "GitHub Actions", level: "Advanced", color: "#2088FF", icon: SiGithubactions, category: "Cloud & DevOps" },
  { name: "CI/CD Integration", level: "Advanced", color: "#6B7280", icon: FaDatabase, category: "Cloud & DevOps" },

  // =========================
  // Tools
  // =========================
  { name: "Git", level: "Advanced", color: "#F05032", icon: FaGitAlt, category: "Tools" },
  { name: "GitHub", level: "Advanced", color: "#181717", icon: FaGithub, category: "Tools" },
  { name: "Postman", level: "Advanced", color: "#FF6C37", icon: SiPostman, category: "Tools" },
  { name: "NPM", level: "Advanced", color: "#CB3837", icon: FaNpm, category: "Tools" },
  { name: "VS Code", level: "Advanced", color: "#007ACC", icon: SiVscodium, category: "Tools" },
];
