import { formatTime, parseTime, POMODORO_FOCUS_TIME, POMODORO_BREAK_TIME } from "@/utils/timer-utils"

describe("Timer Utils", () => {
  describe("formatTime", () => {
    it("formats seconds correctly", () => {
      expect(formatTime(0)).toBe("00:00")
      expect(formatTime(30)).toBe("00:30")
      expect(formatTime(60)).toBe("01:00")
      expect(formatTime(90)).toBe("01:30")
      expect(formatTime(3661)).toBe("61:01")
    })

    it("handles negative numbers", () => {
      expect(formatTime(-30)).toBe("00:30")
      expect(formatTime(-90)).toBe("01:30")
    })
  })

  describe("parseTime", () => {
    it("parses time strings correctly", () => {
      expect(parseTime("00:00")).toBe(0)
      expect(parseTime("00:30")).toBe(30)
      expect(parseTime("01:00")).toBe(60)
      expect(parseTime("01:30")).toBe(90)
      expect(parseTime("25:00")).toBe(1500)
    })
  })

  describe("constants", () => {
    it("has correct pomodoro times", () => {
      expect(POMODORO_FOCUS_TIME).toBe(25 * 60)
      expect(POMODORO_BREAK_TIME).toBe(5 * 60)
    })
  })
})
