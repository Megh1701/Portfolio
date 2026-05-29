"use client"

import { useState, useEffect } from "react"
import { motion } from "motion/react"

export default function SiteLoader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  const [statusText, setStatusText] = useState("[ BOOTING DIGITAL CANVAS ]")

  useEffect(() => {
    // Monospace status texts reflecting the modular parts of the portfolio
    const statusSequence = [
      { threshold: 0, text: "[ INITIALIZING ARCHITECTURE ]" },
      { threshold: 20, text: "[ COMPILING GRID BACKDROP ]" },
      { threshold: 45, text: "[ SYNCHRONIZING STATE CONTEXT ]" },
      { threshold: 65, text: "[ SIMULATING PHYSICS ENGINE ]" },
      { threshold: 85, text: "[ DRAWING Badge CANVAS ]" },
      { threshold: 95, text: "[ READY ]" },
    ]

    // Simulate progress loading
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }

        // Dynamic increments to feel organic (some slow parts, some fast parts)
        let increment = 1
        if (prev < 30) increment = Math.floor(Math.random() * 4) + 2
        else if (prev < 60) increment = Math.floor(Math.random() * 2) + 1
        else if (prev < 85) increment = Math.floor(Math.random() * 3) + 2
        else increment = 1

        const next = Math.min(prev + increment, 100)

        // Update status text based on progress
        const matchedStatus = [...statusSequence]
          .reverse()
          .find((s) => next >= s.threshold)
        if (matchedStatus) {
          setStatusText(matchedStatus.text)
        }

        return next
      })
    }, 35)

    return () => clearInterval(interval)
  }, [])

  // Call onComplete when animation ends
  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => {
        onComplete()
      }, 700) // Small delay for user to read "[ READY ]"
      return () => clearTimeout(timer)
    }
  }, [progress, onComplete])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        y: "-100%",
        transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1] }
      }}
      className="fixed inset-0 z-[9999] overflow-hidden bg-[#f5f5f0] dark:bg-[#0a0a0a] flex items-center justify-center select-none font-mono"
    >
      {/* Background Dots Grid matching the site's design */}
      <div className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-30 bg-[#f3f3eb] dark:bg-[#070707] bg-[radial-gradient(var(--pattern)_1.5px,transparent_1.5px)] [background-size:24px_24px] [--pattern:#c8c6bc] dark:[--pattern:#223c2a]" />

      {/* Grid Border Lines wrapping the central content in editorial fashion */}
      <div className="absolute inset-x-8 md:inset-x-20 inset-y-12 border border-neutral-300/40 dark:border-neutral-800/40 pointer-events-none" />
      <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-full max-w-7xl border-x border-neutral-300/30 dark:border-neutral-800/20 pointer-events-none" />

      {/* Loader Content Container */}
      <div className="relative z-10 max-w-lg w-full px-12 flex flex-col items-center">
        {/* Monospace editorial brackets header */}
        <div className="mb-2 text-[9px] font-bold text-neutral-450 dark:text-neutral-500 uppercase tracking-widest animate-pulse">
          MEGH PATEL // PORTFOLIO INITIALIZER
        </div>

        {/* Dynamic Editorial Status Text */}
        <div className="h-6 mb-10 text-xs font-bold tracking-wider text-[#059669] dark:text-[#10b981] text-center select-none">
          {statusText}
        </div>

        {/* Central Monospace Counter */}
        <div className="relative mb-8 text-7xl md:text-8xl font-black text-black dark:text-white tracking-tighter tabular-nums flex items-baseline">
          {progress.toString().padStart(3, "0")}
          <span className="text-xl font-bold ml-1 text-neutral-450 dark:text-neutral-500">%</span>
        </div>

        {/* Minimal Progress Bar matching the keycaps border styles */}
        <div className="w-full h-[6px] border border-neutral-300 dark:border-neutral-800 bg-neutral-200/50 dark:bg-neutral-900/50 p-[1px] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-neutral-950 dark:bg-white rounded-full"
            style={{ width: `${progress}%` }}
            transition={{ ease: "easeOut" }}
          />
        </div>

        {/* Secondary branding info */}
        <div className="mt-12 flex items-center gap-1.5 text-[8px] font-bold tracking-widest text-neutral-400 dark:text-neutral-600 uppercase">
          <span>GANDHINAGAR, GJ, IN</span>
          <span>•</span>
          <span>EST. 2026</span>
        </div>
      </div>
    </motion.div>
  )
}
