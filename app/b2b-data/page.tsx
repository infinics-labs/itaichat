import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Database, Shield, RefreshCw, CheckCircle } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "B2B Data | Premium International Business Database",
  description: "Access comprehensive B2B database with verified international contacts across 195+ countries. Quality-assured business data for export success.",
  alternates: {
    canonical: 'https://www.internationaltradeai.com/b2b-data'
  },
}

export default function B2BDataPage() {
  const features = [
    {
      icon: Database,
      title: "Comprehensive B2B Database",
      description: "Access millions of verified B2B contacts across 195+ countries with detailed company profiles and decision-maker information."
    },
    {
      icon: Shield,
      title: "Verified Contact Quality",
      description: "Every contact in our B2B marketing database goes through multi-layer verification including email validation and role confirmation."
    },
    {
      icon: RefreshCw,
      title: "Real-time Updates",
      description: "Our customer leads database is continuously updated with fresh contacts and company information to ensure high deliverability."
    },
    {
      icon: CheckCircle,
      title: "Export-Ready Formats",
      description: "Get your B2B data in CSV, Excel, or direct CRM integration formats that work with your existing sales and marketing tools."
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <section className="py-20 lg:py-32 bg-gradient-to-br from-blue-50 via-white to-orange-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-8">
                Premium
                <span className="bg-gradient-to-r from-orange-500 to-blue-900 bg-clip-text text-transparent">
                  {" "}B2B Data
                </span>
              </h1>
              <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
                Get access to the most comprehensive B2B database of verified international buyers, 
                decision-makers, and export-ready contacts.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {features.map((feature, index) => (
                <Card key={index} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-blue-900 rounded-2xl flex items-center justify-center mb-6">
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mb-16">
              <Card className="border-0 shadow-xl bg-white max-w-4xl mx-auto">
                <CardContent className="p-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    Why Choose Our B2B Marketing Database?
                  </h2>
                  <div className="grid md:grid-cols-3 gap-8 mb-8">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-orange-600 mb-2">195+</div>
                      <div className="text-gray-600">Countries Covered</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-orange-600 mb-2">95%+</div>
                      <div className="text-gray-600">Email Deliverability</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-orange-600 mb-2">24hr</div>
                      <div className="text-gray-600">Data Refresh Cycle</div>
                    </div>
                  </div>
                  <p className="text-lg text-gray-600 mb-8">
                    Our customer leads database combines quality, coverage, and freshness to give you 
                    the best possible results for your B2B prospecting campaigns.
                  </p>
                  <Link href="/chat">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-orange-500 to-blue-900 hover:from-orange-600 hover:to-blue-800 text-white px-8 py-4 text-lg font-semibold shadow-xl"
                    >
                      See Sample B2B Data
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
