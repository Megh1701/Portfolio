import { useEffect } from "react"
import { ArrowLeft, Terminal, Shield, Cpu, Globe, Check } from "lucide-react"

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
  tags: string[]
  category: string
  year: string
  liveUrl: string | null
  githubUrl: string | null
  status: "LIVE" | "IN DEV" | "COMPLETED"
  accent: ProjectAccent
  features: string[]
  customImage?: string
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
    tags: ["React.js", "Node.js", "Express.js", "MongoDB", "Socket.io", "Tailwind CSS"],
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
    ]
  },
  {
    index: "4",
    title: "Eternal Overseas",
    subtitle: "Export Business Web Platform",
    description:
      "Designed and developed a full-scale export business website for a ceramic and sanitary ware exporter. Delivered a premium product catalog, inquiry system, and multi-language-ready architecture.",
    longDescription:
      "Eternal Overseas is a premium B2B supplier portal targeting global ceramic and sanitary ware trade. It features sub-second page transition search interfaces, custom bulk trade inquiry forms with automatic PDF receipt compiles, and strict meta tag optimizations mapping to international trade queries.",
    tags: ["Next.js", "TypeScript", "MongoDB", "Vercel", "REST API"],
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
      "Dynamic category-driven product catalog with sub-second page transitions",
      "Bulk trade inquiries request builder with email/PDF exports",
      "SEO audit optimizations yielding perfect Core Web Vitals scores",
      "Localization layer supporting multilingual translations"
    ]
  },
  {
    index: "3",
    title: "SSIP Research Portal",
    subtitle: "Student Startup & Innovation Policy",
    description:
      "Built a research and data portal under the SSIP 2025 initiative — enabling student innovators to submit, track, and manage startup proposals with an integrated review and feedback pipeline.",
    longDescription:
      "The SSIP Portal acts as a digital bridge between student innovators, academic mentors, and government funding agencies. Designed under the Student Startup & Innovation Policy research initiative, it aggregates project submissions, automates milestone tracking, facilitates peer review feedback loops, and provides dashboard statistics on project approvals and resource allocation.",
    tags: ["React.js", "Express.js", "PostgreSQL", "Docker", "OAuth", "Tailwind CSS"],
    category: "INNOVATION",
    year: "2025",
    liveUrl: null,
    githubUrl: "https://github.com/Megh1701",
    status: "IN DEV",
    accent: {
      dot: "bg-amber-500",
      glow: "group-hover:border-amber-400/60 dark:group-hover:border-amber-500/40",
      tag: "border-amber-300/50 dark:border-amber-500/20 text-amber-700 dark:text-amber-400 bg-amber-500/5",
      statusColor: "text-amber-600 dark:text-amber-400",
      statusDot: "bg-amber-500",
      shadow: "group-hover:shadow-[0_0_40px_rgba(245,158,11,0.08)] dark:group-hover:shadow-[0_0_40px_rgba(245,158,11,0.06)]",
    },
    features: [
      "Role-based access control (RBAC) separating Students, Mentors, and Administrators",
      "Interactive proposal builder with auto-saving drafts and file upload integration",
      "Automated milestone email notification system using cron-based triggers",
      "Comprehensive statistics panel demonstrating distribution of grants and resources"
    ]
  },
  {
    index: "2",
    title: "DevSwipe",
    subtitle: "Swipe • Connect • Code",
    description:
      "A developer networking and matching platform designed to connect collaborators based on shared interests, tech stack alignments, and project ideas.",
    longDescription:
      "DevSwipe is a mobile and web networking platform where developers can find potential co-founders, project collaborators, or mentors. Using a matching algorithm based on tech stack affinity, experience levels, and interest categories, it makes finding the right coding partner intuitive, fun, and fast. Est. 2025 by Megh Patel.",
    tags: ["React Native", "Node.js", "Express.js", "MongoDB", "Socket.io", "Tailwind CSS"],
    category: "PRODUCT",
    year: "2025",
    liveUrl: "https://github.com/Megh1701",
    githubUrl: "https://github.com/Megh1701",
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
      "Instant developer matchmaking based on skill alignment affinity matrices",
      "Real-time chat messaging using secure Socket.io WebSocket connections",
      "Developer profile card builder integrating directly with GitHub profile metrics",
      "Collaborative project board enabling teams to broadcast open recruitment needs"
    ]
  },
  {
    index: "5",
    title: "Portfolio",
    subtitle: "Interactive Scrapbook Design",
    description:
      "My personal interactive portfolio website featuring Framer Motion card fans, mouse-tracking glare gradients, and Matter.js skills boxes.",
    longDescription:
      "This portfolio is engineered to challenge standard document-flow presentations. It implements spring-loaded overlapping card stacks inspired by InterfaceCraft with 3D mouse tilt and glare dynamics, a complete 2D rigid-body skills sandbox with Matter.js canvas drag controls, and a retro dossier inspection overlay.",
    tags: ["React.js", "Framer Motion", "Matter.js", "Tailwind CSS", "Vite"],
    category: "PORTFOLIO",
    year: "2026",
    liveUrl: "https://meghpatel.com",
    githubUrl: "https://github.com/Megh1701/Portfolio",
    status: "COMPLETED",
    accent: {
      dot: "bg-neutral-500",
      glow: "group-hover:border-neutral-400/60 dark:group-hover:border-neutral-500/40",
      tag: "border-neutral-300/50 dark:border-neutral-500/20 text-neutral-700 dark:text-neutral-400 bg-neutral-500/5",
      statusColor: "text-neutral-600 dark:text-neutral-400",
      statusDot: "bg-neutral-500",
      shadow: "group-hover:shadow-[0_0_40px_rgba(115,115,115,0.08)] dark:group-hover:shadow-[0_0_40px_rgba(115,115,115,0.06)]",
    },
    features: [
      "Overlapping fanned stack of card decks demonstrating distinct skills and projects",
      "3D card perspective tilt and pointer-glare reflection overlays running at 60fps",
      "Interactive 2D physics sandbox for skills tags utilizing Matter.js engine",
      "Classified retro dossier file layout for detailed project analysis sheets"
    ]
  }
]

interface ProjectDetailsProps {
  projectId: string
  onBack: () => void
}

export default function ProjectDetails({ projectId, onBack }: ProjectDetailsProps) {
  const project = projectsList.find((p) => p.index === projectId) || projectsList[0]

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [projectId])

  const renderIcon = () => {
    const iconClass = "w-10 h-10 text-emerald-600 dark:text-[#10b981] stroke-[1.2]"
    if (project.index === "1") return <Terminal className={iconClass} />
    if (project.index === "4") return <Globe className={iconClass} />
    if (project.index === "3") return <Shield className={iconClass} />
    return <Cpu className={iconClass} />
  }

  return (
    <div className="min-h-screen w-full bg-[#f5f5f0] dark:bg-[#0a0a0a] text-black dark:text-white transition-colors duration-300 py-24 md:py-32 font-mono flex flex-col items-center justify-center relative">
      {/* Centered full-height vertical borders wrapper */}
      <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-full max-w-7xl pointer-events-none z-0">
        <div className="absolute top-0 left-0 h-full border-l border-neutral-300 dark:border-neutral-800/60" />
        <div className="absolute top-0 right-0 h-full border-l border-neutral-300 dark:border-neutral-800/60" />
      </div>

      <div className="w-full max-w-5xl mx-auto px-6 md:px-12 relative z-10">
        {/* Back Button */}
        <div className="w-full mb-8 flex justify-start">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 border border-neutral-300 dark:border-neutral-800 text-[10px] font-bold uppercase tracking-wider text-neutral-500 hover:text-black dark:hover:text-white hover:border-black dark:hover:border-white rounded-md cursor-pointer transition-all bg-[#fafaf7] dark:bg-neutral-950 shadow-sm hover:shadow active:scale-95 select-none"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Projects</span>
          </button>
        </div>

        {/* Main Dossier Card */}
        <div className="w-full bg-[#fafaf7] dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-xl shadow-lg p-6 md:p-12 relative overflow-hidden">
          {/* Postmark overlay */}
          <div className="absolute right-4 top-4 select-none opacity-[0.05] dark:opacity-[0.10] pointer-events-none transform rotate-12">
            <Terminal className="w-48 h-48 text-emerald-600 dark:text-emerald-500" />
          </div>

          {/* Dossier Header */}
          <div className="border-b-2 border-double border-neutral-300 dark:border-neutral-800 pb-6 mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-lg border border-dashed border-neutral-300 dark:border-neutral-800 bg-neutral-100/50 dark:bg-neutral-900/30 flex items-center justify-center shadow-inner">
                {project.customImage ? (
                  <img src={project.customImage} alt="" className="w-10 h-10 object-contain" />
                ) : (
                  renderIcon()
                )}
              </div>
              <div>
                <span className="text-[9px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest block mb-0.5">
                  PROJECT DOSSIER // {project.index}
                </span>
                <h2 className="text-xl md:text-2xl font-black uppercase text-neutral-900 dark:text-white leading-none">
                  {project.title}
                </h2>
                <span className="text-[10px] text-neutral-500 dark:text-neutral-450 uppercase font-medium">
                  {project.subtitle}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-6 text-[10px] md:text-right md:flex-col md:gap-1 text-neutral-500 font-bold">
              <div>
                <span className="text-[8px] text-neutral-450 uppercase block md:inline md:mr-2">STATUS:</span>
                <span className={`uppercase tracking-wider ${project.accent.statusColor}`}>
                  {project.status}
                </span>
              </div>
              <div>
                <span className="text-[8px] text-neutral-450 uppercase block md:inline md:mr-2">YEAR:</span>
                <span className="text-neutral-800 dark:text-neutral-200">
                  {project.year}
                </span>
              </div>
            </div>
          </div>

          {/* Grid Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Col: Overview */}
            <div className="md:col-span-2 space-y-6">
              <div>
                <span className="text-[9px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider block mb-2">
                  // PROJECT OVERVIEW
                </span>
                <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans">
                  {project.longDescription}
                </p>
              </div>

              <div>
                <span className="text-[9px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider block mb-3">
                  // KEY IMPLEMENTATIONS & FEATURES
                </span>
                <ul className="space-y-2">
                  {project.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans">
                      <Check className="w-4 h-4 text-emerald-600 dark:text-[#10b981] shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Col: Metadata & Links */}
            <div className="space-y-6 border-t md:border-t-0 md:border-l border-dashed border-neutral-300 dark:border-neutral-800 pt-6 md:pt-0 md:pl-8">
              <div>
                <span className="text-[9px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider block mb-3">
                  // STACK / TECHNOLOGIES
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[9px] font-black tracking-wide px-2 py-0.5 border border-neutral-300 dark:border-neutral-700 text-neutral-800 bg-[#F9F2DE] rounded uppercase select-none"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[9px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider block mb-3">
                  // PROJECT ACCESS
                </span>
                <div className="flex flex-col gap-2.5">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between px-3 py-2 border border-neutral-300 dark:border-neutral-800 text-[10px] font-bold uppercase tracking-wider text-neutral-900 dark:text-white bg-white dark:bg-neutral-900 hover:text-white dark:hover:text-black hover:bg-emerald-600 dark:hover:bg-[#10b981] hover:border-transparent rounded transition-all group"
                    >
                      <span className="flex items-center gap-1.5">
                        <Globe className="w-3.5 h-3.5" />
                        <span>Launch Live App</span>
                      </span>
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between px-3 py-2 border border-neutral-300 dark:border-neutral-800 text-[10px] font-bold uppercase tracking-wider text-neutral-900 dark:text-white bg-white dark:bg-neutral-900 hover:text-white dark:hover:text-black hover:bg-emerald-600 dark:hover:bg-[#10b981] hover:border-transparent rounded transition-all group"
                    >
                      <span className="flex items-center gap-1.5">
                        <span>Source Code</span>
                      </span>
                    </a>
                  )}
                  {!project.liveUrl && !project.githubUrl && (
                    <span className="text-[10px] font-bold uppercase text-neutral-450 tracking-wider">
                      Repository details restricted
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
