"use client"

import { useEffect, useState, useCallback } from "react"
import { useSearchParams } from "next/navigation"
import { CompanyCard } from "@/components/company-card"
import { Skeleton } from "@/components/ui/skeleton"

interface Company {
  _id: string
  name: string
  description: string
  industry: string
  foundedYear: number
  location: string[]
  website: string
  email: string
  phone: string
  employees: number
  logo: string
  headquarters: string
  revenue: number
  isActive: boolean
  createdAt: string
}

export function SearchResults() {
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams()

  const fetchSearchResults = useCallback(async () => {
    setLoading(true)
    try {
      const queryString = searchParams.toString()
      // Replace with your actual API endpoint
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/companies/search/?${queryString}`)
      const data = await response.json()
      setCompanies(data)
    } catch (error) {
      console.error("Failed to fetch search results:", error)
    } finally {
      setLoading(false)
    }
  }, [searchParams])

  useEffect(() => {
    fetchSearchResults()
  }, [searchParams, fetchSearchResults])


  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    )
  }

  if (companies.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold text-foreground mb-2">No companies found</h3>
        <p className="text-muted-foreground">Try adjusting your search filters</p>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <p className="text-muted-foreground">
          Found {companies.length} {companies.length === 1 ? "company" : "companies"}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {companies.map((company) => (
          <CompanyCard key={company._id} company={company} />
        ))}
      </div>
    </div>
  )
}
