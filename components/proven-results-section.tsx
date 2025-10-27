"use client"

import { Globe, Users, TrendingUp, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { trackCTAClick } from "@/lib/analytics"
import { useLanguage } from "@/contexts/language-context"

export function ProvenResultsSection() {
  const { t } = useLanguage()

  const stats = [
    {
      icon: Globe,
      number: "150+",
      label: t("home.provenResults.stats.countries"),
      description: t("home.provenResults.stats.countriesDesc"),
    },
    {
      icon: Users,
      number: "10K+",
      label: t("home.provenResults.stats.clients"),
      description: t("home.provenResults.stats.clientsDesc"),
    },
    {
      icon: TrendingUp,
      number: "+300%",
      label: t("home.provenResults.stats.growth"),
      description: t("home.provenResults.stats.growthDesc"),
    },
    {
      icon: DollarSign,
      number: "$2M+",
      label: t("home.provenResults.stats.exportValue"),
      description: t("home.provenResults.stats.exportValueDesc"),
    },
  ]

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-orange-600 via-blue-800 to-blue-900 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-blue-500/10"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
            {t("home.provenResults.title")}
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            {t("home.provenResults.subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 text-center hover:bg-white/15 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* Icon container */}
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              
              {/* Stats */}
              <div className="text-4xl lg:text-5xl font-bold text-white mb-2">{stat.number}</div>
              <h3 className="text-xl font-bold text-white mb-2">{stat.label}</h3>
              <p className="text-white/80 text-sm">{stat.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <a 
            href="/chat"
            onClick={() => trackCTAClick({
              page: 'home',
              placement: 'results',
              button_text: 'Book a live demo',
              destination: '/chat'
            })}
          >
            <Button
              size="lg"
              className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              {t("home.provenResults.cta")}
            </Button>
          </a>
        </div>
      </div>
    </section>
  )
}
