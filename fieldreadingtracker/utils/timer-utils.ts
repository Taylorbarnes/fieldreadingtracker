export function formatTime(seconds: number): string {
  const mins = Math.floor(Math.abs(seconds) / 60)
  const secs = Math.abs(seconds) % 60
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
}

export function parseTime(timeString: string): number {
  const [mins, secs] = timeString.split(":").map(Number)
  return mins * 60 + secs
}

export const POMODORO_FOCUS_TIME = 25 * 60 // 25 minutes
export const POMODORO_BREAK_TIME = 5 * 60 // 5 minutes

export function updatePomodoroStats(phase: "focus" | "break", timeSpent: number) {
  const savedStats = localStorage.getItem("field-notes-pomodoro-stats")
  let stats = {
    focusSessions: 0,
    breakSessions: 0,
    totalFocusTime: 0,
    totalBreakTime: 0,
    lastUpdated: new Date().toDateString(),
  }

  if (savedStats) {
    try {
      const parsed = JSON.parse(savedStats)
      // Reset stats if it's a new day
      if (parsed.lastUpdated !== new Date().toDateString()) {
        stats.lastUpdated = new Date().toDateString()
      } else {
        stats = parsed
      }
    } catch (error) {
      console.error("Failed to parse pomodoro stats:", error)
    }
  }

  if (phase === "focus") {
    stats.focusSessions += 1
    stats.totalFocusTime += timeSpent
  } else {
    stats.breakSessions += 1
    stats.totalBreakTime += timeSpent
  }

  localStorage.setItem("field-notes-pomodoro-stats", JSON.stringify(stats))
}
