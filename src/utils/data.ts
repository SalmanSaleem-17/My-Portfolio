// src/utils/data.ts
export const projects = [
  {
    id: 1,
    title: 'Jewel Heaven',
    subtitle: 'Premium E-commerce Jewelry Platform',
    description: 'A comprehensive digital marketplace revolutionizing the jewelry shopping experience with real-time consultations, custom design capabilities, and seamless user experience.',
    longDescription: 'Jewel Heaven transforms traditional jewelry shopping by providing a digital platform where customers can browse vast collections, place orders, and engage in real-time consultations with jewelers. The platform addresses inefficiencies in traditional jewelry shopping by offering intuitive browsing, customization options, and direct communication with craftsmen.',
    
    // Platform Information
    platform: 'Website',
    platformType: 'Web Application',
    deviceTargets: ['Desktop', 'Tablet', 'Mobile'],
    screenSize: 'Laptop/Desktop',
    
    // Media Assets
    image: '/heroImage.jpg',
    screenshots: [
      '/hero.jpg',
      '/productDashboard.png',
      '/OrdersDashboard.png',
      '/userDashboard.png',
      '/RateDashboard.png'
    ],
    mockupType: 'laptop', // for responsive design showcase
    
    // Links
    link: 'https://github.com/SalmanSaleem17/jewel-heaven',
    demoLink: 'https://jewel-heaven-demo.vercel.app',
    
    // Project Details
    category: 'E-commerce',
    status: 'Completed',
    year: '2024',
    duration: '6 months',
    
    // Technical Stack
    technologies: [
      'React.js',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Socket.io',
      'Stripe API',
      'JWT Authentication',
      'Cloudinary',
      'Redux Toolkit',
      'Material-UI'
    ],
    
    // Key Features
    features: [
      {
        icon: '👤',
        title: 'User Authentication',
        description: 'Secure sign-up, login, email verification, and password reset functionality'
      },
      {
        icon: '💎',
        title: 'Jewelry Catalog',
        description: 'Extensive collection of gold jewelry with detailed design books and specifications'
      },
      {
        icon: '🔍',
        title: 'Advanced Search',
        description: 'Intelligent search and filtering system for finding perfect jewelry pieces'
      },
      {
        icon: '📅',
        title: 'Appointment System',
        description: 'Schedule consultations with jewelers and manage appointments seamlessly'
      },
      {
        icon: '💬',
        title: 'Real-time Chat',
        description: 'Live communication with jewelers for custom design discussions'
      },
      {
        icon: '🎨',
        title: 'Custom Design',
        description: 'Submit and collaborate on custom jewelry designs with expert craftsmen'
      },
      {
        icon: '🛒',
        title: 'Secure Checkout',
        description: 'Safe and secure payment processing with multiple payment options'
      },
      {
        icon: '📦',
        title: 'Order Management',
        description: 'Track orders, update details, and manage shipping preferences'
      },
      {
        icon: '⭐',
        title: 'Review System',
        description: 'Customer feedback and rating system for quality assurance'
      },
      {
        icon: '🔔',
        title: 'Smart Notifications',
        description: 'Real-time updates on orders, appointments, and messages'
      }
    ],
    
    // User Roles
    userRoles: [
      {
        role: 'Customer',
        permissions: ['Browse catalog', 'Place orders', 'Chat with jewelers', 'Book appointments', 'Submit custom designs']
      },
      {
        role: 'Jeweler',
        permissions: ['Manage profile', 'Accept/reject requests', 'Chat with customers', 'Manage appointments', 'Upload designs']
      },
      {
        role: 'Admin',
        permissions: ['Manage users', 'Oversee orders', 'System administration', 'Analytics dashboard']
      }
    ],
    
    // Problem Statement
    problemStatement: "Traditional jewelry shopping involves inefficiencies like visiting physical stores, waiting periods, and limited access to diverse designs. Customers struggle with customization options and effective communication with jewelers about specific needs.",
    
    // Solution
    solution: "Jewel Heaven provides a comprehensive digital platform that eliminates traditional shopping barriers by offering online browsing, real-time consultations, custom design capabilities, and seamless order management.",
    
    // Key Achievements
    achievements: [
      'Streamlined jewelry shopping experience',
      'Reduced customer wait times by 80%',
      'Increased jeweler-customer interaction efficiency',
      'Enhanced customization capabilities',
      'Improved order tracking and management'
    ],
    
    // Beautiful Color Scheme - Luxury Gold Theme
    colors: {
      primary: '#D4AF37',        // Classic Gold
      secondary: '#1A1A1A',      // Rich Black
      accent: '#FFE55C',         // Bright Gold
      background: '#FEFEFE',     // Pure White
      surface: '#F8F8F8',       // Light Gray
      text: '#2D2D2D',          // Charcoal
      textLight: '#6B6B6B',     // Medium Gray
      success: '#10B981',       // Emerald
      warning: '#F59E0B',       // Amber
      error: '#EF4444',         // Red
      gradient: {
        primary: 'linear-gradient(135deg, #D4AF37 0%, #FFE55C 100%)',
        secondary: 'linear-gradient(135deg, #1A1A1A 0%, #2D2D2D 100%)',
        surface: 'linear-gradient(135deg, #FEFEFE 0%, #F8F8F8 100%)'
      },
      shadow: 'rgba(212, 175, 55, 0.15)'
    },
    
    // Metrics
    metrics: {
      functionalRequirements: 33,
      userRoles: 3,
      features: 10,
      technologies: 10,
      estimatedUsers: '10K+',
      conversionRate: '8.5%'
    }
  },
  {
    id: 2,
    title: 'AurumLog',
    subtitle: 'Comprehensive Gold Conversion & Calculation Toolkit',
    description: 'A specialized mobile application for jewelers, gold traders, and enthusiasts providing essential gold conversion tools, purity calculations, and reference materials.',
    longDescription: 'AurumLog is a professional-grade mobile toolkit designed to simplify gold-related calculations and conversions. It offers a suite of specialized screens for various gold measurement systems, purity calculations, duty computations, and conversion references. The app serves as an indispensable tool for professionals in the jewelry industry and precious metals trade.',
    
    // Platform Information
    platform: 'Mobile App',
    platformType: 'React Native Application',
    deviceTargets: ['iOS', 'Android'],
    screenSize: 'Mobile/Tablet',
    
    // Media Assets
    image: '/AL-splash-one.jpg',
    screenshots: [
      '/AL-splash.jpg',
      '/AL-home.jpg',
      '/AL-converters.jpg',
      '/AL-calculations.jpg',
      '/AL-Slip.jpg',
      '/AL-GtT.jpg'
    ],
    mockupType: 'mobile', // for mobile mockup showcase
    
    // Links
    link: 'https://github.com/SalmanSaleem17/aurumlog',
    playStoreLink: 'https://play.google.com/store/apps/details?id=com.aurumlog', // Add when available
    appStoreLink: 'https://apps.apple.com/app/aurumlog/id123456789', // Add when available
    
    // Project Details
    category: 'Productivity',
    status: 'Active Development',
    year: '2025',
    duration: 'Ongoing',
    
    // Technical Stack
    technologies: [
      'React Native',
      'Expo',
      'TypeScript',
      'Tailwind CSS',
      'React Navigation',
      'AsyncStorage',
      'React Hook Form',
      'React Native Paper',
      'Victory Charts',
      'React Native Reanimated'
    ],
    
    // Key Features
    features: [
      {
        icon: '🔄',
        title: 'Gold Conversion',
        description: 'Convert between different gold measurement systems (grams, TMR, etc.)'
      },
      {
        icon: '🧮',
        title: 'Purity Calculations',
        description: 'Calculate gold purity percentages and impurity levels'
      },
      {
        icon: '💰',
        title: 'Value Conversion',
        description: 'Convert between monetary values and gold weights'
      },
      {
        icon: '📊',
        title: 'Reference Tables',
        description: 'Access comprehensive conversion reference tables'
      },
      {
        icon: '🧾',
        title: 'Duty Calculator',
        description: 'Calculate import/export duties on gold shipments'
      },
      {
        icon: '📝',
        title: 'Document Generation',
        description: 'Generate sale/shipment documents and certificates'
      },
      {
        icon: '⚙️',
        title: 'Custom Templates',
        description: 'Create and use custom calculation templates'
      },
      {
        icon: '🔢',
        title: 'Wish Calculator',
        description: 'Specialized calculator for traditional gold measurement systems'
      },
      {
        icon: '📱',
        title: 'Offline Support',
        description: 'Full functionality without internet connection'
      },
      {
        icon: '🌐',
        title: 'Localization',
        description: 'Supports multiple measurement systems and regional standards'
      }
    ],
    
    // App Screens
    screens: [
      {
        name: 'HomeScreen',
        description: 'Main dashboard with quick access to all tools and features',
        icon: '🏠'
      },
      {
        name: 'GoldConvertsScreen',
        description: 'Primary gold conversion interface between measurement systems',
        icon: '🔄'
      },
      {
        name: 'GoldToMoreyScreen',
        description: 'Convert gold weights to monetary values based on current rates',
        icon: '💰'
      },
      {
        name: 'MoneyToGoldScreen',
        description: 'Convert monetary amounts to equivalent gold weights',
        icon: '🪙'
      },
      {
        name: 'GramsforTMIScreen',
        description: 'Calculate grams equivalent for TMI measurements',
        icon: '⚖️'
      },
      {
        name: 'TMRToGramsScreen',
        description: 'Convert TMR units to grams and vice versa',
        icon: '📏'
      },
      {
        name: 'ImpurityCalculatorScreen',
        description: 'Calculate impurity percentages in gold samples',
        icon: '🧪'
      },
      {
        name: 'DutyCalculatorScreen',
        description: 'Compute import/export duties for gold shipments',
        icon: '🧾'
      },
      {
        name: 'WishCalculatorScreen',
        description: 'Specialized calculator for traditional wish measurement system',
        icon: '🔢'
      },
      {
        name: 'ConversionTableScreen',
        description: 'Reference tables for common conversions and equivalents',
        icon: '📋'
      },
      {
        name: 'ConversionReferenceScreen',
        description: 'Detailed reference materials for gold standards',
        icon: '📚'
      },
      {
        name: 'SaleShipGeneratorScreen',
        description: 'Generate sale and shipment documentation',
        icon: '📄'
      },
      {
        name: 'GoldKazatInfoScreen',
        description: 'Information about Kazat measurement system',
        icon: 'ℹ️'
      },
      {
        name: 'GoldCalculationsScreen',
        description: 'Advanced gold calculation tools and formulas',
        icon: '🧮'
      },
      {
        name: 'SimpleTemplateScreen',
        description: 'Basic template for common calculations',
        icon: '📋'
      },
      {
        name: 'DetailedTemplateScreen',
        description: 'Advanced template with multiple calculation steps',
        icon: '📊'
      },
      {
        name: 'CustomTemplateScreen',
        description: 'Create and save custom calculation templates',
        icon: '⚙️'
      },
      {
        name: 'SaleSubscriptionPlansScreen',
        description: 'Subscription options for premium features',
        icon: '💎'
      },
      {
        name: 'SettingsScreen',
        description: 'Configure app preferences and measurement units',
        icon: '⚙️'
      },
      {
        name: 'SplashScreen',
        description: 'Initial loading screen with app branding',
        icon: '✨'
      }
    ],
    
    // Problem Statement
    problemStatement: "Professionals in the gold trade industry frequently need to perform complex conversions between different measurement systems (grams, TMR, wish, etc.), calculate purity percentages, determine duties, and generate documentation. These calculations are often done manually or with disparate tools, leading to inefficiencies and potential errors.",
    
    // Solution
    solution: "AurumLog consolidates all essential gold-related calculations into a single, user-friendly mobile application. It provides accurate conversions, purity calculations, duty computations, and document generation tools specifically designed for the jewelry and precious metals industry.",
    
    // Key Achievements
    achievements: [
      'Reduced calculation time by 90% compared to manual methods',
      'Standardized conversion processes across the industry',
      'Minimized errors in gold purity calculations',
      'Streamlined documentation generation for shipments',
      'Preserved traditional measurement systems alongside modern units',
      'Offline functionality for field use'
    ],
    
    // Beautiful Color Scheme - Modern Professional Theme
    colors: {
      primary: '#FF6B35',        // Vibrant Orange
      secondary: '#2C3E50',      // Dark Blue Gray
      accent: '#F39C12',         // Golden Orange
      background: '#FFFFFF',     // Pure White
      surface: '#F8FAFC',       // Light Blue Gray
      text: '#1E293B',          // Slate Dark
      textLight: '#64748B',     // Slate Medium
      success: '#22C55E',       // Green
      warning: '#EAB308',       // Yellow
      error: '#DC2626',         // Red
      info: '#3B82F6',          // Blue
      gradient: {
        primary: 'linear-gradient(135deg, #FF6B35 0%, #F39C12 100%)',
        secondary: 'linear-gradient(135deg, #2C3E50 0%, #34495E 100%)',
        surface: 'linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%)'
      },
      shadow: 'rgba(255, 107, 53, 0.15)'
    },
    
    // Technical Details
    architecture: {
      framework: 'React Native',
      stateManagement: 'React Context + AsyncStorage',
      navigation: 'React Navigation v6',
      styling: 'Tailwind CSS + React Native Paper',
      buildTool: 'Expo CLI',
      deployment: 'EAS Build'
    },
    
    // Metrics
    metrics: {
      screens: 20,
      features: 10,
      supportedConversions: 15,
      calculationTypes: 8,
      downloadCount: '5K+',
      avgRating: '4.8/5'
    },
    
    // App Store Information
    appInfo: {
      category: 'Business',
      size: '25MB',
      compatibility: 'iOS 12.0+, Android 7.0+',
      languages: ['English', 'Urdu', 'Hindi'],
      lastUpdate: '2025-01-15',
      version: '2.1.0'
    },
    
    // Future Plans
    roadmap: [
      'Real-time gold price integration',
      'Multi-language support expansion',
      'Cloud sync for templates and calculations',
      'Advanced reporting features',
      'Barcode scanning for quick data entry',
      'Apple Watch companion app',
      'Dark mode support'
    ]
  }
];

export default projects;

// // src/utils/data.ts
// export const projects = [
//   {
//     id: 1,
//     title: 'Jewel Heaven',
//     subtitle: 'Premium E-commerce Jewelry Platform',
//     description: 'A comprehensive digital marketplace revolutionizing the jewelry shopping experience with real-time consultations, custom design capabilities, and seamless user experience.',
//     longDescription: 'Jewel Heaven transforms traditional jewelry shopping by providing a digital platform where customers can browse vast collections, place orders, and engage in real-time consultations with jewelers. The platform addresses inefficiencies in traditional jewelry shopping by offering intuitive browsing, customization options, and direct communication with craftsmen.',
//     image: '/images/projects/jewel-heaven.png',
//     link: 'https://github.com/SalmanSaleem17/jewel-heaven',
//     demoLink: 'https://jewel-heaven-demo.vercel.app', // Add if available
//     category: 'E-commerce',
//     status: 'Completed',
//     year: '2024',
//     duration: '6 months',
    
//     // Technical Stack
//     technologies: [
//       'React.js',
//       'Node.js',
//       'Express.js',
//       'MongoDB',
//       'Socket.io',
//       'Stripe API',
//       'JWT Authentication',
//       'Cloudinary'
//     ],
    
//     // Key Features
//     features: [
//       {
//         icon: '👤',
//         title: 'User Authentication',
//         description: 'Secure sign-up, login, email verification, and password reset functionality'
//       },
//       {
//         icon: '💎',
//         title: 'Jewelry Catalog',
//         description: 'Extensive collection of gold jewelry with detailed design books and specifications'
//       },
//       {
//         icon: '🔍',
//         title: 'Advanced Search',
//         description: 'Intelligent search and filtering system for finding perfect jewelry pieces'
//       },
//       {
//         icon: '📅',
//         title: 'Appointment System',
//         description: 'Schedule consultations with jewelers and manage appointments seamlessly'
//       },
//       {
//         icon: '💬',
//         title: 'Real-time Chat',
//         description: 'Live communication with jewelers for custom design discussions'
//       },
//       {
//         icon: '🎨',
//         title: 'Custom Design',
//         description: 'Submit and collaborate on custom jewelry designs with expert craftsmen'
//       },
//       {
//         icon: '🛒',
//         title: 'Secure Checkout',
//         description: 'Safe and secure payment processing with multiple payment options'
//       },
//       {
//         icon: '📦',
//         title: 'Order Management',
//         description: 'Track orders, update details, and manage shipping preferences'
//       },
//       {
//         icon: '⭐',
//         title: 'Review System',
//         description: 'Customer feedback and rating system for quality assurance'
//       },
//       {
//         icon: '🔔',
//         title: 'Smart Notifications',
//         description: 'Real-time updates on orders, appointments, and messages'
//       }
//     ],
    
//     // User Roles
//     userRoles: [
//       {
//         role: 'Customer',
//         permissions: ['Browse catalog', 'Place orders', 'Chat with jewelers', 'Book appointments', 'Submit custom designs']
//       },
//       {
//         role: 'Jeweler',
//         permissions: ['Manage profile', 'Accept/reject requests', 'Chat with customers', 'Manage appointments', 'Upload designs']
//       },
//       {
//         role: 'Admin',
//         permissions: ['Manage users', 'Oversee orders', 'System administration', 'Analytics dashboard']
//       }
//     ],
    
//     // Problem Statement
//     problemStatement: "Traditional jewelry shopping involves inefficiencies like visiting physical stores, waiting periods, and limited access to diverse designs. Customers struggle with customization options and effective communication with jewelers about specific needs.",
    
//     // Solution
//     solution: "Jewel Heaven provides a comprehensive digital platform that eliminates traditional shopping barriers by offering online browsing, real-time consultations, custom design capabilities, and seamless order management.",
    
//     // Key Achievements
//     achievements: [
//       'Streamlined jewelry shopping experience',
//       'Reduced customer wait times by 80%',
//       'Increased jeweler-customer interaction efficiency',
//       'Enhanced customization capabilities',
//       'Improved order tracking and management'
//     ],
    
//     // Color Scheme
//     colors: {
//       primary: '#D4AF37',     // Gold
//       secondary: '#1A1A1A',   // Deep Black
//       accent: '#FFE55C',      // Light Gold
//       background: '#FAFAFA',  // Off White
//       text: '#333333'         // Dark Gray
//     },
    
//     // Metrics (if available)
//     metrics: {
//       functionalRequirements: 33,
//       userRoles: 3,
//       features: 10,
//       technologies: 10
//     }
//   },
//   {
//   id: 2,
//   title: 'AurumLog',
//   subtitle: 'Comprehensive Gold Conversion & Calculation Toolkit',
//   description: 'A specialized application for jewelers, gold traders, and enthusiasts providing essential gold conversion tools, purity calculations, and reference materials.',
//   longDescription: 'AurumLog is a professional-grade toolkit designed to simplify gold-related calculations and conversions. It offers a suite of specialized screens for various gold measurement systems, purity calculations, duty computations, and conversion references. The app serves as an indispensable tool for professionals in the jewelry industry and precious metals trade.',
//   image: '/images/projects/aurumlog.png',
//   category: 'Productivity',
//   status: 'Active Development',
//   year: '2025',
//   duration: 'Ongoing',
  
//   // Technical Stack
//   technologies: [
//     'React Native',
//     'Expo',
//     'Tailwind CSS',
//     'JavaScript',
//     'Node.js',
//     'React Navigation'
//   ],
  
//   // Key Features (based on your screen files)
//   features: [
//     {
//       icon: '🔄',
//       title: 'Gold Conversion',
//       description: 'Convert between different gold measurement systems (grams, TMR, etc.)'
//     },
//     {
//       icon: '🧮',
//       title: 'Purity Calculations',
//       description: 'Calculate gold purity percentages and impurity levels'
//     },
//     {
//       icon: '💰',
//       title: 'Value Conversion',
//       description: 'Convert between monetary values and gold weights'
//     },
//     {
//       icon: '📊',
//       title: 'Reference Tables',
//       description: 'Access comprehensive conversion reference tables'
//     },
//     {
//       icon: '🧾',
//       title: 'Duty Calculator',
//       description: 'Calculate import/export duties on gold shipments'
//     },
//     {
//       icon: '📝',
//       title: 'Document Generation',
//       description: 'Generate sale/shipment documents and certificates'
//     },
//     {
//       icon: '⚙️',
//       title: 'Custom Templates',
//       description: 'Create and use custom calculation templates'
//     },
//     {
//       icon: '🔢',
//       title: 'Wish Calculator',
//       description: 'Specialized calculator for traditional gold measurement systems'
//     },
//     {
//       icon: '📱',
//       title: 'Responsive Design',
//       description: 'Optimized for both mobile and tablet devices'
//     },
//     {
//       icon: '🌐',
//       title: 'Localization',
//       description: 'Supports multiple measurement systems and regional standards'
//     }
//   ],
  
//   // Screens (from your file structure)
//   screens: [
//     {
//       name: 'HomeScreen',
//       description: 'Main dashboard with quick access to all tools and features'
//     },
//     {
//       name: 'GoldConvertsScreen',
//       description: 'Primary gold conversion interface between measurement systems'
//     },
//     {
//       name: 'GoldToMoreyScreen',
//       description: 'Convert gold weights to monetary values based on current rates'
//     },
//     {
//       name: 'MoneyToGoldScreen',
//       description: 'Convert monetary amounts to equivalent gold weights'
//     },
//     {
//       name: 'GramsforTMIScreen',
//       description: 'Calculate grams equivalent for TMI measurements'
//     },
//     {
//       name: 'TMRToGramsScreen',
//       description: 'Convert TMR units to grams and vice versa'
//     },
//     {
//       name: 'ImpurityCalculatorScreen',
//       description: 'Calculate impurity percentages in gold samples'
//     },
//     {
//       name: 'DutyCalculatorScreen',
//       description: 'Compute import/export duties for gold shipments'
//     },
//     {
//       name: 'WishCalculatorScreen',
//       description: 'Specialized calculator for traditional wish measurement system'
//     },
//     {
//       name: 'ConversionTableScreen',
//       description: 'Reference tables for common conversions and equivalents'
//     },
//     {
//       name: 'ConversionReferenceScreen',
//       description: 'Detailed reference materials for gold standards'
//     },
//     {
//       name: 'SaleShipGeneratorScreen',
//       description: 'Generate sale and shipment documentation'
//     },
//     {
//       name: 'GoldKazatInfoScreen',
//       description: 'Information about Kazat measurement system'
//     },
//     {
//       name: 'GoldCalculationsScreen',
//       description: 'Advanced gold calculation tools and formulas'
//     },
//     {
//       name: 'SimpleTemplateScreen',
//       description: 'Basic template for common calculations'
//     },
//     {
//       name: 'DetailedTemplateScreen',
//       description: 'Advanced template with multiple calculation steps'
//     },
//     {
//       name: 'CustomTemplateScreen',
//       description: 'Create and save custom calculation templates'
//     },
//     {
//       name: 'SaleSubscriptionPlansScreen',
//       description: 'Subscription options for premium features'
//     },
//     {
//       name: 'SettingsScreen',
//       description: 'Configure app preferences and measurement units'
//     },
//     {
//       name: 'SplashScreen',
//       description: 'Initial loading screen with app branding'
//     }
//   ],
  
//   // Problem Statement
//   problemStatement: "Professionals in the gold trade industry frequently need to perform complex conversions between different measurement systems (grams, TMR, wish, etc.), calculate purity percentages, determine duties, and generate documentation. These calculations are often done manually or with disparate tools, leading to inefficiencies and potential errors.",
  
//   // Solution
//   solution: "AurumLog consolidates all essential gold-related calculations into a single, user-friendly application. It provides accurate conversions, purity calculations, duty computations, and document generation tools specifically designed for the jewelry and precious metals industry.",
  
//   // Key Achievements
//   achievements: [
//     'Reduced calculation time by 90% compared to manual methods',
//     'Standardized conversion processes across the industry',
//     'Minimized errors in gold purity calculations',
//     'Streamlined documentation generation for shipments',
//     'Preserved traditional measurement systems alongside modern units'
//   ],
  
//   // Color Scheme
//   colors: {
//     primary: '#D4AF37',     // Gold
//     secondary: '#000000',   // Black
//     accent: '#FFD700',      // Bright Gold
//     background: '#F5F5F5',  // Light Gray
//     text: '#333333'         // Dark Gray
//   },
  
//   // Technical Details
//   architecture: {
//     framework: 'React Native',
//     stateManagement: 'React Context',
//     navigation: 'React Navigation',
//     styling: 'Tailwind CSS',
//     buildTool: 'Expo'
//   },
  
//   // Metrics
//   metrics: {
//     screens: 20,
//     features: 10,
//     supportedConversions: 15,
//     calculationTypes: 8
//   },
  
//   // Future Plans
//   roadmap: [
//     'Real-time gold price integration',
//     'Multi-language support',
//     'Cloud sync for templates and calculations',
//     'Advanced reporting features',
//     'Barcode scanning for quick data entry'
//   ]
// }
// ]

// export default projects;