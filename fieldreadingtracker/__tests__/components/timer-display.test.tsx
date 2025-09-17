import { render, screen } from "@testing-library/react"
import { TimerDisplay } from "@/components/timer-display"

describe("TimerDisplay", () => {
  it("renders count up mode correctly", () => {
    render(<TimerDisplay time={90} isRunning={false} mode="countup" />)

    expect(screen.getByText("01:30")).toBeInTheDocument()
    expect(screen.getByText("elapsed")).toBeInTheDocument()
    expect(screen.getByText("Ready to start")).toBeInTheDocument()
  })

  it("renders pomodoro focus mode correctly", () => {
    render(<TimerDisplay time={1500} isRunning={true} mode="pomodoro" phase="focus" />)

    expect(screen.getByText("25:00")).toBeInTheDocument()
    expect(screen.getByText("Focus Time")).toBeInTheDocument()
    expect(screen.getByText("focus")).toBeInTheDocument()
    expect(screen.getByText("Reading in progress...")).toBeInTheDocument()
  })

  it("renders pomodoro break mode correctly", () => {
    render(<TimerDisplay time={300} isRunning={true} mode="pomodoro" phase="break" />)

    expect(screen.getByText("05:00")).toBeInTheDocument()
    expect(screen.getByText("Break Time")).toBeInTheDocument()
    expect(screen.getByText("break")).toBeInTheDocument()
    expect(screen.getByText("Taking a break...")).toBeInTheDocument()
  })

  it("shows running indicator when timer is active", () => {
    render(<TimerDisplay time={90} isRunning={true} mode="countup" />)

    // Check for running indicator (dot)
    const timerCircle = screen.getByText("01:30").closest("div")?.parentElement
    expect(timerCircle).toHaveClass("animate-pulse-gentle")
  })
})
