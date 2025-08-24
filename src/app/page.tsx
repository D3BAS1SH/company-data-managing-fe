import { CompanyGrid } from "@/components/company-grid"
import { Navbar } from "@/components/navbar"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Companies</h1>
          <p className="text-muted-foreground">Manage and explore company profiles</p>
        </div>
        <CompanyGrid />
      </main>
    </div>
  )
}
