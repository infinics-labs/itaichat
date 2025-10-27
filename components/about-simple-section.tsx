"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Target, CheckCircle, Globe } from "lucide-react"
import Link from "next/link"
import { trackCTAClick } from "@/lib/analytics"
import { useLanguage } from "@/contexts/language-context"

export function AboutSimpleSection() {
  const { t } = useLanguage()

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-blue-50 via-white to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-8">
            {t("about.title")}
            <span className="bg-gradient-to-r from-orange-500 to-blue-900 bg-clip-text text-transparent">
              {" "}{t("about.titleAccent")}
            </span>
          </h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <p className="text-xl lg:text-2xl text-gray-700 leading-relaxed">
                {t("about.subtitle1")}
              </p>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                {t("about.subtitle2")}
              </p>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                {t("about.subtitle3")}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Target className="w-6 h-6 text-orange-500 mt-1 flex-shrink-0" />
                <p className="text-gray-700">{t("about.features.quality")}</p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                <p className="text-gray-700">{t("about.features.verified")}</p>
              </div>
              <div className="flex items-start space-x-3">
                <Globe className="w-6 h-6 text-blue-500 mt-1 flex-shrink-0" />
                <p className="text-gray-700">{t("about.features.global")}</p>
              </div>
            </div>

            <div className="pt-6">
              <Link 
                href="/chat"
                onClick={() => trackCTAClick({
                  page: 'about',
                  placement: 'main_cta',
                  button_text: 'Book a live demo',
                  destination: '/chat'
                })}
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-blue-900 hover:from-orange-600 hover:to-blue-800 text-white px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  {t("about.cta")}
                </Button>
              </Link>
            </div>
          </div>

          {/* Visual Card */}
          <div>
            <Card className="border-0 shadow-2xl bg-white">
              <CardContent className="p-12 text-center">
                <div className="space-y-8">
                  <div>
                    <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-blue-900 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <Target className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {t("about.card.title")}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {t("about.card.description")}
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-100">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600 mb-1">6+</div>
                      <div className="text-sm text-gray-600">{t("about.card.stats.experience")}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600 mb-1">195+</div>
                      <div className="text-sm text-gray-600">{t("about.card.stats.countries")}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600 mb-1">10K+</div>
                      <div className="text-sm text-gray-600">{t("about.card.stats.buyers")}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Mission Statement Card */}
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-xl bg-gradient-to-r from-gray-50 to-blue-50">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {t("about.mission.title")}
              </h2>
              <p className="text-xl text-gray-700 leading-relaxed mb-8">
                {t("about.mission.description")}
              </p>
              <div className="text-lg text-gray-600">
                <strong>{t("about.mission.result")}</strong> {t("about.mission.resultText")}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
