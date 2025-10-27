"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhyChooseITAISection } from "@/components/why-choose-itai-section"
import { useLanguage } from "@/contexts/language-context"
import { useEffect } from "react"

export default function TurkishVerifiedLeadsPage() {
  const { t } = useLanguage()

  // Set document title and meta tags for client component
  useEffect(() => {
    document.title = "Doğrulanmış Müşteri Adayları | ITAI ile Uluslararası Alıcılar Bulun"
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', "Doğrulanmış uluslararası müşteri adayları elde edin ve ürünlerinizi arayan karar vericilerle bağlantı kurun. Dünya çapında kalite güvenceli B2B iletişim bilgileri.")
    } else {
      const meta = document.createElement('meta')
      meta.name = 'description'
      meta.content = "Doğrulanmış uluslararası müşteri adayları elde edin ve ürünlerinizi arayan karar vericilerle bağlantı kurun. Dünya çapında kalite güvenceli B2B iletişim bilgileri."
      document.head.appendChild(meta)
    }

    // Set canonical URL
    const existingCanonical = document.querySelector('link[rel="canonical"]')
    if (existingCanonical) {
      existingCanonical.setAttribute('href', 'https://www.internationaltradeai.com/tr/dogrulanmis-musteriler')
    } else {
      const canonical = document.createElement('link')
      canonical.rel = 'canonical'
      canonical.href = 'https://www.internationaltradeai.com/tr/dogrulanmis-musteriler'
      document.head.appendChild(canonical)
    }
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-orange-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-8">
              {t("verifiedLeads.hero.title")}
              <span className="bg-gradient-to-r from-orange-500 to-blue-900 bg-clip-text text-transparent">
                {" "}{t("verifiedLeads.hero.titleAccent")}
              </span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed mb-8">
              {t("verifiedLeads.hero.subtitle")}
            </p>
          </div>
        </section>
        <WhyChooseITAISection />
      </main>
      <Footer />
    </div>
  )
}
