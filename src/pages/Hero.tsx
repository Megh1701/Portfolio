import { cn } from "../lib/utils.ts"
import EventBadge from "../components/EventBadge.tsx"
import MusicWidget from '/image.png'
import logo from '/logo_optimized.jpg'
import { useState, useRef, useEffect } from "react"

export default function HerowithScale() {
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const [isMusicPlaying, setIsMusicPlaying] = useState(false)
  const [time, setTime] = useState(new Date())
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const playNamePronunciation = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance('Megh Patel')
      utterance.lang = 'en-IN'
      utterance.rate = 0.85
      window.speechSynthesis.speak(utterance)
    }
  }

  useEffect(() => {
    audioRef.current = new Audio('/sounds/khat.mp3')

    audioRef.current.loop = true
    audioRef.current.volume = 0.45

    // Start from 1:49
    audioRef.current.currentTime = 109

    // Ensures currentTime works properly after metadata loads
    audioRef.current.addEventListener('loadedmetadata', () => {
      if (audioRef.current) {
        audioRef.current.currentTime = 109
      }
    })

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  const handleMusicPlay = () => {
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => setIsMusicPlaying(true))
        .catch(() => { /* silences auto-play blocks */ })
    }
  }

  const handleMusicPause = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      setIsMusicPlaying(false)
    }
  }

  const formattedTime = time.toLocaleTimeString('en-US', {
    timeZone: 'Asia/Kolkata',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })

  return (
    <section id="home" className="relative w-full overflow-hidden [--pattern:var(--color-neutral-300)] dark:[--pattern:rgba(255,255,255,0.08)] bg-[#f5f5f0] dark:bg-[#0a0a0a] text-black dark:text-white transition-colors duration-300 min-h-screen md:h-screen">

      {/* TOP - Hidden on mobile */}
      <HorizontalScale className="hidden md:block absolute top-[25%] left-0 w-full" />

      {/* CENTER WRAPPER */}
      <div className="w-full h-full flex justify-center">

        {/* CONTAINER */}
        <div className="w-full max-w-7xl h-full relative flex flex-col md:flex-row">
          <div className="hidden md:block absolute top-0 left-0 h-full border-l border-[var(--pattern)]" >

          </div>
          <div className="w-full md:w-[75%] relative md:absolute md:top-[calc(25%+2.5rem)] md:bottom-[calc(15%+2.5rem)] md:left-0 px-5 md:py-0 md:px-0">
            <div className="w-full flex flex-col md:h-full">
              {isMobile ? (
                /* ═══════════════════════════════════════════════ */
                /* MOBILE LAYOUT - only rendered on mobile screens */
                /* ═══════════════════════════════════════════════ */
                <div className="flex flex-col w-full" style={{ paddingTop: '75px', paddingBottom: '40px' }}>

                  {/* ── Profile Card ── */}
                  <div className="border border-[var(--pattern)] bg-white/40 dark:bg-white/[0.03]">
                    <div className="flex border-b border-[var(--pattern)]">
                      {/* Avatar cell — even padding on all sides */}
                      <div style={{ padding: "10px 15px" }} className="flex items-center justify-center p-6 shrink-0 border-r border-[var(--pattern)]">
                        <div className="w-[80px] h-[80px] rounded-full overflow-hidden border border-[var(--pattern)] shadow-sm">
                          <img src={logo} alt="Megh Patel profile photo" className="w-full h-full object-cover object-center" />
                        </div>
                      </div>

                      {/* Name & subtitle cell */}
                      <div className="flex flex-col justify-center p-6 min-w-0">
                        <div className="flex items-center gap-2">
                          <h1 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 truncate" style={{ marginLeft: '20px' }}>
                            Megh Patel
                          </h1>
                          <svg className="w-4 h-4 text-blue-500 fill-current shrink-0" viewBox="0 0 24 24">
                            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                          </svg>
                          <button
                            onClick={playNamePronunciation}
                            className="p-1 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-500 dark:text-neutral-400 transition cursor-pointer active:scale-95 flex items-center justify-center shrink-0"
                            title="Listen to pronunciation"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                              <path d="M15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Bio with elegant spacing */}
                    <div className="p-6" style={{ padding: "10px 15px" }}>
                      <p className="text-neutral-500 dark:text-neutral-400 text-xs leading-relaxed font-medium">
                        Full stack developer building scalable web products with MERN, Generative AI, cloud infrastructure, and modern databases. Freelance experience delivering 2 real-world production applications.
                      </p>
                    </div>
                  </div>

                  {/* ── Info Grid ── */}
                  <div className="border border-[var(--pattern)] bg-white/40 dark:bg-white/[0.03]" style={{ marginTop: '50px' }}>
                    {/* ROLE */}
                    <div className="border-b border-[var(--pattern)]" style={{ padding: "10px 15px" }}>
                      <span className="text-[8px] font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 font-mono">ROLE</span>
                      <p className="text-neutral-900 dark:text-neutral-100 text-sm font-semibold mt-1">Full Stack &amp; GenAI Developer</p>
                    </div>

                    {/* LOCATION & LOCAL TIME — 2 col */}
                    <div className="grid grid-cols-2 border-b border-[var(--pattern)]">
                      <div className="border-r border-[var(--pattern)]" style={{ padding: "10px 15px" }}>
                        <span className="text-[8px] font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 font-mono">LOCATION</span>
                        <p className="text-neutral-900 dark:text-neutral-100 text-sm font-semibold mt-1">Gandhinagar, GJ, IN</p>
                      </div>
                      <div style={{ padding: "10px 15px" }}>
                        <span className="text-[8px] font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 font-mono">LOCAL TIME (IST)</span>
                        <p className="text-emerald-600 dark:text-emerald-500 text-sm font-semibold font-mono mt-1">{formattedTime}</p>
                      </div>
                    </div>

                    {/* PRONOUNS & EMAIL — 2 col */}
                    <div className="grid grid-cols-2 border-b border-[var(--pattern)]">
                      <div className="border-r border-[var(--pattern)]" style={{ padding: "10px 15px" }}>
                        <span className="text-[8px] font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 font-mono">PRONOUNS</span>
                        <p className="text-neutral-900 dark:text-neutral-100 text-sm font-semibold mt-1">he / him</p>
                      </div>
                      <div style={{ padding: "10px 15px" }}>
                        <span className="text-[8px] font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 font-mono">EMAIL</span>
                        <a href="mailto:pmegh456@gmail.com" className="text-neutral-900 dark:text-neutral-100 text-sm font-semibold mt-1 hover:text-blue-500 transition-colors truncate block">
                          pmegh456@gmail.com
                        </a>
                      </div>
                    </div>

                    {/* STATUS */}
                    <div className="border-b border-[var(--pattern)]" style={{ padding: "10px 15px" }}>
                      <span className="text-[8px] font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 font-mono">Open to</span>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                        <span className="text-neutral-900 dark:text-neutral-100 text-sm font-semibold">Freelance projects</span>
                      </div>
                    </div>

                    {/* WEBSITE & MUSIC — 2 col */}
                    <div className="grid grid-cols-2">
                      <div className="border-r border-[var(--pattern)] flex flex-col justify-center" style={{ padding: "10px 15px" }}>
                        <a
                          href="/resume.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex flex-col justify-center text-left gap-1 select-none font-mono group"
                        >
                          <span className="text-[8px] font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500">RÉSUMÉ</span>
                          <div className="flex items-center gap-1.5 mt-1">
                            <span className="text-neutral-900 dark:text-neutral-100 text-sm font-semibold group-hover:text-emerald-500 transition-colors">
                              Open PDF
                            </span>
                            <svg className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-neutral-900 dark:text-neutral-100 group-hover:text-emerald-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                            </svg>
                          </div>
                        </a>
                      </div>
                      <div style={{ padding: "10px 15px" }}>
                        <span className="text-[8px] font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 font-mono">
                          MUSIC • <span className="text-emerald-500">{isMusicPlaying ? "CLICK TO STOP" : "CLICK TO START"}</span>
                        </span>
                        <div
                          onClick={() => isMusicPlaying ? handleMusicPause() : handleMusicPlay()}
                          className="flex items-center gap-2 cursor-pointer group active:scale-95 transition-transform duration-200 mt-1"
                        >
                          <div className="w-5 h-5 rounded-full overflow-hidden border border-[var(--pattern)] shrink-0 bg-black">
                            <img src={MusicWidget} alt="Khat song album art mobile" className={cn("w-full h-full object-cover", isMusicPlaying && "animate-[spin_8s_linear_infinite]")} />
                          </div>
                          <span className="text-neutral-900 dark:text-neutral-100 text-sm font-semibold truncate group-hover:text-emerald-500 transition-colors select-none">
                            Khat
                          </span>
                          <div className="flex items-end gap-[1px] h-2 w-2 ml-auto">
                            <span className={`w-[1px] bg-emerald-500 rounded-full ${isMusicPlaying ? 'animate-music-1' : 'h-[2px]'}`} />
                            <span className={`w-[1px] bg-emerald-500 rounded-full ${isMusicPlaying ? 'animate-music-2' : 'h-[4px]'}`} />
                            <span className={`w-[1px] bg-emerald-500 rounded-full ${isMusicPlaying ? 'animate-music-3' : 'h-[3px]'}`} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              ) : (
                <>
                  {/* DESKTOP HEADER - only rendered on desktop screens */}
                  <div className="flex md:flex-1">
                    {/* Left: Avatar (Top-Left Quadrant) */}
                    <div className="w-32 md:w-44 flex items-center justify-center border-r border-[var(--pattern)] shrink-0">
                      <div className="w-24 h-24 md:w-34 md:h-34 rounded-full overflow-hidden border border-[var(--pattern)] shadow-sm flex items-center justify-center">
                        <img src={logo} alt="Megh Patel profile photo" className="w-full h-full object-cover object-center" />
                      </div>
                    </div>

                    {/* Right: Info (Top-Right Quadrant) */}
                    <div className="flex-1 flex flex-col justify-center pl-16 md:pl-24" style={{ paddingLeft: "20px" }}>
                      <div className="flex items-center gap-2">
                        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
                          Megh Patel
                        </h1>
                        <svg className="w-5 h-5 text-blue-500 fill-current shrink-0" viewBox="0 0 24 24">
                          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                        <button
                          onClick={playNamePronunciation}
                          className="p-1 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-500 dark:text-neutral-400 transition cursor-pointer active:scale-95 flex items-center justify-center"
                          title="Listen to pronunciation"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                            <path d="M15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14" />
                          </svg>
                        </button>
                      </div>
                      <p className="text-neutral-500 dark:text-neutral-400 text-xs md:text-sm font-medium">
                        Full stack developer building scalable web products with MERN, Generative AI, cloud infrastructure, and modern databases. Freelance experience delivering 2 real-world production applications.
                      </p>
                    </div>
                  </div>

                  {/* HORIZONTAL GRID BOUNDARY (DIVIDER) - Desktop only */}
                  <div className="h-px bg-[var(--pattern)] w-full" />

                  {/* DESKTOP BOTTOM ROW */}
                  <div className="flex md:flex-1 md:w-full">
                    {/* Left: Empty (Bottom-Left Quadrant) */}
                    <div className="w-32 md:w-44 border-r border-[var(--pattern)] shrink-0" />

                    {/* Right: Grid Details (Bottom-Right Quadrant) */}
                    <div className="flex-1 pl-16 md:pl-24 flex items-center" >
                      <div className="w-full h-full overflow-visible bg-[#f5f5f0] dark:bg-[#0a0a0a]/70 backdrop-blur-[24px] shadow-[inset_0_1px_0_0_var(--glass-glow),0_12px_40px_-12px_rgba(0,0,0,0.05)] dark:shadow-[inset_0_1px_0_0_var(--glass-glow),0_12px_40px_-12px_rgba(0,0,0,0.3)] grid grid-cols-2">
                        {/* ROLE */}
                        <div className="p-3 md:p-4 border-r border-b border-[var(--pattern)] flex flex-col justify-center" style={{ paddingLeft: "10px" }}>
                          <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">ROLE</span>
                          <span className="text-neutral-900 dark:text-neutral-100 text-xs md:text-sm font-semibold mt-1">  Full Stack & GenAI Developer</span>
                        </div>

                        {/* LOCATION */}
                        <div className="p-3 md:p-4 border-b border-[var(--pattern)] flex flex-col justify-center" style={{ paddingLeft: "10px" }}>
                          <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">LOCATION</span>
                          <span className="text-neutral-900 dark:text-neutral-100 text-xs md:text-sm font-semibold mt-1">Gandhinagar, Gujarat, IN</span>
                        </div>

                        {/* LOCAL TIME */}
                        <div className="p-3 md:p-4 border-r border-b border-[var(--pattern)] flex flex-col justify-center" style={{ paddingLeft: "10px" }}>
                          <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">LOCAL TIME (IST)</span>
                          <span className="text-emerald-600 dark:text-emerald-500 text-xs md:text-sm font-mono font-semibold mt-1">{formattedTime}</span>
                        </div>

                        {/* PRONOUNS */}
                        <div className="p-3 md:p-4 border-b border-[var(--pattern)] flex flex-col justify-center" style={{ paddingLeft: "10px" }}>
                          <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">PRONOUNS</span>
                          <span className="text-neutral-900 dark:text-neutral-100 text-xs md:text-sm font-semibold mt-1">he / him</span>
                        </div>

                        {/* EMAIL */}
                        <div className="p-3 md:p-4 border-r border-b border-[var(--pattern)] flex flex-col justify-center" style={{ paddingLeft: "10px" }}>
                          <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">EMAIL</span>
                          <a href="mailto:pmegh456@gmail.com" className="text-neutral-900 dark:text-neutral-100 text-xs md:text-sm font-semibold mt-1 hover:text-blue-500 transition-colors truncate">
                            pmegh456@gmail.com
                          </a>
                        </div>

                        {/* STATUS */}
                        <div className="p-3 md:p-4 border-b border-[var(--pattern)] flex flex-col justify-center" style={{ paddingLeft: "10px" }}>
                          <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">Open to</span>
                          <div className="flex items-center gap-1.5 mt-1">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                            <span className="text-neutral-900 dark:text-neutral-100 text-xs md:text-sm font-semibold">Freelance Full Stack or AI projects</span>
                          </div>
                        </div>

                        {/* RÉSUMÉ */}
                        <div className="border-r border-[var(--pattern)] relative overflow-visible min-h-[64px]">
                          <FolderSlider />
                        </div>

                        {/* MUSIC */}
                        <div className="p-3 md:p-4 flex flex-col justify-center" style={{ paddingLeft: "10px" }}>
                          <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">MUSIC</span>
                          <div
                            onClick={() => {
                              if (isMusicPlaying) {
                                handleMusicPause()
                              } else {
                                handleMusicPlay()
                              }
                            }}
                            className="flex items-center gap-2 cursor-pointer group select-none active:scale-[0.98] transition-transform duration-200 mt-1"
                          >
                            <div className="w-5 h-5 rounded-full overflow-hidden border border-[var(--pattern)] shrink-0 relative flex items-center justify-center bg-black">
                              <img
                                src={MusicWidget}
                                alt="Khat song album art desktop"
                                className={cn("w-full h-full object-cover", isMusicPlaying && "animate-[spin_8s_linear_infinite]")}
                              />
                            </div>
                            <div className="flex flex-col min-w-0">
                              <span className="text-neutral-900 dark:text-neutral-100 text-xs font-semibold truncate group-hover:text-emerald-500 transition-colors leading-none">
                                Khat
                              </span>
                            </div>
                            <div className="flex items-end gap-[1px] h-2 w-2 mb-0.5">
                              <span className={`w-[1px] bg-emerald-500 rounded-full ${isMusicPlaying ? 'animate-music-1' : 'h-[2px]'}`} />
                              <span className={`w-[1px] bg-emerald-500 rounded-full ${isMusicPlaying ? 'animate-music-2' : 'h-[4px]'}`} />
                              <span className={`w-[1px] bg-emerald-500 rounded-full ${isMusicPlaying ? 'animate-music-3' : 'h-[3px]'}`} />
                            </div>
                            <span className="text-neutral-400 dark:text-neutral-500 text-[9px] font-semibold truncate group-hover:text-emerald-500 transition-colors leading-none ml-auto">
                              {isMusicPlaying ? 'click to stop' : 'click to play'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* RIGHT 35% - Desktop only */}
          <div className="hidden md:block w-[25%] h-full absolute right-0 top-0 border-l border-[var(--pattern)]">
            {/* RIGHT CONTENT */}
            <EventBadge />
          </div>

          <div className="hidden md:block absolute top-0 right-0 h-full border-l border-[var(--pattern)]" />
        </div>

      </div>

      {/* BOTTOM - Hidden on mobile */}
      <HorizontalScale className="hidden md:block absolute bottom-[15%] left-0 w-full" />
    </section>
  )
}

const FolderSlider = ({ className }: { className?: string }) => {
  return (
    <a
      href="/resume.pdf"
      target="_blank"
      rel="noopener noreferrer"
      className={cn("absolute inset-0 flex flex-col justify-end overflow-hidden group/folder cursor-pointer select-none bg-[#f5f5f0] dark:bg-[#0a0a0a]/70", className)}
    >
      {/* Document Sheet (slides up on hover) */}
      <div 
        className="absolute left-[12px] right-[12px] bottom-1 h-[65%] bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-50 dark:to-neutral-100 text-black p-2 shadow-[0_4px_12px_rgba(0,0,0,0.15)] dark:shadow-[0_8px_20px_rgba(0,0,0,0.6)] border border-neutral-200/80 rounded-[2px] z-10 transition-all duration-400 ease-out transform translate-y-[60%] opacity-0 group-hover/folder:translate-y-[-35%] group-hover/folder:rotate-[-1.5deg] group-hover/folder:opacity-100"
        style={{ willChange: "transform, opacity" }}
      >
        {/* Document lines simulation */}
        <div className="flex flex-col gap-1 w-full h-full relative">
          {/* Header */}
          <div className="border-b border-neutral-200 pb-0.5 mb-1 flex items-center justify-between">
            <div>
              <div className="text-[7.5px] font-sans font-bold leading-none tracking-tight uppercase text-neutral-850">MEGH PATEL</div>
              <div className="text-[5.5px] font-mono text-neutral-400 scale-90 origin-left mt-0.5">fullstack.tsx</div>
            </div>
            {/* Tiny check status */}
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-50 border border-emerald-500/30 flex items-center justify-center text-[4px] text-emerald-600 font-bold">✓</div>
          </div>

          {/* Body Lines (Simulated TSX code block) */}
          <div className="flex flex-col gap-[3px] font-mono text-[5px] leading-none">
            {/* class Developer { */}
            <div className="flex items-center gap-[2px]">
              <span className="w-4 h-[2px] bg-purple-500/60 dark:bg-purple-600/50 rounded-sm shrink-0" />
              <span className="w-7 h-[2px] bg-blue-500/60 dark:bg-blue-600/50 rounded-sm shrink-0" />
              <span className="w-1 h-[2px] bg-neutral-300 rounded-sm shrink-0" />
            </div>
            {/*   name = "Megh"; */}
            <div className="flex items-center gap-[2px] pl-1.5">
              <span className="w-3.5 h-[2px] bg-neutral-400/60 rounded-sm shrink-0" />
              <span className="w-1 h-[2px] bg-red-400/60 rounded-sm shrink-0" />
              <span className="w-7 h-[2px] bg-amber-500/50 rounded-sm shrink-0" />
            </div>
            {/*   skills = [React, AI]; */}
            <div className="flex items-center gap-[2px] pl-1.5">
              <span className="w-4 h-[2px] bg-neutral-400/60 rounded-sm shrink-0" />
              <span className="w-1.5 h-[2px] bg-red-400/60 rounded-sm shrink-0" />
              <span className="w-1 h-[2px] bg-neutral-300 rounded-sm shrink-0" />
              <span className="w-4.5 h-[2px] bg-blue-400/60 rounded-sm shrink-0" />
              <span className="w-2.5 h-[2px] bg-emerald-400/60 rounded-sm shrink-0" />
              <span className="w-1 h-[2px] bg-neutral-300 rounded-sm shrink-0" />
            </div>
            {/* } */}
            <div>
              <span className="w-1 h-[2px] bg-neutral-300 rounded-sm shrink-0" />
            </div>
          </div>

          {/* Vintage red ink stamp */}
          <div className="absolute right-1 bottom-1 w-4 h-4 rounded-full border border-red-500/35 flex items-center justify-center text-[4px] text-red-500/65 font-mono font-black uppercase tracking-tighter transform rotate-12 scale-90 select-none">
            pass
          </div>
        </div>
      </div>

      {/* Pocket Front Flap */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-[#eaeae2] to-[#f0f0ea] dark:from-[#141414] dark:to-[#1a1a1a] border-t border-[var(--pattern)] z-20 flex items-center justify-between px-3 md:px-4 shadow-[0_-2px_6px_rgba(0,0,0,0.03)]"
      >
        {/* Label */}
        <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 select-none">
          RÉSUMÉ
        </span>

        {/* Catalog Drawer Pull Handle (vintage metallic bar) */}
        <div 
          className="absolute top-[35%] left-1/2 -translate-x-1/2 w-7 h-[2px] rounded-full bg-gradient-to-b from-neutral-300 to-neutral-400 dark:from-neutral-700 dark:to-neutral-800 border border-neutral-400/20 dark:border-neutral-600/20 shadow-[0_0.5px_1px_rgba(0,0,0,0.15)] opacity-80 group-hover/folder:scale-x-110 transition-all duration-300 z-30" 
          style={{ willChange: "transform" }}
        />

        {/* Vintage red ink stamp */}
        <div className="text-[7px] font-mono text-[#b03535] dark:text-[#db4d4d] border border-dashed border-[#b03535]/40 dark:border-[#db4d4d]/40 px-1 rounded-sm uppercase tracking-widest font-black transform rotate-[-4deg] opacity-75 select-none scale-90">
          OPEN
        </div>
      </div>

      {/* The Tab */}
      <div 
        className="absolute bottom-[40%] left-[12px] h-[12px] px-2 bg-[#eaeae2] dark:bg-[#141414] border-t border-x border-[var(--pattern)] rounded-t-[3px] flex items-center justify-center z-20 transition-all duration-400 ease-out origin-bottom shadow-sm group-hover/folder:translate-y-[-3px] group-hover/folder:scale-y-[1.05]"
        style={{ willChange: "transform" }}
      >
        <span className="text-[6.5px] font-mono font-bold tracking-wider text-neutral-500 dark:text-neutral-400 uppercase">
          RESUME.PDF
        </span>
      </div>
    </a>
  )
}

const HorizontalScale = ({
  className
}: {
  className?: string
}) => {
  return (
    <div
      className={cn(
        "h-10 bg-[repeating-linear-gradient(315deg,var(--pattern)_0,var(--pattern)_1px,transparent_1px,transparent_50%)] bg-[size:10px_10px] border-y border-[var(--pattern)]",
        className
      )}
    />
  )
}

export const VerticalScale = ({
  className
}: {
  className?: string
}) => {
  return (
    <div
      className={cn(
        "w-10 bg-[repeating-linear-gradient(315deg,var(--pattern)_0,var(--pattern)_1px,transparent_1px,transparent_50%)] bg-[size:10px_10px] border-x border-[var(--pattern)]",
        className
      )}
    />
  )
}
