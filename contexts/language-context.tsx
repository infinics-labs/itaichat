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
    
    // Navigate to the appropriate locale URL
    if (lang === 'tr') {
      if (!pathname.startsWith('/tr')) {
        const newPath = pathname === '/' ? '/tr' : `/tr${pathname}`
        router.push(newPath)
      }
    } else {
      if (pathname.startsWith('/tr')) {
        const newPath = pathname.replace('/tr', '') || '/'
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
