"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"

export function FAQSection() {
  const [openItems, setOpenItems] = useState<string[]>([])

  const faqData = [
    {
      id: "what-is-b2b-prospecting",
      question: "What is b2b prospecting?",
      answer: "B2B prospecting is the work of finding and qualifying companies and contacts that match your ICP so outreach becomes efficient-book a live demo to see it in action."
    },
    {
      id: "lead-scraper-difference", 
      question: "How is a lead scraper different from your approach?",
      answer: "A lead scraper pulls unverified data at scale while we deliver verified leads with role fit and deliverability checks-book a live demo for a preview."
    },
    {
      id: "b2b-prospecting-tool",
      question: "Do you offer a b2b prospecting tool or software?",
      answer: "We deliver clean segments that plug into your workflow and integrate with popular tools-book a live demo to see sample segments."
    },
    {
      id: "free-b2b-leads-database",
      question: "Can I get a b2b leads database free?",
      answer: "Free sources risk low accuracy and compliance issues; we show a small verified preview in the live demo."
    },
    {
      id: "regulated-categories",
      question: "Do you support prospection b2b in regulated categories?",
      answer: "Yes, with compliance notes; see examples in a live demo."
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
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Still have questions?</h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Can&apos;t find the answer you&apos;re looking for? Our expert team is here to help you understand how ITAI can
                transform your export business.
              </p>
              <a 
                href="https://calendly.com/mehmet-odsdanismanlik/30min"
                target="_blank"
                rel="noopener noreferrer"
              >
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-lg"
              >
                  Book a live demo
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
