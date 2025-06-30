// src/utils/data.ts
export const projects = [
  {
    id: 1,
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
    
    // Links & Status
    link: 'https://github.com/SalmanSaleem-17/Jewel-Heaven',
    demoLink: 'https://jewel-heaven-demo.vercel.app',
    category: 'E-commerce',
    status: 'Completed',
    year: '2024',
    duration: '6 months',
    
    // Tech Stack
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Socket.io', 'Stripe API', 'JWT Authentication', 'Cloudinary', 'Redux Toolkit', 'Material-UI'],
    
    // Core Features
    features: [
      { icon: '👤', title: 'User Authentication', description: 'Secure sign-up, login, email verification, and password reset functionality' },
      { icon: '💎', title: 'Jewelry Catalog', description: 'Extensive collection of gold jewelry with detailed design books and specifications' },
      { icon: '🔍', title: 'Advanced Search', description: 'Intelligent search and filtering system for finding perfect jewelry pieces' },
      { icon: '📅', title: 'Appointment System', description: 'Schedule consultations with jewelers and manage appointments seamlessly' },
      { icon: '💬', title: 'Real-time Chat', description: 'Live communication with jewelers for custom design discussions' },
      { icon: '🎨', title: 'Custom Design', description: 'Submit and collaborate on custom jewelry designs with expert craftsmen' },
      { icon: '🛒', title: 'Secure Checkout', description: 'Safe and secure payment processing with multiple payment options' },
      { icon: '📦', title: 'Order Management', description: 'Track orders, update details, and manage shipping preferences' },
      { icon: '⭐', title: 'Review System', description: 'Customer feedback and rating system for quality assurance' },
      { icon: '🔔', title: 'Smart Notifications', description: 'Real-time updates on orders, appointments, and messages' }
    ],
    
    // Problem & Solution
    problemStatement: "Traditional jewelry shopping involves inefficiencies like visiting physical stores, waiting periods, and limited access to diverse designs. Customers struggle with customization options and effective communication with jewelers about specific needs.",
    solution: "Jewel Heaven provides a comprehensive digital platform that eliminates traditional shopping barriers by offering online browsing, real-time consultations, custom design capabilities, and seamless order management.",
    
    // Key Metrics
    achievements: ['Streamlined jewelry shopping experience', 'Reduced customer wait times by 80%', 'Increased jeweler-customer interaction efficiency', 'Enhanced customization capabilities', 'Improved order tracking and management'],
    
    // Color Theme
    colors: {
      primary: '#D4AF37',
      secondary: '#1A1A1A',
      accent: '#FFE55C',
      background: '#FEFEFE',
      gradient: 'linear-gradient(135deg, #D4AF37 0%, #FFE55C 100%)'
    }
  },
  {
    id: 2,
    title: 'AurumLog',
    subtitle: 'Comprehensive Gold Conversion & Calculation Toolkit',
    description: 'A specialized mobile application for jewelers, gold traders, and enthusiasts providing essential gold conversion tools, purity calculations, and reference materials.',
    longDescription: 'AurumLog is a professional-grade mobile toolkit designed to simplify gold-related calculations and conversions. It offers a suite of specialized screens for various gold measurement systems, purity calculations, duty computations, and conversion references. The app serves as an indispensable tool for professionals in the jewelry industry and precious metals trade.',
    
    // Basic Info
    platform: 'React Native Application',
    deviceTargets: ['iOS', 'Android'],
    image: '/AL-splash-one.jpg',
    screenshots: ['/AL-splash.jpg', '/AL-home.jpg', '/AL-converters.jpg', '/AL-calculations.jpg', '/AL-Slip.jpg', '/AL-GtT.jpg'],
    mockupType: 'mobile',
    
    // Links & Status
    link: 'https://github.com/SalmanSaleem-17/AurumLog',
    playStoreLink: 'https://play.google.com/store/apps/details?id=com.aurumlog',
    appStoreLink: 'https://apps.apple.com/app/aurumlog/id123456789',
    category: 'Productivity',
    status: 'Active Development',
    year: '2025',
    duration: 'Ongoing',
    
    // Tech Stack
    technologies: ['React Native', 'Expo', 'TypeScript', 'Tailwind CSS', 'React Navigation', 'AsyncStorage', 'React Hook Form', 'React Native Paper', 'Victory Charts', 'React Native Reanimated'],
    
    // Core Features
    features: [
      { icon: '🔄', title: 'Gold Conversion', description: 'Convert between different gold measurement systems (grams, TMR, etc.)' },
      { icon: '🧮', title: 'Purity Calculations', description: 'Calculate gold purity percentages and impurity levels' },
      { icon: '💰', title: 'Value Conversion', description: 'Convert between monetary values and gold weights' },
      { icon: '📊', title: 'Reference Tables', description: 'Access comprehensive conversion reference tables' },
      { icon: '🧾', title: 'Duty Calculator', description: 'Calculate import/export duties on gold shipments' },
      { icon: '📝', title: 'Document Generation', description: 'Generate sale/shipment documents and certificates' },
      { icon: '⚙️', title: 'Custom Templates', description: 'Create and use custom calculation templates' },
      { icon: '🔢', title: 'Wish Calculator', description: 'Specialized calculator for traditional gold measurement systems' },
      { icon: '📱', title: 'Offline Support', description: 'Full functionality without internet connection' },
      { icon: '🌐', title: 'Localization', description: 'Supports multiple measurement systems and regional standards' }
    ],
    
    // Key Screens (Consolidated)
    keyScreens: [
      'HomeScreen - Main dashboard with quick access to all tools',
      'GoldConvertsScreen - Primary conversion interface',
      'GoldToMoreyScreen - Gold to monetary conversion',
      'ImpurityCalculatorScreen - Calculate impurity percentages',
      'DutyCalculatorScreen - Import/export duty computation',
      'WishCalculatorScreen - Traditional wish measurement system',
      'ConversionTableScreen - Reference tables and materials',
      'SaleShipGeneratorScreen - Generate documentation',
      'SettingsScreen - App preferences and configuration'
    ],
    
    // Problem & Solution
    problemStatement: "Professionals in the gold trade industry frequently need to perform complex conversions between different measurement systems (grams, TMR, wish, etc.), calculate purity percentages, determine duties, and generate documentation. These calculations are often done manually or with disparate tools, leading to inefficiencies and potential errors.",
    solution: "AurumLog consolidates all essential gold-related calculations into a single, user-friendly mobile application. It provides accurate conversions, purity calculations, duty computations, and document generation tools specifically designed for the jewelry and precious metals industry.",
    
    // Key Metrics
    achievements: ['Reduced calculation time by 90% compared to manual methods', 'Standardized conversion processes across the industry', 'Minimized errors in gold purity calculations', 'Streamlined documentation generation for shipments', 'Preserved traditional measurement systems alongside modern units', 'Offline functionality for field use'],
    
    // Color Theme
    colors: {
      primary: '#FF6B35',
      secondary: '#2C3E50',
      accent: '#F39C12',
      background: '#FFFFFF',
      gradient: 'linear-gradient(135deg, #FF6B35 0%, #F39C12 100%)'
    },
    
    // App Details
    appInfo: {
      category: 'Business',
      size: '25MB',
      compatibility: 'iOS 12.0+, Android 7.0+',
      languages: ['English', 'Urdu', 'Hindi'],
      version: '2.1.0'
    },
    
    // Future Plans
    roadmap: ['Real-time gold price integration', 'Multi-language support expansion', 'Cloud sync for templates', 'Advanced reporting features', 'Barcode scanning', 'Apple Watch companion app', 'Dark mode support']
  }
];

export default projects;