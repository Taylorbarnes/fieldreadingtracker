"use client"

import { render, screen, fireEvent } from "@testing-library/react"
import { TimerControls } from "@/components/timer-controls"
import { jest } from "@jest/globals"

describe("TimerControls", () => {
  const mockToggle = jest.fn()
  const mockReset = jest.fn()

  beforeEach(() => {
    mockToggle.mockClear()
    mockReset.mockClear()
  })

  it("renders play button when timer is not running", () => {
    render(<TimerControls isRunning={false} onToggle={mockToggle} onReset={mockReset} />)

    const playButton = screen.getByLabelText("Start timer")
    expect(playButton).toBeInTheDocument()
  })

  it("renders pause button when timer is running", () => {
    render(<TimerControls isRunning={true} onToggle={mockToggle} onReset={mockReset} />)

    const pauseButton = screen.getByLabelText("Pause timer")
    expect(pauseButton).toBeInTheDocument()
  })

  it("calls onToggle when play/pause button is clicked", () => {
    render(<TimerControls isRunning={false} onToggle={mockToggle} onReset={mockReset} />)

    const playButton = screen.getByLabelText("Start timer")
    fireEvent.click(playButton)

    expect(mockToggle).toHaveBeenCalledTimes(1)
  })

  it("calls onReset when reset button is clicked", () => {
    render(<TimerControls isRunning={false} onToggle={mockToggle} onReset={mockReset} />)

    const resetButton = screen.getByLabelText("Reset timer")
    fireEvent.click(resetButton)

    expect(mockReset).toHaveBeenCalledTimes(1)
  })
})
