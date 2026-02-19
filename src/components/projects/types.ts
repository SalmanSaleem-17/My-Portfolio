export interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  platform: string;
  deviceTargets: string[];
  image: string;
  screenshots: string[];
  mockupType: string;

  // ── Controls how the project image is displayed in ProjectHeader ──────────
  // shape:   'square'    → 1:1 ratio   (icons, logos)
  //          'landscape' → 16:10 ratio (laptop screenshots, wide images)
  //          'portrait'  → 3:4 ratio   (mobile screenshots)
  // bgColor: fill colour behind the image (useful for PNGs with transparency)
  // padding: inner whitespace around the image inside the frame
  imageConfig?: {
    shape:    'square' | 'landscape' | 'portrait';
    bgColor?: string;   // e.g. '#1A1A1A' or 'rgba(212,175,55,0.06)'
    padding?: string;   // e.g. '12px' or '8%'
  };

  link: string;
  demoLink?: string;
  playStoreLink?: string;
  appStoreLink?: string;
  category: string;
  status: string;
  year: string;
  duration: string;
  technologies: string[];
  features: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  problemStatement: string;
  solution: string;
  achievements: string[];
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    gradient: string;
  };
  keyScreens?: string[];
  appInfo?: {
    category: string;
    size: string;
    compatibility: string;
    languages: string[];
    version: string;
  };
  roadmap?: string[];
}