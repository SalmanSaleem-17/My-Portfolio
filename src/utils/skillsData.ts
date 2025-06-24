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
  FaNpm
} from "react-icons/fa";
import { 
  SiMongodb, 
  SiExpress, 
  SiTailwindcss, 
  SiTypescript,
  SiNextdotjs,
  SiPostman,
  SiSocketdotio
} from "react-icons/si";

export interface Skill {
  name: string;
  level: 'Expert' | 'Advanced' | 'Intermediate';
  color: string;
  icon: any;
  category: string;
  years?: number;
}

export const skills: Skill[] = [
  // Frontend
  { name: "React", level: "Expert", color: "#61DAFB", icon: FaReact, category: "Frontend" },
  { name: "Next.js", level: "Advanced", color: "#000000", icon: SiNextdotjs, category: "Frontend" },
  { name: "TypeScript", level: "Advanced", color: "#3178C6", icon: SiTypescript, category: "Frontend" },
  { name: "JavaScript", level: "Expert", color: "#F7DF1E", icon: FaJs, category: "Frontend" },
  { name: "HTML5", level: "Expert", color: "#E34F26", icon: FaHtml5, category: "Frontend"},
  { name: "CSS3", level: "Advanced", color: "#1572B6", icon: FaCss3Alt, category: "Frontend" },
  { name: "Tailwind", level: "Advanced", color: "#06B6D4", icon: SiTailwindcss, category: "Frontend" },
  { name: "Bootstrap", level: "Advanced", color: "#7952B3", icon: FaBootstrap, category: "Frontend" },

  // Backend
  { name: "Node.js", level: "Advanced", color: "#339933", icon: FaNodeJs, category: "Backend" },
  { name: "Express.js", level: "Advanced", color: "#000000", icon: SiExpress, category: "Backend" },
  { name: "MongoDB", level: "Advanced", color: "#47A248", icon: SiMongodb, category: "Backend" },
  { name: "Socket.IO", level: "Intermediate", color: "#010101", icon: SiSocketdotio, category: "Backend", years: 1 },
  { name: "REST APIs", level: "Advanced", color: "#FF6B6B", icon: FaDatabase, category: "Backend" },

  // Tools & DevOps
  { name: "Git", level: "Advanced", color: "#F05032", icon: FaGitAlt, category: "Tools" },
  { name: "GitHub", level: "Advanced", color: "#181717", icon: FaGithub, category: "Tools" },
  { name: "Postman", level: "Advanced", color: "#FF6C37", icon: SiPostman, category: "Tools" },
  { name: "NPM", level: "Advanced", color: "#CB3837", icon: FaNpm, category: "Tools" }
];