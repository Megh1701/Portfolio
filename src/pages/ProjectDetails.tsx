import { useState, useRef, useEffect } from "react"
import { motion, useScroll, useTransform, useSpring } from "motion/react"
import { ArrowLeft, Globe, Check, Layers, Code2, Database, Play, Pause } from "lucide-react"
import Mermaid from "../components/Mermaid.tsx"

interface ProjectAccent {
  dot: string
  glow: string
  tag: string
  statusColor: string
  statusDot: string
  shadow: string
}

interface Project {
  index: string
  title: string
  subtitle: string
  description: string
  longDescription: string
  frontendStack: string[]
  backendStack?: string[]
  otherStack: string[]
  problemSolved: string
  architecture: string
  category: string
  year: string
  liveUrl: string | null
  githubUrl: string | null
  status: "LIVE" | "IN DEV" | "COMPLETED"
  accent: ProjectAccent
  features: string[]
  customImage?: string
  videoUrl?: string | null
  architectureChart: string
}

const projectsList: Project[] = [
  {
    index: "1",
    title: "Omera Fintech",
    subtitle: "Fintech & Remittance Platform",
    description:
      "Engineered a high-performance web interface for a global fintech and remittance platform. Focused on secure transaction flows, real-time exchange rate displays, and seamless cross-border payment UX.",
    longDescription:
      "Omera Fintech is a modern remittances and financial services hub. The project involved constructing a secure, robust web client designed to facilitate high-frequency transactions. We built customized charts for real-time currency conversions, an intuitive transaction history dashboard, and optimized payment form states to reduce checkout friction.",
    frontendStack: ["Next.js", "Tailwind CSS", "TypeScript", "Motion"],
    otherStack: ["Vercel", "web3forms"],
    problemSolved: "Sending money across borders is plagued by high transfer fees, delayed transaction feedback, and confusing conversion processes. Omera Fintech provides users with an instant, real-time rate display and a secure multi-step wizard, reducing transaction anxiety and payment checkout drop-offs.",
    architecture: "The architecture is a decoupled client-server structure. The React client communicates with a Node.js/Express REST API for transactional logs. A WebSocket connection (Socket.io) streams instant conversion rates to the user interface. Security is enforced through custom JWT authentication middleware with local storage sessions.",
    videoUrl: "https://res.cloudinary.com/dj7lw7dmx/video/upload/v1780041395/omz_gh6w03.mp4",
    category: "FREELANCE",
    year: "2025",
    liveUrl: "https://omerafintech.com",
    githubUrl: null,
    status: "LIVE",
    accent: {
      dot: "bg-emerald-500",
      glow: "group-hover:border-emerald-400/60 dark:group-hover:border-emerald-500/40",
      tag: "border-emerald-300/50 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-450 bg-emerald-500/5",
      statusColor: "text-emerald-650 dark:text-[#10b981]",
      statusDot: "bg-[#059669] dark:bg-[#10b981]",
      shadow: "group-hover:shadow-[0_0_40px_rgba(16,185,129,0.08)] dark:group-hover:shadow-[0_0_40px_rgba(16,185,129,0.06)]",
    },
    features: [
      "Secure multi-factor authentication flows with JWT token management",
      "Interactive real-time conversion rates graphs using optimized canvas rendering",
      "Dynamic transaction status tracking system with automatic receipt generation",
      "Fully responsive and accessible layout conforming to WCAG standards"
    ],
    architectureChart: `graph LR
    Browser["Browser"] --> Next["Next.js"]
    Next --> Pages["Pages & Routes"]
    Next --> Components["UI Components"]
    Components --> Web3["Web3Forms API"]
    Next --> Vercel["Vercel CDN"]

    class Browser,Next,Pages,Components frontend;
    class Web3,Vercel database;`
  },
  {
    index: "4",
    title: "Eternal Overseas",
    subtitle: "First Freelance — Export Business Website",
    description:
      "Built a full business website for a ceramic and sanitary ware exporter — my first real client project. Product catalog, inquiry forms, and a clean B2B storefront from scratch.",
    longDescription:
      "This was my first freelance project, and it came with all the pressure of building something that actually had to work for a real business. Eternal Overseas is a Gujarat-based ceramic and sanitary ware exporter that needed a proper web presence to reach international buyers. I handled everything end-to-end — design, frontend, inquiry flow, and deployment. No safety net, just figuring things out as they came.",
    frontendStack: ["React.js", "Tailwind CSS", "Framer Motion"],
    backendStack: ["Nodemailer", "REST API"],
    otherStack: ["MongoDB", "Vercel", "Google Search Console"],
    problemSolved: "The client had no web presence at all — buyers had no way to browse products or reach out online. Built them a full catalog with category browsing and a working inquiry form so international buyers could actually contact them.",
    architecture: "Single-page React application with a product catalog driven by structured data, a contact and inquiry form that routes through Nodemailer for email delivery, and lead storage in MongoDB. Deployed on Vercel.",
    category: "FREELANCE",
    year: "2024–25",
    liveUrl: "https://eternaloverseas.com",
    githubUrl: null,
    status: "LIVE",
    accent: {
      dot: "bg-violet-500",
      glow: "group-hover:border-violet-400/60 dark:group-hover:border-violet-500/40",
      tag: "border-violet-300/50 dark:border-violet-500/20 text-violet-700 dark:text-violet-400 bg-violet-500/5",
      statusColor: "text-violet-600 dark:text-violet-400",
      statusDot: "bg-violet-500",
      shadow: "group-hover:shadow-[0_0_40px_rgba(139,92,246,0.08)] dark:group-hover:shadow-[0_0_40px_rgba(139,92,246,0.06)]",
    },
    features: [
      "Category-driven product catalog for ceramic tiles and sanitary ware",
      "Trade inquiry form with email delivery via Nodemailer",
      "Fully responsive layout built for international B2B buyers",
      "Lead capture with MongoDB storage"
    ],
    architectureChart: `graph LR
  Browser["Browser"] --> React["React SPA"]
  React --> Catalog["Product Catalog"]
  React --> Inquiry["Inquiry Form"]
  Inquiry --> Nodemailer["Nodemailer"]
  Inquiry --> MongoDB[("MongoDB")]

  class Browser,React,Catalog,Inquiry frontend;
  class Nodemailer backend;
  class MongoDB database;`
  },
  {
    index: "3",
    title: "Verdict AI",
    subtitle: "AI-Powered Multilingual Legal Intelligence Platform",
    description:
      "Built a scalable legal research platform for Indian court judgment discovery using RAG, hybrid semantic search, and multilingual retrieval. Focused on context-aware legal querying, citation-heavy document handling, and high-performance vector search across 100K+ indexed chunks.",
    longDescription:
      "Verdict AI is a multilingual legal intelligence system designed to simplify complex Indian legal document discovery. The platform processes and indexes large-scale court judgments, enabling lawyers and researchers to query case law in natural language — including regional Indian languages. Built with a hybrid retrieval pipeline combining FAISS vector search and keyword-based retrieval, the system handles citation-heavy judgments, cross-case references, and long-context legal documents with high relevance ranking.",
    frontendStack: [],
    otherStack: ["Python", "FAISS", "RAG", "LangChain", "Sentence Transformers", "BGE / MiniLM", "Groq API", "Redis", "JSONL Pipelines"],
    problemSolved:
      "Indian legal research is buried in thousands of unstructured, citation-heavy court judgments across multiple languages. Verdict AI eliminates manual case-law hunting by enabling natural language queries across 100K+ indexed legal chunks — with multilingual support for regional Indian languages and intelligent caching for fast repeated lookups.",
    architecture:
      "The pipeline ingests JSONL-based legal datasets, chunks and embeds documents using BGE/MiniLM transformer models, and indexes them into year-wise FAISS indices for memory-efficient retrieval. At query time, a hybrid retrieval layer combines FAISS semantic search with keyword-based matching and contextual reranking. Groq API powers fast multilingual inference for regional language queries. Redis caches frequent embedding lookups to reduce compute overhead and improve response latency at scale.",
    videoUrl: null,
    category: "PROJECT",
    year: "2025",
    liveUrl: null,
    githubUrl: "https://github.com/Megh1701",
    status: "LIVE",
    accent: {
      dot: "bg-violet-500",
      glow: "group-hover:border-violet-400/60 dark:group-hover:border-violet-500/40",
      tag: "border-violet-300/50 dark:border-violet-500/20 text-violet-700 dark:text-violet-400 bg-violet-500/5",
      statusColor: "text-violet-650 dark:text-[#8b5cf6]",
      statusDot: "bg-[#7c3aed] dark:bg-[#8b5cf6]",
      shadow: "group-hover:shadow-[0_0_40px_rgba(139,92,246,0.08)] dark:group-hover:shadow-[0_0_40px_rgba(139,92,246,0.06)]",
    },
    features: [
      "Multilingual natural language querying across Indian regional languages using Groq API inference",
      "Hybrid retrieval pipeline combining FAISS semantic vector search with keyword-based matching and contextual reranking",
      "Year-wise FAISS indexing with 100K+ legal document chunks for memory-efficient, low-latency retrieval",
      "Redis-based caching layer reducing repeated embedding computations and accelerating query performance",
    ],
    architectureChart: `graph TD
  Query["User Query"] --> Preprocessor["Query Preprocessor"]
  Preprocessor --> Groq["Groq API (Multilingual)"]
  Preprocessor --> Embedder["BGE / MiniLM Embedder"]
  Embedder --> FAISS["FAISS Year-wise Index"]
  FAISS --> Hybrid["Hybrid Retriever"]
  Groq --> Hybrid
  Hybrid --> Reranker["Contextual Reranker"]
  Reranker --> RAG["RAG Response Generator"]
  RAG --> Output["Legal Answer"]
  Embedder --> Redis["Redis Cache"]
  Redis --> Embedder

  class Query,Preprocessor frontend;
  class Groq,Embedder,FAISS,Hybrid,Reranker,RAG backend;
  class Redis,Output database;`
  },
  {
    index: "2",
    title: "DevSwipee",
    subtitle: "Swipe • Match • Build",
    description:
      "A full-stack developer collaboration platform that connects builders through Tinder-style project discovery, real-time chat, and Jira-inspired session workspaces.",
    longDescription:
      "DevSwipee is a hybrid web platform combining Tinder-style project discovery with Jira-style execution workflows. Developers swipe on projects to express collaboration intent — when two users mutually accept, a match is created and a structured Session Workspace is instantly spawned with a real-time chat room and a Kanban task board. Built on the MERN stack with Socket.IO for bidirectional real-time events, JWT-based stateless auth with silent token refresh, and Gemini API for ATS-style project scoring. Est. 2025 by Megh Patel.",
    frontendStack: ["React", "Vite", "Tailwind CSS", "Framer Motion", "Axios"],
    backendStack: ["Node.js", "Express.js", "Socket.IO", "REST API"],
    otherStack: ["MongoDB", "Mongoose", "JWT", "Cloudinary", "Gemini API", "Docker"],
    problemSolved:
      "Finding compatible collaborators for side projects or hackathons is fragmented across LinkedIn, Discord, and static forums. DevSwipee makes developer matchmaking intent-driven — users swipe on projects they want to build, and only mutual interest triggers a match, eliminating cold outreach and creating an instant structured workspace to go from idea to execution.",
    architecture:
      "MERN monolith with a React/Vite frontend and an Express.js backend. JWT access + refresh tokens are stored as HttpOnly cookies; Axios interceptors silently queue and replay failed requests after a token refresh. The swipe engine writes to a SwipeModel and runs a mutual-match query on every acceptance if both sides have accepted, a MatchModel document is created and a Socket.IO event is emitted to both users. Each match spawns a Session document containing a Kanban board (To Do / In Progress / Done), collaborator list, and a dedicated Socket.IO room. Chat messages are persisted to MongoDB and broadcast in real-time. Cloudinary handles profile image uploads; Gemini API scores project descriptions for stack-alignment relevance.",
    videoUrl: "https://res.cloudinary.com/dj7lw7dmx/video/upload/v1780041397/devswipe_jafi6p.mp4",
    category: "PRODUCT",
    year: "2025",
    liveUrl: "https://devswipee.vercel.app",
    githubUrl: "https://github.com/Megh1701/DevSwipee",
    status: "LIVE",
    accent: {
      dot: "bg-purple-500",
      glow: "group-hover:border-purple-400/60 dark:group-hover:border-purple-500/40",
      tag: "border-purple-300/50 dark:border-purple-500/20 text-purple-700 dark:text-purple-400 bg-purple-500/5",
      statusColor: "text-purple-600 dark:text-purple-450",
      statusDot: "bg-purple-500",
      shadow: "group-hover:shadow-[0_0_40px_rgba(168,85,247,0.08)] dark:group-hover:shadow-[0_0_40px_rgba(168,85,247,0.06)]",
    },
    features: [
      "Tinder-style project discovery with swipe-right to express collaboration intent",
      "Mutual-match engine that triggers a match only when both users accept, with instant Socket.IO notifications",
      "Jira-inspired Session Workspaces with a Kanban task board (To Do / In Progress / Done) spawned on every match",
      "Real-time per-match chat rooms with messages persisted to MongoDB and broadcast via Socket.IO",
      "Persistent + real-time notification system offline users receive unread notifications on next load",
      "Gemini API ATS-style project scoring for stack-alignment relevance",
      "Cloudinary-powered profile image uploads with silent JWT refresh via Axios interceptors",
    ],
    architectureChart: `graph TD
    subgraph Frontend Client
        React[React / Vite UI]
        Axios[Axios Interceptors]
        SocketClient[Socket.IO Client]
    end
    subgraph Backend Server Node.js
        Express[Express REST API]
        Auth[Auth Middleware]
        SocketServer[Socket.IO Server\nIn-Memory Adapter]
        Controllers[Controllers\nSwipe, Match, Chat, ATS]
        Gemini[Gemini Service]
    end
    subgraph Database Layer
        MongoDB[(MongoDB)]
        Models[Mongoose Models\nUser, Swipe, Match, Session, Chat]
    end
    React -->|HTTP Requests| Axios
    Axios -->|JWT Cookies| Express
    Express --> Auth
    Auth --> Controllers
    Controllers --> Models
    Models --> MongoDB
    Controllers <-->|External API| Gemini
    React -->|WebSocket| SocketClient
    SocketClient <-->|Real-time Events| SocketServer
    Controllers -.->|Emit Notifications| SocketServer
    Controllers --> Match[Match Engine]
    Match --> Session[Collaboration Session Created]
    Session --> JiraBoard["Jira-style Task Board<br/>(To Do / In Progress / Done)"]
    Session --> ChatRoom["Real-time Chat Room"]
    JiraBoard --> Tasks[Task Management System]

    class React,Axios,SocketClient,JiraBoard,ChatRoom,Tasks frontend;
    class Express,Auth,SocketServer,Controllers,Match,Session backend;
    class MongoDB,Models database;
    class Gemini hybrid;`,
  },
  {
    index: "5",
    title: "Connect Four",
    subtitle: "Where It All Began",
    description:
      "My very first project — a classic Connect Four game built from scratch in my first year with vanilla HTML, CSS, and JavaScript.",
    longDescription:
      "This is the project that started everything. First year, still figuring things out, and I just wanted to build something that actually worked and felt like a real game. No frameworks, no libraries — just me, a grid, and a lot of trial and error. It holds a special place because it's where I genuinely fell in love with building things.",
    frontendStack: ["HTML", "CSS", "JavaScript"],
    otherStack: ["Vercel"],
    problemSolved: "Wanted to build something fun and complete on my own. Chose Connect Four because the logic felt achievable but still genuinely challenging — win-checking across rows, columns, and diagonals pushed me to think algorithmically for the first time.",
    architecture: "Pure vanilla stack with no dependencies. Game logic is handled entirely in JavaScript, with a sliding window approach for win detection. CSS handles the responsive grid layout and animations. Deployed on Vercel.",
    videoUrl: "https://res.cloudinary.com/dj7lw7dmx/video/upload/v1780041390/connect4_uslgpf.mp4",
    category: "GAME",
    year: "2024",
    liveUrl: "https://connect-4-gamma.vercel.app",
    githubUrl: "https://github.com/Megh1701/connect-four",
    status: "COMPLETED",
    accent: {
      dot: "bg-neutral-500",
      glow: "group-hover:border-neutral-400/60 dark:group-hover:border-neutral-500/40",
      tag: "border-neutral-300/50 dark:border-neutral-500/20 text-neutral-700 dark:text-neutral-450 bg-neutral-500/5",
      statusColor: "text-neutral-600 dark:text-neutral-400",
      statusDot: "bg-neutral-500",
      shadow: "group-hover:shadow-[0_0_40px_rgba(115,115,115,0.08)] dark:group-hover:shadow-[0_0_40px_rgba(115,115,115,0.06)]",
    },
    features: [
      "Two-player turn-based gameplay on a classic 6×7 grid",
      "Win detection across all directions using a sliding window algorithm",
      "Fully responsive layout built with CSS media queries",
      "Zero dependencies — pure HTML, CSS, and JavaScript"
    ],
    architectureChart: `graph LR
  HTML["index.html"] --> JS["script.js"]
  HTML --> CSS["style.css"]
  JS --> Logic["Game Logic"]
  Logic --> WinCheck["Sliding Window Win Detection"]

  class HTML,CSS frontend;
  class JS,Logic,WinCheck frontend;`
  }
]

interface ProjectDetailsProps {
  projectId: string
  onBack: () => void
}

function CustomVideoPlayer({ src, poster, style }: { src?: string; poster?: string; style?: any }) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [hasBeenVisible, setHasBeenVisible] = useState(false)
  const [isMuted] = useState(true)
  const [showControls, setShowControls] = useState(false)

  // Cloudinary video transformation parameters to optimize encoding format and compression quality
  const optimizeCloudinaryUrl = (url: string | null | undefined): string | undefined => {
    if (!url) return undefined
    if (url.includes("res.cloudinary.com") && !url.includes("/f_auto,q_auto/")) {
      return url.replace("/video/upload/", "/video/upload/f_auto,q_auto/")
    }
    return url
  }

  // IntersectionObserver to lazy load the video tag and auto-pause when scrolled offscreen
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting)
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    if (isIntersecting) {
      setHasBeenVisible(true)
    }
  }, [isIntersecting])

  useEffect(() => {
    if (!isIntersecting && isPlaying && videoRef.current) {
      videoRef.current.pause()
      setIsPlaying(false)
    }
  }, [isIntersecting, isPlaying])

  useEffect(() => {
    setIsPlaying(false)
    setIsLoading(false)
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }, [src])

  const togglePlay = () => {
    if (!videoRef.current) return
    if (isPlaying) {
      videoRef.current.pause()
      setIsPlaying(false)
    } else {
      videoRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.error("Playback interrupted:", err))
    }
  }

  return (
    <motion.div
      ref={containerRef}
      style={style}
      className="relative bg-neutral-950 overflow-hidden group cursor-pointer"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => {
        if (isPlaying) setShowControls(false)
      }}
      onClick={togglePlay}
    >
      {/* Loading Spinner overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/45 backdrop-blur-[2px] z-30 transition-opacity duration-300">
          <svg className="animate-spin h-10 w-10 text-emerald-500 mb-2" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span className="text-[9px] font-mono tracking-widest text-white/80 uppercase">Loading...</span>
        </div>
      )}

      {hasBeenVisible ? (
        <video
          ref={videoRef}
          src={optimizeCloudinaryUrl(src)}
          playsInline
          loop
          muted={isMuted}
          className="w-full h-full object-cover"
          style={{
            filter: isPlaying ? "grayscale(0)" : "grayscale(1)",
            transition: "filter 800ms cubic-bezier(0.16, 1, 0.3, 1)"
          }}
          poster={poster}
          onLoadStart={() => setIsLoading(true)}
          onWaiting={() => setIsLoading(true)}
          onPlaying={() => setIsLoading(false)}
          onCanPlay={() => setIsLoading(false)}
          onSeeked={() => setIsLoading(false)}
        />
      ) : (
        <div className="w-full h-full bg-neutral-900 flex items-center justify-center">
          {poster && <img src={poster} alt="" className="w-full h-full object-cover opacity-60 filter grayscale" />}
        </div>
      )}

      {/* Play/Pause Button Overlay (Only UI Control) */}
      <div
        className="absolute inset-0 bg-black/10 flex items-center justify-center pointer-events-none transition-opacity duration-300 z-20"
        style={{
          opacity: !isPlaying || showControls ? 1 : 0
        }}
      >
        <button
          className="w-16 h-16 rounded-full bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 pointer-events-auto border-0 outline-none cursor-pointer"
          onClick={(e) => {
            e.stopPropagation()
            togglePlay()
          }}
          style={{
            transform: !isPlaying || showControls ? "scale(1)" : "scale(0.8)",
            transition: "transform 300ms cubic-bezier(0.16, 1, 0.3, 1)"
          }}
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 text-black dark:text-white fill-current" />
          ) : (
            <Play className="w-5 h-5 text-black dark:text-white fill-current translate-x-0.5" />
          )}
        </button>
      </div>
    </motion.div>
  )
}

export default function ProjectDetails({ projectId, onBack }: ProjectDetailsProps) {
  const project = projectsList.find((p) => p.index === projectId) || projectsList[0]

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [projectId])

  // Scroll tracking to shrink the top video player dynamically
  const { scrollY } = useScroll()
  const smoothScrollY = useSpring(scrollY, {
    damping: 30,
    stiffness: 150,
    mass: 0.2
  })

  // Transform scroll position into width and border radius
  // When scroll is 0: width = 60vw, border-radius = 16px
  // When scroll is 200: width = 50vw, border-radius = 24px
  const videoWidth = useTransform(smoothScrollY, [0, 200], ["80vw", "50vw"])
  const videoRadius = useTransform(smoothScrollY, [0, 200], ["16px", "24px"])

  return (
    <div className="min-h-screen gap-10 w-full bg-[#f5f5f0] dark:bg-[#0a0a0a] text-black dark:text-white transition-colors duration-300 pb-20 md:pb-32 relative overflow-x-hidden flex flex-col items-center">

      {/* Centered Top Nav & Title */}
      <div className="w-full md:w-[80%] max-w-5xl px-6 pt-8 md:pt-12 flex flex-col items-center text-center">
        {/* Navigation back link */}
        <button
          onClick={onBack}
          className="self-start group flex items-center gap-1.5 text-neutral-450 hover:text-black dark:hover:text-white text-xs font-mono tracking-tight cursor-pointer select-none transition-colors border-0 bg-transparent p-0 outline-none mb-10"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          <span>back to projects</span>
        </button>

        {/* Medium Editorial Header */}
        <header className="flex flex-col items-center text-center mb-12">
          <span className="text-emerald-500 font-mono text-[10px] uppercase tracking-widest font-black block mb-3">
            {project.category}
          </span>
          <h1 className="text-3xl md:text-6xl font-sans font-black tracking-tight text-neutral-900 dark:text-white leading-tight mb-4 text-center">
            {project.title}
          </h1>
          <p className="text-lg md:text-2xl font-serif text-neutral-500 dark:text-neutral-400 leading-relaxed font-normal text-center max-w-2xl">
            {project.subtitle}
          </p>
          <div className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-tight mt-4">
            {project.year} • {project.status}
          </div>
          {project.liveUrl && (
            <div className="mt-8 flex justify-center">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-2.5 px-8 py-4 bg-neutral-950 dark:bg-white text-white dark:text-black hover:bg-[#10b981] dark:hover:bg-[#10b981] hover:text-white dark:hover:text-white font-sans font-black text-xs uppercase tracking-widest rounded-none border-2 border-neutral-950 dark:border-white transition-all duration-200 select-none shadow-[4px_4px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_rgba(255,255,255,0.15)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 active:scale-95 cursor-pointer"
              >
                <Globe className="w-4 h-4 text-emerald-500" />
                <span>Launch Live Application</span>
              </a>
            </div>
          )}
        </header>
      </div>

      {/* 1. Video Player (Starts at 60vw, shrinks to 50vw on scroll) */}
      {project.videoUrl && (
        <div className="w-full flex justify-center bg-transparent pt-0 pb-12 z-10">
          <CustomVideoPlayer
            src={project.videoUrl}

            style={{
              width: videoWidth,
              borderRadius: videoRadius,
              aspectRatio: "16/9"
            }}
          />
        </div>
      )}

      {/* 2. Centered Reading Container */}
      <div className="w-full md:w-[80%] max-w-5xl mx-auto px-6 relative z-10 flex flex-col items-center text-center">

        {/* Divided Tech Stack */}
        <section className="w-full border border-neutral-200 dark:border-neutral-800 bg-white/[0.6] dark:bg-[#0c0c0c]/80 flex flex-col divide-y divide-neutral-200 dark:divide-neutral-800 sm:flex-row sm:divide-y-0 sm:divide-x mb-12 shadow-sm">
          {/* Frontend */}
          <div style={{ padding: "15px" }} className="flex-1 md:p-10 flex flex-col items-center sm:items-start text-center sm:text-left">
            <span className="text-[8px] font-bold uppercase tracking-widest text-neutral-450 dark:text-neutral-500 font-mono flex items-center gap-1.5 mb-4">
              <Code2 className="w-3.5 h-3.5 text-sky-500" />
              FRONTEND
            </span>
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
              {project.frontendStack.map((tag) => (
                <span
                  style={{ padding: "2px" }}
                  key={tag}
                  className="text-[9px] font-bold font-mono border border-neutral-250 dark:border-neutral-750 text-neutral-700 dark:text-neutral-300 rounded-none bg-[#fafaf7] dark:bg-neutral-900/60 uppercase select-none"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Backend — only render if the project has backend tech */}
          {project.backendStack && project.backendStack.length > 0 && (
            <div style={{ padding: "15px" }} className="flex-1 p-8 md:p-10 flex flex-col items-center sm:items-start text-center sm:text-left">
              <span className="text-[8px] font-bold uppercase tracking-widest text-neutral-450 dark:text-neutral-500 font-mono flex items-center gap-1.5 mb-4">
                <Layers className="w-3.5 h-3.5 text-emerald-500" />
                BACKEND
              </span>
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                {project.backendStack.map((tag) => (
                  <span
                    key={tag}
                    style={{ padding: "2px" }}
                    className="text-[9px] font-bold font-mono border border-neutral-250 dark:border-neutral-750 text-neutral-700 dark:text-neutral-300 rounded-none bg-[#fafaf7] dark:bg-neutral-900/60 uppercase select-none"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Others */}
          <div style={{ padding: "15px" }} className="flex-1 p-8 md:p-10 flex flex-col items-center sm:items-start text-center sm:text-left">
            <span className="text-[8px] font-bold uppercase tracking-widest text-neutral-450 dark:text-neutral-500 font-mono flex items-center gap-1.5 mb-4">
              <Database className="w-3.5 h-3.5 text-amber-500" />
              INFRASTRUCTURE
            </span>
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
              {project.otherStack.map((tag) => (
                <span
                  key={tag}
                  style={{ padding: "2px" }}
                  className="text-[9px] font-bold font-mono border border-neutral-250 dark:border-neutral-750 text-neutral-700 dark:text-neutral-300 rounded-none bg-[#fafaf7] dark:bg-neutral-900/60 uppercase select-none"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Article Body - Horizontal Section Boxes (Blueprint Grid Style) */}
        <main className="space-y-12 w-full flex flex-col items-center mt-6">

          {/* Architecture Box */}
          <section className="w-full bg-white/[0.6] dark:bg-[#0c0c0c]/80 border border-neutral-200 dark:border-neutral-800 flex flex-col shadow-sm">
            <div style={{ padding: "15px" }} className="w-full border-b border-neutral-200 dark:border-neutral-800 flex flex-col items-start text-left bg-white/50 dark:bg-white/[0.01]">
              <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-450 dark:text-neutral-500 font-mono">
                // ARCHITECTURE
              </span>
              <h3 className="text-base md:text-lg font-bold uppercase text-neutral-900 dark:text-white mt-0.5 tracking-tight font-sans">
                SYSTEM DESIGN
              </h3>
            </div>
            <div style={{ padding: "15px" }} className="w-full space-y-8 text-justify">
              <p className="text-sm md:text-base text-neutral-500 dark:text-neutral-400 leading-relaxed font-sans">
                {project.architecture}
              </p>
              <Mermaid chart={project.architectureChart} />
            </div>
          </section>

          {/* Overview Box */}
          <section className="w-full bg-white/[0.6] dark:bg-[#0c0c0c]/80 border border-neutral-200 dark:border-neutral-800 flex flex-col shadow-sm">
            <div style={{ padding: "15px" }} className="w-full border-b border-neutral-200 dark:border-neutral-800 flex flex-col items-start text-left bg-white/50 dark:bg-white/[0.01]">
              <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-450 dark:text-neutral-500 font-mono">
                // OVERVIEW
              </span>
              <h3 className="text-base md:text-lg font-bold uppercase text-neutral-900 dark:text-white mt-0.5 tracking-tight font-sans">
                PROJECT BRIEF
              </h3>
            </div>
            <div style={{ padding: "15px" }} className="w-full text-justify">
              <p className="text-sm md:text-base text-neutral-500 dark:text-neutral-400 leading-relaxed font-sans">
                {project.longDescription}
              </p>
            </div>
          </section>

          {/* The Problem Box */}
          <section className="w-full bg-white/[0.6] dark:bg-[#0c0c0c]/80 border border-neutral-200 dark:border-neutral-800 flex flex-col shadow-sm">
            <div style={{ padding: "15px" }} className="w-full border-b border-neutral-200 dark:border-neutral-800 flex flex-col items-start text-left bg-white/50 dark:bg-white/[0.01]">
              <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-450 dark:text-neutral-500 font-mono">
                // THE CHALLENGE
              </span>
              <h3 className="text-base md:text-lg font-bold uppercase text-neutral-900 dark:text-white mt-0.5 tracking-tight font-sans">
                PROBLEM STATEMENT
              </h3>
            </div>
            <div style={{ padding: "15px" }} className="w-full text-justify">
              <div className="text-sm md:text-base italic text-neutral-500 dark:text-neutral-400 font-serif leading-relaxed">
                {project.problemSolved}
              </div>
            </div>
          </section>

          {/* Key Features Box */}
          <section className="w-full bg-white/[0.6] dark:bg-[#0c0c0c]/80 border border-neutral-200 dark:border-neutral-800 flex flex-col shadow-sm">
            <div style={{ padding: "15px" }} className="w-full border-b border-neutral-200 dark:border-neutral-800 flex flex-col items-start text-left bg-white/50 dark:bg-white/[0.01]">
              <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-450 dark:text-neutral-500 font-mono">
                // KEY FEATURES
              </span>
              <h3 className="text-base md:text-lg font-bold uppercase text-neutral-900 dark:text-white mt-0.5 tracking-tight font-sans">
                IMPLEMENTATIONS
              </h3>
            </div>
            <div style={{ padding: "15px" }} className="w-full text-justify">
              <ul className="space-y-4">
                {project.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3.5 text-sm md:text-base text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    <div className="bg-emerald-500/10 dark:bg-[#10b981]/5 border border-emerald-500/20 dark:border-[#10b981]/15 p-1 rounded-none text-emerald-600 dark:text-[#10b981] shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span className="mt-0.5">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

        </main>

        {/* Article footer / conclusion & launch links */}
        <section style={{ padding: "20px" }} className="pt-12 border-t border-neutral-200 dark:border-neutral-800 flex flex-col items-center justify-center gap-8 my-16 w-full">
          <div className="flex flex-col items-center text-center gap-2">
            <img
              src="/logo.png"
              alt="Megh Patel Logo"
              className="w-12 h-12 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white object-cover"
            />
            <div>
              <span className="text-sm font-bold text-neutral-900 dark:text-white block leading-tight text-center">
                Case Study Concluded
              </span>
              <span className="text-[10px] text-neutral-400 dark:text-neutral-500 font-mono uppercase tracking-wider block mt-0.5 text-center">
                Authored by Megh Patel
              </span>
            </div>
          </div>

          {project.githubUrl && (
            <div className="flex items-center gap-4 justify-center">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 px-6 py-3 border border-neutral-350 dark:border-neutral-700 hover:border-black dark:hover:border-white text-neutral-700 dark:text-neutral-300 font-sans font-bold text-xs uppercase tracking-wider rounded-none bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-all select-none shadow-sm cursor-pointer"
              >
                <span>View Source</span>
              </a>
            </div>
          )}
        </section>

      </div>
    </div>
  )
}
