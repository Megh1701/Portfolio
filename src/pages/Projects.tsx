import { useState, useEffect } from "react"
import { motion, useMotionValue, useTransform, animate } from "motion/react"

// Types for Card Config
interface CardConfig {
  x: number
  y: number
  rotation: number
}

// Project/Card Interface
export interface CardItem {
  index: string
  title: string
  subtitle: string
  stack: string[]
  skeleton: React.ReactNode
  description: string
  className: string
  config: CardConfig
}

export const Cards: CardItem[] = [
  {
    index: "1",
    title: "Omera",
    subtitle: "Fintech & Remittance Platform",
    stack: ["Next.js", "Typescript", "Tailwind CSS"],
    description: "Designed and developed the OM Money Zone website to make insurance, loans, and investment services simple, modern, and easy for users to explore online.",
    className: "bg-orange-400 text-stone-900 border-black",
    config: {
      x: -320,
      y: -30,
      rotation: -8,
    },
    // Vertical white lines of varying heights skeleton
    skeleton: (
      <div className="w-full h-28 opacity-80 border border-orange-400/40 rounded-xl bg-[#c5470e]/30 p-2 flex items-center justify-center">
        <svg viewBox="0 0 256 120" className="w-full h-full text-white/35">
          {Array.from({ length: 26 }).map((_, i) => {
            const h = 50 + Math.sin(i * 0.28) * 35
            return (
              <line
                key={i}
                x1={15 + i * 9}
                y1={60 - h / 2}
                x2={15 + i * 9}
                y2={60 + h / 2}
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            )
          })}
        </svg>
      </div>
    )
  },
  {
    index: "2",
    title: "Devswipe",
    subtitle: "Developer Swipe & Networking",
    stack: ["MERN stack", "Tailwind", "Socket.IO", "JWT", "Docker"],
    description: "A tinder-like matching application connecting developers based on skill sets, interest levels, and stack profiles.",
    className: "bg-[#f0ece1] text-stone-900 border-black",
    config: {
      x: -160,
      y: 20,
      rotation: 5,
    },
    // Grid of dots/squares skeleton
    skeleton: (
      <div className="grid grid-cols-10 gap-1.5 w-full h-28 opacity-70 p-3 border border-stone-300/60 rounded-xl bg-stone-100/50">
        {Array.from({ length: 40 }).map((_, i) => {
          const opacities = [0.15, 0.3, 0.5, 0.7, 0.9, 0.4]
          const opacity = opacities[i % opacities.length]
          return (
            <div
              key={i}
              className="aspect-square rounded-[2px] bg-stone-800"
              style={{ opacity }}
            />
          )
        })}
      </div>
    )
  },
  {
    index: "3",
    title: "Verdict AI",
    subtitle: "Legal Intelligence Platform",
    stack: ["Python", "FAISS", "RAG", "LangChain", "Redis"],
    description: "Multilingual legal research platform for Indian court judgment discovery using RAG, hybrid semantic search, and FAISS vector indexing across 100K+ chunks.",
    className: "bg-[#0a8dc8] text-stone-900 border-black",

    config: {
      x: 0,
      y: -30,
      rotation: -5,
    },
    // Wavy horizontal lines skeleton
    skeleton: (
      <div className="w-full h-28 opacity-80 border border-blue-400/40 rounded-xl bg-[#087cb0]/30 p-2 flex items-center justify-center">
        <svg viewBox="0 0 256 120" className="w-full h-full text-white/30">
          {Array.from({ length: 5 }).map((_, waveIdx) => {
            const points = Array.from({ length: 50 }).map((_, i) => {
              const x = (i * 256) / 49
              const y = 60 + Math.sin(i * 0.35 + waveIdx * 0.9) * 12 + waveIdx * 6
              return `${x},${y}`
            }).join(" ")
            return (
              <polyline
                key={waveIdx}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                points={points}
              />
            )
          })}
        </svg>
      </div>
    )
  },
  {

    index: "4",
    title: "Eternal",
    subtitle: "First Freelance Client",
    stack: ["React.js", "Tailwind CSS", "MongoDB", "Vercel"],
    description: "Full business website for a ceramic and sanitary ware exporter — product catalog, inquiry forms, and a clean B2B storefront.",
    className: "bg-[#48d28c] text-stone-900 border-black",
    config: {
      x: 160,
      y: 20,
      rotation: -3,
    },
    // Matrix rows of tiny bars skeleton
    skeleton: (
      <div className="flex flex-col gap-1.5 w-full h-28 opacity-85 border border-emerald-400/40 rounded-xl bg-[#39ba78]/30 p-3 justify-center overflow-hidden">
        {Array.from({ length: 5 }).map((_, rowIdx) => (
          <div key={rowIdx} className="flex gap-1 w-full overflow-hidden">
            {Array.from({ length: 28 }).map((_, barIdx) => {
              const h = 6 + ((barIdx * 3 + rowIdx * 5) % 10)
              return (
                <div
                  key={barIdx}
                  style={{ height: `${h}px` }}
                  className="w-1.5 bg-[#155a36] rounded-[1px] opacity-75"
                />
              )
            })}
          </div>
        ))}
      </div>
    )
  },
  {

    index: "5",
    title: "Connect Four",
    subtitle: "Where It All Began",
    stack: ["HTML", "CSS", "JavaScript"],
    description: "My very first project — a classic Connect Four game built from scratch in first year with vanilla HTML, CSS, and JS.",
    className: "bg-[#1c1b1a] text-stone-100 border-black",
    config: {
      x: 320,
      y: -25,
      rotation: 5,
    },
    // Interface layout wireframe blueprint skeleton
    skeleton: (
      <div className="w-full h-28 border border-white/10 rounded-xl p-2.5 flex gap-2 relative bg-neutral-900/40 select-none">
        <div className="w-1/3 border border-dashed border-white/20 rounded flex flex-col justify-between p-1.5">
          <div className="w-5 h-5 rounded-full border border-white/20" />
          <div className="h-1.5 w-full bg-white/20 rounded" />
        </div>
        <div className="flex-1 flex flex-col gap-1.5">
          <div className="h-6 border border-dashed border-white/20 rounded flex gap-1 items-center px-1">
            <div className="w-2 h-2 rounded bg-white/35" />
            <div className="w-2 h-2 rounded bg-white/35" />
            <div className="w-2 h-2 rounded bg-white/35" />
          </div>
          <div className="flex-1 border border-dashed border-white/20 rounded" />
        </div>
      </div>
    )
  }
]

interface SwipeButtonProps {
  onSwipeSuccess: () => void
  isDarkCard?: boolean
}

function SwipeButton({ onSwipeSuccess, isDarkCard = false }: SwipeButtonProps) {
  const x = useMotionValue(0)

  const textOpacity = useTransform(x, [0, 120], [0.8, 0])

  // Slide fill behind the handle: starts at 34px (2px padding + 32px handle width)
  const fillWidth = useTransform(x, (val) => `${val + 34}px`)

  const handleDragEnd = () => {

    if (x.get() > 150) {
      animate(x, 192, {
        type: "spring",
        stiffness: 400,
        damping: 30
      }).then(() => {
        onSwipeSuccess()
        setTimeout(() => x.set(0), 300)
      })
    } else {
      animate(x, 0, { type: "spring", stiffness: 250, damping: 25 })
    }
  }

  return (
    <div
      className={`w-full h-9 border rounded-2xl relative p-0.5 overflow-hidden flex items-center select-none cursor-pointer ${isDarkCard
        ? "bg-white/10 border-white/15"
        : "bg-black/10 border-black/15"
        }`}
    >
      <motion.div
        className={`absolute left-0 top-0 bottom-0 rounded-2xl ${isDarkCard ? "bg-white/20" : "bg-stone-900/20"
          }`}
        style={{ width: fillWidth }}
      />

      <motion.span
        className="absolute inset-0 flex items-center justify-center text-[9px] font-mono font-bold uppercase tracking-widest pointer-events-none select-none text-current opacity-75"
        style={{ opacity: textOpacity }}
      >
        » Swipe to explore
      </motion.span>

      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 192 }}
        dragElastic={0.1}
        dragMomentum={false}
        onDragEnd={handleDragEnd}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 1.08 }}
        style={{ x }}
        className="w-8 h-8 rounded-2xl flex items-center justify-center shadow-md cursor-grab active:cursor-grabbing z-10 bg-stone-100 text-stone-950"
      >
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-current stroke-[3]">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </motion.div>
    </div>
  )
}

export default function Projects() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [mousePos, setMousePos] = useState({ x: 114, y: 144, rotateX: 0, rotateY: 0, active: false })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener("resize", handleResize)

    if (window.innerWidth < 768) {
      setSelectedIndex(0) // Default to first card (Omera) on mobile
    }

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Cards sorted by x for relative positioning math
  const sortedByX = [...Cards].map((c, i) => ({ card: c, arrIdx: i })).sort((a, b) => a.card.config.x - b.card.config.x)

  const handleCardClick = (arrIdx: number) => {
    if (selectedIndex === arrIdx) {
      // Already selected — collapse/deselect if on desktop, do nothing on mobile
      if (!isMobile) {
        setSelectedIndex(null)
      }
    } else {
      // Select this card
      setSelectedIndex(arrIdx)
      setHoveredIndex(null)
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
    if (selectedIndex !== null) return // no tilt while a card is expanded
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const normX = x / rect.width - 0.5
    const normY = y / rect.height - 0.5
    const maxTilt = 12
    setMousePos({ x, y, rotateX: -normY * maxTilt, rotateY: normX * maxTilt, active: true })
    setHoveredIndex(index)
  }

  const handleMouseLeave = () => {
    setHoveredIndex(null)
    setMousePos((prev) => ({ ...prev, active: false, rotateX: 0, rotateY: 0 }))
  }

  return (
    <section
      id="projects"
      className="relative w-full h-screen bg-[#f5f5f0] dark:bg-[#0a0a0a] text-black dark:text-white transition-colors duration-300 border-b border-neutral-300 dark:border-neutral-800/60 py-16 overflow-hidden flex flex-col justify-evenly items-center"
    >
      {/* Centered full-height vertical borders wrapper */}
      <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-full max-w-7xl pointer-events-none z-0">
        <div className="absolute top-0 left-0 h-full border-l border-neutral-300 dark:border-neutral-800/60" />
        <div className="absolute top-0 right-0 h-full border-l border-neutral-300 dark:border-neutral-800/60" />
      </div>

      <div className="max-w-5xl mx-auto w-full px-6 md:px-12 relative z-10 flex flex-col items-center flex-1 justify-center">
        {/* Bold uppercase Heading PROJECTS */}
        <div className="w-full text-center mb-10 shrink-0">
          <h2 className="text-4xl md:text-5xl font-black text-black dark:text-white uppercase tracking-normal font-sans select-none">
            PROJECTS
          </h2>
        </div>

        {/* Spread / Fan stack layout container — clicking the bg deselects */}
        <div
          className="relative w-full flex-1 min-h-[480px] flex justify-center items-center"
          onClick={() => {
            if (typeof window !== "undefined" && window.innerWidth >= 768) {
              setSelectedIndex(null)
            }
          }}
        >
          {Cards.map((card, index) => {
            const isHovered = hoveredIndex === index && selectedIndex === null
            const isSelected = selectedIndex === index
            const somethingSelected = selectedIndex !== null
            const rotateX = isHovered && mousePos.active ? mousePos.rotateX : 0
            const rotateY = isHovered && mousePos.active ? mousePos.rotateY : 0

            // ─── Compute animated x / y / rotate / zIndex ────────────────────
            // Anchor: left=calc(50%-114px), top=calc(50%-144px)
            // A card with width 228 and x=0 has its center at exactly 50%/50%.
            // Active card (360×464): compensate for larger size so it stays centered:
            //   x-comp = -(360-228)/2 = -66   y-comp = -(464-288)/2 = -88
            // Compressed non-active (172×220): card center is 28px left of normal at x=0
            //   so we add +28 to x to keep math centred on 50%.

            let animX: number, animY: number, animRotate: number, animZIndex: number, animaScale: number;

            if (!somethingSelected) {
              // Normal fan layout with active hover spreading (InterfaceCraft style)
              const isHovered = hoveredIndex === index
              animaScale = isHovered ? 1.08 : 1.0

              if (hoveredIndex !== null) {
                if (index === hoveredIndex) {
                  animX = card.config.x
                  animY = card.config.y - 30               // Lift hovered card
                  animRotate = card.config.rotation * 0.15 // Straighten hovered card
                  animZIndex = 50
                } else if (index < hoveredIndex) {
                  animX = card.config.x - 35               // Push cards to the left
                  animY = card.config.y + 10               // Push down slightly
                  animRotate = card.config.rotation * 1.15 // Tilt away
                  animZIndex = index + 1
                  animaScale = 0.94                        // Shrink slightly
                } else {
                  animX = card.config.x + 35               // Push cards to the right
                  animY = card.config.y + 10               // Push down slightly
                  animRotate = card.config.rotation * 1.15 // Tilt away
                  animZIndex = index + 1
                  animaScale = 0.94                        // Shrink slightly
                }
              } else {
                // No card hovered
                animX = card.config.x
                animY = card.config.y
                animRotate = card.config.rotation
                animZIndex = index + 1
              }
            } else if (isSelected) {
              // Active card — centered, pushed upward slightly
              animX = 0
              animY = isMobile ? -50 : -70
              animRotate = 0
              animZIndex = 50
              animaScale = isMobile ? 1.25 : 1.53
            } else {
              // Non-active: stack BEHIND active card, tops hidden under it, bottoms peeking out
              const nonActiveInOrder = sortedByX.filter(e => e.arrIdx !== selectedIndex)
              const stackIdx = nonActiveInOrder.findIndex(e => e.arrIdx === index)
              const totalStack = nonActiveInOrder.length // 4

              // -1.5, -0.5, 0.5, 1.5  →  fan left to right
              const spread = stackIdx - (totalStack - 1) / 2

              // Centre stack horizontally under active card.
              animX = spread * (isMobile ? 24 : 38)
              // Push them into the lower half of the active card so their tops are hidden
              animY = isMobile ? 200 : 255
              animRotate = [-5, 3, -3, 4][stackIdx] ?? 0 // select the custom angle for this card's position in the stack
              animZIndex = 51           // always < active card z:50, so active covers their tops
              animaScale = isMobile ? 0.55 : 0.68
            }

            // Card dimensions per state (constant base size, scaled dynamically via GPU)
            const cardW = 228
            const cardH = 288

            return (
              <motion.div
                key={card.title}
                className="absolute"
                layoutId={somethingSelected ? `card-${card.index}` : undefined}
                style={{
                  left: "calc(50% - 114px)",
                  top: "calc(50% - 144px)",
                  perspective: 1000,
                  transformStyle: "preserve-3d",
                  zIndex: animZIndex,
                }}
                initial={{ y: 400, x: 0, filter: "blur(12px)", opacity: 0 }}
                animate={{
                  x: animX,
                  y: animY,
                  rotate: animRotate,
                  rotateX: rotateX,
                  rotateY: rotateY,
                  z: isSelected ? 50 : 0,  // translateZ to force active card in front in 3D perspective
                  scale: animaScale,       // GPU accelerated scaling
                  filter: "blur(0px)",
                  opacity: 1,
                }}
                transition={{
                  type: "spring",
                  stiffness: somethingSelected ? 100 : (isHovered ? 60 : 100),
                  damping: somethingSelected ? 13 : (isHovered ? 10 : 15),
                  mass: 1,
                }}
              >
                <motion.button
                  onClick={(e) => { e.stopPropagation(); handleCardClick(index) }}
                  onMouseMove={(e) => handleMouseMove(e, index)}
                  onMouseLeave={handleMouseLeave}
                  className={`relative flex flex-col justify-around items-start rounded-2xl border shadow-lg text-left select-none overflow-hidden cursor-pointer ${card.className}`}
                  style={{
                    width: cardW,
                    height: cardH,
                    padding: "15px",
                    transformStyle: "preserve-3d"
                  }}
                >
                  {/* Top: Card skeleton graphic */}
                  <div className="w-full select-none pointer-events-none">
                    {card.skeleton}
                  </div>

                  {/* Bottom: Title, description, tags */}
                  <div className="w-full flex flex-col mt-2 gap-1">
                    <h3 className={`font-serif font-black tracking-tight leading-tight select-none mb-0.5 transition-all ${isSelected ? 'text-xl' : 'text-base'}`}>
                      {card.title}
                    </h3>
                    {isSelected && (
                      <p className="text-[8px] opacity-50 font-mono uppercase tracking-wider select-none mb-1">
                        {card.subtitle}
                      </p>
                    )}
                    {isSelected && (
                      <p className="opacity-75 font-sans leading-snug select-none mb-2 text-[10px] line-clamp-4">
                        {card.description}
                      </p>
                    )}

                    {/* Stack tags */}
                    <div className="flex flex-wrap gap-1">
                      {card.stack.map((tag) => (
                        <span
                          key={tag}
                          className="text-[8px] font-black tracking-wider px-2 py-0.5 border border-black/10 text-neutral-900 bg-[#F9F2DE] rounded uppercase select-none"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Spacer to prevent text/tags overlapping absolute button */}
                    {isSelected && <div className="h-12 w-full" />}
                  </div>

                  {/* CTA swipe button on active card (fixed curvy button matching card margins) */}
                  {isSelected && (
                    <div className="absolute bottom-0 left-0 right-0 w-full select-none z-20" onClick={(e) => e.stopPropagation()}>
                      <SwipeButton
                        isDarkCard={card.className.includes("text-stone-100")}
                        onSwipeSuccess={() => window.location.hash = `#/project/${card.index}`}
                      />
                    </div>
                  )}
                </motion.button>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}


