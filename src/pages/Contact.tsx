import React, { useState, useEffect } from "react"
import Keys from "../components/Keys"

export default function Contact() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const [isDesktop, setIsDesktop] = useState(typeof window !== "undefined" ? window.innerWidth >= 1024 : false)

  useEffect(() => {
    const checkWidth = () => {
      setIsDesktop(window.innerWidth >= 1024)
    }
    checkWidth()
    window.addEventListener("resize", checkWidth)
    return () => window.removeEventListener("resize", checkWidth)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !message) return

    setIsSubmitting(true)
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "YOUR_ACCESS_KEY_HERE",
          email: email,
          message: message,
          from_name: "Portfolio Contact Form",
          subject: "New Slate Message from Portfolio",
        }),
      })

      const data = await response.json()
      if (data.success) {
        setEmail("")
        setMessage("")
        setShowSuccess(true)
        setTimeout(() => setShowSuccess(false), 4000)
      } else {
        console.error("Web3Forms error:", data)
        alert(data.message || "Failed to post message on slate. Please try again.")
      }
    } catch (err) {
      console.error("Failed to submit contact form:", err)
      alert("Something went wrong while sending the message. Please check your internet connection and try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="relative w-full min-h-[85vh] md:min-h-screen bg-[#f5f5f0] dark:bg-[#0a0a0a] text-black dark:text-white transition-colors duration-300 border-t border-[var(--pattern)] flex justify-center items-center py-14 md:py-20 [--pattern:var(--color-neutral-300)] dark:[--pattern:rgba(255,255,255,0.08)]">

      {/* Centered full-height vertical borders wrapper */}
      <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-full max-w-7xl pointer-events-none z-10">
        {/* Left Side Vertical Line */}
        <div className="absolute top-0 left-0 h-full border-l border-[var(--pattern)]" />

        {/* Right Side Vertical Line */}
        <div className="absolute top-0 right-0 h-full border-l border-[var(--pattern)]" />
      </div>

      {/* Container with vertical lines on both sides matching the Hero section */}
      <div className="w-full max-w-7xl relative flex flex-col items-center px-6 md:px-16 my-6 md:my-10 gap-10 md:gap-16"
        style={{
          marginTop: isDesktop ? "100px" : "0px",
        }}>


        {/* Section Header */}
        <div className="text-center relative z-10 shrink-0">

          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-3 text-neutral-900 dark:text-neutral-50 uppercase">
            CONTACT
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 text-xs max-w-md mx-auto mt-2 leading-relaxed">
            Leave a message on the slate below.
          </p>
        </div>

        {/* Board and Keyboard Wrapper (tight gap) */}
        <div className="w-full flex flex-col items-center z-20">

          {/* Classroom Blackboard Form */}
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-[500px] px-2"
            style={{ flexShrink: 0 }}
          >
            {/* Wooden Chalkboard Frame */}
            <div className="relative border-[6px] border-[#5c4033] rounded-2xl shadow-[0_15px_30px_rgba(0,0,0,0.15)] overflow-hidden">

              {/* Slate Chalkboard Board */}
              <div
                className="p-6 flex flex-col gap-5 bg-[#1a3c2b]"
                style={{
                  background: "repeating-linear-gradient(transparent, transparent 36px, rgba(255, 255, 255, 0.015) 36px, rgba(255, 255, 255, 0.015) 37px), radial-gradient(circle at center, #1a3c2b 0%, #11271c 100%)"
                }}
              >
                {/* Board Header */}
                <div
                  className="border-b border-white/5 pb-2.5 flex justify-between items-center text-[10px] tracking-widest text-[#a3d9c9]/60 font-semibold uppercase"
                  style={{ fontFamily: '"Patrick Hand", cursive' }}
                >
                  <span>Classroom Slate</span>
                  <span>Interactive</span>
                </div>

                {/* Email Input */}
                <div className="flex flex-col gap-1.5">
                  <label
                    className="text-white/60 text-[11px] uppercase tracking-widest font-semibold select-none"
                    style={{ fontFamily: '"Patrick Hand", cursive' }}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your_email@example.com"
                    className="w-full bg-transparent border-b border-dotted border-white/20 focus:border-[#10b981]/50 text-[#f5f5f0] placeholder-white/20 text-lg outline-none py-0.5 transition-all"
                    style={{ fontFamily: '"Patrick Hand", cursive', letterSpacing: "0.05em" }}
                  />
                </div>

                {/* Message Input */}
                <div className="flex flex-col gap-1.5">
                  <label
                    className="text-white/60 text-[11px] uppercase tracking-widest font-semibold select-none"
                    style={{ fontFamily: '"Patrick Hand", cursive' }}
                  >
                    Message Body
                  </label>
                  <textarea
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Start typing your note here..."
                    className="w-full bg-transparent border-b border-dotted border-white/20 focus:border-[#10b981]/50 text-[#f5f5f0] placeholder-white/20 text-lg outline-none py-0.5 h-24 resize-none transition-all leading-[36px]"
                    style={{ fontFamily: '"Patrick Hand", cursive' }}
                  />
                </div>

                {/* Board Actions */}
                <div className="flex justify-between items-center mt-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      setEmail("");
                      setMessage("");

                    }}
                    className="text-[9px] text-[#f5f5f0]/40 hover:text-[#f5f5f0]/90 transition-colors uppercase font-bold tracking-widest cursor-pointer font-mono select-none"
                  >
                    [ Clear Board ]
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 py-2.5 bg-[#059669] hover:bg-[#10b981] text-white border border-white/10 hover:border-white/30 rounded-xl font-bold text-[9px] tracking-widest uppercase shadow-[0_4px_12px_rgba(5,150,105,0.25)] hover:shadow-[0_6px_18px_rgba(16,185,129,0.35)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer disabled:opacity-50 flex items-center gap-2 font-mono"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-0.5 mr-1 h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Chalking...
                      </>
                    ) : (
                      <>
                        <svg className="w-3.5 h-3.5 text-white/95" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                        </svg>
                        Chalk It Down
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Subtle wooden ledge trim */}
              <div className="h-[4px] bg-[#4a3327]" />
            </div>
          </form>

          {/* Keyboard container (positioned immediately below with tight gap - Desktop Only) */}
          {isDesktop && (
            <div
              className="hidden lg:flex w-full overflow-x-auto justify-center relative z-10"
              style={{
                flexShrink: 0,
                marginTop: "10px",
                paddingBottom: "64px"
              }}
            >
              <div className="min-w-[820px] px-4">
                <Keys />
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Floating Toast Notification */}
      <div
        className="fixed z-300 top-8 left-1/2 z-50 max-w-sm p-4 bg-[#102016]/95 backdrop-blur-md border border-[#059669]/30 rounded-xl shadow-2xl flex items-start gap-3 text-white text-xs"
        style={{
          transform: showSuccess ? "translate(-50%, 0px) scale(1)" : "translate(-50%, -100px) scale(0.95)",
          opacity: showSuccess ? 1 : 0,
          pointerEvents: showSuccess ? "auto" : "none",
          transition: "all 450ms cubic-bezier(0.16, 1, 0.3, 1)",
          fontFamily: '"Patrick Hand", cursive'
        }}
      >
        <svg className="w-5 h-5 text-[#10b981] shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div className="flex flex-col gap-1 pr-6">
          <span className="text-[#a3d9c9] font-bold text-[11px] tracking-widest uppercase select-none">[ SUCCESS ]</span>
          <span className="text-white/90 leading-normal text-[14px]">Your message has been posted on the slate successfully!</span>
        </div>

        {/* Dismiss Icon */}
        <button
          onClick={() => setShowSuccess(false)}
          className="ml-auto text-white/40 hover:text-white/80 transition-colors text-[10px] cursor-pointer absolute right-4 top-4"
        >
          ✕
        </button>
      </div>
    </section>
  )
}