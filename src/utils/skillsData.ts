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
  // ── added ──
  SiRedux,
  SiFramer,
  SiThreedotjs,
  SiMui,
  SiChartdotjs,
  SiI18Next,
  SiReactquery,
  SiMongoose,
  SiJsonwebtokens,
  SiStripe,
  SiResend,
  SiZod,
  SiRedis,
  SiExpo,
  SiGooglecloud,
  SiCloudflare,
  SiGoogleanalytics,
  SiGooglesearchconsole,
  SiGoogleadsense,
  SiClaude,
  SiGithubcopilot,
  SiOpenai,
} from "react-icons/si";

import { TbBrandReactNative } from "react-icons/tb";
import { KeyRound, Search, TrendingUp, Gauge, Hash, Link, FileText, Presentation } from "lucide-react";

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
  { name: "Next.js", level: "Advanced", color: "#ffffff", icon: SiNextdotjs, category: "Frontend", years: 1 },
  { name: "TypeScript", level: "Advanced", color: "#3178C6", icon: SiTypescript, category: "Frontend", years: 1 },
  { name: "JavaScript", level: "Expert", color: "#F7DF1E", icon: FaJs, category: "Frontend", years: 3 },
  { name: "HTML5", level: "Expert", color: "#E34F26", icon: FaHtml5, category: "Frontend", years: 3 },
  { name: "CSS3", level: "Advanced", color: "#1572B6", icon: FaCss3Alt, category: "Frontend", years: 3 },
  { name: "Tailwind CSS", level: "Advanced", color: "#06B6D4", icon: SiTailwindcss, category: "Frontend" },
  { name: "Bootstrap", level: "Advanced", color: "#7952B3", icon: FaBootstrap, category: "Frontend" },
  { name: "Redux Toolkit", level: "Advanced", color: "#764ABC", icon: SiRedux, category: "Frontend", years: 2 },
  { name: "Framer Motion", level: "Advanced", color: "#0099FF", icon: SiFramer, category: "Frontend" },
  { name: "Three.js", level: "Intermediate", color: "#ffffff", icon: SiThreedotjs, category: "Frontend" },
  { name: "Material UI", level: "Advanced", color: "#007FFF", icon: SiMui, category: "Frontend" },
  { name: "Chart.js", level: "Advanced", color: "#FF6384", icon: SiChartdotjs, category: "Frontend" },
  { name: "React i18next", level: "Advanced", color: "#26A69A", icon: SiI18Next, category: "Frontend" },
  { name: "React Query", level: "Advanced", color: "#FF4154", icon: SiReactquery, category: "Frontend" },

  // =========================
  // Backend
  // =========================
  { name: "Node.js", level: "Advanced", color: "#339933", icon: FaNodeJs, category: "Backend", years: 2 },
  { name: "Express.js", level: "Advanced", color: "#ffffff", icon: SiExpress, category: "Backend", years: 2 },
  { name: "MongoDB", level: "Advanced", color: "#47A248", icon: SiMongodb, category: "Backend", years: 2 },
  { name: "Socket.IO", level: "Intermediate", color: "#ffffff", icon: SiSocketdotio, category: "Backend", years: 1 },
  { name: "REST APIs", level: "Advanced", color: "#FF6B6B", icon: FaDatabase, category: "Backend" },
  { name: "Mongoose", level: "Advanced", color: "#C0392B", icon: SiMongoose, category: "Backend", years: 2 },
  { name: "JWT Auth", level: "Advanced", color: "#EC4899", icon: SiJsonwebtokens, category: "Backend", years: 2 },
  { name: "Stripe API", level: "Advanced", color: "#635BFF", icon: SiStripe, category: "Backend" },
  { name: "OAuth 2.0", level: "Advanced", color: "#4285F4", icon: KeyRound, category: "Backend" },
  { name: "Resend", level: "Advanced", color: "#ffffff", icon: SiResend, category: "Backend" },
  { name: "Zod", level: "Advanced", color: "#3E67B1", icon: SiZod, category: "Backend" },
  { name: "Redis", level: "Intermediate", color: "#DC382D", icon: SiRedis, category: "Backend" },

  // =========================
  // Mobile
  // =========================
  { name: "React Native", level: "Intermediate", color: "#61DAFB", icon: TbBrandReactNative, category: "Mobile" },
  { name: "Expo", level: "Intermediate", color: "#ffffff", icon: SiExpo, category: "Mobile" },

  // =========================
  // Cloud & DevOps
  // =========================
  { name: "Vercel", level: "Advanced", color: "#ffffff", icon: SiVercel, category: "Cloud & DevOps" },
  { name: "Render", level: "Advanced", color: "#46E3B7", icon: SiRender, category: "Cloud & DevOps" },
  { name: "Cloudinary", level: "Advanced", color: "#3448C5", icon: SiCloudinary, category: "Cloud & DevOps", years: 1 },
  { name: "GitHub Actions", level: "Advanced", color: "#2088FF", icon: SiGithubactions, category: "Cloud & DevOps" },
  { name: "CI/CD Integration", level: "Advanced", color: "#6B7280", icon: FaDatabase, category: "Cloud & DevOps" },
  { name: "MongoDB Atlas", level: "Advanced", color: "#00ED64", icon: SiMongodb, category: "Cloud & DevOps", years: 2 },
  { name: "Google Cloud", level: "Intermediate", color: "#4285F4", icon: SiGooglecloud, category: "Cloud & DevOps" },
  { name: "Cloudflare Turnstile", level: "Advanced", color: "#F38020", icon: SiCloudflare, category: "Cloud & DevOps" },
  { name: "Vercel Analytics", level: "Advanced", color: "#ffffff", icon: SiVercel, category: "Cloud & DevOps" },

  // =========================
  // Analytics & SEO
  // =========================
  { name: "Google Analytics", level: "Advanced", color: "#E37400", icon: SiGoogleanalytics, category: "Analytics & SEO" },
  { name: "Search Console", level: "Advanced", color: "#458CF5", icon: SiGooglesearchconsole, category: "Analytics & SEO" },
  { name: "Bing Webmaster", level: "Intermediate", color: "#14B8A6", icon: Search, category: "Analytics & SEO" },
  { name: "Google AdSense", level: "Advanced", color: "#4285F4", icon: SiGoogleadsense, category: "Analytics & SEO" },
  { name: "Ahrefs", level: "Advanced", color: "#FF6A00", icon: TrendingUp, category: "Analytics & SEO" },
  { name: "Technical SEO", level: "Advanced", color: "#22C55E", icon: Gauge, category: "Analytics & SEO" },
  { name: "Keyword Research", level: "Advanced", color: "#A855F7", icon: Hash, category: "Analytics & SEO" },
  { name: "Backlinks", level: "Advanced", color: "#0EA5E9", icon: Link, category: "Analytics & SEO" },

  // =========================
  // Tools
  // =========================
  { name: "Git", level: "Advanced", color: "#F05032", icon: FaGitAlt, category: "Tools" },
  { name: "GitHub", level: "Advanced", color: "#ffffff", icon: FaGithub, category: "Tools" },
  { name: "Postman", level: "Advanced", color: "#FF6C37", icon: SiPostman, category: "Tools" },
  { name: "NPM", level: "Advanced", color: "#CB3837", icon: FaNpm, category: "Tools" },
  { name: "VS Code", level: "Advanced", color: "#007ACC", icon: SiVscodium, category: "Tools" },
  { name: "MS Word", level: "Advanced", color: "#2B579A", icon: FileText, category: "Tools" },
  { name: "MS PowerPoint", level: "Advanced", color: "#D24726", icon: Presentation, category: "Tools" },

  // =========================
  // AI Tools
  // =========================
  { name: "Claude (VS Code)", level: "Expert", color: "#D97757", icon: SiClaude, category: "AI Tools", years: 1 },
  { name: "GitHub Copilot", level: "Advanced", color: "#ffffff", icon: SiGithubcopilot, category: "AI Tools" },
  { name: "OpenAI Codex", level: "Advanced", color: "#10A37F", icon: SiOpenai, category: "AI Tools" },
];
