"use client"

import { useEffect, useState } from "react"

interface SearchSuggestionsProps {
  query: string
  onSelect: (suggestion: string) => void
}

export function SearchSuggestions({ query, onSelect }: SearchSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (query.length > 0) {
      fetchSuggestions(query)
    } else {
      setSuggestions([])
    }
  }, [query])

  const fetchSuggestions = async (searchQuery: string) => {
    setLoading(true)
    try {
      // Replace with your actual API endpoint
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/companies/search/suggestions/?q=${encodeURIComponent(searchQuery)}`,
      )
      const data = await response.json()
      setSuggestions(data)
    } catch (error) {
      console.error("Failed to fetch suggestions:", error)
      setSuggestions([])
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="absolute top-full left-0 right-0 bg-card border border-border rounded-md shadow-lg mt-1 p-2">
        <div className="text-sm text-muted-foreground">Loading suggestions...</div>
      </div>
    )
  }

  if (suggestions.length === 0) {
    return null
  }

  return (
    <div className="absolute top-full left-0 right-0 bg-card border border-border rounded-md shadow-lg mt-1 py-2 z-50">
      {suggestions.map((suggestion, index) => (
        <button
          key={index}
          onClick={() => onSelect(suggestion)}
          className="w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors"
        >
          {suggestion}
        </button>
      ))}
    </div>
  )
}
