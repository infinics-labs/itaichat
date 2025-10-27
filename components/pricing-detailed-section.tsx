"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Star, Users, Globe, TrendingUp } from "lucide-react"
import Link from "next/link"
import { trackCTAClick } from "@/lib/analytics"

export function PricingDetailedSection() {
  const plans = [
    {
      name: "Starter",
      icon: Users,
      features: [
        "50 verified buyers",
        "150 verified contacts",
        "1 market",
        "Email support"
      ],
      description: "Perfect for testing our b2b database with a focused market approach. Unlike free b2b leads database sources, get verified leads with guaranteed accuracy."
    },
    {
      name: "Growth",
      icon: TrendingUp,
      features: [
        "200 verified buyers",
        "600 contacts",
        "3 markets",
        "ICP workshop",
        "Priority support"
      ],
      description: "Ideal for growing companies expanding their b2b marketing database",
      popular: true
    },
    {
      name: "Scale",
      icon: Globe,
      features: [
        "500+ verified buyers",
        "5+ markets",
        "Dedicated analyst",
        "Compliance notes"
      ],
      description: "Enterprise-level customer leads database for serious export growth"
    }
  ]

  const faqData = [
    {
      question: "What if a contact bounces?",
      answer: "We replace it quickly and keep your list fresh. Our b2b database is constantly updated to maintain high deliverability rates."
    },
    {
      question: "How many markets can I target?",
      answer: "Choose one to start and expand as results come in. Each plan includes specific market allocations from our b2b marketing database."
    },
    {
      question: "Can you enrich my existing list?",
      answer: "Yes, we verify, complete missing fields, and remove duplicates from your customer leads database to improve quality and deliverability."
    }
  ]

  return (
    <>
      <section className="py-20 lg:py-32 bg-gradient-to-br from-blue-50 via-white to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-8">
              See plans and request pricing
              <span className="bg-gradient-to-r from-orange-500 to-blue-900 bg-clip-text text-transparent">
                {" "}in a live demo
              </span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
              Simple plans for exporters who need verified buyers and clean B2B data. 
              See exactly what&apos;s included and request custom pricing in your personalized demo.
            </p>
          </div>

          {/* Plans Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Plans
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {plans.map((plan, index) => (
                <Card 
                  key={index} 
                  className={`border-0 shadow-xl hover:shadow-2xl transition-all duration-300 ${
                    plan.popular ? 'ring-2 ring-orange-500 relative' : ''
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-orange-500 to-blue-900 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                        <Star className="w-4 h-4 mr-1" />
                        Most Popular
                      </div>
                    </div>
                  )}
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-blue-900 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <plan.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{plan.name}</h3>
                    <p className="text-gray-600 mb-6">{plan.description}</p>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center justify-center">
                          <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>


          {/* FAQ Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              FAQ
            </h2>
            <div className="max-w-4xl mx-auto space-y-6">
              {faqData.map((faq, index) => (
                <Card key={index} className="border-0 shadow-lg">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mb-20">
            <Card className="border-0 shadow-xl bg-white max-w-4xl mx-auto">
              <CardContent className="p-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Ready to see your customized b2b database?
                </h3>
                <p className="text-lg text-gray-600 mb-8">
                  Request pricing in a live demo and see a curated preview of verified buyers 
                  from your target markets.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link 
                    href="/chat"
                    onClick={() => trackCTAClick({
                      page: 'pricing',
                      placement: 'primary_cta',
                      button_text: 'Request pricing in a live demo',
                      destination: '/chat'
                    })}
                  >
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-orange-500 to-blue-900 hover:from-orange-600 hover:to-blue-800 text-white px-8 py-4 text-lg font-semibold shadow-xl w-full sm:w-auto"
                    >
                      Request pricing in a live demo
                    </Button>
                  </Link>
                  
                  <Link 
                    href="/chat"
                    onClick={() => trackCTAClick({
                      page: 'pricing',
                      placement: 'secondary_cta',
                      button_text: 'Book a live demo',
                      destination: '/chat'
                    })}
                  >
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg font-semibold w-full sm:w-auto"
                    >
                      Book a live demo
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Internal Links */}
          <div className="text-center">
            <p className="text-gray-600 mb-6">Learn more about our solutions:</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/verified-leads" className="text-orange-600 hover:text-orange-700 font-medium">
                Verified Leads
              </Link>
              <span className="text-gray-400">•</span>
              <Link href="/how-it-works" className="text-orange-600 hover:text-orange-700 font-medium">
                How It Works
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Product Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "ITAI B2B Database",
            "description": "Verified B2B database with international buyers and decision-maker contacts",
            "offers": plans.map(plan => ({
              "@type": "Offer",
              "name": `${plan.name} Plan`,
              "description": plan.description,
              "availability": "https://schema.org/InStock"
            }))
          })
        }}
      />

      {/* FAQ Schema */}
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
    </>
  )
}
