import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.internationaltradeai.com'
  const currentDate = new Date()

  // Define page mappings between English and Turkish
  const pageMapping = [
    { en: '/', tr: '/tr', priority: 1.0, changeFreq: 'weekly' as const },
    { en: '/about', tr: '/tr/hakkimizda', priority: 0.8, changeFreq: 'monthly' as const },
    { en: '/pricing', tr: '/tr/fiyatlandirma', priority: 0.9, changeFreq: 'weekly' as const },
    { en: '/use-cases', tr: '/tr/kullanim-alanlari', priority: 0.8, changeFreq: 'weekly' as const },
    { en: '/how-it-works', tr: '/tr/nasil-calisir', priority: 0.8, changeFreq: 'monthly' as const },
    { en: '/why-different', tr: '/tr/neden-farkli', priority: 0.7, changeFreq: 'monthly' as const },
    { en: '/faq', tr: '/tr/sss', priority: 0.6, changeFreq: 'monthly' as const },
    { en: '/contact', tr: '/tr/iletisim', priority: 0.7, changeFreq: 'monthly' as const },
    { en: '/chat', tr: '/tr/sohbet', priority: 0.8, changeFreq: 'weekly' as const },
    { en: '/demo', tr: '/tr/demo', priority: 0.8, changeFreq: 'weekly' as const },
    { en: '/blog', tr: '/tr/blog', priority: 0.6, changeFreq: 'weekly' as const },
  ]

  const sitemapEntries: MetadataRoute.Sitemap = []

  // Add all English and Turkish pages
  pageMapping.forEach(page => {
    // English page
    sitemapEntries.push({
      url: `${baseUrl}${page.en}`,
      lastModified: currentDate,
      changeFrequency: page.changeFreq,
      priority: page.priority,
      alternates: {
        languages: {
          en: `${baseUrl}${page.en}`,
          tr: `${baseUrl}${page.tr}`,
        }
      }
    })

    // Turkish page
    sitemapEntries.push({
      url: `${baseUrl}${page.tr}`,
      lastModified: currentDate,
      changeFrequency: page.changeFreq,
      priority: page.priority,
      alternates: {
        languages: {
          en: `${baseUrl}${page.en}`,
          tr: `${baseUrl}${page.tr}`,
        }
      }
    })
  })

  // Add Turkish-only page
  sitemapEntries.push({
    url: `${baseUrl}/tr/avantajlar`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.7,
    alternates: {
      languages: {
        tr: `${baseUrl}/tr/avantajlar`,
      }
    }
  })

  return sitemapEntries
}
