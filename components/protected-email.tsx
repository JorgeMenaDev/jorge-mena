"use client"

import { useEffect, useRef } from "react"

interface ProtectedEmailProps {
  email: string
  className?: string
  children?: React.ReactNode
}

export function ProtectedEmail({ email, className = "", children }: ProtectedEmailProps) {
  const linkRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    // Only set the href on client-side to prevent scrapers from finding it in HTML source
    if (linkRef.current) {
      linkRef.current.href = `mailto:${email}`
    }
  }, [email])

  return (
    <a
      ref={linkRef}
      href="#"
      onClick={(e) => {
        // Fallback in case useEffect didn't run
        e.preventDefault()
        window.location.href = `mailto:${email}`
      }}
      className={className}
    >
      {children || email}
    </a>
  )
}
