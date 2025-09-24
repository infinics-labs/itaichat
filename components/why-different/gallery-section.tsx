import { Card, CardContent } from "@/components/ui/card"

export function GallerySection() {
  const images = [
    {
      title: "Our Team",
      description: "ITAI team collaboration",
    },
    {
      title: "Field Work",
      description: "Factory consultation",
    },
    {
      title: "Global Exhibitions",
      description: "Trade show representation",
    },
  ]

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
            Inside ITAI: Our People, Our Work,
            <span className="bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent">
              {" "}
              Our Impact
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We&apos;re proud to work closely with manufacturers, visit factories, and represent our clients in global
            exhibitions.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {images.map((image, index) => (
            <Card
              key={index}
              className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white overflow-hidden"
            >
              <div className="relative overflow-hidden">
                <div className="w-full h-64 bg-gradient-to-br from-blue-100 to-orange-100 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <p className="text-gray-600">{image.description}</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 text-center">{image.title}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
