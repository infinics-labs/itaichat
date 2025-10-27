"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Factory, Cpu, Pill, Heart, Wrench, Settings, Building } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { trackCTAClick } from "@/lib/analytics"
import { useLanguage } from "@/contexts/language-context"

export function ManufacturingAdvantagesSection() {
  const { t } = useLanguage()

  const manufacturingTypes = [
    {
      icon: Factory,
      titleKey: "useCases.types.manufacturing.title",
      descriptionKey: "useCases.types.manufacturing.description",
      subtitleKey: "useCases.types.manufacturing.subtitle",
      image: "man1.png"
    },
    {
      icon: Building,
      titleKey: "useCases.types.manufacturingNearMe.title",
      descriptionKey: "useCases.types.manufacturingNearMe.description",
      subtitleKey: "useCases.types.manufacturingNearMe.subtitle",
      image: "man2.png"
    },
    {
      icon: Wrench,
      titleKey: "useCases.types.industrial.title",
      descriptionKey: "useCases.types.industrial.description",
      subtitleKey: "useCases.types.industrial.subtitle",
      image: "man3.png"
    },
    {
      icon: Settings,
      titleKey: "useCases.types.contractManufacturing.title",
      descriptionKey: "useCases.types.contractManufacturing.description",
      subtitleKey: "useCases.types.contractManufacturing.subtitle",
      image: "man4.png"
    },
    {
      icon: Factory,
      titleKey: "useCases.types.industrialSupply.title",
      descriptionKey: "useCases.types.industrialSupply.description",
      subtitleKey: "useCases.types.industrialSupply.subtitle",
      image: "man5.png"
    },
    {
      icon: Settings,
      titleKey: "useCases.types.machining.title",
      descriptionKey: "useCases.types.machining.description",
      subtitleKey: "useCases.types.machining.subtitle",
      image: "man6.png"
    },
    {
      icon: Heart,
      titleKey: "useCases.types.medicalDevice.title",
      descriptionKey: "useCases.types.medicalDevice.description",
      subtitleKey: "useCases.types.medicalDevice.subtitle",
      image: "man7.png"
    },
    {
      icon: Building,
      titleKey: "useCases.types.manufacturer.title",
      descriptionKey: "useCases.types.manufacturer.description",
      subtitleKey: "useCases.types.manufacturer.subtitle",
      image: "man8.png"
    },
    {
      icon: Cpu,
      titleKey: "useCases.types.electronics.title",
      descriptionKey: "useCases.types.electronics.description",
      subtitleKey: "useCases.types.electronics.subtitle",
      image: "man9.png"
    },
    {
      icon: Pill,
      titleKey: "useCases.types.pharmaceutical.title",
      descriptionKey: "useCases.types.pharmaceutical.description",
      subtitleKey: "useCases.types.pharmaceutical.subtitle",
      image: "man10.png"
    }
  ]

  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-8">
            {t("useCases.hero.title")}
            <span className="bg-gradient-to-r from-orange-500 to-blue-900 bg-clip-text text-transparent">
              {" "}{t("useCases.hero.titleAccent")}
            </span>
          </h1>
          <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-4xl mx-auto mb-12">
            {t("useCases.hero.subtitle")}
          </p>

          {/* Top CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a 
              href="/chat"
              onClick={() => trackCTAClick({
                page: 'advantages',
                placement: 'hero_primary',
                button_text: 'Book a live demo',
                destination: '/chat'
              })}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-blue-900 hover:from-orange-600 hover:to-blue-800 text-white px-8 py-4 text-lg font-semibold shadow-xl w-full sm:w-auto"
              >
                {t("useCases.hero.bookDemo")}
              </Button>
            </a>
            
            <a 
              href="/chat"
              onClick={() => trackCTAClick({
                page: 'advantages',
                placement: 'hero_secondary',
                button_text: 'Request pricing in a live demo',
                destination: '/chat'
              })}
            >
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg font-semibold w-full sm:w-auto"
              >
                {t("useCases.hero.requestPricing")}
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
                  {t(type.titleKey)}
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  {t(type.descriptionKey)}
                </p>
                <a 
                  href="/chat"
                  onClick={() => trackCTAClick({
                    page: 'advantages',
                    placement: `section_${index + 1}`,
                    button_text: 'Book a live demo',
                    destination: '/chat'
                  })}
                >
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-orange-500 to-blue-900 hover:from-orange-600 hover:to-blue-800 text-white px-8 py-4 text-lg font-semibold shadow-lg"
                  >
                    {t("useCases.hero.bookDemo")}
                  </Button>
                </a>
              </div>

              {/* Visual Card */}
              <div className={index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50 hover:shadow-2xl transition-all duration-300 overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative h-80">
                      <Image
                        src={`/${type.image}`}
                        alt={t(type.titleKey)}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6 text-center bg-white">
                      <p className="text-gray-600 font-medium">
                        {t(type.subtitleKey)}
                      </p>
                    </div>
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
                {t("useCases.finalCta.title")}
              </h3>
              <p className="text-lg text-gray-600 mb-8">
                {t("useCases.finalCta.description")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/chat"
                  onClick={() => trackCTAClick({
                    page: 'advantages',
                    placement: 'bottom_primary',
                    button_text: 'Book a live demo',
                    destination: '/chat'
                  })}
                >
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-orange-500 to-blue-900 hover:from-orange-600 hover:to-blue-800 text-white px-8 py-4 text-lg font-semibold shadow-xl w-full sm:w-auto"
                  >
                    {t("useCases.finalCta.bookDemo")}
                  </Button>
                </a>
                
                <a 
                  href="/chat"
                  onClick={() => trackCTAClick({
                    page: 'advantages',
                    placement: 'bottom_secondary',
                    button_text: 'Request pricing in a live demo',
                    destination: '/chat'
                  })}
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg font-semibold w-full sm:w-auto"
                  >
                    {t("useCases.finalCta.requestPricing")}
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Internal Links */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-6">{t("useCases.links.learnMore")}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/how-it-works" className="text-orange-600 hover:text-orange-700 font-medium">
              {t("useCases.links.howItWorks")}
            </Link>
            <span className="text-gray-400">•</span>
            <Link href="/verified-leads" className="text-orange-600 hover:text-orange-700 font-medium">
              {t("useCases.links.verifiedLeads")}
            </Link>
            <span className="text-gray-400">•</span>
            <Link href="/pricing" className="text-orange-600 hover:text-orange-700 font-medium">
              {t("useCases.links.pricing")}
            </Link>
          </div>
        </div>

      </div>
    </section>
  )
}
