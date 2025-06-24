// src/utils/animations.ts
import { Variants } from "framer-motion";

export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

export const skillVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

// export const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.1,
//       delayChildren: 0.2
//     }
//   }
// };

// export const itemVariants = {
//   hidden: { opacity: 0, y: 30 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.6,
//       ease: [0.25, 0.46, 0.45, 0.94]
//     }
//   }
// };

// export const skillVariants = {
//   hidden: { opacity: 0, scale: 0.8 },
//   visible: (i: number) => ({
//     opacity: 1,
//     scale: 1,
//     transition: {
//       delay: i * 0.1,
//       duration: 0.5,
//       ease: "easeOut"
//     }
//   }),
//   hover: {
//     scale: 1.05,
//     y: -5,
//     boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
//     transition: {
//       duration: 0.2
//     }
//   }
// };
