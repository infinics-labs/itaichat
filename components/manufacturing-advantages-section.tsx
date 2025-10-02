"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Factory, Cpu, Pill, Heart, Wrench, Settings, Building } from "lucide-react"
import Link from "next/link"
import { trackCTAClick } from "@/lib/analytics"

export function ManufacturingAdvantagesSection() {
  const manufacturingTypes = [
    {
      icon: Factory,
      title: "Manufacturing companies",
      description: "Manufacturing companies grow exports faster when outreach starts with verified buyers. We shortlist companies that buy products like yours and include decision‑maker emails so your first message lands."
    },
    {
      icon: Building,
      title: "Manufacturing companies near me",
      description: "If you need partnerships or pilots, we map manufacturing companies near me style local intent into a curated list for your state or city. You get nearby prospects, distributors, and suppliers with verified contacts."
    },
    {
      icon: Wrench,
      title: "Industrial companies",
      description: "Industrial companies use us to reach OEMs and distributors that reorder reliably. We focus on fit, margin, and MOQ so your pipeline feels predictable."
    },
    {
      icon: Settings,
      title: "Contract manufacturing companies",
      description: "Contract manufacturing companies keep capacity full by targeting buyers who outsource consistently. We highlight part families, certifications, and lot sizes to match your shop's strengths."
    },
    {
      icon: Factory,
      title: "Industrial supply companies",
      description: "Industrial supply companies win repeat business when catalogs meet buyers who reorder on schedule. We filter by footprint, SKU mix, and re‑order patterns to prioritize high‑value accounts."
    },
    {
      icon: Settings,
      title: "Machining manufacturing companies",
      description: "Machining manufacturing companies selling CNC and precision parts reach better buyers with role‑verified contacts. We flag tolerances, materials, and volumes so your message speaks the buyer's language."
    },
    {
      icon: Heart,
      title: "Medical device contract manufacturing companies",
      description: "Medical device contract manufacturing companies need buyers that match ISO 13485 and market rules. We add certification and regulatory notes so your outreach clears compliance fast."
    },
    {
      icon: Building,
      title: "Manufacturer companies",
      description: "Manufacturer companies that export consistently start with a clean, verified target list. Your team gets fewer, better leads and more booked meetings."
    },
    {
      icon: Cpu,
      title: "Electronic & electronics manufacturing companies",
      description: "Electronic manufacturing companies and electronics manufacturing companies reach high‑fit OEMs and distributors through focused lists. We separate prototype, NPI, and mass‑production needs to increase close rates."
    },
    {
      icon: Pill,
      title: "Pharmaceutical manufacturing companies",
      description: "Pharmaceutical manufacturing companies connect with vetted distributors and institutional buyers that pass quality checks. We include dossier availability and compliance notes to remove friction early."
    }
  ]

  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-8">
            Built for manufacturers
            <span className="bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent">
              {" "}who sell globally
            </span>
          </h1>
          <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-4xl mx-auto mb-12">
            See how different types of manufacturing companies use ITAI to find verified international buyers 
            and book more qualified meetings.
          </p>

          {/* Top CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a 
              href="https://calendly.com/mehmet-odsdanismanlik/30min"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackCTAClick({
                page: 'advantages',
                placement: 'hero_primary',
                button_text: 'Book a live demo',
                destination: 'https://calendly.com/mehmet-odsdanismanlik/30min'
              })}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-xl w-full sm:w-auto"
              >
                Book a live demo
              </Button>
            </a>
            
            <a 
              href="https://calendly.com/mehmet-odsdanismanlik/30min"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackCTAClick({
                page: 'advantages',
                placement: 'hero_secondary',
                button_text: 'Request pricing in a live demo',
                destination: 'https://calendly.com/mehmet-odsdanismanlik/30min'
              })}
            >
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg font-semibold w-full sm:w-auto"
              >
                Request pricing in a live demo
              </Button>
            </a>
          </div>
        </div>

        {/* Manufacturing Types Grid */}
        <div className="space-y-6">
          {manufacturingTypes.map((type, index) => (
            <div key={index} className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
              {/* Content */}
              <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                  {type.title}
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  {type.description}
                </p>
                <a 
                  href="https://calendly.com/mehmet-odsdanismanlik/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackCTAClick({
                    page: 'advantages',
                    placement: `section_${index + 1}`,
                    button_text: 'Book a live demo',
                    destination: 'https://calendly.com/mehmet-odsdanismanlik/30min'
                  })}
                >
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-lg"
                  >
                    Book a live demo
                  </Button>
                </a>
              </div>

              {/* Visual Card */}
              <div className={index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50 hover:shadow-2xl transition-all duration-300">
                  <CardContent className="p-12 text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <type.icon className="w-10 h-10 text-white" />
                    </div>
                    <p className="text-gray-600">
                      For {type.title.toLowerCase()} looking to expand globally
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-20 text-center">
          <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-50 to-orange-50 max-w-4xl mx-auto">
            <CardContent className="p-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Ready to see verified buyers for your industry?
              </h3>
              <p className="text-lg text-gray-600 mb-8">
                Get access to high-quality verified buyers and see how our platform 
                can help manufacturing companies like yours book more qualified meetings.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="https://calendly.com/mehmet-odsdanismanlik/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackCTAClick({
                    page: 'advantages',
                    placement: 'bottom_primary',
                    button_text: 'Book a live demo',
                    destination: 'https://calendly.com/mehmet-odsdanismanlik/30min'
                  })}
                >
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-xl w-full sm:w-auto"
                  >
                    Book a live demo
                  </Button>
                </a>
                
                <a 
                  href="https://calendly.com/mehmet-odsdanismanlik/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackCTAClick({
                    page: 'advantages',
                    placement: 'bottom_secondary',
                    button_text: 'Request pricing in a live demo',
                    destination: 'https://calendly.com/mehmet-odsdanismanlik/30min'
                  })}
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg font-semibold w-full sm:w-auto"
                  >
                    Request pricing in a live demo
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Internal Links */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-6">Learn more about our solutions:</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/how-it-works" className="text-orange-600 hover:text-orange-700 font-medium">
              How It Works
            </Link>
            <span className="text-gray-400">•</span>
            <Link href="/verified-leads" className="text-orange-600 hover:text-orange-700 font-medium">
              Verified Leads
            </Link>
            <span className="text-gray-400">•</span>
            <Link href="/pricing" className="text-orange-600 hover:text-orange-700 font-medium">
              Pricing
            </Link>
          </div>
        </div>

        {/* Image Alt Text (placeholder for actual image) */}
        <div className="mt-16 text-center">
          <div className="bg-gray-100 rounded-lg p-8">
            <p className="text-sm text-gray-500">
              Image placeholder: Verified international buyers for key manufacturing sectors
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
