"use client"

import { Play, Pause, RotateCcw } from "lucide-react"

interface TimerControlsProps {
  isRunning: boolean
  onToggle: () => void
  onReset: () => void
}

export function TimerControls({ isRunning, onToggle, onReset }: TimerControlsProps) {
  return (
    <div className="flex justify-center gap-4 mb-6">
      {/* Play/Pause Button */}
      <button
        onClick={onToggle}
        className="flex items-center justify-center w-16 h-16 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95"
        aria-label={isRunning ? "Pause timer" : "Start timer"}
      >
        {isRunning ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
      </button>

      {/* Reset Button */}
      <button
        onClick={onReset}
        className="flex items-center justify-center w-12 h-12 bg-muted text-muted-foreground rounded-full hover:bg-border hover:text-foreground transition-all duration-200 hover:scale-105 active:scale-95"
        aria-label="Reset timer"
      >
        <RotateCcw size={18} />
      </button>
    </div>
  )
}
