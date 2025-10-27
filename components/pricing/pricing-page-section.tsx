"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Star, Users, Globe, TrendingUp } from "lucide-react"
import Link from "next/link"
import { trackCTAClick } from "@/lib/analytics"
import { useLanguage } from "@/contexts/language-context"
import { PricingCards } from "./pricing-cards"
import { PricingComparison } from "./pricing-comparison"
import { PricingFAQ } from "./pricing-faq"

export function PricingPageSection() {
  const { t } = useLanguage()

  return (
    <>
      <section className="py-20 lg:py-32 bg-gradient-to-br from-blue-50 via-white to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-8">
              {t("pricing.hero.title")}
              <span className="bg-gradient-to-r from-orange-500 to-blue-900 bg-clip-text text-transparent">
                {" "}{t("pricing.hero.titleAccent")}
              </span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
              {t("pricing.hero.subtitle")}
            </p>
          </div>

          {/* Pricing Cards */}
          <PricingCards />

          {/* Trust Indicators */}
          <div className="mt-20 mb-16">
            <Card className="border-0 shadow-lg bg-white max-w-4xl mx-auto">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-3 gap-8 text-center">
                  <div>
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{t("pricing.trustIndicators.verified.title")}</h3>
                    <p className="text-gray-600 text-sm">{t("pricing.trustIndicators.verified.description")}</p>
                  </div>
                  <div>
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <TrendingUp className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{t("pricing.trustIndicators.growing.title")}</h3>
                    <p className="text-gray-600 text-sm">{t("pricing.trustIndicators.growing.description")}</p>
                  </div>
                  <div>
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Globe className="w-6 h-6 text-orange-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{t("pricing.trustIndicators.global.title")}</h3>
                    <p className="text-gray-600 text-sm">{t("pricing.trustIndicators.global.description")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Feature Comparison */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              {t("pricing.comparison.title")}
            </h2>
            <PricingComparison />
          </div>

          {/* FAQ Section */}
          <div className="mb-20">
            <PricingFAQ />
          </div>

          {/* Final CTA Section */}
          <div className="text-center mb-20">
            <Card className="border-0 shadow-xl bg-white max-w-4xl mx-auto">
              <CardContent className="p-12">
                <div className="flex items-center justify-center mb-6">
                  <Star className="w-8 h-8 text-orange-500 mr-3" />
                  <h3 className="text-2xl font-bold text-gray-900">
                    {t("pricing.finalCta.title")}
                  </h3>
                </div>
                <p className="text-lg text-gray-600 mb-8">
                  {t("pricing.finalCta.description")}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link 
                    href="/chat"
                    onClick={() => trackCTAClick({
                      page: 'pricing',
                      placement: 'final_cta',
                      button_text: 'Start Free Trial',
                      destination: '/chat'
                    })}
                  >
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-orange-500 to-blue-900 hover:from-orange-600 hover:to-blue-800 text-white px-8 py-4 text-lg font-semibold shadow-xl w-full sm:w-auto"
                    >
                      {t("pricing.finalCta.startTrial")}
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                  
                  <Link 
                    href="/contact"
                    onClick={() => trackCTAClick({
                      page: 'pricing',
                      placement: 'final_cta_secondary',
                      button_text: 'Contact Sales',
                      destination: '/contact'
                    })}
                  >
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg font-semibold w-full sm:w-auto"
                    >
                      {t("pricing.finalCta.contactSales")}
                    </Button>
                  </Link>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  {t("pricing.finalCta.disclaimer")}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Internal Links */}
          <div className="text-center">
            <p className="text-gray-600 mb-6">{t("pricing.links.learnMore")}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/verified-leads" className="text-orange-600 hover:text-orange-700 font-medium">
                {t("pricing.links.verifiedLeads")}
              </Link>
              <span className="text-gray-400">•</span>
              <Link href="/how-it-works" className="text-orange-600 hover:text-orange-700 font-medium">
                {t("pricing.links.howItWorks")}
              </Link>
              <span className="text-gray-400">•</span>
              <Link href="/use-cases" className="text-orange-600 hover:text-orange-700 font-medium">
                {t("pricing.links.useCases")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "ITAI B2B Database",
            "description": "Verified B2B database with international buyers and decision-maker contacts",
            "offers": [
              {
                "@type": "Offer",
                "name": "Starting Package",
                "description": "Perfect for small businesses testing international markets",
                "price": "500",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock"
              },
              {
                "@type": "Offer",
                "name": "Plus Package",
                "description": "Ideal for growing companies expanding globally",
                "price": "650",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock"
              },
              {
                "@type": "Offer",
                "name": "Pro Plus Package",
                "description": "Enterprise solution for serious international expansion",
                "price": "2150",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock"
              }
            ]
          })
        }}
      />
    </>
  )
}
