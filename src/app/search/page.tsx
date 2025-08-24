import { SearchResults } from "@/components/search-results"
import { SearchFilters } from "@/components/search-filters"
import { Navbar } from "@/components/navbar"

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Search Companies</h1>
          <p className="text-muted-foreground">Find companies using advanced filters</p>
        </div>
        <div className="flex gap-8">
          <aside className="w-80 flex-shrink-0">
            <SearchFilters />
          </aside>
          <div className="flex-1">
            <SearchResults />
          </div>
        </div>
      </main>
    </div>
  )
}
