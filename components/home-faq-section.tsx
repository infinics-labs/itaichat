"use client"

import { Button } from "@/components/ui/button"
import { trackCTAClick } from "@/lib/analytics"
import { useLanguage } from "@/contexts/language-context"

export function HomeFAQSection() {
  const { t } = useLanguage()

  const faqData = [
    {
      id: "b2b-prospecting-why-matters",
      question: t("home.homeFaq.questions.q1"),
      answer: t("home.homeFaq.questions.a1")
    },
    {
      id: "data-sources-verification", 
      question: t("home.homeFaq.questions.q2"),
      answer: t("home.homeFaq.questions.a2")
    },
    {
      id: "search-by-country-sector",
      question: t("home.homeFaq.questions.q3"),
      answer: t("home.homeFaq.questions.a3")
    },
    {
      id: "examples-before-decide",
      question: t("home.homeFaq.questions.q4"),
      answer: t("home.homeFaq.questions.a4")
    }
  ]


  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {t("home.homeFaq.title")}
            <span className="bg-gradient-to-r from-orange-500 to-blue-900 bg-clip-text text-transparent">
              {" "}{t("home.homeFaq.titleAccent")}
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t("home.homeFaq.subtitle")}
          </p>
        </div>

        <div className="space-y-8 mb-12">
          {faqData.map((item, index) => (
            <div key={item.id} className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-gradient-to-r from-orange-500 to-blue-900 text-white text-sm font-bold rounded-full">
                    Q{index + 1}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{item.question}</h3>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-100 text-gray-600 text-sm font-bold rounded-full">
                    A{index + 1}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a 
            href="/chat"
            onClick={() => trackCTAClick({
              page: 'home',
              placement: 'faq',
              button_text: 'Book a live demo',
              destination: '/chat'
            })}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-blue-900 hover:from-orange-600 hover:to-blue-800 text-white px-8 py-4 text-lg font-semibold shadow-lg"
            >
              {t("home.homeFaq.cta")}
            </Button>
          </a>
        </div>
      </div>

      {/* FAQ Schema.org markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqData.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })
        }}
      />
    </section>
  )
}
