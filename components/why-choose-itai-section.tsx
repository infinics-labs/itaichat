"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, TrendingUp, Clock, Target } from "lucide-react"
import { trackCTAClick } from "@/lib/analytics"
import { useLanguage } from "@/contexts/language-context"
import Image from "next/image"

export function WhyChooseITAISection() {
  const { t } = useLanguage()

  const deliveryFeatures = [
    {
      icon: CheckCircle,
      title: t("home.whyChoose.features.targetCompanies"),
      description: t("home.whyChoose.features.targetCompaniesDesc")
    },
    {
      icon: CheckCircle,
      title: t("home.whyChoose.features.decisionMaker"),
      description: t("home.whyChoose.features.decisionMakerDesc")
    },
    {
      icon: CheckCircle,
      title: t("home.whyChoose.features.compliance"),
      description: t("home.whyChoose.features.complianceDesc")
    },
    {
      icon: CheckCircle,
      title: t("home.whyChoose.features.csvExport"),
      description: t("home.whyChoose.features.csvExportDesc")
    }
  ]

  const outcomes = [
    {
      icon: Clock,
      title: t("home.whyChoose.outcomes.shorterCycles"),
      description: t("home.whyChoose.outcomes.shorterCyclesDesc")
    },
    {
      icon: TrendingUp,
      title: t("home.whyChoose.outcomes.higherRates"),
      description: t("home.whyChoose.outcomes.higherRatesDesc")
    },
    {
      icon: Target,
      title: t("home.whyChoose.outcomes.predictablePipeline"),
      description: t("home.whyChoose.outcomes.predictablePipelineDesc")
    }
  ]

  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
            {t("home.whyChoose.title")}
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          {/* Left Column - What you get in every delivery */}
          <div>
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8">
              {t("home.whyChoose.deliveryTitle")}
            </h3>
            
            <div className="space-y-4">
              {deliveryFeatures.map((feature, index) => (
                <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-blue-900 rounded-full flex items-center justify-center flex-shrink-0">
                        <feature.icon className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-1">
                          {feature.title}
                        </h4>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Right Column - Product Screenshot */}
          <div className="flex justify-center items-center">
            <Card className="border-0 shadow-2xl overflow-hidden max-w-md w-full">
              <CardContent className="p-0">
                <div className="aspect-[4/3] relative">
                  <Image 
                    src="/whychoose.png" 
                    alt="🎯 Live Product Screenshot - Verified International Buyer Database - ITAI Export Assistant Platform showing verified buyers dashboard with ABC Trading GmbH Germany, Import Solutions Ltd UK, and Euro Distributors SA France"
                    fill
                    className="object-cover"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Outcomes Section */}
        <div className="mb-16">
          <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-12 text-center">
            {t("home.whyChoose.outcomesTitle")}
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {outcomes.map((outcome, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-blue-900 rounded-full flex items-center justify-center mx-auto mb-6">
                    <outcome.icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-4">
                    {outcome.title}
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    {outcome.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <a 
            href="/chat"
            onClick={() => trackCTAClick({
              page: 'home',
              placement: 'why_choose',
              button_text: 'Book a live demo',
              destination: '/chat'
            })}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-blue-900 hover:from-orange-600 hover:to-blue-800 text-white px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              {t("home.whyChoose.cta")}
            </Button>
          </a>
        </div>
      </div>
    </section>
  )
}
