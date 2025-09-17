"use client"

import { useEffect, useState } from "react"
import { Clock, Coffee } from "lucide-react"

interface PomodoroStats {
  focusSessions: number
  breakSessions: number
  totalFocusTime: number
  totalBreakTime: number
}

export function PomodoroStats() {
  const [stats, setStats] = useState<PomodoroStats>({
    focusSessions: 0,
    breakSessions: 0,
    totalFocusTime: 0,
    totalBreakTime: 0,
  })

  useEffect(() => {
    const savedStats = localStorage.getItem("field-notes-pomodoro-stats")
    if (savedStats) {
      try {
        setStats(JSON.parse(savedStats))
      } catch (error) {
        console.error("Failed to parse pomodoro stats:", error)
      }
    }
  }, [])

  const formatMinutes = (seconds: number) => {
    return Math.floor(seconds / 60)
  }

  return (
    <div className="bg-card rounded-lg border border-border p-4 mb-6">
      <h3 className="text-sm font-medium text-foreground mb-3">Today's Progress</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <Clock size={16} className="text-primary mr-1" />
            <span className="text-lg font-bold text-foreground">{stats.focusSessions}</span>
          </div>
          <p className="text-xs text-muted-foreground">Focus sessions</p>
          <p className="text-xs text-muted-foreground">{formatMinutes(stats.totalFocusTime)}min total</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <Coffee size={16} className="text-secondary mr-1" />
            <span className="text-lg font-bold text-foreground">{stats.breakSessions}</span>
          </div>
          <p className="text-xs text-muted-foreground">Break sessions</p>
          <p className="text-xs text-muted-foreground">{formatMinutes(stats.totalBreakTime)}min total</p>
        </div>
      </div>
    </div>
  )
}
