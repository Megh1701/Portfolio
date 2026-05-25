import { useEffect, useState } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Hero from './pages/Hero'
import Skills from './pages/Skillsection'
import Contact from './pages/Contact'
import AboutUs from './pages/AboutUs'
import Projects from './pages/Projects'
import Footer from './components/Footer'
import ProjectDetails from './pages/ProjectDetails'

function App() {
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null)

  useEffect(() => {
    // Generate Favicon
    const size = 64
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.clearRect(0, 0, size, size)

      // Draw a centered 🧑‍💻 emoji for the favicon
      ctx.font = "48px serif"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText("🧑‍💻", size / 2, size / 2 + 4)

      const dataUrl = canvas.toDataURL('image/png')
      let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement
      if (!link) {
        link = document.createElement('link')
        link.rel = 'icon'
        document.head.appendChild(link)
      }
      link.type = 'image/png'
      link.href = dataUrl
    }
  }, [])

  useEffect(() => {
    // Hash Routing Listener
    const handleHashChange = () => {
      const hash = window.location.hash
      const match = hash.match(/^#\/project\/([^\/]+)$/)
      if (match) {
        setActiveProjectId(match[1])
      } else {
        setActiveProjectId(null)
      }
    }
    
    window.addEventListener('hashchange', handleHashChange)
    handleHashChange() // Check initial hash
    
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const handleBackToProjects = () => {
    window.location.hash = '#projects' // Returns to Projects section
    setActiveProjectId(null)
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen w-full bg-[#f5f5f0] dark:bg-[#0a0a0a] text-black dark:text-white transition-colors duration-300">
        {activeProjectId ? (
          <ProjectDetails projectId={activeProjectId} onBack={handleBackToProjects} />
        ) : (
          <>
            <Navbar />
            <Hero />
            <AboutUs />
            <Projects />
            <Skills />
            <Contact />
            <Footer />
          </>
        )}
      </div>
    </ThemeProvider>
  )
}

export default App