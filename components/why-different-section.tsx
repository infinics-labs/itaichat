"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, TrendingUp } from "lucide-react"
import Link from "next/link"
import { trackCTAClick } from "@/lib/analytics"
import { useLanguage } from "@/contexts/language-context"

export function WhyDifferentSection() {
  const { t } = useLanguage()

  return (
    <section id="why-different" className="py-20 lg:py-32 bg-gradient-to-br from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
            {t("home.whyDifferent.title")}
          </h2>
          <h3 className="text-2xl lg:text-3xl font-semibold text-gray-800 mb-8">
            {t("home.whyDifferent.subtitle")}
          </h3>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Main Content */}
          <div className="space-y-8">
            <div>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                {t("home.whyDifferent.description1")}
              </p>
              
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                {t("home.whyDifferent.description2")}
              </p>
              
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                {t("home.whyDifferent.description3")}
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                <p className="text-gray-700">{t("home.whyDifferent.features.companyFit")}</p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                <p className="text-gray-700">{t("home.whyDifferent.features.contactVerification")}</p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                <p className="text-gray-700">{t("home.whyDifferent.features.reachability")}</p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                <p className="text-gray-700">{t("home.whyDifferent.features.talkingPoints")}</p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-6">
              <Link 
                href="/chat"
                onClick={() => trackCTAClick({
                  page: 'home',
                  placement: 'different_section',
                  button_text: 'Book a live demo',
                  destination: '/chat'
                })}
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-blue-900 hover:from-orange-600 hover:to-blue-800 text-white px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  {t("home.whyDifferent.cta")}
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column - Highlight Card */}
          <div className="lg:pl-8">
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-blue-50 to-orange-50 overflow-hidden">
              <CardContent className="p-8 lg:p-10">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-blue-900 rounded-full flex items-center justify-center mx-auto mb-6">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-4">
                    {t("home.whyDifferent.highlightTitle")}
                  </h4>
                </div>

                <div className="space-y-6">
                  <div className="bg-white rounded-lg p-6 shadow-md">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-gray-600">{t("home.whyDifferent.comparison.platform")}</span>
                      <span className="text-sm text-gray-500">{t("home.whyDifferent.comparison.volume")}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-2 bg-gray-300 rounded"></div>
                      <span className="text-xs text-gray-500">{t("home.whyDifferent.comparison.generic")}</span>
                    </div>
                  </div>

                  <div className="text-center">
                    <span className="text-lg font-semibold text-gray-600">{t("home.whyDifferent.comparison.vs")}</span>
                  </div>

                  <div className="bg-gradient-to-r from-orange-100 to-blue-100 rounded-lg p-6 shadow-md border-2 border-orange-200">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-gray-800">{t("home.whyDifferent.comparison.itai")}</span>
                      <span className="text-sm font-semibold text-orange-600">{t("home.whyDifferent.comparison.quality")}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-12 h-2 bg-gradient-to-r from-orange-500 to-blue-900 rounded"></div>
                      <span className="text-xs font-medium text-gray-700">{t("home.whyDifferent.comparison.verified")}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <p className="text-sm text-gray-600 italic">
                    {t("home.whyDifferent.comparison.quote")}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
