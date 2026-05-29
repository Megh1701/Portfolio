import { useState, useEffect } from "react"
import { useTheme } from "../context/ThemeContext"

function Navbar() {
  const { resolvedTheme, toggleTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [isDesktop, setIsDesktop] = useState(typeof window !== "undefined" ? window.innerWidth >= 768 : false)
  const isProjectActive = () => {
    return window.location.hash.includes("/project/") || window.location.pathname.includes("/project/")
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)

      const scrollPos = window.scrollY + window.innerHeight / 3
      const projectsEl = document.getElementById("projects")
      const skillsEl = document.getElementById("skills")
      const contactEl = document.getElementById("contact")

      if (isProjectActive()) {
        setActiveSection("projects")
        return
      }

      if (contactEl && scrollPos >= contactEl.offsetTop) {
        setActiveSection("contact")
      } else if (skillsEl && scrollPos >= skillsEl.offsetTop) {
        setActiveSection("skills")
      } else if (projectsEl && scrollPos >= projectsEl.offsetTop) {
        setActiveSection("projects")
      } else {
        setActiveSection("home")
      }
    }

    const checkWidth = () => {
      setIsDesktop(window.innerWidth >= 768)
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", checkWidth)
    window.addEventListener("hashchange", handleScroll)
    window.addEventListener("popstate", handleScroll)
    
    // Run initial check
    handleScroll()
    checkWidth()

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", checkWidth)
      window.removeEventListener("hashchange", handleScroll)
      window.removeEventListener("popstate", handleScroll)
    }
  }, [])

  const scrollToTop = () => {
    const section = document.getElementById("home")
    if (section && !isProjectActive()) {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      })
    } else {
      window.history.pushState(null, "", "/#/")
      window.dispatchEvent(new Event("popstate"))
    }
  }

  const scrollToProjects = () => {
    const section = document.getElementById("projects")
    if (section && !isProjectActive()) {
      section.scrollIntoView({
        behavior: "smooth"
      })
    } else {
      window.history.pushState(null, "", "/#projects")
      window.dispatchEvent(new Event("popstate"))
    }
  }

  const scrollToSkills = () => {
    const section = document.getElementById("skills")
    if (section && !isProjectActive()) {
      section.scrollIntoView({
        behavior: "smooth"
      })
    } else {
      window.history.pushState(null, "", "/#skills")
      window.dispatchEvent(new Event("popstate"))
    }
  }

  const scrollToContact = () => {
    const section = document.getElementById("contact")
    if (section && !isProjectActive()) {
      section.scrollIntoView({
        behavior: "smooth"
      })
    } else {
      window.history.pushState(null, "", "/#contact")
      window.dispatchEvent(new Event("popstate"))
    }
  }
  return (
    <>
      {/* Mobile recommendation banner - Scrolls out of view naturally */}
      <div className="block lg:hidden absolute top-0 left-0 right-0 z-[190] h-9 bg-emerald-500/5 dark:bg-emerald-500/10 border-b border-[var(--pattern)] text-emerald-700 dark:text-[#10b981] text-[9px] font-mono uppercase tracking-wider flex items-center justify-center px-4 select-none">
        ✨ Switch to desktop to unlock full 3D card tilt & physics dynamics
      </div>
      <nav
        className={`fixed z-[200] left-1/2 -translate-x-1/2 transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] select-none flex items-center border [--pattern:var(--color-neutral-300)] dark:[--pattern:rgba(255,255,255,0.08)]
          ${scrolled
            ? "top-4 w-[94%] sm:w-[90%] max-w-[620px] h-14 bg-white/40 dark:bg-[#121212]/70 backdrop-blur-[8px] border-neutral-300/60 dark:border-neutral-800/60 shadow-[0_12px_40px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.7)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.05)] rounded-full"
            : "top-9 lg:top-0 w-full max-w-7xl h-20 bg-[#f5f5f0]/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md border-t-transparent border-x-transparent border-b-[var(--pattern)] rounded-none"
          }`}
        style={{
          paddingLeft: scrolled ? (isDesktop ? "32px" : "12px") : (isDesktop ? "80px" : "16px"),
          paddingRight: scrolled ? (isDesktop ? "32px" : "12px") : (isDesktop ? "80px" : "16px")
        }}
      >
        <div className="w-full h-full flex items-center justify-between">

          {/* BRAND */}
          <div
            onClick={scrollToTop}
            className="cursor-pointer flex items-center gap-2 group select-none"
          >
            <span className="font-bold text-sm tracking-tight text-neutral-900 dark:text-neutral-50 transition-all duration-300">
              Megh
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {!scrolled && (
              <span className="hidden md:inline text-[9px] font-mono tracking-wider uppercase text-neutral-400/80 dark:text-neutral-500/80 transition-opacity duration-300">
                - Edition 2026
              </span>
            )}
          </div>

          {/* NAVIGATION LINKS & TOGGLE */}
          <div className="flex items-center gap-1.5 md:gap-8 text-sm font-semibold uppercase tracking-wider text-black dark:text-white">

            <div className="flex items-center gap-1 md:gap-4">
              <button
                onClick={scrollToTop}
                className="relative py-1.5 px-1.5 md:px-3 group flex items-center gap-1 cursor-pointer transition-colors"
              >
                <span className="absolute inset-0 bg-neutral-200/40 dark:bg-neutral-800/50 rounded-full opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-300 -z-10" />
                <span className={`hidden sm:inline text-[9px] font-mono transition-colors duration-300 ${activeSection === "home" ? "text-emerald-500 font-bold" : "text-neutral-400 dark:text-neutral-500"}`}>01</span>
                <span className={`text-[11px] uppercase tracking-widest font-bold transition-colors duration-300 ${activeSection === "home" ? "text-black dark:text-white" : "text-neutral-400 dark:text-neutral-500 group-hover:text-neutral-800 dark:group-hover:text-neutral-200"}`}>home</span>
              </button>

              <button
                onClick={scrollToProjects}
                className="relative py-1.5 px-1.5 md:px-3 group flex items-center gap-1 cursor-pointer transition-colors"
              >
                <span className="absolute inset-0 bg-neutral-200/40 dark:bg-neutral-800/50 rounded-full opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-300 -z-10" />
                <span className={`hidden sm:inline text-[9px] font-mono transition-colors duration-300 ${activeSection === "projects" ? "text-emerald-500 font-bold" : "text-neutral-400 dark:text-neutral-500"}`}>02</span>
                <span className={`text-[11px] uppercase tracking-widest font-bold transition-colors duration-300 ${activeSection === "projects" ? "text-black dark:text-white" : "text-neutral-400 dark:text-neutral-500 group-hover:text-neutral-800 dark:group-hover:text-neutral-200"}`}>projects</span>
              </button>

              <button
                onClick={scrollToSkills}
                className="relative py-1.5 px-1.5 md:px-3 group flex items-center gap-1 cursor-pointer transition-colors"
              >
                <span className="absolute inset-0 bg-neutral-200/40 dark:bg-neutral-800/50 rounded-full opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-300 -z-10" />
                <span className={`hidden sm:inline text-[9px] font-mono transition-colors duration-300 ${activeSection === "skills" ? "text-emerald-500 font-bold" : "text-neutral-400 dark:text-neutral-500"}`}>03</span>
                <span className={`text-[11px] uppercase tracking-widest font-bold transition-colors duration-300 ${activeSection === "skills" ? "text-black dark:text-white" : "text-neutral-400 dark:text-neutral-500 group-hover:text-neutral-800 dark:group-hover:text-neutral-200"}`}>skills</span>
              </button>

              <button
                onClick={scrollToContact}
                className="relative py-1.5 px-1.5 md:px-3 group flex items-center gap-1 cursor-pointer transition-colors"
              >
                <span className="absolute inset-0 bg-neutral-200/40 dark:bg-neutral-800/50 rounded-full opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-300 -z-10" />
                <span className={`hidden sm:inline text-[9px] font-mono transition-colors duration-300 ${activeSection === "contact" ? "text-emerald-500 font-bold" : "text-neutral-400 dark:text-neutral-500"}`}>04</span>
                <span className={`text-[11px] uppercase tracking-widest font-bold transition-colors duration-300 ${activeSection === "contact" ? "text-black dark:text-white" : "text-neutral-400 dark:text-neutral-500 group-hover:text-neutral-800 dark:group-hover:text-neutral-200"}`}>contact</span>
              </button>
            </div>

            {/* THEME TOGGLE (Odometer switch restored) */}
            <div className="ml-1 md:ml-2 pl-2 md:pl-6 flex items-center relative text-xl">
              {/* subtle separator */}
              <div className="absolute left-0 h-4 w-px bg-neutral-200 dark:bg-neutral-800 opacity-60 cursor-pointer" />

              <button
                onClick={toggleTheme}
                className="flex items-center font-mono uppercase tracking-wide cursor-pointer"
              >
                <span className="hidden sm:inline text-[10px] font-semibold text-neutral-500 dark:text-neutral-400 select-none">
                  theme-
                </span>

                {/* ODOMETER BOX */}
                <div className="relative h-5 text-[10px] overflow-hidden border border-neutral-300 dark:border-neutral-700 rounded-sm ml-2 px-2 min-w-[52px] bg-white dark:bg-neutral-900">
                  <div
                    className={`transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${resolvedTheme === "dark" ? "-translate-y-5" : "translate-y-0"
                      }`}
                  >
                    <div className="h-5 flex items-center justify-center text-black dark:text-white font-bold select-none">
                      light
                    </div>
                    <div className="h-5 flex items-center justify-center text-black dark:text-white font-bold select-none">
                      dark
                    </div>
                  </div>
                </div>
              </button>
            </div>

          </div>

        </div>
      </nav>
    </>)
}

export default Navbar