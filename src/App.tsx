import { useEffect } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Hero from './pages/Hero'
import Skills from './pages/Skillsection'
import Contact from './pages/Contact'
import AboutUs from './pages/AboutUs'
import Footer from './components/Footer'

function App() {
  useEffect(() => {
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

  return (
    <ThemeProvider>
      <div className="min-h-screen w-full bg-[#f5f5f0] dark:bg-[#0a0a0a] text-black dark:text-white transition-colors duration-300">
        <Navbar />
        <Hero />
        <AboutUs />
        <Skills />
        <Contact />
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App