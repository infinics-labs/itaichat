"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, ArrowRight, Globe, Instagram, Linkedin, Youtube } from "lucide-react"
import Image from "next/image"
import { trackCTAClick, trackExternalLink } from "@/lib/analytics"

export function Footer() {
  return (
    <footer className="bg-white">
      {/* Final CTA Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Card className="border-0 shadow-2xl bg-white overflow-hidden">
            <CardContent className="p-12 lg:p-16">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-orange-100 rounded-full text-sm font-medium text-gray-700 mb-8">
                <Sparkles className="w-4 h-4 mr-2 text-orange-500" />
                Ready to Transform Your Export Business?
              </div>

              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Start your export journey today with our
                <span className="bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent">
                  {" "}
                  AI assistant
                </span>
              </h2>

              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Join thousands of successful exporters who trust ITAI to discover global opportunities and connect with international buyers.
              </p>

              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
                onClick={() => {
                  trackCTAClick({
                    page: 'home',
                    placement: 'footer_cta',
                    button_text: 'Book a Demo',
                    destination: '#hero'
                  });
                  document.querySelector('#hero')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Book a Demo
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>

              <p className="text-sm text-gray-500 mt-4">No credit card required • Start chatting in seconds</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer Links */}
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-5 gap-8">
            {/* Logo and Description */}
            <div className="md:col-span-2">
              <Image
                src="/logo.png"
                alt="ITAI Logo"
                width={120}
                height={40}
                className="h-10 w-auto mb-6 brightness-0 invert"
                unoptimized
              />
              <p className="text-gray-400 max-w-md mb-6">
                Advanced AI assistant powered by cutting-edge technology to help you accomplish tasks more efficiently.
              </p>

              {/* Social Media Icons */}
              <div className="flex items-center space-x-4">
                <a 
                  href="https://www.instagram.com/internationaltradeai" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-orange-500 transition-colors"
                  onClick={() => trackExternalLink('https://www.instagram.com/internationaltradeai', 'Instagram', 'footer_social')}
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a 
                  href="https://www.linkedin.com/company/ınternationaltradeai" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-orange-500 transition-colors"
                  onClick={() => trackExternalLink('https://www.linkedin.com/company/ınternationaltradeai', 'LinkedIn', 'footer_social')}
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a 
                  href="https://www.youtube.com/shorts/g6MUnSki9I0" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-orange-500 transition-colors"
                  onClick={() => trackExternalLink('https://www.youtube.com/shorts/g6MUnSki9I0', 'YouTube', 'footer_social')}
                >
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-semibold mb-4 text-white">Company</h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="/about" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#careers" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Product */}
            <div>
              <h3 className="font-semibold mb-4 text-white">Product</h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="/how-it-works" className="hover:text-white transition-colors">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="/verified-leads" className="hover:text-white transition-colors">
                    Verified Leads
                  </a>
                </li>
                <li>
                  <a href="/advantages" className="hover:text-white transition-colors">
                    Advantages
                  </a>
                </li>
                <li>
                  <a href="/pricing" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="/faq" className="hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="font-semibold mb-4 text-white">Legal</h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="#terms" className="hover:text-white transition-colors">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#privacy" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">&copy; 2024 International Trade AI. All rights reserved.</p>

            {/* Language Toggle */}
            <div className="flex items-center space-x-2 mt-4 md:mt-0">
              <Globe className="w-4 h-4 text-gray-400" />
              <div className="flex items-center space-x-1 text-sm">
                <span className="text-orange-500 font-medium">EN</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
