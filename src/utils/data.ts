// src/utils/data.ts
export const projects = [
  {
    id: 1,
    title: 'Goldify',
    subtitle: 'Production-Grade FinTech Platform for Real-Time Gold Pricing & Advanced Valuation',
    description: 'A scalable full-stack FinTech platform delivering real-time gold pricing, multi-karat valuation logic, unit & currency conversions, and interactive analytics for jewelers, traders, and investors.',
    longDescription: 'Goldify is a production-ready full-stack FinTech application engineered to solve complex gold valuation workflows. The platform integrates third-party gold price APIs, real-time exchange rates, and custom-built purity algorithms (10K–24K) to provide instant and accurate gold calculations. Built with a modular backend architecture and optimized frontend performance, Goldify ensures precision, scalability, and a seamless cross-device experience for professionals in the precious metals industry.',

    // Basic Info
    platform: 'Web Application (Full-Stack)',
    deviceTargets: ['Desktop', 'Tablet', 'Mobile'],
    image: '/goldify-icon.png',
    screenshots: [],
    mockupType: 'laptop',

    // Links & Status
    link: 'https://github.com/SalmanSaleem-17/Goldify',
    demoLink: 'https://goldify.pro',
    category: 'FinTech',
    status: 'Live Production',
    year: '2025',
    duration: 'Ongoing',

    // Tech Stack
    technologies: [
      'React.js', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Mongoose ODM',
      'Tailwind CSS', 'Chart.js', 'JWT Authentication', 'RESTful API Architecture',
      'External Gold Price APIs', 'Currency Exchange APIs', 'Vercel Deployment'
    ],

    // Core Features
    features: [
      { icon: '📈', title: 'Real-Time Gold Price Engine',     description: 'Live price integration with external APIs and dynamic currency adaptation' },
      { icon: '🧮', title: 'Purity Algorithm System',         description: 'Custom karat-based (10K–24K) purity factor logic with percentage-based valuation engine' },
      { icon: '⚖️', title: 'Multi-Unit Conversion',           description: 'Accurate conversion between grams, tola, and ounce using industry-standard constants' },
      { icon: '💱', title: 'Multi-Currency Support',          description: 'Integrated live exchange rates with dynamic recalculations' },
      { icon: '💍', title: 'Jewelry Pricing Calculator',      description: 'Making charges, profit margin, and final retail estimation automation' },
      { icon: '📊', title: 'Interactive Data Visualization',  description: 'Historical gold price tracking with dynamic chart rendering' },
      { icon: '🔐', title: 'Secure Authentication Layer',     description: 'JWT-based authentication with protected API routes' },
      { icon: '🚀', title: 'Performance Optimization',        description: 'Optimized API calls, state management, and responsive UI architecture' },
    ],

    // Problem & Solution
    problemStatement: 'Manual gold valuation involves multiple fragmented tools, manual purity calculations, inconsistent exchange rates, and high risk of computational errors for traders and jewelers.',
    solution: 'Goldify centralizes real-time pricing, purity logic, and advanced valuation tools into a unified platform that automates complex calculations while ensuring precision and scalability.',

    // Achievements
    achievements: [
      'Automated 90% of manual gold pricing workflows',
      'Reduced valuation errors by ~85%',
      'Integrated multi-source API data pipeline',
      'Supports 10+ gold purity levels dynamically',
      'Sub-500ms API response optimization',
      'Production deployment with scalable cloud architecture',
    ],

    // Architecture Overview
    architecture: {
      frontend:       'React SPA with modular component architecture and optimized state handling',
      backend:        'RESTful Express server with controller-service pattern',
      database:       'MongoDB Atlas with Mongoose schema modeling',
      authentication: 'JWT-based stateless authentication',
      deployment:     'Frontend deployed on Vercel, backend hosted on cloud infrastructure',
      apiIntegration: 'External gold price & currency exchange APIs with error-handling and fallback logic',
    },

    // Color Theme
    colors: {
      primary:    '#D4AF37',
      secondary:  '#1A1A1A',
      accent:     '#FFD700',
      background: '#FEFEFE',
      gradient:   'linear-gradient(135deg, #D4AF37 0%, #FFD700 100%)',
    },
  },
  {
    id: 2,
    title: 'ScaleRecipe',
    subtitle: 'Smart Recipe Scaler & Kitchen Conversion Toolkit',
    description: 'A precision-focused kitchen companion that scales any recipe with proper culinary fractions and smart unit conversions, paired with a comprehensive toolkit of cooking converters and a global recipe library.',
    longDescription: 'ScaleRecipe is a privacy-first culinary web app engineered to solve the everyday problem of resizing recipes without the awkward decimal fractions and broken unit conversions of typical scaling tools. It combines a precision recipe scaler with proper kitchen denominators (2, 3, 4, 5, 6, 8, 12, 16), seven focused kitchen converters, a searchable database of global recipes powered by TheMealDB, and a distraction-free Cook Mode with built-in timers and checkable steps — all browser-based, multilingual, and free of sign-ups or tracking.',

    // Basic Info
    platform: 'Web Application',
    deviceTargets: ['Desktop', 'Tablet', 'Mobile'],
    image: '/scale-recipe-icon.png',
    screenshots: [],
    mockupType: 'laptop',

    imageConfig: {
      shape:   'square' as const,
      bgColor: '#FEF7ED',
      padding: '14%',
    },

    // Links & Status
    link:     'https://www.scale-recipe.com',
    demoLink: 'https://www.scale-recipe.com',
    category: 'Utility',
    status:   'Live Production',
    year:     '2026',
    duration: '3 months',

    // Tech Stack
    technologies: [
      'Next.js', 'React', 'TypeScript', 'Tailwind CSS',
      'TheMealDB API', 'i18n (26 languages)', 'Recipe URL Parser',
      'Client-Side Storage', 'Server-Side Rendering', 'Vercel Deployment',
    ],

    // Core Features
    features: [
      { icon: '📏', title: 'Smart Recipe Scaler',     description: 'Proper culinary fractions with denominators of 2, 3, 4, 5, 6, 8, 12, 16 and automatic unit promotion' },
      { icon: '🧪', title: 'Kitchen Converters',      description: 'Seven focused tools for volume, weight, temperature, pan size, and cooking time' },
      { icon: '🌍', title: 'Global Recipe Browser',    description: 'Searchable database of thousands of tested recipes from TheMealDB with curated guides' },
      { icon: '👨‍🍳', title: 'Cook Mode',               description: 'Distraction-free cooking interface with built-in timers and checkable step tracking' },
      { icon: '🔗', title: 'URL Recipe Import',       description: 'Paste a food-blog URL and auto-extract a fully structured recipe' },
      { icon: '⚖️', title: 'Calibrated Densities',    description: '40+ ingredient density profiles for accurate volume-to-weight conversions' },
      { icon: '🌐', title: '26-Language Localization', description: 'Full multilingual support for cooks across the world' },
      { icon: '🔒', title: 'Privacy-First Storage',    description: 'Zero sign-up, browser-based persistence, and no first-party analytics or tracking' },
    ],

    // Problem & Solution
    problemStatement: 'Recipes are written for fixed serving sizes, and scaling them manually leads to awkward decimal fractions, broken unit conversions, and inconsistent results. Existing tools usually demand accounts, track usage, or default to imprecise portions that no real kitchen actually measures.',
    solution: 'ScaleRecipe automates recipe scaling with proper culinary fractions and calibrated ingredient densities, paired with focused kitchen converters, a global recipe library, and a distraction-free cook mode — all delivered in-browser with zero tracking and no sign-up.',

    // Achievements
    achievements: [
      'Kitchen-grade fraction system using real denominators home cooks measure with',
      '40+ calibrated ingredient density profiles for accurate weight conversions',
      'Full 26-language localization out of the box',
      'Seven specialized kitchen converters bundled into one toolkit',
      'Real-time URL recipe extraction from external food blogs',
      'Zero-trust privacy model — no sign-up, no first-party analytics',
    ],

    // Architecture Overview
    architecture: {
      frontend:       'Next.js with TypeScript, server-rendered pages, and optimized image pipeline',
      backend:        'Edge-friendly Next.js route handlers for recipe parsing and conversion services',
      database:       'Browser-side storage (localStorage / IndexedDB) — no server-side user data',
      authentication: 'No accounts required — fully anonymous browser sessions',
      deployment:     'Vercel edge deployment with global CDN distribution',
      apiIntegration: 'TheMealDB recipe API + custom URL extraction parser for external food blogs',
    },

    // Color Theme — warm kitchen palette
    colors: {
      primary:    '#EA580C',
      secondary:  '#1E293B',
      accent:     '#F59E0B',
      background: '#FEF7ED',
      gradient:   'linear-gradient(135deg, #EA580C 0%, #F59E0B 100%)',
    },
  },
  {
    id: 3,
    title: 'Smart Unit Converters',
    subtitle: 'All-in-One Smart Calculator Hub with 159+ Free Tools',
    description: 'A privacy-first calculator and conversion hub bundling 159+ free tools across finance, health, precious metals, construction, Islamic calculations, math, and date/time — all running entirely in-browser with zero tracking.',
    longDescription: 'Smart Unit Converters is a comprehensive browser-based calculator platform engineered to replace the dozens of single-purpose calculator websites users typically juggle. It consolidates 159+ specialized tools across 10 categories — Islamic financial calculators (Zakat, Mahr, inheritance), full financial planning (loans, EMI, currency), live precious-metals pricing, health & fitness trackers (BMI, TDEE, body fat), 19+ unit conversion categories, construction estimators, date/time utilities, math tools, and everyday helpers — all running locally without sign-ups, ads, or surveillance trackers.',

    // Basic Info
    platform: 'Web Application',
    deviceTargets: ['Desktop', 'Tablet', 'Mobile'],
    image: '/smart-unit-converters-icon.png',
    screenshots: [],
    mockupType: 'laptop',

    imageConfig: {
      shape:   'square' as const,
      bgColor: '#F0F9FF',
      padding: '14%',
    },

    // Links & Status
    link:     'https://www.smart-unit-converters.com',
    demoLink: 'https://www.smart-unit-converters.com',
    category: 'Productivity',
    status:   'Live Production',
    year:     '2026',
    duration: '4 months',

    // Tech Stack
    technologies: [
      'Next.js', 'React', 'TypeScript', 'Tailwind CSS',
      'Live Metal Price APIs', 'Currency Exchange APIs', 'Client-Side Computation',
      'Modular Calculator Engines', 'Server-Side Rendering', 'Vercel Deployment',
    ],

    // Core Features
    features: [
      { icon: '💰', title: 'Financial Suite',          description: '14 calculators for loan/EMI planning, currency conversion, and full amortization schedules' },
      { icon: '🕌', title: 'Islamic Calculators',      description: '9 specialized tools including Zakat, Mahr, and inheritance distribution per Sharia rules' },
      { icon: '🥇', title: 'Live Precious Metals',      description: '8 gold & silver tools with live rates refreshed every 15 minutes' },
      { icon: '🏋️', title: 'Health & Fitness',          description: '25 trackers including BMI, TDEE, body fat percentage, and macro planners' },
      { icon: '📐', title: 'Universal Unit Converter', description: '19+ measurement categories with instant cross-unit conversions' },
      { icon: '🏗️', title: 'Construction Estimators',  description: '22 estimators for tile, paint, concrete, brick, and material costing' },
      { icon: '📅', title: 'Date & Time Tools',        description: '9 utilities for age calculation, time-zone conversion, and scheduling' },
      { icon: '🔒', title: 'Privacy-First Architecture', description: 'Zero tracking, fully in-browser processing, no sign-up, no ads, no paywalls' },
    ],

    // Problem & Solution
    problemStatement: 'Quick calculations are scattered across dozens of single-purpose websites — each plagued with ads, account walls, or surveillance trackers. Users wanting reliable converters for finance, health, construction, or religious calculations either juggle multiple tabs or pay for bundled apps.',
    solution: 'Smart Unit Converters consolidates 159+ specialized tools into a single browser-based hub spanning 10 categories — from Zakat distribution and EMI planning to BMI tracking and concrete estimation — all running entirely client-side with live precious-metals data and zero user tracking.',

    // Achievements
    achievements: [
      '159+ free calculators consolidated into one platform',
      '10 specialized categories spanning finance, health, religion, construction, and more',
      'Live gold & silver rates with 15-minute refresh cadence',
      'Zero-tracking architecture with fully in-browser computation',
      '19+ unit-conversion categories built into the core toolkit',
      'No sign-up, no ads, no subscription paywalls — fully free',
    ],

    // Architecture Overview
    architecture: {
      frontend:       'Next.js with TypeScript and a modular category-based calculator architecture',
      backend:        'Edge-rendered API routes for live precious-metals feeds and currency rates',
      database:       'Browser-side localStorage for user preferences — no server-side user data',
      authentication: 'No accounts required — fully anonymous, privacy-first sessions',
      deployment:     'Vercel edge deployment with global CDN distribution',
      apiIntegration: 'Live gold/silver price feeds + currency exchange APIs with scheduled refresh',
    },

    // Color Theme — clean tech blue/cyan palette
    colors: {
      primary:    '#0EA5E9',
      secondary:  '#0F172A',
      accent:     '#06B6D4',
      background: '#F0F9FF',
      gradient:   'linear-gradient(135deg, #0EA5E9 0%, #06B6D4 100%)',
    },
  },
  {
    id: 4,
    title: 'Jewel Heaven',
    subtitle: 'Premium E-commerce Jewelry Platform',
    description: 'A comprehensive digital marketplace revolutionizing the jewelry shopping experience with real-time consultations, custom design capabilities, and seamless user experience.',
    longDescription: 'Jewel Heaven transforms traditional jewelry shopping by providing a digital platform where customers can browse vast collections, place orders, and engage in real-time consultations with jewelers. The platform addresses inefficiencies in traditional jewelry shopping by offering intuitive browsing, customization options, and direct communication with craftsmen.',

    // Basic Info
    platform: 'Web Application',
    deviceTargets: ['Desktop', 'Tablet', 'Mobile'],
    image: '/heroImage.jpg',
    screenshots: [],
    mockupType: 'laptop',

    imageConfig: {
      shape:   'square' as const,
      bgColor: '#1A1A1A',
      padding: '14%',
    },

    // Links & Status
    link:     'https://github.com/SalmanSaleem-17/Jewel-Heaven',
    demoLink: 'https://jewel-heaven-demo.vercel.app',
    category: 'E-commerce',
    status:   'Completed',
    year:     '2024',
    duration: '6 months',

    // Tech Stack
    technologies: [
      'React.js', 'Node.js', 'Express.js', 'MongoDB', 'Socket.io',
      'Stripe API', 'JWT Authentication', 'Cloudinary', 'Redux Toolkit', 'Material-UI',
    ],

    // Core Features
    features: [
      { icon: '👤', title: 'User Authentication',  description: 'Secure sign-up, login, email verification, and password reset functionality' },
      { icon: '💎', title: 'Jewelry Catalog',       description: 'Extensive collection of gold jewelry with detailed design books and specifications' },
      { icon: '🔍', title: 'Advanced Search',       description: 'Intelligent search and filtering system for finding perfect jewelry pieces' },
      { icon: '📅', title: 'Appointment System',    description: 'Schedule consultations with jewelers and manage appointments seamlessly' },
      { icon: '💬', title: 'Real-time Chat',        description: 'Live communication with jewelers for custom design discussions' },
      { icon: '🎨', title: 'Custom Design',         description: 'Submit and collaborate on custom jewelry designs with expert craftsmen' },
      { icon: '🛒', title: 'Secure Checkout',       description: 'Safe and secure payment processing with multiple payment options' },
      { icon: '📦', title: 'Order Management',      description: 'Track orders, update details, and manage shipping preferences' },
      { icon: '⭐', title: 'Review System',         description: 'Customer feedback and rating system for quality assurance' },
      { icon: '🔔', title: 'Smart Notifications',   description: 'Real-time updates on orders, appointments, and messages' },
    ],

    // Problem & Solution
    problemStatement: 'Traditional jewelry shopping involves inefficiencies like visiting physical stores, waiting periods, and limited access to diverse designs. Customers struggle with customization options and effective communication with jewelers about specific needs.',
    solution: 'Jewel Heaven provides a comprehensive digital platform that eliminates traditional shopping barriers by offering online browsing, real-time consultations, custom design capabilities, and seamless order management.',

    // Achievements
    achievements: [
      'Streamlined jewelry shopping experience',
      'Reduced customer wait times by 80%',
      'Increased jeweler-customer interaction efficiency',
      'Enhanced customization capabilities',
      'Improved order tracking and management',
    ],

    // Color Theme
    colors: {
      primary:    '#D4AF37',
      secondary:  '#1A1A1A',
      accent:     '#FFE55C',
      background: '#FEFEFE',
      gradient:   'linear-gradient(135deg, #D4AF37 0%, #FFE55C 100%)',
    },
  },
];

export default projects;
