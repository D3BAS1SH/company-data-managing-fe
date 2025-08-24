import { CompanyDetails } from "@/components/company-details"
import { Navbar } from "@/components/navbar"

interface CompanyPageProps {
  params: {
    id: string
  }
}

export default function CompanyPage({ params }: CompanyPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <CompanyDetails companyId={params.id} />
      </main>
    </div>
  )
}
