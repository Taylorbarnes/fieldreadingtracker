"use client"

import { useEffect } from "react"

interface KeyboardControlsProps {
  onToggle: () => void
  onReset: () => void
}

export function useKeyboardControls({ onToggle, onReset }: KeyboardControlsProps) {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Ignore if user is typing in an input
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return
      }

      switch (event.code) {
        case "Space":
          event.preventDefault()
          onToggle()
          break
        case "KeyR":
          event.preventDefault()
          onReset()
          break
      }
    }

    document.addEventListener("keydown", handleKeyPress)
    return () => document.removeEventListener("keydown", handleKeyPress)
  }, [onToggle, onReset])
}
