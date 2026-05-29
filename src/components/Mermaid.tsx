import { useEffect, useRef, useState } from "react"
import mermaid from "mermaid"
import { useTheme } from "../context/ThemeContext"

interface MermaidProps {
  chart: string
}

export default function Mermaid({ chart }: MermaidProps) {
  const { resolvedTheme } = useTheme()
  const elementRef = useRef<HTMLDivElement>(null)
  const [svgContent, setSvgContent] = useState("")

  useEffect(() => {
    // Initialize Mermaid configuration
    mermaid.initialize({
      startOnLoad: false,
      theme: resolvedTheme === "dark" ? "dark" : "neutral",
      securityLevel: "loose",
      fontFamily: "monospace, Courier New, Courier, sans-serif",
      flowchart: {
        nodeSpacing: 50,
        rankSpacing: 80,
        padding: 24,
        curve: "basis",
      },
      themeVariables: {
        fontSize: "11px",
        primaryColor: resolvedTheme === "dark" ? "#022030" : "#e0f2fe",
        primaryTextColor: resolvedTheme === "dark" ? "#e0f2fe" : "#0369a1",
        lineColor: resolvedTheme === "dark" ? "#525252" : "#d4d4d4",
        secondaryColor: resolvedTheme === "dark" ? "#1a0b30" : "#faf5ff",
        tertiaryColor: resolvedTheme === "dark" ? "#2b1b02" : "#fef3c7",
      }
    })
  }, [resolvedTheme])

  useEffect(() => {
    let active = true
    const renderChart = async () => {
      const id = `mermaid-${Math.floor(Math.random() * 1000000)}`
      
      const classes = resolvedTheme === "dark" ? `
        classDef frontend fill:#0c1a24,stroke:#0284c7,stroke-width:1px,color:#38bdf8;
        classDef backend fill:#062d24,stroke:#059669,stroke-width:1px,color:#34d399;
        classDef database fill:#271206,stroke:#d97706,stroke-width:1px,color:#fbbf24;
        classDef hybrid fill:#2e0618,stroke:#e11d48,stroke-width:1px,color:#fda4af;
      ` : `
        classDef frontend fill:#f0f9ff,stroke:#0284c7,stroke-width:1px,color:#0369a1;
        classDef backend fill:#ecfdf5,stroke:#059669,stroke-width:1px,color:#047857;
        classDef database fill:#fffbeb,stroke:#d97706,stroke-width:1px,color:#b45309;
        classDef hybrid fill:#fff1f2,stroke:#e11d48,stroke-width:1px,color:#be123c;
      `
      
      const fullChart = `${chart}\n${classes}`
      
      try {
        // Render SVG dynamically
        const { svg } = await mermaid.render(id, fullChart)
        if (active) {
          setSvgContent(svg)
        }
      } catch (err) {
        console.error("Mermaid parsing error:", err)
      }
    }

    renderChart()
    return () => {
      active = false
    }
  }, [chart, resolvedTheme])

  return (
    <div 
      ref={elementRef}
      className="w-full overflow-x-auto flex justify-center py-8 bg-[#fbfbf9] dark:bg-[#080808]/95 border border-neutral-200 dark:border-neutral-800"
      style={{
        minHeight: "420px",
        backgroundImage: 'radial-gradient(var(--grid-color) 1.5px, transparent 1.5px)',
        backgroundSize: '24px 24px'
      }}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  )
}
