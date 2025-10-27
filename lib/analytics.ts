// Google Analytics Event Tracking Utilities

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

// Event tracking interface
interface AnalyticsEvent {
  action: string;
  category?: string;
  label?: string;
  value?: number;
  page?: string;
  placement?: string;
  button_text?: string;
}

// Track CTA click events
export const trackCTAClick = (eventData: {
  page: string;
  placement: string;
  button_text?: string;
  destination?: string;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'cta_click', {
      event_category: 'engagement',
      event_label: `${eventData.page}_${eventData.placement}`,
      page: eventData.page,
      placement: eventData.placement,
      button_text: eventData.button_text || '',
      destination: eventData.destination || '',
      custom_map: {
        custom_page: eventData.page,
        custom_placement: eventData.placement
      }
    });
  }
};

// Track general button clicks
export const trackButtonClick = (eventData: AnalyticsEvent) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventData.action, {
      event_category: eventData.category || 'interaction',
      event_label: eventData.label || '',
      value: eventData.value || 1,
      page: eventData.page || '',
      placement: eventData.placement || ''
    });
  }
};

// Track page views with enhanced parameters
export const trackPageView = (pageName: string, pageTitle?: string, pageType?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    const language = window.location.pathname.startsWith('/tr') ? 'tr' : 'en';
    const isHomePage = window.location.pathname === '/' || window.location.pathname === '/tr';
    
    window.gtag('config', 'G-75NPC5F8WZ', {
      page_title: pageTitle || pageName,
      page_location: window.location.href,
      page_referrer: document.referrer,
      custom_map: {
        custom_page_name: pageName,
        custom_page_type: pageType || (isHomePage ? 'homepage' : 'content'),
        custom_language: language,
        custom_page_category: getPageCategory(pageName)
      }
    });
    
    // Send enhanced page view event
    window.gtag('event', 'page_view', {
      page_title: pageTitle || pageName,
      page_location: window.location.href,
      page_type: pageType || 'content',
      user_language: language,
      page_category: getPageCategory(pageName),
      is_homepage: isHomePage
    });
  }
};

// Helper function to categorize pages for better analytics
const getPageCategory = (pageName: string): string => {
  if (pageName.includes('pricing') || pageName.includes('fiyatlandirma')) return 'pricing';
  if (pageName.includes('demo') || pageName.includes('chat') || pageName.includes('sohbet')) return 'interactive';
  if (pageName.includes('blog')) return 'content';
  if (pageName.includes('contact') || pageName.includes('iletisim')) return 'contact';
  if (pageName.includes('about') || pageName.includes('hakkimizda')) return 'about';
  if (pageName.includes('faq') || pageName.includes('sss')) return 'support';
  if (pageName.includes('use-cases') || pageName.includes('kullanim-alanlari')) return 'solutions';
  return 'general';
};

// Track form submissions (Key Event in GA4)
export const trackFormSubmission = (formName: string, page: string, formType?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    // Send as key event for GA4 conversion tracking
    window.gtag('event', 'form_submit', {
      event_category: 'form',
      event_label: formName,
      page: page,
      form_name: formName,
      form_type: formType || 'contact',
      value: 1, // Assign value for conversion tracking
      // Mark as key event for GA4
      send_to: 'G-75NPC5F8WZ'
    });
    
    // Also send as conversion event
    window.gtag('event', 'conversion', {
      send_to: 'G-75NPC5F8WZ/form_submit',
      event_category: 'conversion',
      event_label: formName,
      value: 1
    });
  }
};

// Track external link clicks
export const trackExternalLink = (url: string, linkText: string, placement: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'click', {
      event_category: 'external_link',
      event_label: linkText,
      transport_type: 'beacon',
      external_url: url,
      placement: placement
    });
  }
};

// Track video play events
export const trackVideoPlay = (eventData: {
  page: string;
  placement: string;
  video_title?: string;
  video_duration?: string;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'video_play', {
      event_category: 'engagement',
      event_label: `${eventData.page}_${eventData.placement}`,
      page: eventData.page,
      placement: eventData.placement,
      video_title: eventData.video_title || '',
      video_duration: eventData.video_duration || '',
      custom_map: {
        custom_page: eventData.page,
        custom_placement: eventData.placement
      }
    });
  }
};

// Track FAQ accordion toggle events
export const trackAccordionToggle = (eventData: {
  page: string;
  faq_question: string;
  action: 'open' | 'close';
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'accordion_toggle', {
      event_category: 'engagement',
      event_label: eventData.faq_question,
      page: eventData.page,
      faq_question: eventData.faq_question,
      accordion_action: eventData.action,
      custom_map: {
        custom_page: eventData.page,
        custom_faq_question: eventData.faq_question
      }
    });
  }
};

// Track demo requests and lead generation
export const trackDemoRequest = (eventData: {
  page: string;
  demo_type: 'live_demo' | 'chat_demo' | 'contact_form';
  user_language?: string;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'generate_lead', {
      event_category: 'conversion',
      event_label: eventData.demo_type,
      page: eventData.page,
      demo_type: eventData.demo_type,
      user_language: eventData.user_language || 'en',
      value: 1 // Assign value for conversion tracking
    });
  }
};

// Track pricing page interactions
export const trackPricingInteraction = (eventData: {
  page: string;
  plan_name: string;
  action: 'view_plan' | 'select_plan' | 'compare_plans';
  plan_price?: string;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'view_item', {
      event_category: 'pricing',
      event_label: eventData.plan_name,
      page: eventData.page,
      item_name: eventData.plan_name,
      item_category: 'subscription_plan',
      price: eventData.plan_price || '',
      action_type: eventData.action
    });
  }
};

// Track blog engagement
export const trackBlogEngagement = (eventData: {
  page: string;
  article_title: string;
  action: 'read_start' | 'read_complete' | 'share' | 'scroll_depth';
  scroll_percentage?: number;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'engagement', {
      event_category: 'content',
      event_label: eventData.article_title,
      page: eventData.page,
      article_title: eventData.article_title,
      engagement_type: eventData.action,
      scroll_percentage: eventData.scroll_percentage || 0
    });
  }
};
