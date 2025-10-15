"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

interface FAQItem {
  question: string
  answer: string
}

const faqData: FAQItem[] = [
  {
    question: "What's included in each package?",
    answer: "Each package includes our core B2B database access with verified international buyers. Starting Package includes basic features, Plus Package adds advanced filtering and priority support, while Pro Plus Package provides enterprise-level features including API access and dedicated account management."
  },
  {
    question: "Can I change my package later?",
    answer: "Yes, you can upgrade or downgrade your package at any time. When upgrading, you'll get immediate access to new features. When downgrading, changes take effect at your next billing cycle."
  },
  {
    question: "How many contacts can I export?",
    answer: "The number of contacts varies by package and number of countries selected. Starting Package includes basic contact limits, Plus Package offers expanded limits, and Pro Plus Package provides unlimited access to our entire database."
  },
  {
    question: "Do you offer custom pricing for large enterprises?",
    answer: "Yes, we offer custom enterprise solutions for companies with specific needs. Contact our sales team to discuss volume discounts, custom integrations, and tailored features for your organization."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and bank transfers for enterprise customers. All payments are processed securely through our encrypted payment system."
  },
  {
    question: "Is there a free trial available?",
    answer: "We offer a 14-day free trial for all packages. No credit card required to start. You can explore our features and see the quality of our B2B database before committing to a paid plan."
  }
]

export function PricingFAQ() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
        Frequently Asked Questions
      </h2>
      
      <div className="max-w-4xl mx-auto space-y-4">
        {faqData.map((faq, index) => (
          <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-0">
              <button
                onClick={() => toggleItem(index)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
              >
                <h3 className="text-lg font-semibold text-gray-900 pr-4">
                  {faq.question}
                </h3>
                {openItems.includes(index) ? (
                  <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                )}
              </button>
              
              {openItems.includes(index) && (
                <div className="px-6 pb-6">
                  <div className="border-t border-gray-100 pt-4">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
