"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, ArrowRight, Globe, Instagram, Linkedin, Youtube } from "lucide-react"
import Image from "next/image"
import { trackCTAClick, trackExternalLink } from "@/lib/analytics"
import { useLanguage } from "@/contexts/language-context"

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-white">
      {/* Final CTA Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Card className="border-0 shadow-2xl bg-white overflow-hidden">
            <CardContent className="p-12 lg:p-16">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-orange-100 rounded-full text-sm font-medium text-gray-700 mb-8">
                <Sparkles className="w-4 h-4 mr-2 text-orange-500" />
                {t("home.footer.cta.badge")}
              </div>

              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                {t("home.footer.cta.title")}
                <span className="bg-gradient-to-r from-orange-500 to-blue-900 bg-clip-text text-transparent">
                  {" "}
                  {t("home.footer.cta.titleAccent")}
                </span>
              </h2>

              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                {t("home.footer.cta.description")}
              </p>

              <a 
                href="/chat"
                onClick={() => trackCTAClick({
                  page: 'home',
                  placement: 'footer_cta',
                  button_text: 'Book a live demo',
                  destination: '/chat'
                })}
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-blue-900 hover:from-orange-600 hover:to-blue-800 text-white px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  {t("home.footer.cta.button")}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </a>

              <p className="text-sm text-gray-500 mt-4">{t("home.footer.cta.disclaimer")}</p>
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
                priority
              />
              <p className="text-gray-400 max-w-md mb-6">
                {t("home.footer.description")}
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
              <h3 className="font-semibold mb-4 text-white">{t("home.footer.sections.company")}</h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="/about" className="hover:text-white transition-colors">
                    {t("home.footer.links.about")}
                  </a>
                </li>
                <li>
                  <a href="/blog" className="hover:text-white transition-colors">
                    {t("home.footer.links.blog")}
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:text-white transition-colors">
                    {t("home.footer.links.contact")}
                  </a>
                </li>
              </ul>
            </div>

            {/* Product */}
            <div>
              <h3 className="font-semibold mb-4 text-white">{t("home.footer.sections.product")}</h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="/how-it-works" className="hover:text-white transition-colors">
                    {t("home.footer.links.howItWorks")}
                  </a>
                </li>
                <li>
                  <a href="/use-cases" className="hover:text-white transition-colors">
                    {t("home.footer.links.useCases")}
                  </a>
                </li>
                <li>
                  <a href="/pricing" className="hover:text-white transition-colors">
                    {t("home.footer.links.pricing")}
                  </a>
                </li>
                <li>
                  <a href="/faq" className="hover:text-white transition-colors">
                    {t("home.footer.links.faq")}
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="font-semibold mb-4 text-white">{t("home.footer.sections.legal")}</h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="#terms" className="hover:text-white transition-colors">
                    {t("home.footer.links.terms")}
                  </a>
                </li>
                <li>
                  <a href="#privacy" className="hover:text-white transition-colors">
                    {t("home.footer.links.privacy")}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">{t("home.footer.copyright")}</p>

            {/* Language Toggle */}
            <div className="flex items-center space-x-2 mt-4 md:mt-0">
              <Globe className="w-4 h-4 text-gray-400" />
              <div className="flex items-center space-x-1 text-sm">
                <span className="text-orange-500 font-medium">{t("common.language").toUpperCase()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
