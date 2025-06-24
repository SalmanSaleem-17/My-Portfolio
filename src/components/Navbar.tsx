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

interface Section {
  id: string;
  offsetTop: number;
  rect: DOMRect;
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [scrolled, setScrolled] = useState(false)

  // Simplified and more reliable scroll handler
  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY
    setScrolled(scrollTop > 50)

    // Get all sections
    const sections: Section[] = navLinks.map(link => {
      const element = document.getElementById(link.id)
      if (!element) return null
      
      const rect = element.getBoundingClientRect()
      const offsetTop = element.offsetTop
      
      return {
        id: link.id,
        offsetTop,
        rect
      }
    }).filter((section): section is Section => section !== null)

    if (sections.length === 0) return

    // Determine active section based on scroll position
    let newActiveSection = 'home'
    
    // If we're at the very top, always show home as active
    if (scrollTop < 100) {
      newActiveSection = 'home'
    } else {
      // Find the section that's currently most visible
      const viewportHeight = window.innerHeight
      const scrollCenter = scrollTop + viewportHeight / 2

      let bestMatch: Section | null = null
      let bestScore = Infinity

      sections.forEach(section => {
        const sectionCenter = section.offsetTop + (section.rect.height || 0) / 2
        const distance = Math.abs(scrollCenter - sectionCenter)
        
        // Prefer sections that are currently in view
        const inView = section.rect.top < viewportHeight && section.rect.bottom > 0
        const score = inView ? distance : distance + 10000

        if (score < bestScore) {
          bestScore = score
          bestMatch = section
        }
      })

      if (bestMatch) {
        newActiveSection = bestMatch.id
      }
    }

    if (newActiveSection !== activeSection) {
      setActiveSection(newActiveSection)
    }
  }, [activeSection])

  useEffect(() => {
    let timeoutId: number | null = null
    
    const throttledScroll = () => {
      if (timeoutId) return
      
      timeoutId = window.setTimeout(() => {
        handleScroll()
        timeoutId = null
      }, 50) as unknown as number
    }

    window.addEventListener('scroll', throttledScroll, { passive: true })
    
    // Set initial state
    const timer = window.setTimeout(handleScroll, 100)
    
    return () => {
      window.removeEventListener('scroll', throttledScroll)
      window.clearTimeout(timer)
      if (timeoutId) window.clearTimeout(timeoutId)
    }
  }, [handleScroll])

  const handleNavClick = (id: string) => {
    setActiveSection(id)
    setIsOpen(false)
    
    const element = document.getElementById(id)
    if (element) {
      const navbarHeight = id === 'home' ? 0 : 80
      const elementPosition = element.offsetTop - navbarHeight
      
      window.scrollTo({
        top: Math.max(0, elementPosition),
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
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-100 to-purple-200 flex items-center justify-center text-blue-600 text-xs font-bold">
                  S
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
                        <div className={`absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-0 transition-opacity duration-300 ${!isActive ? 'group-hover:opacity-100' : ''}`}></div>
                        
                        <Icon size={16} className={`transition-all duration-300 relative z-10 ${
                          isActive 
                            ? 'text-blue-500' 
                            : 'text-gray-500 group-hover:text-blue-500 group-hover:scale-110'
                        }`} />
                        <span className="relative z-10">{link.label}</span>
                        
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
        <div
          className={`absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsOpen(false)}
        />
        
        <div
          className={`absolute top-0 right-0 h-full w-80 bg-white shadow-2xl transform transition-all duration-500 ease-out ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="p-6 pt-20 h-full flex flex-col">
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
                    
                    {isActive && (
                      <div className="absolute right-4 w-2 h-2 bg-blue-500 rounded-full"></div>
                    )}
                  </button>
                )
              })}
            </nav>

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
// import { useState, useEffect, useCallback } from 'react'
// import { Home, User, Code, Briefcase, Mail, Github, Linkedin, Menu, X } from 'lucide-react'

// const navLinks = [
//   { id: 'home', label: 'Home', icon: Home },
//   { id: 'about', label: 'About', icon: User },
//   { id: 'skills', label: 'Skills', icon: Code },
//   { id: 'projects', label: 'Projects', icon: Briefcase },
//   { id: 'contact', label: 'Contact', icon: Mail }
// ]

// /*************  ✨ Windsurf Command ⭐  *************/
// /**
//  * A responsive navigation bar that sticks to the top of the viewport
//  * and adapts to different screen sizes. It also handles scrolling and
//  * highlights the currently active section.
//  *
//  * @returns {JSX.Element} The navigation bar component.
//  * @constructor
//  */
// /*******  3384be5e-aa78-4151-b064-1b9518b1ed72  *******/
// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false)
//   const [activeSection, setActiveSection] = useState('home')
//   const [scrolled, setScrolled] = useState(false)

//   // Simplified and more reliable scroll handler
//   const handleScroll = useCallback(() => {
//     const scrollTop = window.scrollY
//     setScrolled(scrollTop > 50)

//     // Get all sections
//     const sections = navLinks.map(link => {
//       const element = document.getElementById(link.id)
//       if (!element) return null
      
//       const rect = element.getBoundingClientRect()
//       const offsetTop = element.offsetTop
      
//       return {
//         id: link.id,
//         offsetTop,
//         rect
//       }
//     }).filter(Boolean)

//     if (sections.length === 0) return

//     // Determine active section based on scroll position
//     let newActiveSection = 'home'
    
//     // If we're at the very top, always show home as active
//     if (scrollTop < 100) {
//       newActiveSection = 'home'
//     } else {
//       // Find the section that's currently most visible
//       const viewportHeight = window.innerHeight
//       const scrollCenter = scrollTop + viewportHeight / 2

//       let bestMatch: { id: string, offsetTop: number, rect: DOMRect } | null = null
//       let bestScore = Infinity

//       sections.forEach(section => {
//         if (!section) return
        
//         const sectionCenter = section.offsetTop + (section.rect.height || 0) / 2
//         const distance = Math.abs(scrollCenter - sectionCenter)
        
//         // Prefer sections that are currently in view
//         const inView = section.rect.top < viewportHeight && section.rect.bottom > 0
//         const score = inView ? distance : distance + 10000

//         if (score < bestScore) {
//           bestScore = score
//           bestMatch = section
//         }
//       })

//       if (bestMatch) {
//         newActiveSection = bestMatch.id
//       }
//     }

//     if (newActiveSection !== activeSection) {
//       setActiveSection(newActiveSection)
//     }
//   }, [activeSection])

//   useEffect(() => {
//     let timeoutId: number | null = null
    
//     const throttledScroll = () => {
//       if (timeoutId) return
      
//       timeoutId = window.setTimeout(() => {
//         handleScroll()
//         timeoutId = null
//       }, 50) as unknown as number
//     }

//     window.addEventListener('scroll', throttledScroll, { passive: true })
    
//     // Set initial state
//     const timer = window.setTimeout(handleScroll, 100)
    
//     return () => {
//       window.removeEventListener('scroll', throttledScroll)
//       window.clearTimeout(timer)
//       if (timeoutId) window.clearTimeout(timeoutId)
//     }
//   }, [handleScroll])

//   const handleNavClick = (id: string) => {
//     setActiveSection(id)
//     setIsOpen(false)
    
//     const element = document.getElementById(id)
//     if (element) {
//       const navbarHeight = id === 'home' ? 0 : 80
//       const elementPosition = element.offsetTop - navbarHeight
      
//       window.scrollTo({
//         top: Math.max(0, elementPosition),
//         behavior: 'smooth'
//       })
//     }
//   }

//   return (
//     <>
//       {/* Main Navbar */}
//       <nav
//         className={`fixed w-full z-50 transition-all duration-500 ease-out ${
//           scrolled 
//             ? 'bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-lg py-3' 
//             : 'bg-transparent py-4'
//         }`}
//         style={{
//           backdropFilter: scrolled ? 'blur(12px) saturate(180%)' : 'none',
//           WebkitBackdropFilter: scrolled ? 'blur(12px) saturate(180%)' : 'none'
//         }}
//       >
//         <div className="container mx-auto px-6">
//           <div className="flex justify-between items-center">
            
//             {/* Logo */}
//             <div
//               className="flex items-center space-x-3 cursor-pointer group"
//               onClick={() => handleNavClick('home')}
//             >
//               <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 flex items-center justify-center shadow-md transition-all duration-300 ease-out group-hover:shadow-xl group-hover:scale-105 group-hover:rotate-2">
//                 <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-100 to-purple-200 flex items-center justify-center text-blue-600 text-xs font-bold">
//                   S
//                 </div>
//               </div>
//               <h1 className="text-xl font-bold text-gray-800 transition-colors duration-300 group-hover:text-blue-600">
//                 Salman Saleem
//               </h1>
//             </div>

//             {/* Desktop Navigation */}
//             <div className="hidden md:flex items-center space-x-8">
//               <ul className="flex items-center space-x-2">
//                 {navLinks.map((link) => {
//                   const Icon = link.icon
//                   const isActive = activeSection === link.id
//                   return (
//                     <li key={link.id} className="relative">
//                       <button
//                         onClick={() => handleNavClick(link.id)}
//                         className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ease-out relative overflow-hidden group ${
//                           isActive
//                             ? 'text-blue-600 bg-blue-50 shadow-sm'
//                             : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
//                         }`}
//                       >
//                         <div className={`absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-0 transition-opacity duration-300 ${!isActive ? 'group-hover:opacity-100' : ''}`}></div>
                        
//                         <Icon size={16} className={`transition-all duration-300 relative z-10 ${
//                           isActive 
//                             ? 'text-blue-500' 
//                             : 'text-gray-500 group-hover:text-blue-500 group-hover:scale-110'
//                         }`} />
//                         <span className="relative z-10">{link.label}</span>
                        
//                         {isActive && (
//                           <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full"></div>
//                         )}
//                       </button>
//                     </li>
//                   )
//                 })}
//               </ul>

//               {/* Social Links */}
//               <div className="flex items-center space-x-4 ml-6 pl-6 border-l border-gray-200">
//                 <a
//                   href="https://github.com/salmansaleem-17"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="p-2.5 rounded-full text-gray-600 hover:text-gray-900 transition-all duration-300 hover:bg-gray-100 hover:scale-110 hover:-translate-y-1"
//                 >
//                   <Github size={18} />
//                 </a>
//                 <a
//                   href="https://linkedin.com/in/muhammad-salman-saleem-8a9a96266"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="p-2.5 rounded-full text-gray-600 hover:text-blue-600 transition-all duration-300 hover:bg-blue-50 hover:scale-110 hover:-translate-y-1"
//                 >
//                   <Linkedin size={18} />
//                 </a>
//                 <button
//                   onClick={() => handleNavClick('contact')}
//                   className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105 hover:-translate-y-1 active:scale-95"
//                 >
//                   <span>Hire Me</span>
//                 </button>
//               </div>
//             </div>

//             {/* Mobile Menu Button */}
//             <button
//               className="md:hidden p-2.5 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-300 hover:scale-105"
//               onClick={() => setIsOpen(!isOpen)}
//             >
//               <div className="relative w-6 h-6">
//                 <Menu 
//                   size={22} 
//                   className={`absolute inset-0 transition-all duration-300 ${
//                     isOpen ? 'opacity-0 rotate-90 scale-75' : 'opacity-100 rotate-0 scale-100'
//                   }`}
//                 />
//                 <X 
//                   size={22} 
//                   className={`absolute inset-0 transition-all duration-300 ${
//                     isOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-75'
//                   }`}
//                 />
//               </div>
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* Mobile Menu */}
//       <div className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
//         isOpen ? 'visible' : 'invisible'
//       }`}>
//         <div
//           className={`absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${
//             isOpen ? 'opacity-100' : 'opacity-0'
//           }`}
//           onClick={() => setIsOpen(false)}
//         />
        
//         <div
//           className={`absolute top-0 right-0 h-full w-80 bg-white shadow-2xl transform transition-all duration-500 ease-out ${
//             isOpen ? 'translate-x-0' : 'translate-x-full'
//           }`}
//         >
//           <div className="p-6 pt-20 h-full flex flex-col">
//             <nav className="space-y-1 flex-1">
//               {navLinks.map((link, index) => {
//                 const Icon = link.icon
//                 const isActive = activeSection === link.id
//                 return (
//                   <button
//                     key={link.id}
//                     onClick={() => handleNavClick(link.id)}
//                     className={`w-full flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 relative group ${
//                       isActive
//                         ? 'text-blue-600 bg-blue-50 shadow-sm'
//                         : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
//                     }`}
//                     style={{ 
//                       transitionDelay: isOpen ? `${index * 50}ms` : '0ms',
//                       transform: isOpen ? 'translateX(0)' : 'translateX(20px)',
//                       opacity: isOpen ? 1 : 0
//                     }}
//                   >
//                     <div className={`absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl opacity-0 transition-opacity duration-300 ${!isActive ? 'group-hover:opacity-100' : ''}`}></div>
                    
//                     <Icon 
//                       size={20} 
//                       className={`transition-all duration-300 relative z-10 ${
//                         isActive 
//                           ? 'text-blue-500' 
//                           : 'text-gray-500 group-hover:text-blue-500 group-hover:scale-110'
//                       }`} 
//                     />
//                     <span className="font-medium relative z-10">{link.label}</span>
                    
//                     {isActive && (
//                       <div className="absolute right-4 w-2 h-2 bg-blue-500 rounded-full"></div>
//                     )}
//                   </button>
//                 )
//               })}
//             </nav>

//             <div className="mt-auto pt-6 border-t border-gray-100">
//               <div className="flex items-center justify-center space-x-6 mb-6">
//                 <a
//                   href="https://github.com/salmansaleem-17"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="p-3 rounded-full text-gray-600 hover:text-gray-900 transition-all duration-300 hover:bg-gray-100 hover:scale-110"
//                 >
//                   <Github size={22} />
//                 </a>
//                 <a
//                   href="https://linkedin.com/in/muhammad-salman-saleem-8a9a96266"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="p-3 rounded-full text-gray-600 hover:text-blue-600 transition-all duration-300 hover:bg-blue-50 hover:scale-110"
//                 >
//                   <Linkedin size={22} />
//                 </a>
//               </div>
//               <button
//                 onClick={() => handleNavClick('contact')}
//                 className="w-full flex items-center justify-center px-6 py-3.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105 active:scale-95"
//               >
//                 Hire Me
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// // 'use client'
// // import { useState, useEffect, useCallback } from 'react'
// // import { Home, User, Code, Briefcase, Mail, Github, Linkedin, Menu, X } from 'lucide-react'

// // const navLinks = [
// //   { id: 'home', label: 'Home', icon: Home },
// //   { id: 'about', label: 'About', icon: User },
// //   { id: 'skills', label: 'Skills', icon: Code },
// //   { id: 'projects', label: 'Projects', icon: Briefcase },
// //   { id: 'contact', label: 'Contact', icon: Mail }
// // ]

// // export default function Navbar() {
// //   const [isOpen, setIsOpen] = useState(false)
// //   const [activeSection, setActiveSection] = useState('home')
// //   const [scrolled, setScrolled] = useState(false)

// //   // Improved scroll handler with better section detection
// //   const handleScroll = useCallback(() => {
// //     const scrollTop = window.scrollY
// //     setScrolled(scrollTop > 10)

// //     // Get all sections and their positions
// //     const sections = navLinks.map(link => {
// //       const element = document.getElementById(link.id)
// //       if (!element) return null
      
// //       const rect = element.getBoundingClientRect()
// //       const offsetTop = element.offsetTop
// //       const offsetHeight = element.offsetHeight
      
// //       return {
// //         id: link.id,
// //         offsetTop,
// //         offsetHeight,
// //         rect,
// //         // Check if section is currently visible in viewport
// //         isVisible: rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2
// //       }
// //     }).filter(Boolean)

// //     // Find the section that should be active
// //     let newActiveSection = 'home'
    
// //     if (scrollTop < 100) {
// //       // If we're at the top, home should be active
// //       newActiveSection = 'home'
// //     } else {
// //       // Find the section closest to the center of the viewport
// //       const viewportCenter = window.innerHeight / 2
// //       let closestSection = null
// //       let closestDistance = Infinity

// //       sections.forEach(section => {
// //         if (!section) return
        
// //         const sectionCenter = section.rect.top + (section.rect.height / 2)
// //         const distance = Math.abs(sectionCenter - viewportCenter)
        
// //         // Prioritize sections that are actually visible
// //         if (section.rect.top <= viewportCenter && section.rect.bottom >= viewportCenter) {
// //           if (distance < closestDistance) {
// //             closestDistance = distance
// //             closestSection = section
// //           }
// //         }
// //       })

// //       // If no section is in the center, find the one that's closest to being visible
// //       if (!closestSection) {
// //         sections.forEach(section => {
// //           if (!section) return
          
// //           const distance = section.rect.top < 0 
// //             ? Math.abs(section.rect.bottom) 
// //             : Math.abs(section.rect.top - viewportCenter)
          
// //           if (distance < closestDistance) {
// //             closestDistance = distance
// //             closestSection = section
// //           }
// //         })
// //       }

// //       if (closestSection) {
// //         newActiveSection = closestSection.id
// //       }
// //     }

// //     if (newActiveSection !== activeSection) {
// //       setActiveSection(newActiveSection)
// //     }
// //   }, [activeSection])

// //   useEffect(() => {
// //     let ticking = false
    
// //     const throttledScroll = () => {
// //       if (!ticking) {
// //         requestAnimationFrame(() => {
// //           handleScroll()
// //           ticking = false
// //         })
// //         ticking = true
// //       }
// //     }

// //     // Add scroll listener
// //     window.addEventListener('scroll', throttledScroll, { passive: true })
    
// //     // Set initial active section after a brief delay to ensure DOM is ready
// //     const timer = setTimeout(() => {
// //       handleScroll()
// //     }, 100)
    
// //     return () => {
// //       window.removeEventListener('scroll', throttledScroll)
// //       clearTimeout(timer)
// //     }
// //   }, [handleScroll])

// //   const handleNavClick = (id: string) => {
// //     setActiveSection(id)
// //     setIsOpen(false)
    
// //     // Find and scroll to the section
// //     const element = document.getElementById(id)
// //     if (element) {
// //       const navbarHeight = 80
// //       const elementPosition = element.offsetTop - navbarHeight
      
// //       window.scrollTo({
// //         top: Math.max(0, elementPosition),
// //         behavior: 'smooth'
// //       })
// //     }
// //   }

// //   return (
// //     <>
// //       {/* Main Navbar */}
// //       <nav
// //         className={`fixed w-full z-50 transition-all duration-500 ease-out ${
// //           scrolled 
// //             ? 'bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-lg py-3' 
// //             : 'bg-transparent py-4'
// //         }`}
// //         style={{
// //           backdropFilter: scrolled ? 'blur(12px) saturate(180%)' : 'none',
// //           WebkitBackdropFilter: scrolled ? 'blur(12px) saturate(180%)' : 'none'
// //         }}
// //       >
// //         <div className="container mx-auto px-6">
// //           <div className="flex justify-between items-center">
            
// //             {/* Logo */}
// //             <div
// //               className="flex items-center space-x-3 cursor-pointer group"
// //               onClick={() => handleNavClick('home')}
// //             >
// //               <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 flex items-center justify-center shadow-md transition-all duration-300 ease-out group-hover:shadow-xl group-hover:scale-105 group-hover:rotate-2">
// //                 <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-100 to-purple-200 flex items-center justify-center text-white text-xs font-bold">
// //                   S
// //                 </div>
// //               </div>
// //               <h1 className="text-xl font-bold text-gray-800 transition-colors duration-300 group-hover:text-blue-600">
// //                 Salman Saleem
// //               </h1>
// //             </div>

// //             {/* Desktop Navigation */}
// //             <div className="hidden md:flex items-center space-x-8">
// //               <ul className="flex items-center space-x-2">
// //                 {navLinks.map((link) => {
// //                   const Icon = link.icon
// //                   const isActive = activeSection === link.id
// //                   return (
// //                     <li key={link.id} className="relative">
// //                       <button
// //                         onClick={() => handleNavClick(link.id)}
// //                         className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ease-out relative overflow-hidden group ${
// //                           isActive
// //                             ? 'text-blue-600 bg-blue-50 shadow-sm'
// //                             : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
// //                         }`}
// //                       >
// //                         {/* Hover effect background */}
// //                         <div className={`absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-0 transition-opacity duration-300 ${!isActive ? 'group-hover:opacity-100' : ''}`}></div>
                        
// //                         <Icon size={16} className={`transition-all duration-300 relative z-10 ${
// //                           isActive 
// //                             ? 'text-blue-500' 
// //                             : 'text-gray-500 group-hover:text-blue-500 group-hover:scale-110'
// //                         }`} />
// //                         <span className="relative z-10">{link.label}</span>
                        
// //                         {/* Active indicator */}
// //                         {isActive && (
// //                           <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full"></div>
// //                         )}
// //                       </button>
// //                     </li>
// //                   )
// //                 })}
// //               </ul>

// //               {/* Social Links */}
// //               <div className="flex items-center space-x-4 ml-6 pl-6 border-l border-gray-200">
// //                 <a
// //                   href="https://github.com/salmansaleem-17"
// //                   target="_blank"
// //                   rel="noopener noreferrer"
// //                   className="p-2.5 rounded-full text-gray-600 hover:text-gray-900 transition-all duration-300 hover:bg-gray-100 hover:scale-110 hover:-translate-y-1"
// //                 >
// //                   <Github size={18} />
// //                 </a>
// //                 <a
// //                   href="https://linkedin.com/in/muhammad-salman-saleem-8a9a96266"
// //                   target="_blank"
// //                   rel="noopener noreferrer"
// //                   className="p-2.5 rounded-full text-gray-600 hover:text-blue-600 transition-all duration-300 hover:bg-blue-50 hover:scale-110 hover:-translate-y-1"
// //                 >
// //                   <Linkedin size={18} />
// //                 </a>
// //                 <button
// //                   onClick={() => handleNavClick('contact')}
// //                   className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105 hover:-translate-y-1 active:scale-95"
// //                 >
// //                   <span>Hire Me</span>
// //                 </button>
// //               </div>
// //             </div>

// //             {/* Mobile Menu Button */}
// //             <button
// //               className="md:hidden p-2.5 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-300 hover:scale-105"
// //               onClick={() => setIsOpen(!isOpen)}
// //             >
// //               <div className="relative w-6 h-6">
// //                 <Menu 
// //                   size={22} 
// //                   className={`absolute inset-0 transition-all duration-300 ${
// //                     isOpen ? 'opacity-0 rotate-90 scale-75' : 'opacity-100 rotate-0 scale-100'
// //                   }`}
// //                 />
// //                 <X 
// //                   size={22} 
// //                   className={`absolute inset-0 transition-all duration-300 ${
// //                     isOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-75'
// //                   }`}
// //                 />
// //               </div>
// //             </button>
// //           </div>
// //         </div>
// //       </nav>

// //       {/* Mobile Menu */}
// //       <div className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
// //         isOpen ? 'visible' : 'invisible'
// //       }`}>
// //         {/* Backdrop */}
// //         <div
// //           className={`absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${
// //             isOpen ? 'opacity-100' : 'opacity-0'
// //           }`}
// //           onClick={() => setIsOpen(false)}
// //         />
        
// //         {/* Mobile Menu Panel */}
// //         <div
// //           className={`absolute top-0 right-0 h-full w-80 bg-white shadow-2xl transform transition-all duration-500 ease-out ${
// //             isOpen ? 'translate-x-0' : 'translate-x-full'
// //           }`}
// //         >
// //           <div className="p-6 pt-20 h-full flex flex-col">
// //             {/* Navigation Links */}
// //             <nav className="space-y-1 flex-1">
// //               {navLinks.map((link, index) => {
// //                 const Icon = link.icon
// //                 const isActive = activeSection === link.id
// //                 return (
// //                   <button
// //                     key={link.id}
// //                     onClick={() => handleNavClick(link.id)}
// //                     className={`w-full flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 relative group ${
// //                       isActive
// //                         ? 'text-blue-600 bg-blue-50 shadow-sm'
// //                         : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
// //                     }`}
// //                     style={{ 
// //                       transitionDelay: isOpen ? `${index * 50}ms` : '0ms',
// //                       transform: isOpen ? 'translateX(0)' : 'translateX(20px)',
// //                       opacity: isOpen ? 1 : 0
// //                     }}
// //                   >
// //                     {/* Hover gradient background */}
// //                     <div className={`absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl opacity-0 transition-opacity duration-300 ${!isActive ? 'group-hover:opacity-100' : ''}`}></div>
                    
// //                     <Icon 
// //                       size={20} 
// //                       className={`transition-all duration-300 relative z-10 ${
// //                         isActive 
// //                           ? 'text-blue-500' 
// //                           : 'text-gray-500 group-hover:text-blue-500 group-hover:scale-110'
// //                       }`} 
// //                     />
// //                     <span className="font-medium relative z-10">{link.label}</span>
                    
// //                     {/* Active indicator */}
// //                     {isActive && (
// //                       <div className="absolute right-4 w-2 h-2 bg-blue-500 rounded-full"></div>
// //                     )}
// //                   </button>
// //                 )
// //               })}
// //             </nav>

// //             {/* Mobile Social Links */}
// //             <div className="mt-auto pt-6 border-t border-gray-100">
// //               <div className="flex items-center justify-center space-x-6 mb-6">
// //                 <a
// //                   href="https://github.com/salmansaleem-17"
// //                   target="_blank"
// //                   rel="noopener noreferrer"
// //                   className="p-3 rounded-full text-gray-600 hover:text-gray-900 transition-all duration-300 hover:bg-gray-100 hover:scale-110"
// //                 >
// //                   <Github size={22} />
// //                 </a>
// //                 <a
// //                   href="https://linkedin.com/in/muhammad-salman-saleem-8a9a96266"
// //                   target="_blank"
// //                   rel="noopener noreferrer"
// //                   className="p-3 rounded-full text-gray-600 hover:text-blue-600 transition-all duration-300 hover:bg-blue-50 hover:scale-110"
// //                 >
// //                   <Linkedin size={22} />
// //                 </a>
// //               </div>
// //               <button
// //                 onClick={() => handleNavClick('contact')}
// //                 className="w-full flex items-center justify-center px-6 py-3.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105 active:scale-95"
// //               >
// //                 Hire Me
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   )
// // }