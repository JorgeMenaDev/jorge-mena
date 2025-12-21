"use client"

import { useEffect, useState } from "react"

export function ReadingProgress() {
  const [scrollPercent, setScrollPercent] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      setScrollPercent(scrolled)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      className="fixed top-0 left-0 right-0 h-1 bg-muted z-50"
      role="progressbar"
      aria-valuenow={Math.round(scrollPercent)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
    >
      <div
        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
        style={{ width: `${scrollPercent}%` }}
        aria-hidden="true"
      />
    </div>
  )
}
