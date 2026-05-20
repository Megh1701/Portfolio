import { useState, useEffect } from "react"
import { Heart } from "lucide-react"

export default function Footer() {
  const [visitors, setVisitors] = useState(1482)
  const [likes, setLikes] = useState(87)
  const [hasLiked, setHasLiked] = useState(false)
  const [plusOnes, setPlusOnes] = useState<{ id: number; x: number; y: number }[]>([])

  useEffect(() => {
    // 1. Handle Visitor Counter
    const storedVisitors = localStorage.getItem("megh_portfolio_visitors")
    if (storedVisitors) {
      const newVal = parseInt(storedVisitors, 10) + 1
      setVisitors(newVal)
      localStorage.setItem("megh_portfolio_visitors", newVal.toString())
    } else {
      localStorage.setItem("megh_portfolio_visitors", "1482")
    }

    // 2. Handle Likes Counter
    const storedLikes = localStorage.getItem("megh_portfolio_likes")
    if (storedLikes) {
      setLikes(parseInt(storedLikes, 10))
    } else {
      localStorage.setItem("megh_portfolio_likes", "87")
    }

    // 3. Check if user already liked
    const userLiked = localStorage.getItem("megh_portfolio_has_liked")
    if (userLiked === "true") {
      setHasLiked(true)
    }
  }, [])

  const handleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    const newLikesCount = likes + 1
    setLikes(newLikesCount)
    localStorage.setItem("megh_portfolio_likes", newLikesCount.toString())

    // Animate a floating +1
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const newId = Date.now()
    setPlusOnes((prev) => [...prev, { id: newId, x, y }])

    // Remove after animation completes
    setTimeout(() => {
      setPlusOnes((prev) => prev.filter((item) => item.id !== newId))
    }, 1000)

    if (!hasLiked) {
      setHasLiked(true)
      localStorage.setItem("megh_portfolio_has_liked", "true")
    }
  }

  // Helper to format numbers with correct ordinal suffixes (e.g. 1st, 2nd, 3rd, 1482nd)
  const getOrdinalVisitor = (num: number) => {
    const pr = new Intl.PluralRules("en-US", { type: "ordinal" })
    const suffixes = {
      zero: "th",
      one: "st",
      two: "nd",
      few: "rd",
      many: "th",
      other: "th"
    }
    const rule = pr.select(num)
    const suffix = suffixes[rule as keyof typeof suffixes] || "th"
    return `${num.toLocaleString()}${suffix}`
  }

  return (
    <footer className="relative w-full bg-[#f5f5f0] dark:bg-[#0a0a0a] text-black dark:text-white transition-colors duration-300 border-t border-[var(--pattern)] [--pattern:var(--color-neutral-300)] dark:[--pattern:rgba(255,255,255,0.08)] py-12 md:py-24 overflow-hidden flex flex-col justify-center items-center">
      {/* Centered full-height vertical borders wrapper */}
      <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-full max-w-7xl pointer-events-none z-10">
        <div className="absolute top-0 left-0 h-full border-l border-[var(--pattern)]" />
        <div className="absolute top-0 right-0 h-full border-l border-[var(--pattern)]" />
      </div>

      <div className="max-w-7xl mx-auto w-full px-8 md:px-20 relative z-10">
        {/* Footer 3-Grid Layout */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 border-t border-b md:border md:rounded-xl border-[var(--pattern)] divide-y md:divide-y-0 md:divide-x divide-[var(--pattern)] bg-transparent font-mono select-none">

          {/* Cell 1: Acknowledgement */}
          <div className="p-6 md:p-12 flex flex-col justify-between gap-6 min-h-[180px] md:min-h-[220px]">
            <div className="flex flex-col gap-1">
              <span className="text-[9px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
                [ ACKNOWLEDGEMENT ]
              </span>
              <span className="text-neutral-950 dark:text-neutral-50 text-xs font-semibold leading-relaxed mt-2 uppercase">
                Thank you for visiting my digital canvas.
              </span>
            </div>
            <span className="text-neutral-400 dark:text-neutral-500 text-[9px] font-bold uppercase tracking-widest">
              GANDHINAGAR, GJ, IN
            </span>
          </div>

          {/* Cell 2: Visitor Analytics (Plain simple ordinal greeting) */}
          <div className="p-6 md:p-12 flex flex-col justify-between gap-6 min-h-[180px] md:min-h-[220px]">
            <div className="flex flex-col gap-1">
              <span className="text-[9px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
                [ VISITOR INDEX ]
              </span>
              <span className="text-neutral-950 dark:text-neutral-50 text-xs font-semibold leading-relaxed mt-2 uppercase">
                You are the {getOrdinalVisitor(visitors)} visitor to explore this space.
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[9px] text-[#059669] dark:text-[#10b981] font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#059669] dark:bg-[#10b981] animate-pulse" />
              ONLINE & RECORDED
            </div>
          </div>

          {/* Cell 3: Vibe Check (Interactive Like Button) */}
          <div className="p-6 md:p-12 flex flex-col justify-between gap-6 min-h-[180px] md:min-h-[220px] relative">
            <div className="flex flex-col gap-1">
              <span className="text-[9px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
                [ VIBE CHECK ]
              </span>
              <span className="text-neutral-500 dark:text-neutral-400 text-[10px] mt-1 uppercase">
                Hit the checker if you liked my projects & design
              </span>
            </div>

            {/* Like Button */}
            <button
              onClick={handleLike}
              className="relative overflow-hidden w-full py-3.5 px-4 mt-2 border border-[var(--pattern)] hover:border-neutral-950 dark:hover:border-white transition-all bg-transparent hover:bg-neutral-950/5 dark:hover:bg-white/5 cursor-pointer font-bold text-xs uppercase flex items-center justify-between group active:scale-[0.98] outline-none"
            >
              {/* Floating +1 Elements */}
              {plusOnes.map((p) => (
                <span
                  key={p.id}
                  className="absolute text-[#059669] dark:text-[#10b981] text-xs font-bold pointer-events-none animate-float-fade-up"
                  style={{ left: p.x, top: p.y - 15 }}
                >
                  +1
                </span>
              ))}

              <div className="flex items-center gap-2">
                <Heart
                  className={`w-4 h-4 transition-all duration-300 ${hasLiked
                    ? "fill-[#ef4444] stroke-[#ef4444] scale-110"
                    : "text-neutral-400 group-hover:text-[#ef4444] group-hover:scale-105"
                    }`}
                />
                <span className="text-neutral-900 dark:text-white">
                  {hasLiked ? "Vibe Approved!" : "Approve Vibe"}
                </span>
              </div>
              <span className="text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-950 dark:group-hover:text-white transition-colors">
                {likes} LIKES
              </span>
            </button>
          </div>

        </div>

        {/* Bottom Socials & Nav Row */}
        <div className="w-full mt-8 border-t border-[var(--pattern)] pt-8 flex flex-col md:flex-row justify-between items-center gap-6 font-mono">
          <div className="flex flex-wrap gap-6 text-xs text-neutral-450 dark:text-neutral-500 uppercase tracking-widest select-none justify-center md:justify-start">
            <span>[ CONNECT ]</span>
            <a
              href="https://github.com/Megh1701"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-900 dark:text-white hover:text-[#059669] dark:hover:text-[#10b981] transition-colors"
            >
              GitHub ↗
            </a>
            <a
              href="https://www.linkedin.com/in/patel-megh-172a7528a/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-900 dark:text-white hover:text-[#059669] dark:hover:text-[#10b981] transition-colors"
            >
              LinkedIn ↗
            </a>
            <a
              href="mailto:pmegh456@gmail.com"
              className="text-neutral-900 dark:text-white hover:text-[#059669] dark:hover:text-[#10b981] transition-colors"
            >
              Email ↗
            </a>
          </div>

          <div className="text-[10px] text-neutral-450 dark:text-neutral-500 uppercase tracking-widest text-center md:text-right select-none">
            © {new Date().getFullYear()} MEGH PATEL // ALL RIGHTS RESERVED
          </div>
        </div>
      </div>

      {/* Floating animation keyframes injection */}
      <style>{`
        @keyframes floatFadeUp {
          0% {
            transform: translateY(0) scale(0.8);
            opacity: 1;
          }
          100% {
            transform: translateY(-30px) scale(1.1);
            opacity: 0;
          }
        }
        .animate-float-fade-up {
          animation: floatFadeUp 800ms cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }
      `}</style>
    </footer>
  )
}
