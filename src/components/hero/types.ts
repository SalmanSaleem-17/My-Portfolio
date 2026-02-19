import {
  Code, Server, Database, Smartphone, Shield,
  Zap, Palette, Globe, Briefcase, GraduationCap, Star,
} from 'lucide-react';

// ── Skill that rotates in the animated badge ──────────────────────────────────
export interface Skill {
  name: string;
  icon: React.ElementType;
  color: string;
  bg: string;
}

export const SKILLS: Skill[] = [
  { name: 'React.js Developer',    icon: Code,       color: '#61DAFB', bg: 'from-cyan-100 to-blue-100' },
  { name: 'Full-Stack MERN',       icon: Server,     color: '#47A248', bg: 'from-green-100 to-emerald-100' },
  { name: 'Node.js & Express',     icon: Database,   color: '#339933', bg: 'from-green-100 to-lime-100' },
  { name: 'MongoDB Expert',        icon: Database,   color: '#47A248', bg: 'from-emerald-100 to-teal-100' },
  { name: 'React Native',          icon: Smartphone, color: '#61DAFB', bg: 'from-blue-100 to-indigo-100' },
  { name: 'JWT Authentication',    icon: Shield,     color: '#000000', bg: 'from-gray-100 to-slate-100' },
  { name: 'Socket.io Real-time',   icon: Zap,        color: '#010101', bg: 'from-yellow-100 to-orange-100' },
  { name: 'UI/UX Design',          icon: Palette,    color: '#06B6D4', bg: 'from-purple-100 to-pink-100' },
  { name: 'REST API Development',  icon: Globe,      color: '#FF6C37', bg: 'from-orange-100 to-red-100' },
  { name: 'Data Warehousing',      icon: Database,   color: '#4F46E5', bg: 'from-indigo-100 to-purple-100' },
];

// ── Role badge pills ──────────────────────────────────────────────────────────
export const ROLE_TAGS = [
  { icon: Briefcase,    text: 'MERN Stack Developer', color: 'from-blue-100 to-cyan-100 text-blue-800 border-blue-200' },
  { icon: GraduationCap, text: 'CS Graduate',          color: 'from-purple-100 to-violet-100 text-purple-800 border-purple-200' },
  { icon: Star,         text: 'Full-Stack Expert',    color: 'from-emerald-100 to-teal-100 text-emerald-800 border-emerald-200' },
];

// ── Floating icon components around the profile photo ────────────────────────
export const FLOATING_ICONS: React.ElementType[] = [Code, Database, Globe, Shield, Smartphone, Zap];

// ── Deterministic particle positions (avoids hydration mismatch) ─────────────
export const PARTICLE_POSITIONS = [
  { left: 22.6, top: 70.2, delay: 0,   duration: 7.8 },
  { left: 37.7, top: 59.8, delay: 2,   duration: 8.6 },
  { left: 32.5, top: 39.4, delay: 4,   duration: 7.2 },
];