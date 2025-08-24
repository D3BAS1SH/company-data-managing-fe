"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Building2, MapPin, Users, Calendar, Globe, Mail, Phone, DollarSign, Trash2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { useRouter } from "next/navigation"

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

interface CompanyDetailsProps {
  companyId: string
}

export function CompanyDetails({ companyId }: CompanyDetailsProps) {
  const [company, setCompany] = useState<Company | null>(null)
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(false)
  const router = useRouter()

  useEffect(() => {
    fetchCompany()
  }, [companyId])

  const fetchCompany = async () => {
    try {
      // Replace with your actual API endpoint
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/companies/${companyId}`)
      const data = await response.json()
      setCompany(data)
    } catch (error) {
      console.error("Failed to fetch company:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this company? This action cannot be undone.")) {
      return
    }

    setDeleting(true)
    try {
      // Replace with your actual API endpoint
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/companies/${companyId}`, {
        method: "DELETE",
      })
      router.push("/")
    } catch (error) {
      console.error("Failed to delete company:", error)
      alert("Failed to delete company. Please try again.")
    } finally {
      setDeleting(false)
    }
  }

  const formatRevenue = (revenue: number) => {
    if (revenue >= 1000000) {
      return `$${(revenue / 1000000).toFixed(1)}M`
    }
    return `$${(revenue / 1000).toFixed(0)}K`
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-32 w-full" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
      </div>
    )
  }

  if (!company) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold text-foreground mb-2">Company not found</h3>
        <p className="text-muted-foreground">The company you're looking for doesn't exist.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
                {company.logo ? (
                  <Image
                    src={company.logo || "/placeholder.svg"}
                    alt={`${company.name} logo`}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                    style={{ objectFit: "cover" }}
                    priority={true}
                  />
                ) : (
                  <Building2 className="h-8 w-8 text-muted-foreground" />
                )}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">{company.name}</h1>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant={company.isActive ? "default" : "secondary"}>
                    {company.isActive ? "Active" : "Inactive"}
                  </Badge>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground">{company.industry}</span>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-lg">{company.description}</p>
        </CardContent>
      </Card>

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Company Information */}
        <Card>
          <CardHeader>
            <CardTitle>Company Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="font-medium">Founded</div>
                <div className="text-muted-foreground">{company.foundedYear}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="font-medium">Headquarters</div>
                <div className="text-muted-foreground">{company.headquarters}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="font-medium">Employees</div>
                <div className="text-muted-foreground">{company.employees}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <DollarSign className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="font-medium">Revenue</div>
                <div className="text-muted-foreground">{formatRevenue(company.revenue)}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Globe className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="font-medium">Website</div>
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {company.website}
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="font-medium">Email</div>
                <a href={`mailto:${company.email}`} className="text-primary hover:underline">
                  {company.email}
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="font-medium">Phone</div>
                <a href={`tel:${company.phone}`} className="text-primary hover:underline">
                  {company.phone}
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Locations */}
      {company.location && company.location.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Locations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {company.location.map((location, index) => (
                <Badge key={index} variant="outline">
                  {location}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Delete Button */}
      <div className="flex justify-end pt-6">
        <Button variant="destructive" onClick={handleDelete} disabled={deleting} className="flex items-center gap-2">
          <Trash2 className="h-4 w-4" />
          {deleting ? "Deleting..." : "Delete Company"}
        </Button>
      </div>
    </div>
  )
}
