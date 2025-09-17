"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import type { TimerMode } from "@/app/page"
import { POMODORO_FOCUS_TIME, POMODORO_BREAK_TIME } from "@/utils/timer-utils"

export type PomodoroPhase = "focus" | "break"

interface TimerState {
  time: number
  isRunning: boolean
  phase: PomodoroPhase
}

export function useTimer(mode: TimerMode) {
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [phase, setPhase] = useState<PomodoroPhase>("focus")
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Load state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem("field-notes-timer")
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState) as TimerState & { mode: TimerMode }
        if (parsed.mode === mode) {
          setTime(parsed.time)
          setPhase(parsed.phase)
        }
      } catch (error) {
        console.error("Failed to parse saved timer state:", error)
      }
    }
  }, [mode])

  // Save state to localStorage
  const saveState = useCallback(() => {
    const state = { time, isRunning: false, phase, mode }
    localStorage.setItem("field-notes-timer", JSON.stringify(state))
  }, [time, phase, mode])

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          const newTime = mode === "countup" ? prevTime + 1 : prevTime - 1

          // Pomodoro mode: switch phases when timer reaches 0
          if (mode === "pomodoro" && newTime <= 0) {
            const newPhase = phase === "focus" ? "break" : "focus"
            const resetTime = newPhase === "focus" ? POMODORO_FOCUS_TIME : POMODORO_BREAK_TIME

            // Show notification
            if ("Notification" in window && Notification.permission === "granted") {
              new Notification(`Field Notes Timer`, {
                body: newPhase === "focus" ? "Break time is over! Ready to focus?" : "Great work! Time for a break.",
                icon: "/tulip-sketch.png",
              })
            }

            setPhase(newPhase)
            setIsRunning(false)
            return resetTime
          }

          return newTime
        })
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning, mode, phase])

  useEffect(() => {
    if (mode === "pomodoro" && "Notification" in window && Notification.permission === "default") {
      Notification.requestPermission()
    }
  }, [mode])

  // Save state when timer stops
  useEffect(() => {
    if (!isRunning) {
      saveState()
    }
  }, [isRunning, saveState])

  const toggle = useCallback(() => {
    setIsRunning((prev) => !prev)
  }, [])

  const reset = useCallback(() => {
    setIsRunning(false)
    if (mode === "countup") {
      setTime(0)
    } else {
      setTime(phase === "focus" ? POMODORO_FOCUS_TIME : POMODORO_BREAK_TIME)
    }
    saveState()
  }, [mode, phase, saveState])

  // Reset timer when mode changes
  useEffect(() => {
    setIsRunning(false)
    if (mode === "countup") {
      setTime(0)
    } else {
      setTime(POMODORO_FOCUS_TIME)
      setPhase("focus")
    }
  }, [mode])

  return {
    time,
    isRunning,
    phase,
    toggle,
    reset,
  }
}
