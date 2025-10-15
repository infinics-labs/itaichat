"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, TrendingUp } from "lucide-react"
import Link from "next/link"
import { trackCTAClick } from "@/lib/analytics"

export function WhyDifferentSection() {
  return (
    <section id="why-different" className="py-20 lg:py-32 bg-gradient-to-br from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
            Why We&apos;re Different
          </h2>
          <h3 className="text-2xl lg:text-3xl font-semibold text-gray-800 mb-8">
            B2B prospecting for manufacturers, simplified
          </h3>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Main Content */}
          <div className="space-y-8">
            <div>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                B2B prospecting starts with a clear ideal buyer profile and ends with booked meetings.
              </p>
              
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                We combine company fit scores, role‑based contact verification, and short talking points 
                so your first email sounds like you already understand the buyer.
              </p>
              
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                You get b2b business leads you can trust because every record carries reachability 
                checks and purchase context.
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                <p className="text-gray-700">Company fit scores for precise targeting</p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                <p className="text-gray-700">Role‑based contact verification</p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                <p className="text-gray-700">Reachability checks and purchase context</p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                <p className="text-gray-700">Pre-written talking points for personalized outreach</p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-6">
              <Link 
                href="/demo"
                onClick={() => trackCTAClick({
                  page: 'home',
                  placement: 'different_section',
                  button_text: 'Book a live demo',
                  destination: '/demo'
                })}
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-blue-900 hover:from-orange-600 hover:to-blue-800 text-white px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  Book a live demo
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column - Highlight Card */}
          <div className="lg:pl-8">
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-blue-50 to-orange-50 overflow-hidden">
              <CardContent className="p-8 lg:p-10">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-blue-900 rounded-full flex items-center justify-center mx-auto mb-6">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-4">
                    Why quality beats volume
                  </h4>
                </div>

                <div className="space-y-6">
                  <div className="bg-white rounded-lg p-6 shadow-md">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-gray-600">Prospecting Platform</span>
                      <span className="text-sm text-gray-500">Volume Focus</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-2 bg-gray-300 rounded"></div>
                      <span className="text-xs text-gray-500">Generic lists</span>
                    </div>
                  </div>

                  <div className="text-center">
                    <span className="text-lg font-semibold text-gray-600">VS</span>
                  </div>

                  <div className="bg-gradient-to-r from-orange-100 to-blue-100 rounded-lg p-6 shadow-md border-2 border-orange-200">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-gray-800">ITAI</span>
                      <span className="text-sm font-semibold text-orange-600">Quality Focus</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-12 h-2 bg-gradient-to-r from-orange-500 to-blue-900 rounded"></div>
                      <span className="text-xs font-medium text-gray-700">Verified buyers</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <p className="text-sm text-gray-600 italic">
                    If you compare a prospecting platform to a ITAI tool, 
                    the difference here is quality over volume.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
