"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, Zap, Filter } from "lucide-react"
import { trackCTAClick } from "@/lib/analytics"
import { useLanguage } from "@/contexts/language-context"

export function HowITAIWorksSection() {
  const { t } = useLanguage()

  const steps = [
    {
      number: "01",
      icon: Search,
      title: t("home.howItWorks.steps.step1.title"),
      description: t("home.howItWorks.steps.step1.description"),
    },
    {
      number: "02",
      icon: Zap,
      title: t("home.howItWorks.steps.step2.title"),
      description: t("home.howItWorks.steps.step2.description"),
    },
    {
      number: "03",
      icon: Filter,
      title: t("home.howItWorks.steps.step3.title"),
      description: t("home.howItWorks.steps.step3.description"),
    },
  ]

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
            {t("home.howItWorks.title")}
          </h2>
        </div>

        <div className="relative mb-16">
          {/* Flow line connecting the steps */}
          <div className="hidden lg:block absolute top-8 left-1/2 transform -translate-x-1/2 w-2/3 h-0.5 bg-gradient-to-r from-orange-400 to-blue-500 opacity-30"></div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Step number with larger styling */}
                <div className="flex justify-center mb-6">
                  <div className="text-6xl font-bold text-gray-200 leading-none">
                    {step.number}
                  </div>
                </div>
                
                <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white">
                  <CardContent className="p-8 text-center">
                    {/* Icon container */}
                    <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-blue-900 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <step.icon className="w-10 h-10 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-4 leading-tight">
                      Step {step.number} — {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <a 
            href="/chat"
            onClick={() => trackCTAClick({
              page: 'home',
              placement: 'how_it_works',
              button_text: 'Book a live demo',
              destination: '/chat'
            })}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-blue-900 hover:from-orange-600 hover:to-blue-800 text-white px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              {t("home.howItWorks.cta")}
            </Button>
          </a>
        </div>
      </div>
    </section>
  )
}
