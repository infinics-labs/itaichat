"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Search, Mail, Package } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { trackCTAClick } from "@/lib/analytics"
import { useLanguage } from "@/contexts/language-context"

export function HowItWorksDetailedSection() {
  const { t } = useLanguage()

  const steps = [
    {
      icon: Users,
      title: t("howItWorks.steps.defineProfile.title"),
      description: t("howItWorks.steps.defineProfile.description"),
      image: "step1.png"
    },
    {
      icon: Search,
      title: t("howItWorks.steps.discoverCompanies.title"),
      description: t("howItWorks.steps.discoverCompanies.description"),
      image: "step2.png"
    },
    {
      icon: Mail,
      title: t("howItWorks.steps.verifyDecisionMakers.title"),
      description: t("howItWorks.steps.verifyDecisionMakers.description"),
      image: "step3.png"
    },
    {
      icon: Package,
      title: t("howItWorks.steps.packageOutreach.title"),
      description: t("howItWorks.steps.packageOutreach.description"),
      image: "step4.png"
    }
  ]

  const faqData = [
    {
      question: t("howItWorks.faq.howProcess.question"),
      answer: t("howItWorks.faq.howProcess.answer")
    },
    {
      question: t("howItWorks.faq.whatMakesDifferent.question"),
      answer: t("howItWorks.faq.whatMakesDifferent.answer")
    },
    {
      question: t("howItWorks.faq.howQuickly.question"),
      answer: t("howItWorks.faq.howQuickly.answer")
    },
    {
      question: t("howItWorks.faq.leadScraperDifference.question"),
      answer: t("howItWorks.faq.leadScraperDifference.answer")
    },
    {
      question: t("howItWorks.faq.prospectingTool.question"),
      answer: t("howItWorks.faq.prospectingTool.answer")
    },
    {
      question: t("howItWorks.faq.freeDatabase.question"),
      answer: t("howItWorks.faq.freeDatabase.answer")
    },
    {
      question: t("howItWorks.faq.regulatedCategories.question"),
      answer: t("howItWorks.faq.regulatedCategories.answer")
    }
  ]

  return (
    <>
      <section className="py-20 lg:py-32 bg-gradient-to-br from-blue-50 via-white to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-8">
              {t("howItWorks.hero.title")}
              <span className="bg-gradient-to-r from-orange-500 to-blue-900 bg-clip-text text-transparent">
                {" "}{t("howItWorks.hero.titleAccent")}
              </span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
              {t("howItWorks.hero.subtitle")}
            </p>
          </div>

          {/* Process Steps */}
          <div className="space-y-16 mb-20">
            {steps.map((step, index) => (
              <div key={index} className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                {/* Content */}
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-blue-900 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                      {index + 1}
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
                      {step.title}
                    </h2>
                  </div>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Visual */}
                <div className={index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                  <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50">
                    <CardContent className="p-8">
                      <Image
                        src={`/${step.image}`}
                        alt={`Step ${index + 1}: ${step.title}`}
                        width={400}
                        height={300}
                        className="w-full h-auto rounded-lg shadow-md"
                      />
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center mb-20">
            <Card className="border-0 shadow-xl bg-white max-w-4xl mx-auto">
              <CardContent className="p-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  {t("howItWorks.cta.title")}
                </h3>
                <p className="text-lg text-gray-600 mb-8">
                  {t("howItWorks.cta.subtitle")}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link 
                    href="/chat"
                    onClick={() => trackCTAClick({
                      page: 'how-it-works',
                      placement: 'primary_cta',
                      button_text: 'Book a live demo',
                      destination: '/chat'
                    })}
                  >
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-orange-500 to-blue-900 hover:from-orange-600 hover:to-blue-800 text-white px-8 py-4 text-lg font-semibold shadow-xl w-full sm:w-auto"
                    >
{t("howItWorks.cta.button")}
                    </Button>
                  </Link>
                  
                  <Link 
                    href="/chat"
                    onClick={() => trackCTAClick({
                      page: 'how-it-works',
                      placement: 'secondary_cta',
                      button_text: 'Request pricing in a live demo',
                      destination: '/chat'
                    })}
                  >
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg font-semibold w-full sm:w-auto"
                    >
{t("howItWorks.cta.secondaryButton")}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              {t("howItWorks.faq.title")}
            </h2>
            <div className="space-y-6">
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

          {/* Internal Links */}
          <div className="mt-20 text-center">
            <p className="text-gray-600 mb-6">{t("howItWorks.links.learnMore")}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/pricing" className="text-orange-600 hover:text-orange-700 font-medium">
                {t("howItWorks.links.pricing")}
              </Link>
              <span className="text-gray-400">•</span>
              <Link href="/verified-leads" className="text-orange-600 hover:text-orange-700 font-medium">
                {t("howItWorks.links.verifiedLeads")}
              </Link>
              <span className="text-gray-400">•</span>
              <Link href="/use-cases" className="text-orange-600 hover:text-orange-700 font-medium">
                {t("howItWorks.links.useCases")}
              </Link>
              <span className="text-gray-400">•</span>
              <Link href="/b2b-data" className="text-orange-600 hover:text-orange-700 font-medium">
                {t("howItWorks.links.b2bData")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* HowTo Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "How ITAI B2B Prospecting Works",
            "description": "Step-by-step process for finding verified international buyers",
            "step": steps.map((step, index) => ({
              "@type": "HowToStep",
              "name": step.title,
              "text": step.description,
              "position": index + 1
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
