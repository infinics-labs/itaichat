import { Card, CardContent } from "@/components/ui/card"
import { Brain, Clock, Target, Filter } from "lucide-react"

export function WhyDifferentSection() {
  const features = [
    {
      icon: Brain,
      title: "Export-Focused AI",
      description: "A system trained specifically for export intelligence — not generic CRM.",
    },
    {
      icon: Clock,
      title: "Always On",
      description: "24/7 lead generation and buyer tracking so you never miss an opportunity.",
    },
    {
      icon: Target,
      title: "Tailored to You",
      description: "Every result matches your industry, capacity, and product goals.",
    },
    {
      icon: Filter,
      title: "No Clutter, Just Matches",
      description: "We don't show lists. We show your best-fit buyers.",
    },
  ]

  return (
    <section id="why-different" className="py-20 lg:py-32 bg-gradient-to-br from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
            Why We&apos;re Different
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A clearer, faster way to scale global sales — powered by AI, not guesswork.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white"
            >
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 leading-tight">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
