"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { trackExternalLink } from "@/lib/analytics"
import { useLanguage } from "@/contexts/language-context"
import { LanguageSwitcher } from "@/components/language-switcher"

export function Header() {
  const { t, language } = useLanguage()

  // Helper function to get localized URLs
  const getLocalizedUrl = (path: string) => {
    if (language === 'tr') {
      const turkishUrls: { [key: string]: string } = {
        '/': '/tr',
        '/why-different': '/tr/neden-farkli',
        '/how-it-works': '/tr/nasil-calisir',
        '/about': '/tr/hakkimizda',
        '/pricing': '/tr/fiyatlandirma',
        '/use-cases': '/tr/kullanim-alanlari',
        '/faq': '/tr/sss',
        '/contact': '/tr/iletisim',
        '/chat': '/tr/sohbet',
        '/verified-leads': '/tr/dogrulanmis-musteriler',
        '/advantages': '/tr/avantajlar',
        '/b2b-data': '/tr/b2b-veri',
        '/demo': '/tr/demo'
      }
      return turkishUrls[path] || `/tr${path}`
    }
    return path
  }

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href={getLocalizedUrl("/")} className="flex items-center">
              <div className="relative flex items-center">
                <Image 
                  src="/logo.png" 
                  alt="ITAI Logo" 
                  width={100} 
                  height={32} 
                  className="h-8 w-auto" 
                  priority
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) {
                      fallback.style.display = 'block';
                    }
                  }}
                />
                <div 
                  className="hidden text-xl font-bold bg-gradient-to-r from-orange-500 to-blue-900 bg-clip-text text-transparent"
                  style={{ display: 'none' }}
                >
                  ITAI
                </div>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6">
            <a href={getLocalizedUrl("/why-different")} className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors whitespace-nowrap">
              {t("header.nav.whyDifferent")}
            </a>
            <a href={getLocalizedUrl("/how-it-works")} className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors whitespace-nowrap">
              {language === 'tr' ? 'NASIL ÇALIŞIR' : 'HOW IT WORKS'}
            </a>
            <a href={getLocalizedUrl("/about")} className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors whitespace-nowrap">
              {t("header.nav.about")}
            </a>
            <a href={getLocalizedUrl("/pricing")} className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors whitespace-nowrap">
              {t("header.nav.pricing")}
            </a>
            <a href={getLocalizedUrl("/use-cases")} className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors whitespace-nowrap">
              {t("header.nav.useCases")}
            </a>
            <a href={getLocalizedUrl("/faq")} className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors whitespace-nowrap">
              {t("header.nav.faq")}
            </a>
          </nav>

          {/* Right side - Language Switcher and CTA Buttons */}
          <div className="flex items-center space-x-2 lg:space-x-3">
            <LanguageSwitcher />
            <Link href={getLocalizedUrl("/chat")}>
              <Button size="sm" className="bg-gradient-to-r from-orange-500 to-blue-900 hover:from-orange-600 hover:to-blue-800 text-white shadow-lg text-xs lg:text-sm px-3 lg:px-4 py-2 whitespace-nowrap">
                {t("header.buttons.getStarted")}
              </Button>
            </Link>
            <a 
              href="https://main.d1sdaz41inqvnc.amplifyapp.com/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackExternalLink('https://main.d1sdaz41inqvnc.amplifyapp.com/', 'Sign In', 'header_signin')}
            >
              <Button size="sm" className="bg-gradient-to-r from-orange-500 to-blue-900 hover:from-orange-600 hover:to-blue-800 text-white shadow-lg text-xs lg:text-sm px-3 lg:px-4 py-2 whitespace-nowrap">
                {t("header.buttons.signIn")}
              </Button>
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
