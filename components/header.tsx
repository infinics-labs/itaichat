"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Instagram, Linkedin, Youtube } from "lucide-react"
import { trackCTAClick, trackExternalLink } from "@/lib/analytics"
import { usePathname } from "next/navigation"

export function Header() {
  const pathname = usePathname()
  
  // Get page name from pathname
  const getPageName = (path: string) => {
    if (path === '/') return 'home'
    return path.slice(1).split('/')[0] || 'home'
  }
  
  const currentPage = getPageName(pathname)
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Social Icons */}
          <div className="flex items-center space-x-3 lg:space-x-4">
            <Link href="/" className="flex items-center">
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
                  className="hidden text-xl font-bold bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent"
                  style={{ display: 'none' }}
                >
                  ITAI
                </div>
              </div>
            </Link>

            {/* Social Icons - Left aligned */}
            <div className="hidden xl:flex items-center space-x-2">
              <a 
                href="https://www.instagram.com/internationaltradeai" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-orange-500 transition-colors"
                onClick={() => trackExternalLink('https://www.instagram.com/internationaltradeai', 'Instagram', 'header_social')}
              >
                <Instagram className="w-3 h-3" />
              </a>
              <a 
                href="https://www.linkedin.com/company/ınternationaltradeai" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-orange-500 transition-colors"
                onClick={() => trackExternalLink('https://www.linkedin.com/company/ınternationaltradeai', 'LinkedIn', 'header_social')}
              >
                <Linkedin className="w-3 h-3" />
              </a>
              <a 
                href="https://www.youtube.com/shorts/g6MUnSki9I0" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-orange-500 transition-colors"
                onClick={() => trackExternalLink('https://www.youtube.com/shorts/g6MUnSki9I0', 'YouTube', 'header_social')}
              >
                <Youtube className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6">
            <a href="/why-different" className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors whitespace-nowrap">
              WHY WE&apos;RE DIFFERENT
            </a>
            <a href="/about" className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors whitespace-nowrap">
              ABOUT US
            </a>
            <a href="/pricing" className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors whitespace-nowrap">
              PRICING
            </a>
            <a href="/advantages" className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors whitespace-nowrap">
              USE CASES
            </a>
            <a href="/faq" className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors whitespace-nowrap">
              FAQ
            </a>
          </nav>

          {/* Right side - CTA Buttons */}
          <div className="flex items-center space-x-2 lg:space-x-3">
            <a 
              href="https://calendly.com/mehmet-odsdanismanlik/30min" 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={() => trackExternalLink('https://calendly.com/mehmet-odsdanismanlik/30min', 'Book a live demo', 'header_primary')}
            >
              <Button size="sm" className="bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white shadow-lg text-xs lg:text-sm px-3 lg:px-4 py-2 whitespace-nowrap">
                Book a live demo
              </Button>
            </a>
            <Link 
              href="/chat"
              onClick={() => trackCTAClick({
                page: currentPage,
                placement: 'header',
                button_text: 'Get export insights with the ITAI chatbot',
                destination: '/chat'
              })}
            >
              <Button size="sm" className="bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white shadow-lg text-xs lg:text-sm px-3 lg:px-4 py-2 whitespace-nowrap">
                Get export insights with the ITAI chatbot
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
