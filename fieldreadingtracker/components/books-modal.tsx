"use client"

import { useState, useEffect } from "react"
import { X, Plus, BookOpen, Calendar, Clock } from "lucide-react"
import { formatTime } from "@/utils/timer-utils"

interface Book {
  id: string
  title: string
  author: string
  dateFinished: string
  readingTime: number // in seconds
}

interface BooksModalProps {
  isOpen: boolean
  onClose: () => void
}

export function BooksModal({ isOpen, onClose }: BooksModalProps) {
  const [books, setBooks] = useState<Book[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    dateFinished: new Date().toISOString().split("T")[0],
    readingTime: 0,
  })

  useEffect(() => {
    if (isOpen) {
      const savedBooks = localStorage.getItem("field-notes-books")
      if (savedBooks) {
        try {
          setBooks(JSON.parse(savedBooks))
        } catch (error) {
          console.error("Failed to parse saved books:", error)
        }
      }
    }
  }, [isOpen])

  const saveBooks = (updatedBooks: Book[]) => {
    setBooks(updatedBooks)
    localStorage.setItem("field-notes-books", JSON.stringify(updatedBooks))
  }

  const addBook = () => {
    if (newBook.title.trim() && newBook.author.trim()) {
      const book: Book = {
        id: Date.now().toString(),
        title: newBook.title.trim(),
        author: newBook.author.trim(),
        dateFinished: newBook.dateFinished,
        readingTime: newBook.readingTime,
      }
      saveBooks([...books, book])
      setNewBook({
        title: "",
        author: "",
        dateFinished: new Date().toISOString().split("T")[0],
        readingTime: 0,
      })
      setShowAddForm(false)
    }
  }

  const removeBook = (id: string) => {
    saveBooks(books.filter((book) => book.id !== id))
  }

  const totalReadingTime = books.reduce((total, book) => total + book.readingTime, 0)
  const totalReadingHours = Math.floor(totalReadingTime / 3600)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-card rounded-lg shadow-xl border border-border w-full max-w-md max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <BookOpen size={20} className="text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Books I've Read</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-muted rounded-md transition-colors"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Stats */}
        {books.length > 0 && (
          <div className="p-4 bg-muted/50 border-b border-border">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Total books: {books.length}</span>
              <span className="text-muted-foreground">Reading time: {totalReadingHours}h</span>
            </div>
          </div>
        )}

        {/* Books List */}
        <div className="flex-1 overflow-y-auto p-4 max-h-96">
          {books.length === 0 ? (
            <div className="text-center py-8">
              <BookOpen size={48} className="text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">No books recorded yet</p>
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
              >
                Add your first book
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {books.map((book) => (
                <div key={book.id} className="bg-muted/30 rounded-lg p-3 border border-border/50">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground text-sm">{book.title}</h3>
                      <p className="text-muted-foreground text-xs">by {book.author}</p>
                    </div>
                    <button
                      onClick={() => removeBook(book.id)}
                      className="text-muted-foreground hover:text-destructive p-1 transition-colors"
                      aria-label="Remove book"
                    >
                      <X size={14} />
                    </button>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar size={12} />
                      <span>{new Date(book.dateFinished).toLocaleDateString()}</span>
                    </div>
                    {book.readingTime > 0 && (
                      <div className="flex items-center gap-1">
                        <Clock size={12} />
                        <span>{formatTime(book.readingTime)}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add Book Form */}
        {showAddForm && (
          <div className="border-t border-border p-4 bg-muted/20">
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Book title"
                value={newBook.title}
                onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                className="w-full px-3 py-2 bg-input border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <input
                type="text"
                placeholder="Author"
                value={newBook.author}
                onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                className="w-full px-3 py-2 bg-input border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <input
                type="date"
                value={newBook.dateFinished}
                onChange={(e) => setNewBook({ ...newBook, dateFinished: e.target.value })}
                className="w-full px-3 py-2 bg-input border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <div className="flex gap-2">
                <button
                  onClick={addBook}
                  className="flex-1 bg-primary text-primary-foreground px-3 py-2 rounded-md text-sm hover:bg-primary/90 transition-colors"
                >
                  Add Book
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="px-3 py-2 bg-muted text-muted-foreground rounded-md text-sm hover:bg-border transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Button */}
        {!showAddForm && books.length > 0 && (
          <div className="border-t border-border p-4">
            <button
              onClick={() => setShowAddForm(true)}
              className="w-full flex items-center justify-center gap-2 bg-muted text-muted-foreground px-4 py-2 rounded-md hover:bg-border transition-colors"
            >
              <Plus size={16} />
              <span>Add another book</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
