"use client"

import Image from "next/image"
import { BookOpen } from "lucide-react"
import { useState } from "react"
import { BooksModal } from "./books-modal"

export function TulipHero() {
  const [showBooksModal, setShowBooksModal] = useState(false)

  return (
    <>
      <div className="relative mb-8">
        <div className="bg-card rounded-lg shadow-sm border border-border p-6 relative overflow-hidden">
          {/* Tulip Image */}
          <div className="flex justify-center mb-4">
            <div className="relative w-48 h-64">
              <Image
                src="/tulip-sketch.png"
                alt="Hand-drawn tulip botanical sketch"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Books Read Chip - now clickable */}
          <button
            onClick={() => setShowBooksModal(true)}
            className="absolute bottom-4 left-4 bg-primary text-primary-foreground px-3 py-1.5 rounded-full flex items-center gap-2 text-sm font-medium shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <BookOpen size={14} />
            <span>Books I've read</span>
          </button>
        </div>
      </div>

      <BooksModal isOpen={showBooksModal} onClose={() => setShowBooksModal(false)} />
    </>
  )
}
