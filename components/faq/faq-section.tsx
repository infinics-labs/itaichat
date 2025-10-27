"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function FAQSection() {
  const { t } = useLanguage()
  const [openItems, setOpenItems] = useState<string[]>([])

  const faqData = [
    {
      id: "what-is-b2b-prospecting",
      question: t("faq.questions.whatIsB2bProspecting.question"),
      answer: t("faq.questions.whatIsB2bProspecting.answer")
    },
    {
      id: "lead-scraper-difference", 
      question: t("faq.questions.leadScraperDifference.question"),
      answer: t("faq.questions.leadScraperDifference.answer")
    },
    {
      id: "b2b-prospecting-tool",
      question: t("faq.questions.b2bProspectingTool.question"),
      answer: t("faq.questions.b2bProspectingTool.answer")
    },
    {
      id: "free-b2b-leads-database",
      question: t("faq.questions.freeB2bLeadsDatabase.question"),
      answer: t("faq.questions.freeB2bLeadsDatabase.answer")
    },
    {
      id: "regulated-categories",
      question: t("faq.questions.regulatedCategories.question"),
      answer: t("faq.questions.regulatedCategories.answer")
    }
  ]

  const toggleItem = (itemId: string) => {
    setOpenItems((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]))
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* FAQ Content */}
        <div className="space-y-4 mb-12">
          {faqData.map((item) => (
                  <Card
                    key={item.id}
              id={item.id}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white"
                  >
                    <CardContent className="p-0">
                      <button
                        onClick={() => toggleItem(item.id)}
                        className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50/50 transition-colors duration-200 rounded-lg"
                      >
                        <h3 className="text-lg font-semibold text-gray-900 pr-4">{item.question}</h3>
                        {openItems.includes(item.id) ? (
                          <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                        )}
                      </button>

                      {openItems.includes(item.id) && (
                        <div className="px-6 pb-6 animate-in slide-in-from-top-2 duration-200">
                          <div className="border-t border-gray-100 pt-4">
                            <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="text-center">
          <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-50 to-orange-50">
            <CardContent className="p-8 lg:p-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{t("faq.cta.title")}</h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                {t("faq.cta.description")}
              </p>
              <a 
                href="/chat"
              >
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-blue-900 hover:from-orange-600 hover:to-blue-800 text-white px-8 py-4 text-lg font-semibold shadow-lg"
              >
                  {t("faq.cta.button")}
              </Button>
              </a>
            </CardContent>
          </Card>
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
