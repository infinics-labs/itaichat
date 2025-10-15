"use client"

import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Check, X } from "lucide-react"

interface Feature {
  name: string
  category: string
  starting: boolean
  plus: boolean
  proPlus: boolean
}

const features: Feature[] = [
  // Lead Generation
  { name: "AI-Powered Prospecting: Automatically find companies matching your ideal customer profile", category: "Lead Generation", starting: true, plus: true, proPlus: true },
  { name: "Lead Scoring: Automatically rank prospects based on engagement and fit to prioritize efforts", category: "Lead Generation", starting: true, plus: true, proPlus: true },
  { name: "Lead Reasoning: AI Reasoning leads with your requests", category: "Lead Generation", starting: true, plus: true, proPlus: true },
  
  // Data Enrichment
  { name: "Contact Data Enrichment: Lead profiling with company websites, contact e-mails, social media profiles", category: "Data Enrichment", starting: true, plus: true, proPlus: true },
  { name: "Premium Contact Data Enrichment: Augment lead profiles with verified contact details and company information", category: "Data Enrichment", starting: false, plus: true, proPlus: true },
  
  // Basic CRM
  { name: "Centralized Contact Management", category: "Basic CRM", starting: true, plus: true, proPlus: true },
  
  // ODOO CRM
  { name: "Advanced Analytics & Reporting: Gain deep insights into sales performance, customer behavior, and team productivity with customizable dashboards", category: "ODOO CRM", starting: false, plus: false, proPlus: true },
  { name: "Enterprise-Grade Security & Compliance: Features robust security controls, role-based permissions, and compliance support for regulations like GDPR", category: "ODOO CRM", starting: false, plus: false, proPlus: true },
  { name: "Seamless Ecosystem Integration: Unifies CRM with sales, project management", category: "ODOO CRM", starting: false, plus: false, proPlus: true },
  
  // Education & Training
  { name: "Basic CRM onboarding and setup assistance", category: "Education & Training", starting: false, plus: true, proPlus: true },
  { name: "Email support during business hours", category: "Education & Training", starting: true, plus: true, proPlus: true },
  { name: "WhatsApp support during business hours", category: "Education & Training", starting: false, plus: false, proPlus: true },
  { name: "Advanced CRM strategy sessions and personalized configuration", category: "Education & Training", starting: false, plus: false, proPlus: true },
  { name: "Proactive system health checks and optimization reviews", category: "Education & Training", starting: false, plus: false, proPlus: true }
]

export function PricingComparison() {
  // Group features by category
  const groupedFeatures = features.reduce((acc, feature) => {
    if (!acc[feature.category]) {
      acc[feature.category] = []
    }
    acc[feature.category].push(feature)
    return acc
  }, {} as Record<string, Feature[]>)

  const categories = Object.keys(groupedFeatures)

  return (
    <Card className="border-0 shadow-xl overflow-hidden">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left p-6 font-semibold text-gray-900">Features</th>
                <th className="text-center p-6 font-semibold text-gray-900">Starting Package</th>
                <th className="text-center p-6 font-semibold text-gray-900 bg-orange-50">Plus Package</th>
                <th className="text-center p-6 font-semibold text-gray-900">Pro Plus Package</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, categoryIndex) => (
                <React.Fragment key={category}>
                  {/* Category Header */}
                  <tr className="bg-gradient-to-r from-gray-100 to-gray-50">
                    <td colSpan={4} className="p-4 font-bold text-gray-900 text-lg">
                      {category}
                    </td>
                  </tr>
                  
                  {/* Features in this category */}
                  {groupedFeatures[category].map((feature, featureIndex) => (
                    <tr key={`${category}-${featureIndex}`} className={featureIndex % 2 === 0 ? "bg-white" : "bg-gray-25"}>
                      <td className="p-4 pl-8 text-gray-700 text-sm">
                        <div className="font-medium mb-1">
                          {feature.name.split(':')[0]}
                        </div>
                        {feature.name.includes(':') && (
                          <div className="text-gray-500 text-xs">
                            {feature.name.split(':')[1].trim()}
                          </div>
                        )}
                      </td>
                      <td className="p-4 text-center">
                        {feature.starting ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 mx-auto" />
                        )}
                      </td>
                      <td className="p-4 text-center bg-orange-25">
                        {feature.plus ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 mx-auto" />
                        )}
                      </td>
                      <td className="p-4 text-center">
                        {feature.proPlus ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 mx-auto" />
                        )}
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
