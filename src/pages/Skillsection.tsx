import { useEffect, useRef, useState } from "react"
import Matter from "matter-js"
import { cn } from "../lib/utils.ts"

// 1. Structured Skills Data
export const skillsData = [
  {
    category: "Languages",
    items: ["C++", "Java", "Python", "JavaScript", "TypeScript"],
  },
  {
    category: "Frontend",
    items: ["React.js", "Next.js", "Tailwind CSS", "Framer Motion"],
  },
  {
    category: "Backend",
    items: [
      "Node.js",
      "Express.js",
      "REST API",
      "Microservices",
      "WebSocket",
      "JWT",
      "OAuth",
    ],
  },
  {
    category: "Databases",
    items: ["MongoDB", "MySQL", "PostgreSQL", "Redis"],
  },
  {
    category: "DevOps",
    items: ["Git", "Docker", "AWS", "Vercel", "Render"],
  },
  {
    category: "AI / ML",
    items: [
      "LLM API Integration",
      "RAG Pipelines",
      "Langchain",
      "Agentic AI",
    ],
  },
]

// Mapping of skills to their respective icon images from public/languageicons
export const SKILL_ICONS: Record<string, string> = {
  "Java": "/languageicons/java.png",
  "JavaScript": "/languageicons/javascript.png",
  "TypeScript": "/languageicons/typescript.png",
  "SQL": "/languageicons/sql.png",
  "React.js": "/languageicons/react.png",
  "Tailwind CSS": "/languageicons/tailwind.png",
  "Framer Motion": "/languageicons/framer.png",
  "Node.js": "/languageicons/nodejs.png",
  "MongoDB": "/languageicons/mongo-db.png",
  "MySQL": "/languageicons/mysql.png",
  "Git": "/languageicons/git.png",
  "Python": "/languageicons/python.png",
  "C++": "/languageicons/cpp.png",
  "Docker": "/languageicons/docker.png",
  "Redis": "/languageicons/redis.png",
  "Next.js": "/languageicons/next.png",
  "PostgreSQL": "/languageicons/postgres.png",
  "Vercel": "/languageicons/vercel.png",
  "Express.js": "/languageicons/express.png",
  "AWS": "/languageicons/aws.png",
  "JWT": "/languageicons/jwt.png",
  "Render": "/languageicons/render.png",
  "Langchain": "/languageicons/langchain.png"

}

// Extract all flat items with their category mapped for the physics playground
const FLAT_SKILLS = skillsData.flatMap((cat) =>
  cat.items.map((item) => ({
    name: item,
    category: cat.category
  }))
)

// Dynamic theme configuration for each category matching the exact requested CSS border/glow colors
const CATEGORY_THEMES: Record<string, { border: string; bg: string; dot: string; glow: string; text: string; shadow: string }> = {
  "Languages": {
    border: "border-blue-300/40 dark:border-blue-500/20",
    bg: "bg-blue-500/5 dark:bg-blue-500/10",
    dot: "bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]",
    glow: "group-hover:border-blue-400 dark:group-hover:border-blue-500/60 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.1)]",
    text: "text-blue-600 dark:text-blue-400",
    shadow: "shadow-[0_0_12px_rgba(59,130,246,0.15)]"
  },
  "Frontend": {
    border: "border-emerald-300/40 dark:border-emerald-500/20",
    bg: "bg-emerald-500/5 dark:bg-emerald-500/10",
    dot: "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]",
    glow: "group-hover:border-emerald-400 dark:group-hover:border-emerald-500/60 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.1)]",
    text: "text-emerald-600 dark:text-emerald-400",
    shadow: "shadow-[0_0_12px_rgba(16,185,129,0.15)]"
  },
  "Backend": {
    border: "border-violet-300/40 dark:border-violet-500/20",
    bg: "bg-violet-500/5 dark:bg-violet-500/10",
    dot: "bg-violet-500 shadow-[0_0_8px_rgba(139,92,246,0.5)]",
    glow: "group-hover:border-violet-400 dark:group-hover:border-violet-500/60 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.1)]",
    text: "text-violet-600 dark:text-violet-400",
    shadow: "shadow-[0_0_12px_rgba(139,92,246,0.15)]"
  },
  "Databases": {
    border: "border-amber-300/40 dark:border-amber-500/20",
    bg: "bg-amber-500/5 dark:bg-amber-500/10",
    dot: "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]",
    glow: "group-hover:border-amber-400 dark:group-hover:border-amber-500/60 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.1)]",
    text: "text-amber-600 dark:text-amber-400",
    shadow: "shadow-[0_0_12px_rgba(245,158,11,0.15)]"
  },
  "DevOps": {
    border: "border-rose-300/40 dark:border-rose-500/20",
    bg: "bg-rose-500/5 dark:bg-rose-500/10",
    dot: "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]",
    glow: "group-hover:border-rose-400 dark:group-hover:border-rose-500/60 group-hover:shadow-[0_0_20px_rgba(244,63,94,0.1)]",
    text: "text-rose-600 dark:text-rose-400",
    shadow: "shadow-[0_0_12px_rgba(244,63,94,0.15)]"
  },
  "AI / ML": {
    border: "border-cyan-300/40 dark:border-cyan-500/20",
    bg: "bg-cyan-500/5 dark:bg-cyan-500/10",
    dot: "bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.5)]",
    glow: "group-hover:border-cyan-400 dark:group-hover:border-cyan-500/60 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.1)]",
    text: "text-cyan-600 dark:text-cyan-400",
    shadow: "shadow-[0_0_12px_rgba(6,182,212,0.15)]"
  }
}

// Single Source of Truth helper for layout coordinates and sizes
const getLayoutConfig = (width: number, height: number) => {
  const isMobile = width < 768
  const p = isMobile ? 16 : 24  // padding
  const g = isMobile ? 16 : 24  // gap

  if (isMobile) {
    const colW = width - 2 * p
    const rowH = (height - 2 * p - 5 * g) / 6

    const centers = skillsData.map((cat, idx) => {
      const centerY = p + idx * (rowH + g) + rowH / 2
      const shelfY = p + idx * (rowH + g) + rowH - 6
      return {
        category: cat.category,
        x: width / 2,
        y: centerY,
        shelfY: shelfY,
        shelfWidth: colW * 0.95,
        width: colW,
        height: rowH
      }
    })

    return { centers, colW, rowH, isMobile }
  } else {
    const colW = (width - 2 * p - 2 * g) / 3
    const rowH = (height - 2 * p - g) / 2

    const centers = skillsData.map((cat) => {
      let col = 0
      let row = 0
      switch (cat.category) {
        case "Languages": col = 0; row = 0; break
        case "Frontend": col = 1; row = 0; break
        case "Backend": col = 2; row = 0; break
        case "Databases": col = 0; row = 1; break
        case "DevOps": col = 1; row = 1; break
        case "AI / ML": col = 2; row = 1; break
      }

      const centerX = p + col * (colW + g) + colW / 2
      const centerY = p + row * (rowH + g) + rowH / 2
      const shelfY = p + row * (rowH + g) + rowH - 6

      return {
        category: cat.category,
        x: centerX,
        y: centerY,
        shelfY: shelfY,
        shelfWidth: colW * 0.92,
        width: colW,
        height: rowH
      }
    })

    return { centers, colW, rowH, isMobile }
  }
}

export default function Skillsection() {
  const containerRef = useRef<HTMLDivElement>(null)

  const [isDragging, setIsDragging] = useState(false)
  const [activeDragId, setActiveDragId] = useState<number | null>(null)

  // Track viewport dimensions in React state to sync visual background containers
  const [dimensions, setDimensions] = useState({ width: 1000, height: 650 })

  // Intersection state to pause engine execution when scrolled away
  const [isInView, setIsInView] = useState(false)

  // Track viewport width responsiveness
  const [isDesktop, setIsDesktop] = useState(typeof window !== "undefined" ? window.innerWidth >= 1024 : false)

  // Track active category for mobile tabbed view
  const [activeCategory, setActiveCategory] = useState(skillsData[0].category)

  // Array of refs to update DOM elements directly in 60fps loop
  const elementsRef = useRef<(HTMLDivElement | null)[]>([])
  const shelvesRef = useRef<Matter.Body[]>([])

  const currentLayout = getLayoutConfig(dimensions.width, dimensions.height)

  useEffect(() => {
    const checkWidth = () => {
      setIsDesktop(window.innerWidth >= 1024)
    }
    checkWidth()
    window.addEventListener("resize", checkWidth)
    return () => window.removeEventListener("resize", checkWidth)
  }, [])

  // Intersection Observer for viewport visibility detection
  useEffect(() => {
    if (!isDesktop) return
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { threshold: 0.01 }
    )
    observer.observe(container)
    return () => observer.disconnect()
  }, [isDesktop])

  useEffect(() => {
    if (!isDesktop) return
    // Completely skip running the physics loop and engine updates when offscreen
    if (!isInView) return

    const container = containerRef.current
    if (!container) return

    const width = container.clientWidth
    const height = container.clientHeight
    setDimensions({ width, height })

    // 1. Initialize Matter.js Physics Engine with Earth-like Gravity (y: 1.4)
    const engine = Matter.Engine.create({
      gravity: { y: 1.4 }
    })
    const { world } = engine
    const runner = Matter.Runner.create()

    // 2. Create Outer Bounding Walls
    const floor = Matter.Bodies.rectangle(width / 2, height + 30, width + 400, 60, {
      isStatic: true,
      friction: 0.1
    })
    const ceiling = Matter.Bodies.rectangle(width / 2, -30, width + 400, 60, {
      isStatic: true
    })
    const leftWall = Matter.Bodies.rectangle(-30, height / 2, 60, height + 400, {
      isStatic: true,
      friction: 0.1
    })
    const rightWall = Matter.Bodies.rectangle(width + 30, height / 2, 60, height + 400, {
      isStatic: true,
      friction: 0.1
    })

    // 3. Create Shelves
    const initialLayout = getLayoutConfig(width, height)
    const shelves = initialLayout.centers.map((c) => {
      return Matter.Bodies.rectangle(c.x, c.shelfY, c.shelfWidth, 12, {
        isStatic: true,
        friction: 0.15
      })
    })
    shelvesRef.current = shelves

    // 4. Create Technology Physics Pills
    const pillHeight = 36
    const bodiesData = FLAT_SKILLS.map((skill, index) => {
      const iconUrl = SKILL_ICONS[skill.name]
      const currentWidth = iconUrl ? 75 : skill.name.length * 8 + 36
      const currentHeight = iconUrl ? 75 : 36

      const catConfig = initialLayout.centers.find((c) => c.category === skill.category)
      // Spawn pills floating safely above the shelf levels to prevent overlapping collision snaps
      const spawnX = catConfig ? catConfig.x + (Math.random() * 40 - 20) : width / 2
      const spawnY = catConfig ? catConfig.y - (pillHeight * 1.5) - (index % 3) * 35 : height / 2

      const body = Matter.Bodies.rectangle(spawnX, spawnY, currentWidth, currentHeight, {
        restitution: 0.15,
        friction: 0.1,
        frictionAir: 0.02,
        density: 0.001,
        chamfer: iconUrl ? { radius: 10 } : { radius: 18 }
      })

      return {
        body,
        id: index,
        category: skill.category,
        width: currentWidth,
        height: currentHeight
      }
    })

    const bodies = bodiesData.map((d) => d.body)

    // 5. Mouse Constraint for Dragging
    const mouse = Matter.Mouse.create(container)
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.25,
        render: { visible: false }
      }
    })

    // Add boundaries, shelves, and pills to Matter World
    Matter.Composite.add(world, [
      floor,
      ceiling,
      leftWall,
      rightWall,
      ...shelves,
      ...bodies,
      mouseConstraint
    ])

    // Run Engine
    Matter.Runner.run(runner, engine)

    // 6. Hooke's Spring Law Attraction: steer pills horizontally back to their designated container columns
    const applyMagneticForces = () => {
      const currentWidth = container.clientWidth
      const currentHeight = container.clientHeight
      const activeLayout = getLayoutConfig(currentWidth, currentHeight)

      bodiesData.forEach(({ body, category }) => {
        if (mouseConstraint.body === body) return

        const catConfig = activeLayout.centers.find((c) => c.category === category)
        if (catConfig) {
          const dx = catConfig.x - body.position.x
          const dy = catConfig.y - body.position.y

          // Horizontal magnetic correction keeps pills aligned with their card columns
          const distanceX = Math.abs(dx)
          if (distanceX > 6) {
            const forceMagnitudeX = Math.min(0.000035, distanceX * 0.00000015)
            Matter.Body.applyForce(body, body.position, {
              x: dx * forceMagnitudeX,
              y: 0
            })
          }

          // Gentle vertical pull only triggers if a pill wanders completely out of its row bounds
          const distanceY = Math.abs(dy)
          if (distanceY > catConfig.height / 2 + 30) {
            const forceMagnitudeY = Math.min(0.00002, distanceY * 0.00000008)
            Matter.Body.applyForce(body, body.position, {
              x: 0,
              y: dy * forceMagnitudeY
            })
          }
        }
      })
    }

    // Clamp pill positions to remain strictly within their designated category container bounds
    const clampPillsToBoundaries = () => {
      const currentWidth = container.clientWidth
      const currentHeight = container.clientHeight
      const activeLayout = getLayoutConfig(currentWidth, currentHeight)

      bodiesData.forEach(({ body, category, width: w, height: h }) => {
        const catConfig = activeLayout.centers.find((c) => c.category === category)
        if (!catConfig) return

        // Calculate limits based on the category container boundaries
        const minX = catConfig.x - catConfig.width / 2 + w / 2
        const maxX = catConfig.x + catConfig.width / 2 - w / 2
        const minY = catConfig.y - catConfig.height / 2 + h / 2
        const maxY = catConfig.y + catConfig.height / 2 - h / 2

        let out = false
        let newX = body.position.x
        let newY = body.position.y

        if (body.position.x < minX) {
          newX = minX
          out = true
        } else if (body.position.x > maxX) {
          newX = maxX
          out = true
        }

        if (body.position.y < minY) {
          newY = minY
          out = true
        } else if (body.position.y > maxY) {
          newY = maxY
          out = true
        }

        if (out) {
          Matter.Body.setPosition(body, { x: newX, y: newY })
          Matter.Body.setVelocity(body, {
            x: newX === minX || newX === maxX ? 0 : body.velocity.x,
            y: newY === minY || newY === maxY ? 0 : body.velocity.y
          })

          // Zero out angular velocity and gently restore angle to 0 (horizontal)
          // to prevent the corners of the pills from getting wedged or spinning crazy in corners
          Matter.Body.setAngularVelocity(body, 0)
          const angleDiff = 0 - body.angle
          Matter.Body.setAngle(body, body.angle + angleDiff * 0.15)
        }
      })
    }

    Matter.Events.on(engine, "beforeUpdate", () => {
      applyMagneticForces()
      clampPillsToBoundaries()
    })

    // 7. Direct DOM update loop for 60fps performance (Hardware Accelerated using translate3d)
    const updateElements = () => {
      clampPillsToBoundaries()
      bodiesData.forEach(({ body, id, width: w, height: h }) => {
        const el = elementsRef.current[id]
        if (el) {
          el.style.transform = `translate3d(${body.position.x - w / 2}px, ${body.position.y - h / 2}px, 0) rotate(${body.angle}rad)`
        }
      })
    }

    Matter.Events.on(engine, "afterUpdate", updateElements)

    // 8. Grab states
    Matter.Events.on(mouseConstraint, "startdrag", (event) => {
      setIsDragging(true)
      const draggedBody = (event as any).body
      const matchedData = bodiesData.find((d) => d.body === draggedBody)
      if (matchedData) {
        setActiveDragId(matchedData.id)
      }
      container.style.cursor = "grabbing"
    })

    Matter.Events.on(mouseConstraint, "enddrag", () => {
      setIsDragging(false)
      setActiveDragId(null)
      container.style.cursor = "grab"
    })

    const updateCursor = () => {
      if (isDragging) return
      const mousePos = mouse.position
      const found = Matter.Query.point(bodies, mousePos)
      if (found.length > 0) {
        container.style.cursor = "grab"
      } else {
        container.style.cursor = "default"
      }
    }

    Matter.Events.on(engine, "afterUpdate", updateCursor)

    // 9. Intercept event propagation in the capture phase to completely bypass Matter.js event prevention.
    // This restores native trackpad, touchpad, and mouse scroll behaviors over the container.
    const handleScrollCapture = (e: Event) => {
      e.stopPropagation()
    }

    container.addEventListener("wheel", handleScrollCapture, { capture: true, passive: true })
    container.addEventListener("mousewheel", handleScrollCapture, { capture: true, passive: true })
    container.addEventListener("DOMMouseScroll", handleScrollCapture, { capture: true, passive: true })

    // Allow mobile touch scrolling when swiping empty areas, but let touch events reach Matter.js when dragging a pill.
    const handleTouchCapture = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0]
        const rect = container.getBoundingClientRect()
        const mousePos = {
          x: touch.clientX - rect.left,
          y: touch.clientY - rect.top
        }
        const hit = Matter.Query.point(bodies, mousePos)
        if (hit.length === 0) {
          // Swiping on background: stop propagation so Matter.js doesn't hijack page scroll
          e.stopPropagation()
        }
      }
    }

    container.addEventListener("touchstart", handleTouchCapture, { capture: true, passive: true })
    container.addEventListener("touchmove", handleTouchCapture, { capture: true, passive: true })

    // 10. Resize Observer
    const handleResize = () => {
      const w = container.clientWidth
      const h = container.clientHeight
      setDimensions({ width: w, height: h })

      // Relocate outer boundaries
      Matter.Body.setPosition(floor, { x: w / 2, y: h + 30 })
      Matter.Body.setPosition(ceiling, { x: w / 2, y: -30 })
      Matter.Body.setPosition(leftWall, { x: -30, y: h / 2 })
      Matter.Body.setPosition(rightWall, { x: w + 30, y: h / 2 })

      // Update static platform shelves by clearing and recreating them at new dimensions
      Matter.Composite.remove(world, shelvesRef.current)
      const updatedLayout = getLayoutConfig(w, h)
      const newShelves = updatedLayout.centers.map((c) => {
        return Matter.Bodies.rectangle(c.x, c.shelfY, c.shelfWidth, 12, {
          isStatic: true,
          friction: 0.15
        })
      })
      shelvesRef.current = newShelves
      Matter.Composite.add(world, newShelves)
    }

    const resizeObserver = new ResizeObserver(handleResize)
    resizeObserver.observe(container)

    return () => {
      Matter.Runner.stop(runner)
      Matter.Engine.clear(engine)
      resizeObserver.disconnect()

      // Clean up event listeners
      container.removeEventListener("wheel", handleScrollCapture, { capture: true })
      container.removeEventListener("mousewheel", handleScrollCapture, { capture: true })
      container.removeEventListener("DOMMouseScroll", handleScrollCapture, { capture: true })
      container.removeEventListener("touchstart", handleTouchCapture, { capture: true })
      container.removeEventListener("touchmove", handleTouchCapture, { capture: true })
    }
  }, [isInView, isDesktop]) // Re-initialize only when entering/exiting view boundaries or switching device modes

  return (
    <section
      id="skills"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh"
      }}
      className="relative w-full bg-[#f5f5f0] dark:bg-[#0a0a0a] text-black dark:text-white transition-colors duration-300 border-t border-b border-[var(--pattern)] [--pattern:var(--color-neutral-300)] dark:[--pattern:rgba(255,255,255,0.08)] py-20"
    >
      {/* Centered full-height vertical borders wrapper */}
      <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-full max-w-7xl pointer-events-none z-10">
        <div className="absolute top-0 left-0 h-full border-l border-[var(--pattern)]" />
        <div className="absolute top-0 right-0 h-full border-l border-[var(--pattern)]" />
      </div>

      {/* Header Container */}
      <div className="max-w-7xl  mx-auto w-full px-8 md:px-20 mb-16 flex flex-col items-center shrink-0">
        <div className="mb-16  text-center relative z-10 shrink-0" style={{ paddingBottom: "100px" }}>

          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-3 text-neutral-900 dark:text-neutral-50 uppercase">
            SKILLS
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 text-xs max-w-md mx-auto mt-2 leading-relaxed">
            Technologies and tools I have worked with.
          </p>
        </div>
      </div>

      {isDesktop ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%"
          }}
          className="max-w-7xl mx-auto px-4 md:px-20 relative flex-1"
        >
          {/* Dynamic Physics Canvas Area with Blueprint Grid Dots */}
          <div
            ref={containerRef}
            style={{ touchAction: "pan-y" }}
            className="w-full h-[650px] relative overflow-hidden select-none rounded-xl border border-neutral-300/40 dark:border-neutral-800/40 bg-[#f3f3eb] dark:bg-[#070707] bg-[radial-gradient(var(--pattern)_1px,transparent_1px)] [background-size:24px_24px]"
          >
            {/* Visual Category "Baskets" positioned explicitly using layout configuration coordinates */}
            {currentLayout.centers.map((c) => {
              const theme = CATEGORY_THEMES[c.category] || {
                border: "border-neutral-200 dark:border-neutral-800/40",
                bg: "bg-neutral-500/5",
                dot: "bg-neutral-500",
                glow: "",
                text: "text-neutral-600",
                shadow: ""
              }

              return (
                <div
                  key={c.category}
                  style={{
                    position: "absolute",
                    left: `${c.x - c.width / 2}px`,
                    top: `${c.y - c.height / 2}px`,
                    width: `${c.width}px`,
                    height: `${c.height}px`
                  }}
                  className={cn(
                    "rounded-xl border flex flex-col p-5 bg-[#fcfcfa]/60 dark:bg-neutral-950/45 backdrop-blur-[3px] transition-all duration-500 relative group pointer-events-none",
                    "border-neutral-200/60 dark:border-neutral-855/20",
                    theme.border,
                    theme.glow,
                    "shadow-[0_4px_20px_rgba(0,0,0,0.01)] dark:shadow-[0_4px_25px_rgba(0,0,0,0.15)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)]"
                  )}
                >
                  {/* Category Header */}
                  <div className="flex items-center gap-2 mb-2 shrink-0">
                    <span className={cn("w-1.5 h-1.5 rounded-full animate-pulse", theme.dot)} />
                    <span className={cn("text-[10px] font-bold uppercase tracking-widest font-mono", theme.text)}>
                      {c.category}
                    </span>
                  </div>

                  {/* Dashed drop shelf indicator inside basket */}
                  <div className="flex-1 border border-dashed border-neutral-300/25 dark:border-neutral-800/20 rounded-lg flex items-end justify-center pb-2 bg-neutral-200/5 dark:bg-neutral-900/5">
                    <span className="text-[9px] font-mono text-neutral-400/30 dark:text-neutral-500/20 uppercase tracking-widest mb-1.5">
                      Shelf Platform
                    </span>
                  </div>
                </div>
              )
            })}

            {/* Dynamic Interactive Skill Glass Pills - Rendered ONLY if the container is visible */}
            {isInView && FLAT_SKILLS.map((skill, index) => {
              const isBeingDragged = activeDragId === index
              const theme = CATEGORY_THEMES[skill.category] || {
                border: "border-neutral-300 dark:border-neutral-800",
                bg: "bg-white dark:bg-neutral-900",
                text: "text-neutral-800 dark:text-neutral-200",
                dot: "bg-neutral-500",
                shadow: ""
              }
              const iconUrl = SKILL_ICONS[skill.name]
              const currentWidth = iconUrl ? 75 : skill.name.length * 8 + 36
              const currentHeight = iconUrl ? 75 : 36

              return (
                <div
                  key={`${skill.name}-${index}`}
                  ref={(el) => {
                    elementsRef.current[index] = el
                  }}
                  style={{
                    width: `${currentWidth}px`,
                    height: `${currentHeight}px`
                  }}
                  className="absolute top-0 left-0 flex items-center justify-center select-none pointer-events-none will-change-transform"
                >
                  <div
                    className={cn(
                      "w-full h-full flex items-center justify-center transition-all duration-200 ease-out",
                      iconUrl
                        ? cn(
                          "filter drop-shadow-[0_8px_8px_rgba(0,0,0,0.18)] dark:drop-shadow-[0_8px_8px_rgba(255,255,255,0.06)]",
                          isBeingDragged ? "scale-115 -translate-y-2.5 z-20 drop-shadow-[0_24px_24px_rgba(0,0,0,0.35)] dark:drop-shadow-[0_24px_24px_rgba(255,255,255,0.18)]" : ""
                        )
                        : cn(
                          "rounded-full border text-[11px] font-semibold bg-white/95 dark:bg-neutral-900/95 text-neutral-800 dark:text-neutral-200 shadow-sm",
                          theme.border,
                          isBeingDragged ? cn("scale-110 -translate-y-1.5 z-20 bg-white dark:bg-neutral-950 shadow-lg", theme.text) : "shadow-[0_2px_5px_rgba(0,0,0,0.02)]"
                        )
                    )}
                  >
                    {iconUrl ? (
                      <img
                        src={iconUrl}
                        alt={skill.name}
                        className="w-full h-full object-contain shrink-0"
                      />
                    ) : (
                      <>
                        <span className={cn("w-1.5 h-1.5 rounded-full mr-1.5 shrink-0", theme.dot)} />
                        {skill.name}
                      </>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        <div
          className="w-full max-w-7xl mx-auto md:px-20 relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10"
          style={{ paddingLeft: '10px' }}
        >
          {skillsData.map((cat) => {
            const theme = CATEGORY_THEMES[cat.category] || {
              dot: "bg-emerald-500",
              text: "text-neutral-600"
            }

            return (
              <div key={cat.category} className="flex flex-col gap-3 text-left font-mono">
                {/* Category Header */}
                <div className="flex items-center gap-2 select-none">
                  <span className={cn("w-1.5 h-1.5 rounded-full animate-pulse", theme.dot)} />
                  <span className={cn("text-[10px] font-bold uppercase tracking-widest", theme.text)}>
                    {cat.category}
                  </span>
                </div>

                {/* Skills Tag Pills */}
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((skill) => {
                    const iconUrl = SKILL_ICONS[skill]
                    return (
                      <div
                        key={skill}
                        className="flex items-center gap-1.5 px-2.5 py-1 border border-neutral-300 dark:border-neutral-800 rounded-full bg-white dark:bg-neutral-900 text-[10px] font-semibold text-neutral-800 dark:text-white shadow-sm"
                      >
                        {iconUrl ? (
                          <img
                            src={iconUrl}
                            alt=""
                            className="w-3.5 h-3.5 object-contain shrink-0"
                          />
                        ) : (
                          <span className={cn("w-1 h-1 rounded-full shrink-0", theme.dot)} />
                        )}
                        <span>{skill}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}
