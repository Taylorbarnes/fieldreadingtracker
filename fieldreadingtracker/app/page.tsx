"use client"

import { useState } from "react"
import { TimerControls } from "@/components/timer-controls"
import { TimerDisplay } from "@/components/timer-display"
import { ModeSelector } from "@/components/mode-selector"
import { PomodoroStats } from "@/components/pomodoro-stats"
import { BooksModal } from "@/components/books-modal"
import { useTimer } from "@/hooks/use-timer"
import { useKeyboardControls } from "@/hooks/use-keyboard-controls"
import { BookOpen } from "lucide-react"
import Image from "next/image"

export type TimerMode = "countup" | "pomodoro"

export default function HomePage() {
  const [mode, setMode] = useState<TimerMode>("countup")
  const [showBooksModal, setShowBooksModal] = useState(false)
  const timer = useTimer(mode)

  // Keyboard controls
  useKeyboardControls({
    onToggle: timer.toggle,
    onReset: timer.reset,
  })

  return (
    <main className="min-h-screen bg-base-100 relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/tulip-mobile-bg.png"
          alt="Hand-drawn tulip botanical sketch background"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-6 max-w-md ml-auto mr-4">
        <div className="text-center mb-6 glass">
          <div className="card-body py-4">
            <h1 className="text-2xl font-bold text-base-content mb-2">Field Notes</h1>
            <p className="text-sm text-base-content/70">Read Timer</p>
          </div>
        </div>

        <div className="glass mb-6">
          <ModeSelector mode={mode} onModeChange={setMode} />
        </div>

        {mode === "pomodoro" && (
          <div className="glass mb-6">
            <PomodoroStats />
          </div>
        )}

        <div className="glass mb-6">
          <TimerDisplay time={timer.time} isRunning={timer.isRunning} mode={mode} phase={timer.phase} />
        </div>

        <div className="glass mb-6">
          <TimerControls isRunning={timer.isRunning} onToggle={timer.toggle} onReset={timer.reset} />
        </div>

        <button
          onClick={() => setShowBooksModal(true)}
          className="btn btn-primary fixed bottom-6 left-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95 z-20"
        >
          <BookOpen size={16} />
          <span>Books I've read</span>
        </button>

        <div className="text-center glass">
          <div className="card-body py-3">
            <p className="text-xs text-base-content/70">
              Press <kbd className="kbd kbd-sm">Space</kbd> to start/pause, <kbd className="kbd kbd-sm">R</kbd> to reset
            </p>
          </div>
        </div>
      </div>

      <BooksModal isOpen={showBooksModal} onClose={() => setShowBooksModal(false)} />
    </main>
  )
}
