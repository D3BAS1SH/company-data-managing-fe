"use client"

import { useEffect, useState } from "react"
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

export function CompanyGrid() {
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCompanies()
  }, [])

  const fetchCompanies = async () => {
    try {
      // Replace with your actual API endpoint
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL||'http://localhost:9090/api/v1'}/companies/`);
      console.log(response);
      const data = await response.json()
      setCompanies(data)
    } catch (error) {
      console.error("Failed to fetch companies:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {companies.map((company) => (
        <CompanyCard key={company._id} company={company} />
      ))}
    </div>
  )
}
