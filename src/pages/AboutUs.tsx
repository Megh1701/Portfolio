import { ArrowUpRight } from "lucide-react"

export default function AboutUs() {
    const boxCellStyle = {
        paddingTop: "32px",
        paddingBottom: "32px",
        paddingLeft: "44px",
        paddingRight: "32px",
    }

    const milestoneStyle = {
        paddingTop: "20px",
        paddingBottom: "20px",
        paddingLeft: "8px",
        paddingRight: "8px",
    }

    return (
        <section
            id="about"
            className="relative w-full min-h-[85vh] bg-[#f5f5f0] dark:bg-[#0a0a0a] text-black dark:text-white transition-colors duration-300 border-t border-b border-[var(--pattern)] [--pattern:var(--color-neutral-300)] dark:[--pattern:rgba(255,255,255,0.08)] py-28 md:py-36 overflow-hidden flex flex-col justify-center items-center"
        >
            {/* Centered full-height vertical borders wrapper */}
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-full max-w-7xl pointer-events-none z-10">
                <div className="absolute top-0 left-0 h-full border-l border-[var(--pattern)]" />
                <div className="absolute top-0 right-0 h-full border-l border-[var(--pattern)]" />
            </div>

            <div className="max-w-7xl mx-auto w-full px-8 md:px-20 relative z-10 flex flex-col justify-center">

                {/* Section Header with explicit margin style for spacing with bottom content */}
                <div style={{ marginBottom: "50px" }} className="text-left w-full max-w-6xl mx-auto">
                    <h2 style={{ paddingLeft: "20px" }} className="text-3xl md:text-4xl font-extrabold tracking-tight mt-3 text-neutral-900 dark:text-neutral-50 uppercase font-mono">
                        EDUCATION & MILESTONES
                    </h2>
                </div>

                {/* 2-Column Senior-Level Layout: Boxed Education vs. Plain Experience */}
                <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

                    {/* COLUMN 1: EDUCATION (WITH 2x2 BOX) & SOCIALS */}
                    <div className="flex flex-col gap-6 w-full" style={{ paddingLeft: "20px" }}>
                        <div className="flex flex-col gap-3 w-full">
                            <span className="text-[9px] font-bold text-neutral-400 dark:text-neutral-500 uppercase font-mono tracking-widest pl-1">
                                [01 // EDUCATION]
                            </span>
                            <div className="w-full border-y border-x-0 md:border border-[var(--pattern)] grid grid-cols-1 md:grid-cols-2 bg-transparent select-none font-mono">

                                {/* Cell 1: DEGREE */}
                                <div className="border-b border-dashed md:border-solid border-[var(--pattern)] flex flex-col justify-center text-left gap-1 p-4 md:pt-[32px] md:pb-[32px] md:pl-[44px] md:pr-[32px]">
                                    <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                                        DEGREE
                                    </span>
                                    <span className="text-neutral-955 dark:text-neutral-50 text-sm font-semibold">
                                        Bachelor of Engineering
                                    </span>
                                    <span className="text-neutral-500 dark:text-neutral-400 text-xs">
                                        Computer Engineering
                                    </span>
                                </div>

                                {/* Cell 2: COLLEGE */}
                                <div className="border-b border-dashed md:border-solid md:border-l border-[var(--pattern)] flex flex-col justify-center text-left gap-1 p-4 md:pt-[32px] md:pb-[32px] md:pl-[44px] md:pr-[32px]">
                                    <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                                        COLLEGE
                                    </span>
                                    <span className="text-neutral-955 dark:text-neutral-50 text-sm font-semibold">
                                        LDRP-ITR
                                    </span>
                                    <span className="text-neutral-500 dark:text-neutral-400 text-xs">
                                        LDRP Institute of Technology & Research
                                    </span>
                                </div>

                                {/* Cell 3: DURATION */}
                                <div className="border-b border-dashed md:border-solid md:border-b-0 border-[var(--pattern)] flex flex-col justify-center text-left gap-1 p-4 md:pt-[32px] md:pb-[32px] md:pl-[44px] md:pr-[32px]">
                                    <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-50">
                                        DURATION
                                    </span>
                                    <span className="text-neutral-955 dark:text-neutral-50 text-sm font-semibold">
                                        2023 - 2027
                                    </span>
                                    <span className="text-neutral-500 dark:text-neutral-400 text-xs">
                                        Academic Term
                                    </span>
                                </div>

                                {/* Cell 4: LOCATION */}
                                <div className="md:border-l border-[var(--pattern)] flex flex-col justify-center text-left gap-1 p-4 md:pt-[32px] md:pb-[32px] md:pl-[44px] md:pr-[32px]">
                                    <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                                        LOCATION
                                    </span>
                                    <span className="text-neutral-955 dark:text-neutral-50 text-sm font-semibold">
                                        Gandhinagar, Gujarat, IN
                                    </span>
                                    <span className="text-neutral-500 dark:text-neutral-400 text-xs">
                                        23.2156° N, 72.6369° E
                                    </span>
                                </div>

                            </div>
                        </div>

                        {/* Social Connections underneath the box */}
                        <div className="w-full flex flex-wrap justify-start items-center gap-x-5 gap-y-2.5 mt-2 text-xs font-mono select-none pl-1">
                            {/* X */}
                            <a
                                href="https://x.com/pmegh456"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 hover:text-[#059669] dark:hover:text-[#10b981] transition-colors group cursor-pointer pointer-events-auto"
                            >
                                <span>X</span>
                                <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                            </a>

                            <span className="text-neutral-300 dark:text-neutral-800">/</span>

                            {/* GitHub */}
                            <a
                                href="https://github.com/Megh1701"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 hover:text-[#059669] dark:hover:text-[#10b981] transition-colors group cursor-pointer pointer-events-auto"
                            >
                                <span>GitHub</span>
                                <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                            </a>

                            <span className="text-neutral-300 dark:text-neutral-800">/</span>

                            {/* LinkedIn */}
                            <a
                                href="https://www.linkedin.com/in/patel-megh-172a7528a/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 hover:text-[#059669] dark:hover:text-[#10b981] transition-colors group cursor-pointer pointer-events-auto"
                            >
                                <span>LinkedIn</span>
                                <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                            </a>

                            <span className="text-neutral-300 dark:text-neutral-800">/</span>

                            {/* Email */}
                            <a
                                href="mailto:pmegh456@gmail.com"
                                className="flex items-center gap-1 hover:text-[#059669] dark:hover:text-[#10b981] transition-colors group cursor-pointer pointer-events-auto"
                            >
                                <span>Email</span>
                                <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                            </a>
                        </div>
                    </div>

                    {/* COLUMN 2: EXPERIENCE (PLAIN LIST, NO BOX) - ORDER: NEW -> OLD */}
                    <div className="flex flex-col gap-3 w-full">
                        <span className="text-[9px] font-bold text-neutral-400 dark:text-neutral-500 uppercase font-mono tracking-widest pl-1">
                            [02 // MILESTONES]
                        </span>

                        <div className="flex flex-col font-mono text-left w-full select-none">

                            {/* Item 1: OMERA FINTECH (2025) */}
                            <div style={milestoneStyle} className="border-b border-dashed border-[var(--pattern)] flex flex-col justify-center text-left gap-1">
                                <div className="flex items-baseline justify-between w-full gap-4">
                                    <a
                                        href="https://omerafintech.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-neutral-955 dark:text-neutral-50 text-sm font-semibold hover:text-[#059669] dark:hover:text-[#10b981] transition-colors inline-flex items-center gap-0.5 pointer-events-auto"
                                    >
                                        <span>omerafintech.com</span>
                                        <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                                    </a>
                                    <div className="flex items-center gap-1.5 text-[9px] md:text-[10px] text-neutral-400 dark:text-neutral-500 shrink-0">
                                        <span className="font-bold">2025</span>
                                        <span>/</span>
                                        <span className="uppercase tracking-wider">Freelance</span>
                                    </div>
                                </div>
                                <span className="text-neutral-500 dark:text-neutral-400 text-xs">
                                    Developed web interface for fintech & remittance platform.
                                </span>
                            </div>

                            {/* Item 2: SSIP (2025) */}
                            <div style={milestoneStyle} className="border-b border-dashed border-[var(--pattern)] flex flex-col justify-center text-left gap-1">
                                <div className="flex items-baseline justify-between w-full gap-4">
                                    <span className="text-neutral-955 dark:text-neutral-50 text-sm font-semibold">
                                        SSIP 2025
                                    </span>
                                    <div className="flex items-center gap-1.5 text-[9px] md:text-[10px] text-neutral-400 dark:text-neutral-500 shrink-0">
                                        <span className="font-bold">2025</span>
                                        <span>/</span>
                                        <span className="uppercase tracking-wider">Innovation</span>
                                    </div>
                                </div>
                                <span className="text-neutral-500 dark:text-neutral-400 text-xs">
                                    Student Startup and Innovation Policy research project.
                                </span>
                            </div>

                            {/* Item 3: ETERNAL OVERSEAS (Dec 2024 - Jan 2025) */}
                            <div style={milestoneStyle} className="border-b border-dashed border-[var(--pattern)] flex flex-col justify-center text-left gap-1">
                                <div className="flex items-baseline justify-between w-full gap-4">
                                    <a
                                        href="https://eternaloverseas.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-neutral-955 dark:text-neutral-50 text-sm font-semibold hover:text-[#059669] dark:hover:text-[#10b981] transition-colors inline-flex items-center gap-0.5 pointer-events-auto"
                                    >
                                        <span>eternaloverseas.com</span>
                                        <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                                    </a>
                                    <div className="flex items-center gap-1.5 text-[9px] md:text-[10px] text-neutral-400 dark:text-neutral-500 shrink-0">
                                        <span className="font-bold">Dec 2024 - Jan 2025</span>
                                        <span>/</span>
                                        <span className="uppercase tracking-wider">Freelance</span>
                                    </div>
                                </div>
                                <span className="text-neutral-500 dark:text-neutral-400 text-xs">
                                    Built export business website for ceramic & sanitary ware exporter.
                                </span>
                            </div>

                            {/* Item 4: SIH 2024 (2024) */}
                            <div style={milestoneStyle} className="flex flex-col justify-center text-left gap-1">
                                <div className="flex items-baseline justify-between w-full gap-4">
                                    <span className="text-neutral-955 dark:text-neutral-50 text-sm font-semibold">
                                        SIH 2024
                                    </span>
                                    <div className="flex items-center gap-1.5 text-[9px] md:text-[10px] text-neutral-400 dark:text-neutral-500 shrink-0">
                                        <span className="font-bold">2024</span>
                                        <span>/</span>
                                        <span className="uppercase tracking-wider">Hackathon</span>
                                    </div>
                                </div>
                                <span className="text-neutral-500 dark:text-neutral-400 text-xs">
                                    Smart India Hackathon participant & developer.
                                </span>
                            </div>

                        </div>
                    </div>

                </div>

            </div>
        </section>
    )
}