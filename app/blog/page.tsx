import { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { ExpandableQACard } from "@/components/blog/expandable-qa-card"

export const metadata: Metadata = {
  title: "Blog - ITAI | International Trade AI",
  description: "Learn about customer intelligence and how AI transforms international trade with ITAI's insights and expertise.",
  alternates: {
    canonical: 'https://www.internationaltradeai.com/blog'
  },
  openGraph: {
    title: "Blog - ITAI | International Trade AI",
    description: "Learn about customer intelligence and how AI transforms international trade with ITAI's insights and expertise.",
    url: "https://www.internationaltradeai.com/blog",
    siteName: "ITAI - International Trade AI",
    images: [
      {
        url: "https://www.internationaltradeai.com/thumbnail.png",
        width: 1200,
        height: 630,
        alt: "ITAI Blog",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog - ITAI | International Trade AI",
    description: "Learn about customer intelligence and how AI transforms international trade with ITAI's insights and expertise.",
    images: ["https://www.internationaltradeai.com/thumbnail.png"],
  },
}

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              ITAI <span className="bg-gradient-to-r from-orange-500 to-blue-900 bg-clip-text text-transparent">Blog</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Insights, strategies, and expert knowledge on AI-powered international trade and customer intelligence.
            </p>
          </div>
        </section>

        {/* Blog Content */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="shadow-lg">
              <CardContent className="p-6 lg:p-8">
                {/* Article Content */}
                <div className="prose max-w-none">
                  <ExpandableQACard items={[
                    {
                      question: "How Does 24/7 Customer Intelligence Work?",
                      answer: "A business's most valuable asset is its customers. Any business model without customers cannot survive. At the same time, finding potential customers through the right channels is one of the biggest challenges. Understanding which channels potential customers use to search for subcontractors, their search intentions, and their basic needs, as well as tracking constantly changing demands, is not easy at all. Customer intelligence management—bringing together and analyzing signals from different channels, converting customer demands into meaningful insights, and enabling companies to take action targeting the right buyer at the right time—becomes a more achievable goal with artificial intelligence."
                    },
                    {
                      question: "How Can We Acquire Customer Intelligence?",
                      answer: "While insights from traditional reports provide signals about past data, they cause hot opportunities to be missed. A modern customer intelligence system analyzes and reports potential customers' real-time information, creating a holistic picture of the customer journey. This way, companies wanting to access customer potential move from being reactive to proactive; they can anticipate needs and personalize their offers. Especially in B2B sectors with long decision processes, such real-time insights are not optional but essential."
                    },
                    {
                      question: "What Data Sources Are Used for Customer Tracking?",
                      answer: "Finding the right signals in today's data ocean is like looking for a needle in a haystack. The main sources include: Social Media and E-Commerce Sites, Customs and Import Data, and Website and Search Behavior Data. Each provides unique insights into customer behavior and buying intentions."
                    },
                    {
                      question: "How Do Social Media and E-Commerce Sites Help?",
                      answer: "Social media networks and online marketplaces are platforms where potential customers share their needs, albeit limitedly. These channels include forums, news sites, podcasts, and blogs. Advanced social listening tools analyze the emotional tone and context of posts rather than simple keyword tracking, providing businesses with actionable information."
                    },
                    {
                      question: "Why Is Customs and Import Data Important?",
                      answer: "Closely monitoring trade statistics and obtaining current information through continuous intelligence channels is possible with a comprehensive system. The way to reach the most accurate predictions with current data is through import customs and bill of lading data of companies with customer potential."
                    },
                    {
                      question: "How Does AI Transform Customer Intelligence?",
                      answer: "Traditional customer intelligence methods require significant human resources and time. However, artificial intelligence agents can process thousands of data points simultaneously, identify patterns, and generate actionable insights in real-time. AI agents find potential buyers and establish a continuous intelligence cycle fed by real-time trade data."
                    }
                  ]} />

                  <div className="bg-gradient-to-r from-orange-50 to-blue-50 p-5 rounded-lg mt-6">
                    <p className="text-gray-700 leading-relaxed text-base">
                      <strong>ITAI (International Trade AI)</strong> enables companies to monitor global buyer signals in real-time 
                      by combining export and import data, social interactions, and market trends. With ITAI, you can both identify 
                      potential customers and access the contact information of the right buyers, and integrate this information with 
                      an integrated CRM system so you don&apos;t miss any customer potential. This way, you can learn with high accuracy 
                      which markets your products have buyer potential in and provide your sales teams with the opportunity to take 
                      focused and fast action. In short, with ITAI, you don&apos;t miss trade opportunities worldwide. If you want to 
                      increase your competitive power in international markets and experience what ITAI can do for you, you can 
                      request a live demo immediately through the link.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
