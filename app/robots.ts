import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/contact-submissions/',
          '/_next/',
          '/fonts/',
          '*.json',
          '*.xml',
          '/advantages', // Redirect page, no need to index
          '/tr/pricing', // Duplicate Turkish pricing page
          '/tr/use-cases' // Duplicate Turkish use-cases page
        ],
      },
      {
        userAgent: 'GPTBot',
        disallow: '/',
      },
      {
        userAgent: 'Google-Extended',
        disallow: '/',
      },
      {
        userAgent: 'CCBot',
        disallow: '/',
      },
      {
        userAgent: 'anthropic-ai',
        disallow: '/',
      },
      {
        userAgent: 'Claude-Web',
        disallow: '/',
      }
    ],
    sitemap: 'https://www.internationaltradeai.com/sitemap.xml',
    host: 'https://www.internationaltradeai.com'
  }
}
