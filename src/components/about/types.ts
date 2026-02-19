import { Trophy, Zap, Star } from 'lucide-react';
import { FaReact, FaNodeJs, FaDatabase, FaJs } from 'react-icons/fa';
import { SiMongodb, SiExpress, SiTailwindcss } from 'react-icons/si';

export interface TechItem {
  icon: React.ElementType;
  color: string;
  name: string;
}

export interface StrengthItem {
  icon: React.ElementType;
  text: string;
  color: string;
}

export const TECH_STACK: TechItem[] = [
  { icon: FaReact,       color: 'text-cyan-500',   name: 'React'      },
  { icon: FaNodeJs,      color: 'text-green-500',  name: 'Node.js'    },
  { icon: SiExpress,     color: 'text-gray-600',   name: 'Express'    },
  { icon: SiMongodb,     color: 'text-green-600',  name: 'MongoDB'    },
  { icon: FaJs,          color: 'text-yellow-500', name: 'JavaScript' },
  { icon: SiTailwindcss, color: 'text-teal-500',   name: 'Tailwind'   },
];

export const STRENGTHS: StrengthItem[] = [
  { icon: FaReact, text: 'Full-Stack MERN Development',    color: 'from-cyan-500 to-blue-500'    },
  { icon: Trophy,  text: 'Independent Project Completion', color: 'from-yellow-500 to-orange-500' },
  { icon: Zap,     text: 'Problem-Solving & Adaptability', color: 'from-purple-500 to-pink-500'  },
  { icon: Star,    text: 'Modern Web Technologies',        color: 'from-green-500 to-emerald-500' },
];