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
import SiteLoader from './components/SiteLoader'
import { AnimatePresence } from 'motion/react'

const PROJECT_METADATA: Record<string, { title: string; description: string }> = {
  "1": {
    title: "Omera Fintech - Case Study | Megh Patel",
    description: "Case study for Omera Fintech, a remittance and financial services hub engineered by Megh Patel. Secure transaction flows, real-time rate displays, and seamless cross-border payment UX."
  },
  "2": {
    title: "Devswipe - Case Study | Megh Patel",
    description: "Case study for Devswipe, a Tinder-like developer matchmaking and networking application engineered by Megh Patel. Connects developers based on skills, interest levels, and stack profiles."
  },
  "3": {
    title: "Verdict AI - Case Study | Megh Patel",
    description: "Case study for Verdict AI, a multilingual legal intelligence and research platform engineered by Megh Patel. Utilizes RAG, hybrid semantic search, and FAISS vector indexing."
  },
  "4": {
    title: "Eternal Ceramic - Case Study | Megh Patel",
    description: "Case study for Eternal Ceramic, a business web storefront and product catalog built for a ceramic and sanitary ware exporter by Megh Patel."
  },
  "5": {
    title: "Connect Four - Case Study | Megh Patel",
    description: "Case study for Connect Four, a classic board game engineered from scratch by Megh Patel using vanilla HTML, CSS, and JavaScript."
  }
}

function App() {
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null)
  const [isSiteLoading, setIsSiteLoading] = useState(true)

  // Block body scroll while the entrance loader screen is active
  useEffect(() => {
    if (isSiteLoading) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isSiteLoading])

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
    const handleRouting = () => {
      const hash = window.location.hash
      const path = window.location.pathname
      
      // 1. Check path-based route (e.g. /project/1)
      const pathMatch = path.match(/^\/project\/([^\/]+)$/)
      if (pathMatch) {
        setActiveProjectId(pathMatch[1])
        return
      }

      // 2. Check hash-based route (e.g. #/project/1)
      const hashMatch = hash.match(/^#\/project\/([^\/]+)$/)
      if (hashMatch) {
        setActiveProjectId(hashMatch[1])
        return
      }

      // Default back to homepage
      setActiveProjectId(null)
    }

    window.addEventListener('hashchange', handleRouting)
    window.addEventListener('popstate', handleRouting)
    handleRouting() // Check initial state

    return () => {
      window.removeEventListener('hashchange', handleRouting)
      window.removeEventListener('popstate', handleRouting)
    }
  }, [])

  // Dynamic SEO Metadata Synchronization
  useEffect(() => {
    let title = "Megh Patel | Software Engineer & Full Stack Developer"
    let description = "Megh Patel is a Software Engineer and Full Stack Developer specializing in building high-performance web applications with MERN, Generative AI, cloud infrastructure, and modern databases. Explore my portfolio and projects."
    let canonical = "https://meghpatel.website"

    if (activeProjectId && PROJECT_METADATA[activeProjectId]) {
      const meta = PROJECT_METADATA[activeProjectId]
      title = meta.title
      description = meta.description
      canonical = `https://meghpatel.website/project/${activeProjectId}`
    }

    // Update title
    document.title = title

    // Update meta descriptions in DOM
    const updateMetaTag = (selector: string, content: string) => {
      let el = document.querySelector(selector)
      if (!el) {
        if (selector.startsWith('meta[name=')) {
          const name = selector.match(/"([^"]+)"/)?.[1]
          if (name) {
            el = document.createElement('meta')
            el.setAttribute('name', name)
            document.head.appendChild(el)
          }
        } else if (selector.startsWith('meta[property=')) {
          const property = selector.match(/"([^"]+)"/)?.[1]
          if (property) {
            el = document.createElement('meta')
            el.setAttribute('property', property)
            document.head.appendChild(el)
          }
        }
      }
      if (el) {
        el.setAttribute('content', content)
      }
    }

    updateMetaTag('meta[name="description"]', description)
    updateMetaTag('meta[property="og:description"]', description)
    updateMetaTag('meta[name="twitter:description"]', description)
    updateMetaTag('meta[property="og:title"]', title)
    updateMetaTag('meta[name="twitter:title"]', title)

    // Update canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement
    if (!canonicalLink) {
      canonicalLink = document.createElement('link')
      canonicalLink.rel = 'canonical'
      document.head.appendChild(canonicalLink)
    }
    canonicalLink.href = canonical

    // Update OG URL
    updateMetaTag('meta[property="og:url"]', canonical)
  }, [activeProjectId])

  const handleBackToProjects = () => {
    if (window.location.pathname !== "/") {
      window.history.pushState(null, "", "/#projects")
      window.dispatchEvent(new Event("popstate"))
    } else {
      window.location.hash = '#projects'
    }
    setActiveProjectId(null)
  }

  const [navbarHeight, setNavbarHeight] = useState(80)

  useEffect(() => {
    const handleResize = () => {
      setNavbarHeight(window.innerWidth < 1024 ? 116 : 80)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Smooth scroll back to home sections on page changes/mounts
  useEffect(() => {
    if (!activeProjectId) {
      const hash = window.location.hash
      if (hash && hash.startsWith('#') && !hash.startsWith('#/project/')) {
        const id = hash.substring(1)
        if (id) {
          const timer = setTimeout(() => {
            const el = document.getElementById(id)
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' })
            } else if (id === '/' || id === 'home') {
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }
          }, 150)
          return () => clearTimeout(timer)
        }
      }
    }
  }, [activeProjectId])

  return (
    <ThemeProvider>
      <AnimatePresence mode="wait">
        {isSiteLoading && (
          <SiteLoader onComplete={() => setIsSiteLoading(false)} />
        )}
      </AnimatePresence>

      <div className="min-h-screen w-full bg-[#f5f5f0] dark:bg-[#0a0a0a] text-black dark:text-white transition-colors duration-300">
        <Navbar />
        <div style={{ paddingTop: `${navbarHeight}px` }}>
          {activeProjectId ? (
            <ProjectDetails projectId={activeProjectId} onBack={handleBackToProjects} />
          ) : (
            <>
              <Hero />
              <AboutUs />
              <Projects />
              <Skills />
              <Contact />
              <Footer />
            </>
          )}
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App