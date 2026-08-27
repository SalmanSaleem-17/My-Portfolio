// src/utils/data.ts
export const projects = [
  {
    id: 1,
    title: 'Goldify Pro',
    subtitle: 'Production-Grade FinTech Platform for Real-Time Gold Pricing & Advanced Valuation',
    description: 'A scalable full-stack FinTech platform delivering real-time gold pricing, multi-karat valuation logic, unit & currency conversions, and interactive analytics for jewelers, traders, and investors.',
    longDescription: 'Goldify Pro is a production-ready full-stack FinTech application engineered to solve complex gold valuation workflows. The platform integrates third-party gold price APIs, real-time exchange rates, and custom-built purity algorithms (10K–24K) to provide instant and accurate gold calculations. Built with a modular backend architecture and optimized frontend performance, Goldify Pro ensures precision, scalability, and a seamless cross-device experience for professionals in the precious metals industry.',

    // Basic Info
    platform: 'Web Application (Full-Stack)',
    deviceTargets: ['Desktop', 'Tablet', 'Mobile'],
    image: 'https://res.cloudinary.com/dw6svuzvy/image/upload/v1782426247/goldify_pro_ulswtd.jpg',
    imageAlt: 'Goldify Pro dashboard — real-time gold pricing and multi-karat valuation FinTech platform built with React and Node.js',
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
    image: 'https://res.cloudinary.com/dw6svuzvy/image/upload/v1782426247/scaleRecipe_qzhedf.jpg',
    imageAlt: 'ScaleRecipe interface — smart recipe scaler and kitchen conversion toolkit with culinary fractions, built with Next.js and TypeScript',
    screenshots: [],
    mockupType: 'laptop',

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
    title: 'Premium Converters',
    subtitle: 'All-in-One Smart Calculator Hub with 159+ Free Tools',
    description: 'A privacy-first calculator and conversion hub bundling 159+ free tools across finance, health, precious metals, construction, Islamic calculations, math, and date/time — all running entirely in-browser with zero tracking.',
    longDescription: 'Premium Converters is a comprehensive browser-based calculator platform engineered to replace the dozens of single-purpose calculator websites users typically juggle. It consolidates 159+ specialized tools across 10 categories — Islamic financial calculators (Zakat, Mahr, inheritance), full financial planning (loans, EMI, currency), live precious-metals pricing, health & fitness trackers (BMI, TDEE, body fat), 19+ unit conversion categories, construction estimators, date/time utilities, math tools, and everyday helpers — all running locally without sign-ups, ads, or surveillance trackers.',

    // Basic Info
    platform: 'Web Application',
    deviceTargets: ['Desktop', 'Tablet', 'Mobile'],
    image: 'https://res.cloudinary.com/dw6svuzvy/image/upload/v1782426247/premium_converters_svjshq.jpg',
    imageAlt: 'Premium Converters homepage — all-in-one calculator hub with 159+ free finance, health, and unit conversion tools',
    screenshots: [],
    mockupType: 'laptop',

    // Links & Status
    link:     'https://premiumconverters.com',
    demoLink: 'https://premiumconverters.com',
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
    solution: 'Premium Converters consolidates 159+ specialized tools into a single browser-based hub spanning 10 categories — from Zakat distribution and EMI planning to BMI tracking and concrete estimation — all running entirely client-side with live precious-metals data and zero user tracking.',

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
    id: 6,
    title: 'Goldify Android App',
    subtitle: 'Gold Rate & Converter — Live Rates, Universal Converters & Shop Records on Google Play',
    description: 'A published Android app for jewelers and gold traders: live country-aware gold rates, karat rate tables, universal any-unit-to-any-unit converters, purity and weight calculators, and a built-in shop record book — built with React Native and Expo.',
    longDescription: 'Goldify is the native Android companion to the Goldify Pro web platform, published on Google Play under developer Muhammad Salman Saleem. Built with React Native and Expo, it auto-detects the user’s country to surface local gold rates, then layers on the full professional toolkit: per-tola and per-gram karat rate tables, a universal converter that maps any unit to any other (grams, tola, masha, ratti, ounce, troy ounce, pennyweight, grain, kilogram), purity and average-rate calculators, a gold analyzer, and a shop record module for jewelry sales, gate history and gold books. Google Sign-In keeps records tied to the user, and the app ships monetized through Google AdMob with a verified app-ads.txt on this domain.',

    // Basic Info
    platform: 'Android Application (React Native)',
    deviceTargets: ['Android Phone', 'Android Tablet'],
    // TODO: swap for the real Play Store screenshot / feature graphic once uploaded.
    image: '/projects/goldify-app.svg',
    imageAlt: 'Goldify Android app — live gold rate and converter app for jewelers, published on Google Play',
    // Real in-app screens (same Cloudinary account as the rest of the site).
    // screenshots[0] also fills the phone mockup on the case-study page.
    screenshots: [
      { src: 'https://res.cloudinary.com/dw6svuzvy/image/upload/v1785765403/home_xuzcqf.jpg',
        alt: 'Goldify app home screen showing live gold rate per tola and per gram',
        caption: 'Live gold rate home screen' },
      { src: 'https://res.cloudinary.com/dw6svuzvy/image/upload/v1785765404/home_custom_rate_vrryok.jpg',
        alt: 'Goldify app home screen with a custom gold rate entered instead of the live rate',
        caption: 'Custom rate mode' },
      { src: 'https://res.cloudinary.com/dw6svuzvy/image/upload/v1785765402/converters_jqjyid.jpg',
        alt: 'Gold converters list in the Goldify app including karat purity and polish calculators',
        caption: 'Gold converters' },
      { src: 'https://res.cloudinary.com/dw6svuzvy/image/upload/v1785765399/money_to_gold_waprre.jpg',
        alt: 'Money to gold calculator converting an amount into gold weight',
        caption: 'Money to gold' },
      { src: 'https://res.cloudinary.com/dw6svuzvy/image/upload/v1785765403/gold_calculator_zkd8ih.jpg',
        alt: 'Gold weight calculator adding and subtracting tola, masha and ratti weights',
        caption: 'Gold weight calculator' },
      { src: 'https://res.cloudinary.com/dw6svuzvy/image/upload/v1785765403/quick_rates_grams_xhsioh.jpg',
        alt: 'Quick gold rate tables by gram in the Goldify app',
        caption: 'Quick rate tables' },
      { src: 'https://res.cloudinary.com/dw6svuzvy/image/upload/v1785765400/shop_record_t4xh1d.jpg',
        alt: 'Shop record dashboard showing gold jewellery store stock and balance',
        caption: 'Shop record' },
      { src: 'https://res.cloudinary.com/dw6svuzvy/image/upload/v1785765399/gold_guide_hspeio.jpg',
        alt: 'Gold guide reference screen with weight units, karat purity and glossary tabs',
        caption: 'Gold guide' },
      { src: 'https://res.cloudinary.com/dw6svuzvy/image/upload/v1785765400/blog_open_screen_zsklm7.jpg',
        alt: 'A Goldify Pro article opened inside the Android app',
        caption: 'Articles in app' },
    ],
    mockupType: 'mobile',

    // Links & Status
    link: 'https://play.google.com/store/apps/details?id=com.goldify.pro',
    playStoreLink: 'https://play.google.com/store/apps/details?id=com.goldify.pro',
    category: 'Mobile App',
    status: 'Live Production',
    year: '2026',
    duration: 'Ongoing',

    // Tech Stack
    technologies: [
      'React Native', 'Expo', 'TypeScript', 'Google Sign-In (OAuth 2.0)',
      'Google AdMob', 'RESTful API Architecture', 'Live Gold Price APIs',
      'Currency Exchange APIs', 'On-Device Storage', 'Google Play Console',
    ],

    // Core Features
    features: [
      { icon: '📍', title: 'Auto Country Detection',    description: 'Detects the user’s country on launch and loads local gold rates and currency automatically' },
      { icon: '📈', title: 'Live Gold Rates',            description: 'Real-time per-tola and per-gram pricing with a live/custom rate toggle' },
      { icon: '🔄', title: 'Universal Converter',        description: 'Any unit to any unit — grams, tola, masha, ratti, ounce, troy ounce, pennyweight, grain and kilogram' },
      { icon: '💱', title: 'Money ↔ Gold Converter',     description: 'Convert a cash amount into gold weight, or any weight into its live market value' },
      { icon: '💎', title: 'Purity & Karat Tools',       description: 'Purity calculator, rate-purity mapping and a gold analyzer across 18K–24K' },
      { icon: '📊', title: 'Quick Rate Tables',          description: 'Ready-reckoner tables from 1 gram to 11 tola across every karat, in one screen' },
      { icon: '🏪', title: 'Shop Record Book',           description: 'Jewelry store records — sales, gate history and gold book kept on-device' },
      { icon: '🔐', title: 'Google Sign-In',             description: 'OAuth 2.0 sign-in so a jeweler’s records stay tied to their account' },
    ],

    // Problem & Solution
    problemStatement: 'Jewelers and gold traders work off the phone at the counter, but the tools they need are split across websites, calculator apps and paper registers — and almost none of them handle local rates, South Asian units like tola, masha and ratti, or day-to-day shop records.',
    solution: 'Goldify puts the whole counter workflow in one Android app: country-aware live rates, a universal converter covering both metric and traditional units, karat and purity calculators, and an on-device shop record book — installable free from Google Play.',

    // Achievements
    achievements: [
      'Published to Google Play production track under developer Muhammad Salman Saleem',
      'Ships the full Goldify toolkit natively on Android via React Native and Expo',
      'Country auto-detection so local gold rates load without any setup',
      'Universal any-unit-to-any-unit converter covering metric and traditional gold units',
      'Built-in shop record module for jewelry sales, gate history and gold books',
      'AdMob monetization with a verified app-ads.txt served from salmansaleem.dev',
    ],

    // Architecture Overview
    architecture: {
      frontend:       'React Native with Expo — modular converter screens and a shared rate-engine layer',
      backend:        'REST services supplying live gold prices and currency rates to the app',
      database:       'On-device storage for shop records, saved rates and user preferences',
      authentication: 'Google Sign-In (OAuth 2.0)',
      deployment:     'Google Play Console — production track, package com.goldify.pro',
      apiIntegration: 'Live gold price and currency exchange APIs with country auto-detection and fallback handling',
    },

    // Color Theme — Android/Play green, distinct from the gold web projects
    colors: {
      primary:    '#3DDC84',
      secondary:  '#0A0A0A',
      accent:     '#0F9D58',
      background: '#F0FDF4',
      gradient:   'linear-gradient(135deg, #0F9D58 0%, #3DDC84 100%)',
    },
  },
  {
    id: 4,
    title: 'GoldPrice Converter',
    subtitle: 'Live Precious Metals Tracker & Smart Conversion Hub for 100+ Countries',
    description: 'A professional-grade precious metals platform delivering real-time gold, silver, platinum, and palladium spot prices across 100+ countries — with multi-unit conversions, interactive historical charts, investment analytics, and a built-in Zakat calculator. Free, no sign-up.',
    longDescription: 'GoldPrice Converter is a free, professional-grade web platform for real-time precious metals tracking and in-depth analysis. It provides live spot prices for gold, silver, platinum, and palladium across 100+ countries with live exchange rates, interactive candlestick charts spanning back to 1980, a powerful converter supporting 20+ weight units and all major karats (10K–24K), a backtested investment analyzer for any custom date range, and a built-in Zakat calculator. Trusted by millions of users worldwide, the platform is built with zero account requirements, no ads, and no paywalls.',

    // Basic Info
    platform: 'Web Application',
    deviceTargets: ['Desktop', 'Tablet', 'Mobile'],
    image: 'https://res.cloudinary.com/dw6svuzvy/image/upload/v1782426247/GoldPrice_Converter_zixiku.jpg',
    imageAlt: 'GoldPrice Converter dashboard — live gold, silver, platinum and palladium price tracker with interactive charts across 100+ countries',
    screenshots: [],
    mockupType: 'laptop',

    // Links & Status
    link:     'http://goldpriceconverter.com/',
    demoLink: 'http://goldpriceconverter.com/',
    category: 'FinTech',
    status:   'Live Production',
    year:     '2025',
    duration: '2 months',

    // Tech Stack
    technologies: [
      'React.js', 'Next.js', 'TypeScript', 'Tailwind CSS',
      'Chart.js', 'ExchangeRate-API', 'Live Metals Price APIs',
      'Multi-Currency Engine', 'Server-Side Rendering', 'Vercel Deployment',
    ],

    // Core Features
    features: [
      { icon: '📊', title: 'Live Metals Tracker',     description: 'Real-time spot prices for gold, silver, platinum, and palladium refreshed from global markets' },
      { icon: '🌍', title: '100+ Country Prices',      description: 'Live gold prices converted into local currencies across more than 100 countries' },
      { icon: '📈', title: 'Interactive Charts',       description: 'Candlestick and line charts with time ranges from 1D to MAX, spanning history back to 1980' },
      { icon: '⚖️', title: '20+ Unit Converter',       description: 'Convert between grams, tola, ounce, kilogram, and 20+ other weight units instantly' },
      { icon: '💎', title: 'Multi-Karat Calculator',   description: 'Support for 10K through 24K with live purity-adjusted pricing per karat' },
      { icon: '📉', title: 'Investment Analyzer',      description: 'Backtest any gold investment over a custom date range to analyze historical returns and gains' },
      { icon: '🕌', title: 'Zakat Calculator',         description: 'Built-in Islamic Zakat calculator using live nisab thresholds and current gold prices' },
      { icon: '🆓', title: 'Free & No Sign-Up',        description: 'Fully free professional toolset with no registration, no ads, and no paywalls' },
    ],

    // Problem & Solution
    problemStatement: 'Investors, traders, and jewelers need accurate real-time precious metals data across multiple countries, units, and karats — but most tools are fragmented, ad-heavy, or require paid subscriptions.',
    solution: 'GoldPrice Converter consolidates live spot prices, multi-unit conversion, historical chart analysis, investment backtesting, and Zakat calculation into a single free platform — covering 100+ countries with live exchange rates and zero barriers to access.',

    // Achievements
    achievements: [
      'Trusted by millions of users worldwide',
      'Real-time precious metals data across 100+ countries',
      'Interactive price history charts spanning back to 1980',
      '20+ weight unit conversions with full multi-karat support',
      'Investment analyzer with custom date range backtesting',
      'Zero sign-up, zero ads — fully free professional toolset',
    ],

    // Architecture Overview
    architecture: {
      frontend:       'React with Next.js for SSR and SEO-optimized metals pricing pages',
      backend:        'Next.js API routes for live metals aggregation and exchange rate normalization',
      database:       'Browser-side caching for performance — no server-side user data stored',
      authentication: 'No accounts required — fully anonymous, privacy-first sessions',
      deployment:     'Vercel edge deployment with global CDN distribution',
      apiIntegration: 'ExchangeRate-API for live multi-currency rates + metals spot price feeds',
    },

    // Color Theme — amber/gold distinct from Goldify
    colors: {
      primary:    '#FBBF24',
      secondary:  '#1C1917',
      accent:     '#F59E0B',
      background: '#FFFBEB',
      gradient:   'linear-gradient(135deg, #B45309 0%, #FBBF24 100%)',
    },
  },
  {
    id: 5,
    title: 'Jewel Heaven',
    subtitle: 'Premium E-commerce Jewelry Platform',
    description: 'A comprehensive digital marketplace revolutionizing the jewelry shopping experience with real-time consultations, custom design capabilities, and seamless user experience.',
    longDescription: 'Jewel Heaven transforms traditional jewelry shopping by providing a digital platform where customers can browse vast collections, place orders, and engage in real-time consultations with jewelers. The platform addresses inefficiencies in traditional jewelry shopping by offering intuitive browsing, customization options, and direct communication with craftsmen.',

    // Basic Info
    platform: 'Web Application',
    deviceTargets: ['Desktop', 'Tablet', 'Mobile'],
    image: 'https://res.cloudinary.com/dw6svuzvy/image/upload/v1782426248/Jewel_Heaven_x9b2jv.png',
    imageAlt: 'Jewel Heaven storefront — premium e-commerce jewelry platform with custom design and real-time consultation features',
    screenshots: [],
    mockupType: 'laptop',

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
