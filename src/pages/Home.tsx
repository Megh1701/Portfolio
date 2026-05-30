import { useState, useRef, useEffect } from 'react'
import EventBadge from '../components/EventBadge'
import Keys from '../components/Keys'
import MusicWidget from '/image.png'
import arrow from '/arrow.png'

// Custom self-contained minimal icons to replace lucide-react without external imports
const Check = ({ className }: { className?: string }) => (
    <svg
        className={className}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <polyline points="20 6 9 17 4 12" />
    </svg>
)

const Send = ({ className }: { className?: string }) => (
    <svg
        className={className}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <line x1="22" y1="2" x2="11" y2="13" />
        <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
)

function Home() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [isSending, setIsSending] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [focusedField, setFocusedField] = useState<string | null>(null)
    const [isMusicPlaying, setIsMusicPlaying] = useState(false)

    const audioRef = useRef<HTMLAudioElement | null>(null)

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!name || !email || !message) return

        setIsSending(true)

        setTimeout(() => {
            setIsSending(false)
            setIsSubmitted(true)
            setName('')
            setEmail('')
            setMessage('')

            setTimeout(() => {
                setIsSubmitted(false)
            }, 4000)
        }, 1200)
    }

    return (
        <main className="relative z-10 bg-white text-black dark:bg-neutral-950 dark:text-white transition-colors duration-300">
            {/* Hero Section */}
            <section className="min-h-screen flex items-center justify-center px-8">
                <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center">

                    {/* Left Content */}
                    <div className="w-full md:w-1/2 flex flex-col justify-center items-start gap-10">

                        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-black dark:text-neutral-50 transition-colors">
                            Hey, I’m Megh<span className="inline-block animate-wave -scale-x-100 origin-[70%_90%] ml-2">👋</span>
                        </h1>
                        <div className="space-y-3 mt-6">
                            <p className="max-w-xl text-lg leading-relaxed text-neutral-600">

                                Full stack developer building scalable web products with MERN,
                                Generative AI, cloud infrastructure, and modern database systems.
                            </p>
                            <p className="max-w-xl text-sm leading-relaxed text-neutral-500 font-medium flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                Delivered 2 freelance gigs • Seeking internships & new opportunities.
                            </p>
                            <p>📍Gandhinagar,Gujarat</p>
                        </div>
                        {/* Premium Minimal Interactive Music Widget (Borderless) */}
                        <div className="relative mt-8 select-none">
                            {/* Cute green pointer arrow (using green arrow.png!) */}
                            <div className="absolute top-14 left-28 pointer-events-none hidden md:flex items-center gap-2 select-none z-20">
                                <img
                                    src={arrow}
                                    alt="arrow"
                                    style={{ filter: 'invert(58%) sepia(84%) saturate(415%) hue-rotate(113deg) brightness(96%) contrast(94%)' }}
                                    className="w-8 h-8 rotate-[290deg] object-contain"
                                />
                                <span className="text-[11px] font-semibold text-emerald-600 tracking-wide">
                                    Hover to listen!
                                </span>
                            </div>


                            <div
                                onMouseEnter={handleMusicPlay}
                                onMouseLeave={handleMusicPause}
                                onClick={() => window.open('https://open.spotify.com/search/Khat%20Navjot%20Ahuja', '_blank')}
                                className="flex items-center gap-4 group cursor-pointer active:scale-95 transition-transform duration-200 select-none"
                            >
                                {/* Rotating Album Art Disc (Spins continuously at all times!) */}
                                <img
                                    src={MusicWidget}
                                    alt="Album Art"
                                    className="w-14 h-14 rounded-full object-cover shadow-md border border-neutral-200/50 shrink-0 select-none animate-[spin_8s_linear_infinite]"
                                />

                                {/* Music Details */}
                               
                            </div>
                        </div>

                    </div>

                    {/* Right Side */}
                    <div className="w-full md:w-1/2 h-[550px] md:h-[calc(100vh-64px)] flex items-center justify-center relative">

                        <div className="absolute inset-0 bg-radial-gradient from-neutral-200/20 via-transparent to-transparent pointer-events-none" />

                        <EventBadge />
                    </div>
                </div>
            </section>

            {/* Contact / Keys Section */}
            <section
                id="contact"
                className="min-h-screen flex flex-col items-center justify-center px-8 py-24"
            >
                <div className="w-full max-w-7xl mx-auto flex flex-col items-center gap-2">
                    {/* Form on Top - Ultra Minimal & Beautiful with sliding underline effects */}
                    <div className="w-full max-w-xl bg-transparent relative transition-all duration-300">
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-[#1a1a1a] text-center mb-2">
                                Let&apos;s build something <span className="font-semibold text-neutral-800">together</span>
                            </h2>
                            {isSubmitted ? (
                                <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
                                    <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center text-neutral-900 mb-4 shadow-sm border border-neutral-200">
                                        <Check className="w-6 h-6" />
                                    </div>
                                    <h4 className="text-xl font-bold text-neutral-900 mb-1">Message Sent Successfully!</h4>
                                    <p className="text-xs text-neutral-500">Thank you for reaching out. I'll get back to you shortly.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                                        {/* Name input */}
                                        <div className="flex flex-col gap-1.5 relative group">
                                            <label htmlFor="name" className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 transition-colors group-focus-within:text-neutral-900">
                                                Name
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    id="name"
                                                    required
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    onFocus={() => setFocusedField('name')}
                                                    onBlur={() => setFocusedField(null)}
                                                    placeholder="Your name"
                                                    className="w-full bg-transparent border-b border-neutral-200/80 py-2 text-sm outline-none transition-colors duration-300 rounded-none placeholder:text-neutral-300"
                                                />
                                                <span className={`absolute bottom-0 left-0 w-full h-[1.5px] bg-neutral-950 transition-transform duration-300 origin-center scale-x-0 ${focusedField === 'name' ? 'scale-x-100' : ''}`} />
                                            </div>
                                        </div>

                                        {/* Email input */}
                                        <div className="flex flex-col gap-1.5 relative group">
                                            <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 transition-colors group-focus-within:text-neutral-900">
                                                Email
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="email"
                                                    id="email"
                                                    required
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    onFocus={() => setFocusedField('email')}
                                                    onBlur={() => setFocusedField(null)}
                                                    placeholder="your@email.com"
                                                    className="w-full bg-transparent border-b border-neutral-200/80 py-2 text-sm outline-none transition-colors duration-300 rounded-none placeholder:text-neutral-300"
                                                />
                                                <span className={`absolute bottom-0 left-0 w-full h-[1.5px] bg-neutral-950 transition-transform duration-300 origin-center scale-x-0 ${focusedField === 'email' ? 'scale-x-100' : ''}`} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Message Input */}
                                    <div className="flex flex-col gap-1.5 relative group">
                                        <label htmlFor="message" className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 transition-colors group-focus-within:text-neutral-900">
                                            Message
                                        </label>
                                        <div className="relative">
                                            <textarea
                                                id="message"
                                                required
                                                rows={3}
                                                value={message}
                                                onChange={(e) => setMessage(e.target.value)}
                                                onFocus={() => setFocusedField('message')}
                                                onBlur={() => setFocusedField(null)}
                                                placeholder="Write your message here..."
                                                className="w-full bg-transparent border-b border-neutral-200/80 py-2 text-sm outline-none transition-colors duration-300 rounded-none resize-none placeholder:text-neutral-300"
                                            />
                                            <span className={`absolute bottom-0 left-0 w-full h-[1.5px] bg-neutral-950 transition-transform duration-300 origin-center scale-x-0 ${focusedField === 'message' ? 'scale-x-100' : ''}`} />
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={isSending || !name || !email || !message}
                                        className="w-full mt-4 py-3.5 bg-neutral-950 hover:bg-neutral-800 text-white rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 active:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow"
                                    >
                                        {isSending ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                <span>Sending...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>Send Message</span>
                                                <Send className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>

                    {/* Keyboard on Bottom */}
                    <div className="w-full flex flex-col items-center">
                        <Keys />
                    </div>

                </div>
            </section>
        </main>
    )
}

export default Home