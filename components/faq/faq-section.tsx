"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"

export function FAQSection() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [openItems, setOpenItems] = useState<string[]>([])

  const categories = [
    { id: "all", label: "All Questions" },
    { id: "product-overview", label: "Product Overview" },
    { id: "core-features", label: "Core Features" },
    { id: "integration", label: "Integration & Compatibility" },
    { id: "data-accuracy", label: "Data Accuracy & Sources" },
    { id: "use-cases", label: "Use Cases & Targeting" },
    { id: "pricing", label: "Pricing & Plans" },
    { id: "technical", label: "Technical Requirements" },
    { id: "competitive", label: "Competitive Advantages" },
    { id: "security", label: "Security & Compliance" },
  ]

  const faqData = [
    {
      category: "product-overview",
      title: "Product Overview",
      questions: [
        {
          id: "what-is-itai",
          question: "What is International Trade AI (ITAI)?",
          answer:
            "International Trade AI (ITAI) is an AI-powered business development platform specifically designed for exporters and manufacturers. It combines 6+ years of export consultancy expertise with advanced AI technology to help businesses discover global opportunities, generate qualified leads, and connect with international buyers across 195+ countries.",
        },
        {
          id: "how-differs",
          question: "How does ITAI differ from traditional lead generation tools?",
          answer:
            "Unlike generic lead generation tools, ITAI is built specifically for international trade and export. Our AI is trained on export-specific data, understands trade patterns, and focuses on B2B relationships. We provide verified buyer information, market intelligence, and seamless CRM integration, making it a complete export development solution rather than just a contact database.",
        },
        {
          id: "suitable-exporters",
          question: "What makes ITAI suitable for exporters?",
          answer:
            "ITAI is designed with exporters in mind, offering features like multi-country targeting, language-specific campaigns, trade data analysis, and buyer verification. Our platform understands export challenges such as finding distributors, navigating international markets, and building trust with overseas buyers. We provide context-aware recommendations based on your industry, product type, and target markets.",
        },
      ],
    },
    {
      category: "core-features",
      title: "Core Features",
      questions: [
        {
          id: "lead-types",
          question: "What kind of leads does ITAI generate?",
          answer:
            "ITAI generates high-quality B2B leads including importers, distributors, wholesalers, retailers, and manufacturers looking for your products. Each lead includes detailed company information, contact details, decision-maker profiles, and relevant business intelligence to help you make informed outreach decisions.",
        },
        {
          id: "lead-accuracy",
          question: "How does ITAI ensure lead accuracy?",
          answer:
            "We use a multi-layered verification process including AI-powered data validation, real-time web scraping, social media verification, and manual quality checks. Our system continuously updates contact information and removes outdated entries. We also track engagement metrics to ensure leads are actively seeking suppliers in your industry.",
        },
        {
          id: "user-access",
          question: "How many users can access the platform?",
          answer:
            "Both our ITAI PLUS and Demo Account plans include unlimited users. Your entire team can access the platform simultaneously without additional per-user fees. You can set different permission levels and access controls to ensure team members see relevant information for their roles.",
        },
      ],
    },
    {
      category: "integration",
      title: "Integration & Compatibility",
      questions: [
        {
          id: "crm-integration",
          question: "Is ITAI integrated with CRMs?",
          answer:
            "Yes, ITAI comes with full Odoo CRM integration including 3 modules with unlimited users. The system automatically syncs leads, enriches existing data, and maintains up-to-date contact information. We also support data export to other popular CRM systems and provide API access for custom integrations.",
        },
        {
          id: "data-export",
          question: "Can ITAI export data to Excel or other formats?",
          answer:
            "ITAI supports data export in multiple formats including Excel (XLSX), CSV, PDF reports, and JSON for API integrations. You can export filtered lead lists, market analysis reports, and campaign performance data. Custom export templates are also available for specific business needs.",
        },
        {
          id: "mobile-compatibility",
          question: "Is ITAI compatible with mobile devices?",
          answer:
            "Yes, ITAI is fully responsive and works seamlessly on mobile devices and tablets. Our mobile-optimized interface allows you to access leads, review market intelligence, and manage your export campaigns on the go. Native mobile apps for iOS and Android are also available for enhanced mobile experience.",
        },
      ],
    },
    {
      category: "data-accuracy",
      title: "Data Accuracy & Sources",
      questions: [
        {
          id: "data-sources",
          question: "What data sources does ITAI use?",
          answer:
            "ITAI aggregates data from multiple premium sources including trade databases, business registries, social media platforms, company websites, industry publications, and our proprietary network of verified contacts. We also leverage government trade data, customs records, and international business directories to ensure comprehensive coverage.",
        },
        {
          id: "data-updates",
          question: "How often is the data updated?",
          answer:
            "Our database is updated continuously with real-time data feeds and automated verification processes. Critical information like contact details and company status is refreshed daily, while market intelligence and trade data is updated weekly. We also perform comprehensive quarterly reviews to ensure data quality and relevance.",
        },
        {
          id: "custom-filters",
          question: "Can I request custom data filters?",
          answer:
            "Yes, we offer custom data filtering based on your specific requirements. You can request filters by industry certifications, company size, import/export volumes, geographic regions, or any other business criteria relevant to your products. Our team works with you to create tailored search parameters that match your ideal customer profile.",
        },
      ],
    },
    {
      category: "use-cases",
      title: "Use Cases & Targeting",
      questions: [
        {
          id: "niche-targeting",
          question: "Can I use ITAI for niche product targeting?",
          answer:
            "ITAI excels at niche product targeting using advanced keyword matching, certification filters, and industry-specific parameters. Whether you're selling organic textiles, specialized machinery, or unique consumer products, our AI can identify buyers specifically interested in your niche market segments.",
        },
        {
          id: "regional-campaigns",
          question: "Does ITAI support regional or language-specific campaigns?",
          answer:
            "Yes, ITAI supports campaigns in multiple languages and can target specific regions, countries, or even cities. Our platform identifies buyers who communicate in your preferred language and understands regional business practices, cultural preferences, and local market dynamics to improve your outreach success rates.",
        },
        {
          id: "results-speed",
          question: "How quickly can I get results using ITAI?",
          answer:
            "Most users see initial results within 24-48 hours of setting up their campaigns. Lead generation typically produces 100-500 qualified prospects within the first week, depending on your industry and target markets. Our AI learns from your preferences and feedback to continuously improve result quality and relevance over time.",
        },
      ],
    },
    {
      category: "pricing",
      title: "Pricing & Plans",
      questions: [
        {
          id: "plus-plan-includes",
          question: "What is included in the $9,900/year plan?",
          answer:
            "The ITAI PLUS plan includes lead generation across 20 countries, full Odoo CRM integration with 3 modules and unlimited users, automatic lead card generation, detailed lead profiles, comprehensive setup and training, CRM maintenance training, and business development training. You also get dedicated support and regular platform updates.",
        },
        {
          id: "demo-option",
          question: "Is there a one-time demo option?",
          answer:
            "Yes, we offer a Demo Account for $490 one-time payment. This includes lead generation in 1 country, basic Odoo CRM setup with 3 modules and unlimited users, automatic lead cards with basic setup, detailed lead profiles, and initial setup with basic training. It's perfect for testing our platform before committing to the full plan.",
        },
        {
          id: "setup-fees",
          question: "Are there any setup or training fees?",
          answer:
            "No, there are no additional setup or training fees. Both plans include comprehensive setup, initial training, and ongoing support. The ITAI PLUS plan also includes advanced CRM maintenance training and business development training at no extra cost. All training materials and documentation are provided as part of your subscription.",
        },
      ],
    },
    {
      category: "technical",
      title: "Technical Requirements",
      questions: [
        {
          id: "installation",
          question: "Do I need to install anything to use ITAI?",
          answer:
            "No installation is required. ITAI is a cloud-based SaaS platform accessible through any modern web browser. Simply log in to your account and start using the platform immediately. For enhanced functionality, we offer optional browser extensions and mobile apps, but the core platform works entirely online.",
        },
        {
          id: "system-requirements",
          question: "What are the system requirements?",
          answer:
            "ITAI works on any device with a modern web browser (Chrome, Firefox, Safari, Edge) and internet connection. Minimum requirements include 4GB RAM and a stable internet connection. For optimal performance, we recommend using the latest browser versions and having at least 8GB RAM for handling large datasets.",
        },
        {
          id: "technical-expertise",
          question: "Does it require technical expertise to operate?",
          answer:
            "Not at all! ITAI is designed for business users without technical backgrounds. Our intuitive interface, guided setup process, and comprehensive training ensure you can start generating leads immediately. We provide video tutorials, documentation, and dedicated support to help you maximize the platform's potential.",
        },
      ],
    },
    {
      category: "competitive",
      title: "Competitive Advantages",
      questions: [
        {
          id: "platform-comparison",
          question: "How does ITAI compare to other global trade platforms?",
          answer:
            "ITAI stands out with its export-specific AI, comprehensive CRM integration, and focus on verified B2B relationships. Unlike generic platforms, we provide market intelligence, automated lead scoring, and export-specific training. Our 6+ years of export consultancy experience is built into the platform, offering insights that generic tools cannot provide.",
        },
        {
          id: "tool-replacement",
          question: "Can ITAI replace multiple tools I'm currently using?",
          answer:
            "Yes, ITAI is designed to replace multiple fragmented tools. It combines lead generation, CRM, market research, contact management, and business intelligence in one platform. Most clients reduce their tool stack by 60-80% while improving efficiency and reducing costs. This consolidation also improves data consistency and workflow efficiency.",
        },
        {
          id: "support-quality",
          question: "What kind of support does ITAI provide?",
          answer:
            "We provide comprehensive support including dedicated account managers, 24/7 technical support, regular training sessions, and business development consulting. Our support team includes export specialists who understand international trade challenges and can provide strategic guidance beyond just technical assistance.",
        },
      ],
    },
    {
      category: "security",
      title: "Security & Compliance",
      questions: [
        {
          id: "data-security",
          question: "Is user data secure on the platform?",
          answer:
            "Yes, we implement enterprise-grade security including SSL encryption, secure data centers, regular security audits, and compliance with international data protection standards. Your data is encrypted both in transit and at rest, with regular backups and disaster recovery procedures in place.",
        },
        {
          id: "gdpr-compliance",
          question: "Is ITAI GDPR-compliant?",
          answer:
            "Absolutely. ITAI is fully GDPR-compliant with comprehensive data protection measures, user consent management, data portability options, and the right to be forgotten. We have appointed a Data Protection Officer and regularly audit our compliance procedures to ensure ongoing adherence to privacy regulations.",
        },
        {
          id: "access-control",
          question: "Can I control access levels for my team?",
          answer:
            "Yes, ITAI provides granular access control with role-based permissions. You can set different access levels for team members, restrict access to sensitive data, monitor user activity, and maintain audit trails. Administrators can manage user permissions, set data export restrictions, and control feature access based on team roles.",
        },
      ],
    },
  ]

  const toggleItem = (itemId: string) => {
    setOpenItems((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]))
  }

  const filteredData =
    activeCategory === "all" ? faqData : faqData.filter((section) => section.category === activeCategory)

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Filter */}
        <div className="sticky top-20 z-40 bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl p-4 mb-12 shadow-lg">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category.id)}
                className={
                  activeCategory === category.id
                    ? "bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white"
                    : "border-gray-200 text-gray-600 hover:bg-gray-50 bg-transparent"
                }
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>

        {/* FAQ Content */}
        <div className="space-y-12">
          {filteredData.map((section) => (
            <div key={section.category} id={section.category}>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8 text-center">
                <span className="bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent">
                  {section.title}
                </span>
              </h2>

              <div className="space-y-4">
                {section.questions.map((item) => (
                  <Card
                    key={item.id}
                    className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-b from-white to-gray-50"
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
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 text-center">
          <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-50 to-orange-50">
            <CardContent className="p-8 lg:p-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Still have questions?</h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Can&apos;t find the answer you&apos;re looking for? Our expert team is here to help you understand how ITAI can
                transform your export business.
              </p>
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-lg"
              >
                Contact Our Experts
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
