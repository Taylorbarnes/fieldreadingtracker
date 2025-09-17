import { render, screen, fireEvent } from "@testing-library/react"
import { ModeSelector } from "@/components/mode-selector"
import { jest } from "@jest/globals"

describe("ModeSelector", () => {
  const mockOnModeChange = jest.fn()

  beforeEach(() => {
    mockOnModeChange.mockClear()
  })

  it("renders both mode options", () => {
    render(<ModeSelector mode="countup" onModeChange={mockOnModeChange} />)

    expect(screen.getByText("Count Up")).toBeInTheDocument()
    expect(screen.getByText("Pomodoro")).toBeInTheDocument()
  })

  it("highlights the active mode", () => {
    render(<ModeSelector mode="countup" onModeChange={mockOnModeChange} />)

    const countUpButton = screen.getByText("Count Up")
    const pomodoroButton = screen.getByText("Pomodoro")

    expect(countUpButton).toHaveClass("bg-card")
    expect(pomodoroButton).not.toHaveClass("bg-card")
  })

  it("calls onModeChange when a different mode is selected", () => {
    render(<ModeSelector mode="countup" onModeChange={mockOnModeChange} />)

    const pomodoroButton = screen.getByText("Pomodoro")
    fireEvent.click(pomodoroButton)

    expect(mockOnModeChange).toHaveBeenCalledWith("pomodoro")
  })
})
