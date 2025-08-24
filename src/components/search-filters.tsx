"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"

export function SearchFilters() {
  const [filters, setFilters] = useState({
    name: "",
    location: "",
    industry: "",
    isActive: true,
    employees: [0],
    foundedYear: "",
    createdAt: "",
  })

  const handleApplyFilters = () => {
    const searchParams = new URLSearchParams()

    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== "" && !(Array.isArray(value) && value[0] === 0)) {
        if (key === "employees" && Array.isArray(value)) {
          searchParams.set(key, value[0].toString())
        } else {
          searchParams.set(key, value.toString())
        }
      }
    })

    window.location.href = `/search?${searchParams.toString()}`
  }

  const handleClearFilters = () => {
    setFilters({
      name: "",
      location: "",
      industry: "",
      isActive: true,
      employees: [0],
      foundedYear: "",
      createdAt: "",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Company Name</Label>
          <Input
            id="name"
            value={filters.name}
            onChange={(e) => setFilters({ ...filters, name: e.target.value })}
            placeholder="Search by name..."
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={filters.location}
            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
            placeholder="City or region..."
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="industry">Industry</Label>
          <Input
            id="industry"
            value={filters.industry}
            onChange={(e) => setFilters({ ...filters, industry: e.target.value })}
            placeholder="Technology, Healthcare..."
          />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="isActive"
            checked={filters.isActive}
            onCheckedChange={(checked) => setFilters({ ...filters, isActive: checked as boolean })}
          />
          <Label htmlFor="isActive">Active companies only</Label>
        </div>

        <div className="space-y-2">
          <Label>Minimum Employees: {filters.employees[0]}</Label>
          <Slider
            value={filters.employees}
            onValueChange={(value) => setFilters({ ...filters, employees: value })}
            max={1000}
            step={10}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="foundedYear">Founded Year</Label>
          <Input
            id="foundedYear"
            type="number"
            value={filters.foundedYear}
            onChange={(e) => setFilters({ ...filters, foundedYear: e.target.value })}
            placeholder="2020"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="createdAt">Created After</Label>
          <Input
            id="createdAt"
            type="date"
            value={filters.createdAt}
            onChange={(e) => setFilters({ ...filters, createdAt: e.target.value })}
          />
        </div>

        <div className="flex gap-2">
          <Button onClick={handleApplyFilters} className="flex-1">
            Apply Filters
          </Button>
          <Button variant="outline" onClick={handleClearFilters}>
            Clear
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
