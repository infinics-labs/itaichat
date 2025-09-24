import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

export function AIMessageSection() {
  const capabilities = [
    "Systematically identify every viable B2B customer across 195 countries",
    "Prioritize high-potential markets using real trade data",
    "Build qualified pipelines with decision-makers in your sector",
  ]

  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left side - Image placeholder */}
          <div className="order-2 lg:order-1">
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-blue-100 to-orange-100 rounded-2xl shadow-2xl flex items-center justify-center">
                <p className="text-gray-600 text-lg">AI assistant helping factory team</p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 to-purple-600/20 rounded-2xl"></div>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="order-1 lg:order-2 space-y-8">
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                Now We&apos;re Sharing Our Expertise
                <span className="bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent">
                  {" "}
                  Through AI
                </span>
              </h2>

              <p className="text-xl text-gray-600 leading-relaxed">
                This hard-won knowledge powers International Trade AI – your 24/7 global business development agent.
              </p>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-orange-50">
                <CardContent className="p-6">
                  <p className="text-lg font-semibold text-gray-900 mb-4">
                    Our AI solution helps manufacturers and industrial companies:
                  </p>

                  <div className="space-y-4">
                    {capabilities.map((capability, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                        <p className="text-gray-700 leading-relaxed">{capability}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
