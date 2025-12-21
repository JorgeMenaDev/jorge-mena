"use client"

import { AlertTriangle, Info, Lightbulb, XCircle } from "lucide-react"
import { ReactNode } from "react"

interface CalloutProps {
  type: "info" | "warning" | "tip" | "danger"
  children: ReactNode
}

const calloutConfig = {
  info: {
    icon: Info,
    bgColor: "bg-blue-50 dark:bg-blue-950/50",
    borderColor: "border-blue-200 dark:border-blue-800",
    textColor: "text-blue-900 dark:text-blue-100",
    iconColor: "text-blue-600 dark:text-blue-400",
    ariaLabel: "Note",
    role: "note",
  },
  warning: {
    icon: AlertTriangle,
    bgColor: "bg-yellow-50 dark:bg-yellow-950/50",
    borderColor: "border-yellow-200 dark:border-yellow-800",
    textColor: "text-yellow-900 dark:text-yellow-100",
    iconColor: "text-yellow-600 dark:text-yellow-400",
    ariaLabel: "Warning",
    role: "alert",
  },
  tip: {
    icon: Lightbulb,
    bgColor: "bg-green-50 dark:bg-green-950/50",
    borderColor: "border-green-200 dark:border-green-800",
    textColor: "text-green-900 dark:text-green-100",
    iconColor: "text-green-600 dark:text-green-400",
    ariaLabel: "Tip",
    role: "note",
  },
  danger: {
    icon: XCircle,
    bgColor: "bg-red-50 dark:bg-red-950/50",
    borderColor: "border-red-200 dark:border-red-800",
    textColor: "text-red-900 dark:text-red-100",
    iconColor: "text-red-600 dark:text-red-400",
    ariaLabel: "Danger",
    role: "alert",
  },
}

export function Callout({ type, children }: CalloutProps) {
  const config = calloutConfig[type]
  const Icon = config.icon

  return (
    <div
      className={`my-6 flex gap-4 rounded-lg border-l-4 p-4 ${config.bgColor} ${config.borderColor} ${config.textColor}`}
      role={config.role as any}
      aria-label={config.ariaLabel}
    >
      <Icon className={`mt-0.5 h-5 w-5 flex-shrink-0 ${config.iconColor}`} aria-hidden="true" />
      <div className="text-sm leading-relaxed [&>p]:mb-0 [&>p:last-child]:mb-0">
        {children}
      </div>
    </div>
  )
}
