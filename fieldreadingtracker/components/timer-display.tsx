"use client"

import type { TimerMode, PomodoroPhase } from "@/app/page"

interface TimerDisplayProps {
  time: number
  isRunning: boolean
  mode: TimerMode
  phase?: PomodoroPhase
}

function formatTime(seconds: number): string {
  const mins = Math.floor(Math.abs(seconds) / 60)
  const secs = Math.abs(seconds) % 60
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
}

export function TimerDisplay({ time, isRunning, mode, phase }: TimerDisplayProps) {
  const displayTime = formatTime(time)
  const isBreakPhase = mode === "pomodoro" && phase === "break"

  return (
    <div className="text-center mb-8">
      {/* Phase indicator for Pomodoro */}
      {mode === "pomodoro" && (
        <div className="mb-4">
          <div
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              isBreakPhase
                ? "bg-secondary/10 text-secondary border border-secondary/20"
                : "bg-primary/10 text-primary border border-primary/20"
            }`}
          >
            {isBreakPhase ? "Break Time" : "Focus Time"}
          </div>
        </div>
      )}

      {/* Timer Circle */}
      <div className="relative inline-flex items-center justify-center mb-6">
        <div
          className={`w-48 h-48 rounded-full border-4 flex items-center justify-center transition-all duration-300 ${
            isRunning
              ? isBreakPhase
                ? "border-secondary bg-secondary/5 animate-pulse-gentle"
                : "border-primary bg-primary/5 animate-pulse-gentle"
              : "border-border bg-card"
          }`}
        >
          <div className="text-center">
            <div className="text-4xl font-mono font-bold text-foreground mb-1">{displayTime}</div>
            <div className="text-sm text-muted-foreground">
              {mode === "countup" ? "elapsed" : isBreakPhase ? "break" : "focus"}
            </div>
          </div>
        </div>

        {/* Running indicator dot */}
        {isRunning && (
          <div
            className={`absolute -top-2 -right-2 w-4 h-4 rounded-full animate-pulse ${
              isBreakPhase ? "bg-secondary" : "bg-primary"
            }`}
          />
        )}
      </div>

      {/* Status text */}
      <p className="text-sm text-muted-foreground">
        {isRunning ? (isBreakPhase ? "Taking a break..." : "Reading in progress...") : "Ready to start"}
      </p>
    </div>
  )
}
