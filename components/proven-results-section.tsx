import { Globe, Users, TrendingUp, DollarSign } from "lucide-react"

export function ProvenResultsSection() {
  const stats = [
    {
      icon: Globe,
      number: "150+",
      label: "Countries",
      description: "Global market coverage",
    },
    {
      icon: Users,
      number: "10K+",
      label: "Clients",
      description: "Successful exporters",
    },
    {
      icon: TrendingUp,
      number: "+300%",
      label: "Growth",
      description: "Average export increase",
    },
    {
      icon: DollarSign,
      number: "$2M+",
      label: "Export Value",
      description: "Generated for clients",
    },
  ]

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-blue-600 via-purple-600 to-purple-800 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
            Proven Results That Speak for Themselves
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Join thousands of exporters who have transformed their business with ITAI&apos;s AI-powered solutions
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 text-center hover:bg-white/15 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* Icon container */}
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              
              {/* Stats */}
              <div className="text-4xl lg:text-5xl font-bold text-white mb-2">{stat.number}</div>
              <h3 className="text-xl font-bold text-white mb-2">{stat.label}</h3>
              <p className="text-white/80 text-sm">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
