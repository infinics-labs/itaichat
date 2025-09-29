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
          <div className="flex items-center space-x-6">
            <Link href="/" className="flex items-center">
              <div className="relative">
                <Image 
                  src="/logo.png" 
                  alt="ITAI Logo" 
                  width={120} 
                  height={40} 
                  className="h-10 w-auto" 
                  priority
                  unoptimized
                  onError={(e) => {
                    const target = e.currentTarget;
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) {
                      target.style.display = 'none';
                      fallback.style.display = 'block';
                    }
                  }}
                />
                <div 
                  className="hidden text-2xl font-bold bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent"
                  style={{ display: 'none' }}
                >
                  ITAI
                </div>
              </div>
            </Link>

            {/* Social Icons - Left aligned */}
            <div className="hidden lg:flex items-center space-x-3">
              <a 
                href="https://www.instagram.com/internationaltradeai" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-orange-500 transition-colors"
                onClick={() => trackExternalLink('https://www.instagram.com/internationaltradeai', 'Instagram', 'header_social')}
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="https://www.linkedin.com/company/ınternationaltradeai" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-orange-500 transition-colors"
                onClick={() => trackExternalLink('https://www.linkedin.com/company/ınternationaltradeai', 'LinkedIn', 'header_social')}
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href="https://www.youtube.com/shorts/g6MUnSki9I0" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-orange-500 transition-colors"
                onClick={() => trackExternalLink('https://www.youtube.com/shorts/g6MUnSki9I0', 'YouTube', 'header_social')}
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <a href="/why-different" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
              WHY WE ARE DIFFERENT
            </a>
            <a href="/about" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
              ABOUT US
            </a>
            <a href="/pricing" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
              PRICING
            </a>
            <a href="/advantages" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
              ADVANTAGES
            </a>
            <a href="/faq" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
              FAQ
            </a>
          </nav>

          {/* Right side - Sign In, Book a Demo */}
          <div className="flex items-center space-x-4">
            <a 
              href="https://main.d1sdaz41inqvnc.amplifyapp.com/companies/1/" 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={() => trackExternalLink('https://main.d1sdaz41inqvnc.amplifyapp.com/companies/1/', 'Sign In', 'header_auth')}
            >
              <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                Sign In
              </Button>
            </a>
            <Link 
              href="/demo"
              onClick={() => trackCTAClick({
                page: currentPage,
                placement: 'header',
                button_text: 'Book a Demo',
                destination: '/demo'
              })}
            >
              <Button className="bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white shadow-lg">
                Book a Demo
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
