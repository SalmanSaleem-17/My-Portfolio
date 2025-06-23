'use client'
import { useState, useEffect, useCallback } from 'react'
import { Home, User, Code, Briefcase, Mail, Github, Linkedin, Menu, X } from 'lucide-react'

const navLinks = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'about', label: 'About', icon: User },
  { id: 'skills', label: 'Skills', icon: Code },
  { id: 'projects', label: 'Projects', icon: Briefcase },
  { id: 'contact', label: 'Contact', icon: Mail }
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [scrolled, setScrolled] = useState(false)

  // Throttled scroll handler
  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY
    setScrolled(scrollTop > 10)

    // Find the active section based on scroll position
    const sections = navLinks.map(link => link.id)
    const currentSection = sections.find(section => {
      const element = document.getElementById(section)
      if (!element) return false
      
      const rect = element.getBoundingClientRect()
      const offset = 100 // Offset for navbar height
      
      return rect.top <= offset && rect.bottom >= offset
    })

    if (currentSection && currentSection !== activeSection) {
      setActiveSection(currentSection)
    }
  }, [activeSection])

  useEffect(() => {
    let ticking = false
    
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', throttledScroll, { passive: true })
    
    // Set initial active section
    handleScroll()
    
    return () => window.removeEventListener('scroll', throttledScroll)
  }, [handleScroll])

  const handleNavClick = (id) => {
    setActiveSection(id)
    setIsOpen(false)
    
    // Find and scroll to the section
    const element = document.getElementById(id)
    if (element) {
      const navbarHeight = 80
      const elementPosition = element.offsetTop - navbarHeight
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <>
      {/* Main Navbar */}
      <nav
        className={`fixed w-full z-50 transition-all duration-500 ease-out ${
          scrolled 
            ? 'bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-lg py-3' 
            : 'bg-transparent py-4'
        }`}
        style={{
          backdropFilter: scrolled ? 'blur(12px) saturate(180%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(12px) saturate(180%)' : 'none'
        }}
      >
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center">
            
            {/* Logo */}
            <div
              className="flex items-center space-x-3 cursor-pointer group"
              onClick={() => handleNavClick('home')}
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 flex items-center justify-center shadow-md transition-all duration-300 ease-out group-hover:shadow-xl group-hover:scale-105 group-hover:rotate-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-100 to-purple-200 flex items-center justify-center text-white text-xs font-bold">
                  <img src="/projects/SS-logo.png" alt="Logo" />
                </div>
              </div>
              <h1 className="text-xl font-bold text-gray-800 transition-colors duration-300 group-hover:text-blue-600">
                Salman Saleem
              </h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <ul className="flex items-center space-x-2">
                {navLinks.map((link) => {
                  const Icon = link.icon
                  const isActive = activeSection === link.id
                  return (
                    <li key={link.id} className="relative">
                      <button
                        onClick={() => handleNavClick(link.id)}
                        className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ease-out relative overflow-hidden group ${
                          isActive
                            ? 'text-blue-600 bg-blue-50 shadow-sm'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                      >
                        {/* Hover effect background */}
                        <div className={`absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-0 transition-opacity duration-300 ${!isActive ? 'group-hover:opacity-100' : ''}`}></div>
                        
                        <Icon size={16} className={`transition-all duration-300 relative z-10 ${
                          isActive 
                            ? 'text-blue-500' 
                            : 'text-gray-500 group-hover:text-blue-500 group-hover:scale-110'
                        }`} />
                        <span className="relative z-10">{link.label}</span>
                        
                        {/* Active indicator */}
                        {isActive && (
                          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full"></div>
                        )}
                      </button>
                    </li>
                  )
                })}
              </ul>

              {/* Social Links */}
              <div className="flex items-center space-x-4 ml-6 pl-6 border-l border-gray-200">
                <a
                  href="https://github.com/salmansaleem-17"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full text-gray-600 hover:text-gray-900 transition-all duration-300 hover:bg-gray-100 hover:scale-110 hover:-translate-y-1"
                >
                  <Github size={18} />
                </a>
                <a
                  href="https://linkedin.com/in/muhammad-salman-saleem-8a9a96266"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full text-gray-600 hover:text-blue-600 transition-all duration-300 hover:bg-blue-50 hover:scale-110 hover:-translate-y-1"
                >
                  <Linkedin size={18} />
                </a>
                <button
                  onClick={() => handleNavClick('contact')}
                  className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105 hover:-translate-y-1 active:scale-95"
                >
                  <span>Hire Me</span>
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2.5 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-300 hover:scale-105"
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className="relative w-6 h-6">
                <Menu 
                  size={22} 
                  className={`absolute inset-0 transition-all duration-300 ${
                    isOpen ? 'opacity-0 rotate-90 scale-75' : 'opacity-100 rotate-0 scale-100'
                  }`}
                />
                <X 
                  size={22} 
                  className={`absolute inset-0 transition-all duration-300 ${
                    isOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-75'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
        isOpen ? 'visible' : 'invisible'
      }`}>
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsOpen(false)}
        />
        
        {/* Mobile Menu Panel */}
        <div
          className={`absolute top-0 right-0 h-full w-80 bg-white shadow-2xl transform transition-all duration-500 ease-out ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="p-6 pt-20 h-full flex flex-col">
            {/* Navigation Links */}
            <nav className="space-y-1 flex-1">
              {navLinks.map((link, index) => {
                const Icon = link.icon
                const isActive = activeSection === link.id
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`w-full flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 relative group ${
                      isActive
                        ? 'text-blue-600 bg-blue-50 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                    style={{ 
                      transitionDelay: isOpen ? `${index * 50}ms` : '0ms',
                      transform: isOpen ? 'translateX(0)' : 'translateX(20px)',
                      opacity: isOpen ? 1 : 0
                    }}
                  >
                    {/* Hover gradient background */}
                    <div className={`absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl opacity-0 transition-opacity duration-300 ${!isActive ? 'group-hover:opacity-100' : ''}`}></div>
                    
                    <Icon 
                      size={20} 
                      className={`transition-all duration-300 relative z-10 ${
                        isActive 
                          ? 'text-blue-500' 
                          : 'text-gray-500 group-hover:text-blue-500 group-hover:scale-110'
                      }`} 
                    />
                    <span className="font-medium relative z-10">{link.label}</span>
                    
                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute right-4 w-2 h-2 bg-blue-500 rounded-full"></div>
                    )}
                  </button>
                )
              })}
            </nav>

            {/* Mobile Social Links */}
            <div className="mt-auto pt-6 border-t border-gray-100">
              <div className="flex items-center justify-center space-x-6 mb-6">
                <a
                  href="https://github.com/salmansaleem-17"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full text-gray-600 hover:text-gray-900 transition-all duration-300 hover:bg-gray-100 hover:scale-110"
                >
                  <Github size={22} />
                </a>
                <a
                  href="https://linkedin.com/in/muhammad-salman-saleem-8a9a96266"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full text-gray-600 hover:text-blue-600 transition-all duration-300 hover:bg-blue-50 hover:scale-110"
                >
                  <Linkedin size={22} />
                </a>
              </div>
              <button
                onClick={() => handleNavClick('contact')}
                className="w-full flex items-center justify-center px-6 py-3.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105 active:scale-95"
              >
                Hire Me
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// 'use client'
// import { useState, useEffect } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import { Home, User, Code, Briefcase, Mail, Github, Linkedin, Menu, X } from 'lucide-react'
// import Image from 'next/image'

// const navLinks = [
//   { id: 'home', label: 'Home', icon: Home },
//   { id: 'about', label: 'About', icon: User },
//   { id: 'skills', label: 'Skills', icon: Code },
//   { id: 'projects', label: 'Projects', icon: Briefcase },
//   { id: 'contact', label: 'Contact', icon: Mail }
// ]

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false)
//   const [activeSection, setActiveSection] = useState('home')
//   const [scrolled, setScrolled] = useState(false)

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 10)
//     }
//     window.addEventListener('scroll', handleScroll)
//     return () => window.removeEventListener('scroll', handleScroll)
//   }, [])

//   const handleNavClick = (id: string) => {
//     setActiveSection(id)
//     setIsOpen(false)
//   }

//   return (
//     <>
//       {/* Main Navbar */}
//       <motion.nav
//         initial={{ y: -100 }}
//         animate={{ y: 0 }}
//         transition={{ duration: 0.5 }}
//         className={`fixed w-full z-50 transition-all duration-300 ${
//           scrolled 
//             ? 'bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm py-3' 
//             : 'bg-transparent py-4'
//         }`}
//       >
//         <div className="container mx-auto px-6">
//           <div className="flex justify-between items-center">
            
//             {/* Logo */}
//             <motion.div
//               whileHover={{ scale: 1.02 }}
//               className="flex items-center space-x-3 cursor-pointer"
//               onClick={() => handleNavClick('home')}
//             >
//               <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-100 to-blue-100 flex items-center justify-center shadow-md">
//                 <Image src="/projects/SS-logo.png" alt="Logo" width={24} height={24} />
//               </div>
//               <h1 className="text-xl font-semibold text-gray-800">Salman Saleem</h1>
//             </motion.div>

//             {/* Desktop Navigation */}
//             <div className="hidden md:flex items-center space-x-6">
//               <ul className="flex items-center space-x-1">
//                 {navLinks.map((link) => {
//                   const Icon = link.icon
//                   const isActive = activeSection === link.id
//                   return (
//                     <motion.li key={link.id} className="relative">
//                       <motion.a
//                         href={`#${link.id}`}
//                         onClick={() => handleNavClick(link.id)}
//                         className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-lg transition-colors ${
//                           isActive
//                             ? 'text-blue-600 bg-blue-50'
//                             : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
//                         }`}
//                         whileHover={{ scale: 1.03 }}
//                         whileTap={{ scale: 0.97 }}
//                       >
//                         <Icon size={16} className={isActive ? 'text-blue-500' : 'text-gray-500'} />
//                         <span className="text-sm font-medium">{link.label}</span>
//                       </motion.a>
//                     </motion.li>
//                   )
//                 })}
//               </ul>

//               {/* Social Links */}
//               <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-gray-200">
//                 <motion.a
//                   href="https://github.com/salmansaleem-17"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="p-2 rounded-full text-gray-600 hover:text-gray-900 transition-colors"
//                   whileHover={{ y: -2 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   <Github size={18} />
//                 </motion.a>
//                 <motion.a
//                   href="https://linkedin.com/in/muhammad-salman-saleem-8a9a96266"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="p-2 rounded-full text-gray-600 hover:text-gray-900 transition-colors"
//                   whileHover={{ y: -2 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   <Linkedin size={18} />
//                 </motion.a>
//                 <motion.a
//                   href="#contact"
//                   className="px-3.5 py-2 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-lg text-sm font-medium transition-all flex items-center space-x-1.5"
//                   whileHover={{ y: -2, shadow: '0 4px 12px rgba(99, 102, 241, 0.3)' }}
//                   whileTap={{ scale: 0.97 }}
//                 >
//                   <span>Hire Me</span>
//                 </motion.a>
//               </div>
//             </div>

//             {/* Mobile Menu Button */}
//             <button
//               className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
//               onClick={() => setIsOpen(!isOpen)}
//             >
//               {isOpen ? (
//                 <X size={22} />
//               ) : (
//                 <Menu size={22} />
//               )}
//             </button>
//           </div>
//         </div>
//       </motion.nav>

//       {/* Mobile Menu */}
//       <AnimatePresence>
//         {isOpen && (
//           <>
//             {/* Backdrop */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden"
//               onClick={() => setIsOpen(false)}
//             />
            
//             {/* Mobile Menu Panel */}
//             <motion.div
//               initial={{ x: '100%' }}
//               animate={{ x: 0 }}
//               exit={{ x: '100%' }}
//               transition={{ type: 'spring', stiffness: 400, damping: 30 }}
//               className="fixed top-0 right-0 z-50 h-full w-64 bg-white shadow-xl md:hidden"
//             >
//               <div className="p-6 pt-20 h-full flex flex-col">
//                 <nav className="space-y-2 flex-1">
//                   {navLinks.map((link) => {
//                     const Icon = link.icon
//                     const isActive = activeSection === link.id
//                     return (
//                       <motion.a
//                         key={link.id}
//                         href={`#${link.id}`}
//                         onClick={() => handleNavClick(link.id)}
//                         className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
//                           isActive
//                             ? 'text-blue-600 bg-blue-50'
//                             : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
//                         }`}
//                         whileHover={{ x: 2 }}
//                         whileTap={{ scale: 0.98 }}
//                       >
//                         <Icon size={18} className={isActive ? 'text-blue-500' : 'text-gray-500'} />
//                         <span className="text-sm font-medium">{link.label}</span>
//                       </motion.a>
//                     )
//                   })}
//                 </nav>

//                 {/* Mobile Social Links */}
//                 <div className="mt-auto pt-6 border-t border-gray-200">
//                   <div className="flex items-center justify-center space-x-4 mb-6">
//                     <a
//                       href="https://github.com/salmansaleem-17"
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="p-2 rounded-full text-gray-600 hover:text-gray-900 transition-colors"
//                     >
//                       <Github size={20} />
//                     </a>
//                     <a
//                       href="https://linkedin.com/in/muhammad-salman-saleem-8a9a96266"
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="p-2 rounded-full text-gray-600 hover:text-gray-900 transition-colors"
//                     >
//                       <Linkedin size={20} />
//                     </a>
//                   </div>
//                   <motion.a
//                     href="#contact"
//                     onClick={() => setIsOpen(false)}
//                     className="w-full flex items-center justify-center px-4 py-2.5 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-lg text-sm font-medium transition-all"
//                     whileHover={{ y: -1, shadow: '0 4px 12px rgba(99, 102, 241, 0.3)' }}
//                     whileTap={{ scale: 0.98 }}
//                   >
//                     Hire Me
//                   </motion.a>
//                 </div>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </>
//   )
// }