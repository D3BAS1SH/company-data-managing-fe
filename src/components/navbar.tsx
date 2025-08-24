"use client"

import type React from "react"

import { useState } from "react"
import { Search, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AddCompanyDialog } from "@/components/add-company-dialog"
import { SearchSuggestions } from "@/components/search-suggestions"
import Link from "next/link"

export function Navbar() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [showAddDialog, setShowAddDialog] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <nav className="border-b border-border bg-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            CompanyHub
          </Link>

          <div className="flex-1 max-w-md mx-8 relative">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search companies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  className="pl-10"
                />
              </div>
            </form>
            {showSuggestions && searchQuery && (
              <SearchSuggestions
                query={searchQuery}
                onSelect={(suggestion) => {
                  setSearchQuery(suggestion)
                  setShowSuggestions(false)
                }}
              />
            )}
          </div>

          <Button onClick={() => setShowAddDialog(true)} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Company
          </Button>
        </div>
      </div>

      <AddCompanyDialog open={showAddDialog} onOpenChange={setShowAddDialog} />
    </nav>
  )
}
