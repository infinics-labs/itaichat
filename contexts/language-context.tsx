"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"
import { type Language, translations, getNestedTranslation } from "@/lib/i18n"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [language, setLanguageState] = useState<Language>("en")

  useEffect(() => {
    // Detect language from URL path
    const currentLang = pathname.startsWith('/tr') ? 'tr' : 'en'
    setLanguageState(currentLang)
  }, [pathname])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    
    // URL mappings between Turkish and English
    const turkishToEnglish: { [key: string]: string } = {
      '/tr/nasil-calisir': '/how-it-works',
      '/tr/neden-farkli': '/why-different',
      '/tr/kullanim-alanlari': '/use-cases',
      '/tr/hakkimizda': '/about',
      '/tr/fiyatlandirma': '/pricing',
      '/tr/iletisim': '/contact',
      '/tr/sss': '/faq',
      '/tr/dogrulanmis-musteriler': '/verified-leads',
      '/tr/avantajlar': '/advantages',
      '/tr/b2b-veri': '/b2b-data',
      '/tr/sohbet': '/chat',
      '/tr/demo': '/demo',
      '/tr/blog': '/blog',
      '/tr': '/'
    }

    const englishToTurkish: { [key: string]: string } = {
      '/how-it-works': '/tr/nasil-calisir',
      '/why-different': '/tr/neden-farkli',
      '/use-cases': '/tr/kullanim-alanlari',
      '/about': '/tr/hakkimizda',
      '/pricing': '/tr/fiyatlandirma',
      '/contact': '/tr/iletisim',
      '/faq': '/tr/sss',
      '/verified-leads': '/tr/dogrulanmis-musteriler',
      '/advantages': '/tr/avantajlar',
      '/b2b-data': '/tr/b2b-veri',
      '/chat': '/tr/sohbet',
      '/demo': '/tr/demo',
      '/blog': '/tr/blog',
      '/': '/tr'
    }
    
    // Navigate to the appropriate locale URL
    if (lang === 'tr') {
      if (!pathname.startsWith('/tr')) {
        const newPath = englishToTurkish[pathname] || `/tr${pathname}`
        router.push(newPath)
      }
    } else {
      if (pathname.startsWith('/tr')) {
        const newPath = turkishToEnglish[pathname] || '/'
        router.push(newPath)
      }
    }
  }

  const t = (key: string): string => {
    return getNestedTranslation(translations[language], key)
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
