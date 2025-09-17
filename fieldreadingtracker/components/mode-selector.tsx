"use client"

import type { TimerMode } from "@/app/page"

interface ModeSelectorProps {
  mode: TimerMode
  onModeChange: (mode: TimerMode) => void
}

export function ModeSelector({ mode, onModeChange }: ModeSelectorProps) {
  return (
    <div className="flex bg-muted rounded-lg p-1 mb-6">
      <button
        onClick={() => onModeChange("countup")}
        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
          mode === "countup" ? "bg-card text-card-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
        }`}
      >
        Count Up
      </button>
      <button
        onClick={() => onModeChange("pomodoro")}
        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
          mode === "pomodoro" ? "bg-card text-card-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
        }`}
      >
        Pomodoro
      </button>
    </div>
  )
}
