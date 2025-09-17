"use client"

import { useState, useEffect } from "react"
import { Palette } from "lucide-react"

const themes = [
  { name: "lemonade", label: "Lemonade", description: "Bright & Cheerful" },
  { name: "luxury", label: "Luxury", description: "Dark & Elegant" },
  { name: "nord", label: "Nord", description: "Cool & Minimal" },
]

export function ThemeSelector() {
  const [currentTheme, setCurrentTheme] = useState("lemonade")
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Load theme from localStorage on mount
    const savedTheme = localStorage.getItem("field-notes-theme") || "lemonade"
    setCurrentTheme(savedTheme)
    document.documentElement.setAttribute("data-theme", savedTheme)
  }, [])

  const handleThemeChange = (theme: string) => {
    setCurrentTheme(theme)
    document.documentElement.setAttribute("data-theme", theme)
    localStorage.setItem("field-notes-theme", theme)
    setIsOpen(false)
  }

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-circle btn-ghost bg-base-100/80 backdrop-blur-sm border border-base-300/50 hover:bg-base-200/80 transition-all duration-200"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Palette className="w-5 h-5" />
        </div>
        {isOpen && (
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100/95 backdrop-blur-sm rounded-box z-[1] w-52 p-2 shadow-lg border border-base-300/50 mt-2"
          >
            {themes.map((theme) => (
              <li key={theme.name}>
                <button
                  onClick={() => handleThemeChange(theme.name)}
                  className={`flex flex-col items-start p-3 rounded-lg transition-all duration-200 ${
                    currentTheme === theme.name ? "bg-primary/20 text-primary font-medium" : "hover:bg-base-200/80"
                  }`}
                >
                  <span className="font-medium">{theme.label}</span>
                  <span className="text-xs opacity-70">{theme.description}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
