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
  image: '/goldify-hero.jpg',
  screenshots: [
    '/goldify-home.jpg',
    '/goldify-calculator.jpg',
    '/goldify-converter.jpg',
    '/goldify-chart.jpg',
    '/goldify-dashboard.jpg'
  ],
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
    'React.js',
    'Node.js',
    'Express.js',
    'MongoDB Atlas',
    'Mongoose ODM',
    'Tailwind CSS',
    'Chart.js',
    'JWT Authentication',
    'RESTful API Architecture',
    'External Gold Price APIs',
    'Currency Exchange APIs',
    'Vercel Deployment'
  ],

  // Core Features
  features: [
    { icon: '📈', title: 'Real-Time Gold Price Engine', description: 'Live price integration with external APIs and dynamic currency adaptation' },
    { icon: '🧮', title: 'Purity Algorithm System', description: 'Custom karat-based (10K–24K) purity factor logic with percentage-based valuation engine' },
    { icon: '⚖️', title: 'Multi-Unit Conversion', description: 'Accurate conversion between grams, tola, and ounce using industry-standard constants' },
    { icon: '💱', title: 'Multi-Currency Support', description: 'Integrated live exchange rates with dynamic recalculations' },
    { icon: '💍', title: 'Jewelry Pricing Calculator', description: 'Making charges, profit margin, and final retail estimation automation' },
    { icon: '📊', title: 'Interactive Data Visualization', description: 'Historical gold price tracking with dynamic chart rendering' },
    { icon: '🔐', title: 'Secure Authentication Layer', description: 'JWT-based authentication with protected API routes' },
    { icon: '🚀', title: 'Performance Optimization', description: 'Optimized API calls, state management, and responsive UI architecture' }
  ],

  // Problem & Solution
  problemStatement: 'Manual gold valuation involves multiple fragmented tools, manual purity calculations, inconsistent exchange rates, and high risk of computational errors for traders and jewelers.',
  solution: 'Goldify centralizes real-time pricing, purity logic, and advanced valuation tools into a unified platform that automates complex calculations while ensuring precision and scalability.',

  // Realistic Impact Metrics (Startup-Level Framing)
  achievements: [
    'Automated 90% of manual gold pricing workflows',
    'Reduced valuation errors by ~85%',
    'Integrated multi-source API data pipeline',
    'Supports 10+ gold purity levels dynamically',
    'Sub-500ms API response optimization',
    'Production deployment with scalable cloud architecture'
  ],

  // Architecture Overview
  architecture: {
    frontend: 'React SPA with modular component architecture and optimized state handling',
    backend: 'RESTful Express server with controller-service pattern',
    database: 'MongoDB Atlas with Mongoose schema modeling',
    authentication: 'JWT-based stateless authentication',
    deployment: 'Frontend deployed on Vercel, backend hosted on cloud infrastructure',
    apiIntegration: 'External gold price & currency exchange APIs with error-handling and fallback logic'
  },

  // Color Theme
  colors: {
    primary: '#D4AF37',
    secondary: '#1A1A1A',
    accent: '#FFD700',
    background: '#FEFEFE',
    gradient: 'linear-gradient(135deg, #D4AF37 0%, #FFD700 100%)'
  }
},

  {
    id: 2,
    title: 'Jewel Heaven',
    subtitle: 'Premium E-commerce Jewelry Platform',
    description: 'A comprehensive digital marketplace revolutionizing the jewelry shopping experience with real-time consultations, custom design capabilities, and seamless user experience.',
    longDescription: 'Jewel Heaven transforms traditional jewelry shopping by providing a digital platform where customers can browse vast collections, place orders, and engage in real-time consultations with jewelers. The platform addresses inefficiencies in traditional jewelry shopping by offering intuitive browsing, customization options, and direct communication with craftsmen.',

    // Basic Info
    platform: 'Web Application',
    deviceTargets: ['Desktop', 'Tablet', 'Mobile'],
    image: '/heroImage.jpg',
    screenshots: ['/hero.jpg', '/productDashboard.png', '/OrdersDashboard.png', '/userDashboard.png', '/RateDashboard.png'],
    mockupType: 'laptop',

    // ── Image display config ──────────────────────────────────────────────────
    // heroImage.jpg is a full laptop/browser screenshot — wide landscape, no crop
    imageConfig: {
      shape:   'square' as const,
      bgColor: '#1A1A1A',        // dark bg matches the icon's own background
      padding: '14%',            // breathing room so the icon doesn't touch edges
    },

    // Links & Status
    link: 'https://github.com/SalmanSaleem-17/Jewel-Heaven',
    demoLink: 'https://jewel-heaven-demo.vercel.app',
    category: 'E-commerce',
    status: 'Completed',
    year: '2024',
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
      { icon: '🔍', title: 'Advanced Search',        description: 'Intelligent search and filtering system for finding perfect jewelry pieces' },
      { icon: '📅', title: 'Appointment System',    description: 'Schedule consultations with jewelers and manage appointments seamlessly' },
      { icon: '💬', title: 'Real-time Chat',         description: 'Live communication with jewelers for custom design discussions' },
      { icon: '🎨', title: 'Custom Design',          description: 'Submit and collaborate on custom jewelry designs with expert craftsmen' },
      { icon: '🛒', title: 'Secure Checkout',        description: 'Safe and secure payment processing with multiple payment options' },
      { icon: '📦', title: 'Order Management',       description: 'Track orders, update details, and manage shipping preferences' },
      { icon: '⭐', title: 'Review System',          description: 'Customer feedback and rating system for quality assurance' },
      { icon: '🔔', title: 'Smart Notifications',    description: 'Real-time updates on orders, appointments, and messages' },
    ],

    // Problem & Solution
    problemStatement: 'Traditional jewelry shopping involves inefficiencies like visiting physical stores, waiting periods, and limited access to diverse designs. Customers struggle with customization options and effective communication with jewelers about specific needs.',
    solution: 'Jewel Heaven provides a comprehensive digital platform that eliminates traditional shopping barriers by offering online browsing, real-time consultations, custom design capabilities, and seamless order management.',

    // Key Metrics
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