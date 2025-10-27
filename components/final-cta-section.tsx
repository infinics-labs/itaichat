"use client"

import { Button } from "@/components/ui/button"
import { trackCTAClick } from "@/lib/analytics"
import { useLanguage } from "@/contexts/language-context"

export function FinalCTASection() {
  const { t } = useLanguage()

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 leading-tight">
            {t("home.finalCta.title")}
          </h2>
          
          <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            {t("home.finalCta.subtitle")}
          </p>
          
          <div className="pt-6">
            <a 
              href="/chat"
              onClick={() => trackCTAClick({
                page: 'home',
                placement: 'final_cta',
                button_text: 'Book a live demo',
                destination: '/chat'
              })}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-blue-900 hover:from-orange-600 hover:to-blue-800 text-white px-12 py-6 text-xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                {t("home.finalCta.cta")}
              </Button>
            </a>
          </div>
          
        </div>
      </div>
    </section>
  )
}
