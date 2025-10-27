"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Star, Users, TrendingUp, Globe, ArrowRight } from "lucide-react"
import Link from "next/link"
import { trackCTAClick } from "@/lib/analytics"
import { useLanguage } from "@/contexts/language-context"

interface PricingData {
  countries: number
  starting: number
  plus: number
  proPlus: number
}

const pricingData: PricingData[] = [
  { countries: 1, starting: 500, plus: 650, proPlus: 2150 },
  { countries: 5, starting: 3500, plus: 4550, proPlus: 6050 },
  { countries: 10, starting: 5500, plus: 7150, proPlus: 8650 },
  { countries: 25, starting: 10000, plus: 13000, proPlus: 14500 }
]

export function PricingCards() {
  const { t } = useLanguage()
  const [selectedCountries, setSelectedCountries] = useState(1)
  
  const currentPricing = pricingData.find(p => p.countries === selectedCountries) || pricingData[0]
  const isProPlusDisabled = selectedCountries < 10

  const plans = [
    {
      name: t("pricing.cards.plans.starting.name"),
      icon: Users,
      price: currentPricing.starting,
      features: [
        t("pricing.cards.plans.starting.features.prospecting"),
        t("pricing.cards.plans.starting.features.scoring"),
        t("pricing.cards.plans.starting.features.enrichment"),
        t("pricing.cards.plans.starting.features.management"),
        t("pricing.cards.plans.starting.features.support")
      ],
      description: t("pricing.cards.plans.starting.description"),
      color: "from-blue-500 to-blue-600"
    },
    {
      name: t("pricing.cards.plans.plus.name"),
      icon: TrendingUp,
      price: currentPricing.plus,
      features: [
        t("pricing.cards.plans.plus.features.everything"),
        t("pricing.cards.plans.plus.features.premium"),
        t("pricing.cards.plans.plus.features.onboarding"),
        t("pricing.cards.plans.plus.features.profiling"),
        t("pricing.cards.plans.plus.features.priority")
      ],
      description: t("pricing.cards.plans.plus.description"),
      popular: true,
      color: "from-orange-500 to-orange-600"
    },
    {
      name: t("pricing.cards.plans.proPlus.name"),
      icon: Globe,
      price: currentPricing.proPlus,
      features: [
        t("pricing.cards.plans.proPlus.features.everything"),
        t("pricing.cards.plans.proPlus.features.analytics"),
        t("pricing.cards.plans.proPlus.features.security"),
        t("pricing.cards.plans.proPlus.features.whatsapp"),
        t("pricing.cards.plans.proPlus.features.sessions"),
        t("pricing.cards.plans.proPlus.features.health")
      ],
      description: t("pricing.cards.plans.proPlus.description"),
      color: "from-purple-500 to-purple-600",
      disabled: isProPlusDisabled
    }
  ]

  return (
    <div className="w-full">
      {/* Country Selection */}
      <div className="text-center mb-12">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          {t("pricing.cards.scopeTitle")}
        </h3>
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {pricingData.map((pricing) => (
            <button
              key={pricing.countries}
              onClick={() => setSelectedCountries(pricing.countries)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                selectedCountries === pricing.countries
                  ? 'bg-gradient-to-r from-orange-500 to-blue-900 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {pricing.countries} {pricing.countries === 1 ? t("pricing.cards.country") : t("pricing.cards.countries")}
            </button>
          ))}
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {plans.map((plan, index) => (
          <Card 
            key={index} 
            className={`border-0 shadow-xl transition-all duration-300 relative ${
              plan.popular ? 'ring-2 ring-orange-500 scale-105' : ''
            } ${
              plan.disabled ? 'opacity-50 bg-gray-50' : 'hover:shadow-2xl'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                <div className="bg-gradient-to-r from-orange-500 to-blue-900 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                  <Star className="w-4 h-4 mr-1" />
                  {t("pricing.cards.mostPopular")}
                </div>
              </div>
            )}
            
            <CardContent className="p-8 text-center h-full flex flex-col">
              {/* Icon */}
              <div className={`w-16 h-16 bg-gradient-to-r ${plan.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                <plan.icon className="w-8 h-8 text-white" />
              </div>

              {/* Plan Name */}
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
              
              {/* Description */}
              <p className="text-gray-600 mb-6 text-sm">{plan.description}</p>

              {/* Price */}
              <div className="mb-8">
                {plan.disabled ? (
                  <div className="text-center py-4">
                    <div className="text-red-500 text-lg font-medium">
                      {t("pricing.cards.proPlusRestriction")}
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="text-4xl font-bold text-gray-900 mb-2">
                      ${plan.price.toLocaleString()}
                    </div>
                    <div className="text-gray-500 text-sm">
                      {t("pricing.cards.forCountries")} {selectedCountries} {selectedCountries === 1 ? t("pricing.cards.country").toLowerCase() : t("pricing.cards.countries").toLowerCase()}
                    </div>
                  </div>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8 flex-grow">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start text-left">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              {plan.disabled ? (
                <Button
                  disabled
                  className="w-full py-3 font-semibold bg-gray-300 text-gray-500 cursor-not-allowed"
                >
                  {t("pricing.cards.getStarted")}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Link 
                  href="/chat"
                  onClick={() => trackCTAClick({
                    page: 'pricing',
                    placement: `${plan.name.toLowerCase().replace(/\s+/g, '_')}_card`,
                    button_text: `Get Started - ${plan.name}`,
                    destination: '/chat'
                  })}
                >
                  <Button
                    className={`w-full py-3 font-semibold transition-all duration-300 ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-orange-500 to-blue-900 hover:from-orange-600 hover:to-blue-800 text-white shadow-lg hover:shadow-xl'
                        : 'bg-gray-900 hover:bg-gray-800 text-white'
                    }`}
                  >
                    {t("pricing.cards.getStarted")}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Additional Info */}
      <div className="text-center">
        <p className="text-gray-600 mb-4">
          {t("pricing.cards.additionalInfo")}
        </p>
        <Link 
          href="/contact"
          className="text-orange-600 hover:text-orange-700 font-medium inline-flex items-center"
        >
          {t("pricing.cards.customSolution")}
          <ArrowRight className="w-4 h-4 ml-1" />
        </Link>
      </div>
    </div>
  )
}
