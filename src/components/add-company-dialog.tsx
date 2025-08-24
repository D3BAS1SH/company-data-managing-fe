"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface AddCompanyDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddCompanyDialog({ open, onOpenChange }: AddCompanyDialogProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    industry: "",
    foundedYear: "",
    location: "",
    website: "",
    email: "",
    phone: "",
    employees: "",
    logo: "",
    headquarters: "",
    revenue: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const payload = {
        ...formData,
        foundedYear: Number.parseInt(formData.foundedYear),
        employees: Number.parseInt(formData.employees),
        revenue: Number.parseInt(formData.revenue),
        location: formData.location.split(",").map((loc) => loc.trim()),
      }

      // Replace with your actual API endpoint
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/companies/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        onOpenChange(false)
        window.location.reload() // Refresh to show new company
      } else {
        alert("Failed to create company. Please try again.")
      }
    } catch (error) {
      console.error("Failed to create company:", error)
      alert("Failed to create company. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Company</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Company Name *</Label>
              <Input
                id="name"
                required
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="industry">Industry *</Label>
              <Input
                id="industry"
                required
                value={formData.industry}
                onChange={(e) => handleInputChange("industry", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              required
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="foundedYear">Founded Year *</Label>
              <Input
                id="foundedYear"
                type="number"
                required
                value={formData.foundedYear}
                onChange={(e) => handleInputChange("foundedYear", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="employees">Employees *</Label>
              <Input
                id="employees"
                type="number"
                required
                value={formData.employees}
                onChange={(e) => handleInputChange("employees", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="headquarters">Headquarters *</Label>
              <Input
                id="headquarters"
                required
                value={formData.headquarters}
                onChange={(e) => handleInputChange("headquarters", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="revenue">Revenue *</Label>
              <Input
                id="revenue"
                type="number"
                required
                value={formData.revenue}
                onChange={(e) => handleInputChange("revenue", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Locations (comma-separated) *</Label>
            <Input
              id="location"
              required
              placeholder="New York, London, Tokyo"
              value={formData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="website">Website *</Label>
              <Input
                id="website"
                type="url"
                required
                value={formData.website}
                onChange={(e) => handleInputChange("website", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone *</Label>
              <Input
                id="phone"
                required
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="logo">Logo URL</Label>
              <Input
                id="logo"
                type="url"
                value={formData.logo}
                onChange={(e) => handleInputChange("logo", e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Company"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
