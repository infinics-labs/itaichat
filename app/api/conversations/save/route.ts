import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { analyzeConversationMessages } from '@/lib/conversation-analyzer'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { chatMessages, language = 'en' } = body

    if (!chatMessages || !Array.isArray(chatMessages)) {
      return NextResponse.json(
        { error: 'Chat messages are required' },
        { status: 400 }
      )
    }

    // Analyze the conversation to extract data
    analyzeConversationMessages(chatMessages)
    
    // Check if conversation has summary message (demo phase completed)
    const hasSummaryMessage = chatMessages.some(message => {
      if (message.type === 'message' && message.role === 'assistant') {
        let content = '';
        if (Array.isArray(message.content)) {
          content = message.content.map((c: any) => c.text || '').join(' ').trim();
        } else if (typeof message.content === 'string') {
          content = message.content;
        }
        
        const contentLower = content.toLowerCase();
        const summaryIndicators = [
          'ürün:', 'product:', 'hedef ülke:', 'target country:', 'gtip kod', 'gtip code',
          'satış kanal', 'sales channel', 'website:', 'web site:', 'isim:', 'name:',
          'e-posta:', 'email:', 'telefon:', 'phone:', 'anahtar kelime', 'keyword',
          'rakip', 'competitor', 'müşteri', 'customer'
        ];
        
        const indicatorCount = summaryIndicators.filter(indicator => contentLower.includes(indicator)).length;
        return indicatorCount >= 6;
      }
      return false;
    });

    if (!hasSummaryMessage) {
      return NextResponse.json(
        { error: 'Summary message not found - conversation not complete yet' },
        { status: 400 }
      )
    }

    // Extract data from conversation for database
    const extractedData = extractConversationDataAdvanced(chatMessages)
    
    // Generate session ID from timestamp or use existing
    const sessionId = generateSessionId()
    
    // Prepare data for database - matching your existing table structure
    const conversationRecord = {
      session_id: sessionId,
      product: extractedData.product || null,
      target_country: extractedData.country || null,
      gtip_code: extractedData.gtipCode || null,
      sales_channels: extractedData.salesChannels || [],
      website: extractedData.website || null,
      contact_name: extractedData.name || null,
      email: extractedData.email || null,
      phone: extractedData.phone || null,
      keywords: extractedData.keywords || [],
      competitors: extractedData.competitors || [],
      customers: extractedData.customers || [],
      language: language,
      conversation_data: {
        timestamp: new Date().toISOString(),
        summaryData: {
          email: extractedData.email,
          phone: extractedData.phone,
          product: extractedData.product,
          website: extractedData.website,
          gtipCode: extractedData.gtipCode,
          keywords: extractedData.keywords,
          customers: extractedData.customers,
          competitors: extractedData.competitors,
          contactName: extractedData.name,
          salesChannels: extractedData.salesChannels,
          targetCountry: extractedData.country
        },
        extractedFromSummary: true,
        messages: chatMessages
      }
    }

    // Save to Supabase
    const { data, error } = await supabaseAdmin
      .from('conversation_summaries')
      .insert([conversationRecord])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to save conversation' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      conversationId: data[0]?.id,
      message: 'Conversation saved successfully'
    })

  } catch (error) {
    console.error('Error saving conversation:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Helper function to extract more detailed data from conversation
function extractConversationDataAdvanced(messages: any[]) {
  const data: any = {
    product: null,
    country: null,
    gtipCode: null,
    salesChannels: [],
    website: null,
    name: null,
    email: null,
    phone: null,
    keywords: [],
    competitors: [],
    customers: []
  }

  // First, look for the summary message to extract structured data
  const summaryMessage = messages.find(message => {
    if (message.type === 'message' && message.role === 'assistant') {
      let content = '';
      if (Array.isArray(message.content)) {
        content = message.content.map((c: any) => c.text || '').join(' ').trim();
      } else if (typeof message.content === 'string') {
        content = message.content;
      }
      
      const contentLower = content.toLowerCase();
      const summaryIndicators = [
        'here is a summary', 'summary of the information', 'information collected',
        '- **product:**', '- **target country:**', '- **gtip code:**'
      ];
      
      return summaryIndicators.some(indicator => contentLower.includes(indicator));
    }
    return false;
  });

  if (summaryMessage) {
    let summaryContent = '';
    if (Array.isArray(summaryMessage.content)) {
      summaryContent = summaryMessage.content.map((c: any) => c.text || '').join(' ').trim();
    } else if (typeof summaryMessage.content === 'string') {
      summaryContent = summaryMessage.content;
    }

    // Extract from structured summary format
    const productMatch = summaryContent.match(/\*\*Product:\*\*\s*([^\n\*]+)/i);
    if (productMatch) data.product = productMatch[1].trim();

    const countryMatch = summaryContent.match(/\*\*Target Country:\*\*\s*([^\n\*]+)/i);
    if (countryMatch) data.country = countryMatch[1].trim();

    const gtipMatch = summaryContent.match(/\*\*GTIP Code:\*\*\s*([^\n\*]+)/i);
    if (gtipMatch) data.gtipCode = gtipMatch[1].trim();

    const channelsMatch = summaryContent.match(/\*\*Sales Channels:\*\*\s*([^\n\*]+)/i);
    if (channelsMatch) {
      const channels = channelsMatch[1].trim();
      if (channels.toLowerCase().includes('wholesaler') || channels.toLowerCase().includes('all')) {
        data.salesChannels = ['Toptancılar', 'Distribütörler', 'İthalatçılar'];
      }
    }

    const websiteMatch = summaryContent.match(/\*\*Website:\*\*\s*([^\n\*\s]+)/i);
    if (websiteMatch) data.website = websiteMatch[1].trim();
  }

  // Process messages sequentially to extract conversation flow data
  for (let i = 0; i < messages.length; i++) {
    const message = messages[i];
    const nextMessage = i < messages.length - 1 ? messages[i + 1] : null;
    
    if (message.type === 'message') {
      let content = '';
      
      if (Array.isArray(message.content)) {
        content = message.content.map((c: any) => c.text || '').join(' ').trim();
      } else if (typeof message.content === 'string') {
        content = message.content;
      }

      const contentLower = content.toLowerCase();

      // Extract from user responses following assistant questions
      if (message.role === 'user' && nextMessage) {
        // nextContent variable removed as it was unused

        // Look at previous assistant message to understand context
        const prevMessage = i > 0 ? messages[i - 1] : null;
        let prevContent = '';
        if (prevMessage && Array.isArray(prevMessage.content)) {
          prevContent = prevMessage.content.map((c: any) => c.text || '').join(' ').trim();
        } else if (prevMessage && typeof prevMessage.content === 'string') {
          prevContent = prevMessage.content;
        }

        const prevLower = prevContent.toLowerCase();

        // Extract product (if assistant asks about product and user responds)
        if (!data.product && (prevLower.includes('which product') || prevLower.includes('hangi ürün'))) {
          data.product = content.charAt(0).toUpperCase() + content.slice(1);
        }

        // Extract target country
        if (!data.country && (prevLower.includes('which country') || prevLower.includes('hangi ülke'))) {
          const countryMap: Record<string, string> = {
            'italy': 'İtalya',
            'italya': 'İtalya',
            'germany': 'Almanya', 
            'almanya': 'Almanya',
            'france': 'Fransa',
            'fransa': 'Fransa',
            'usa': 'Amerika',
            'america': 'Amerika',
            'japan': 'Japonya'
          };
          
          Object.entries(countryMap).forEach(([key, value]) => {
            if (contentLower.includes(key)) {
              data.country = value;
            }
          });
        }

        // Extract GTIP code confirmation
        if (!data.gtipCode && prevLower.includes('gtip') && (contentLower.includes('yes') || contentLower.includes('evet'))) {
          const gtipMatch = prevContent.match(/\b\d{4}\.?\d{2}\b/);
          if (gtipMatch) {
            data.gtipCode = gtipMatch[0];
          }
        }

        // Extract sales channels
        if (data.salesChannels.length === 0 && (prevLower.includes('sales channel') || prevLower.includes('satış kanal'))) {
          if (contentLower.includes('all') || contentLower.includes('hepsi')) {
            data.salesChannels = ['Toptancılar', 'Distribütörler', 'İthalatçılar'];
          } else {
            const salesChannelMap: Record<string, string> = {
              'wholesaler': 'Toptancılar',
              'toptancı': 'Toptancılar',
              'distributor': 'Distribütörler', 
              'distribütör': 'Distribütörler',
              'importer': 'İthalatçılar',
              'retailer': 'Perakendeciler'
            };
            
            Object.entries(salesChannelMap).forEach(([key, value]) => {
              if (contentLower.includes(key) && !data.salesChannels.includes(value)) {
                data.salesChannels.push(value);
              }
            });
          }
        }

        // Extract website
        if (!data.website && prevLower.includes('website')) {
          let website = content.trim();
          if (!website.startsWith('http') && !website.startsWith('www.')) {
            website = 'www.' + website;
          }
          data.website = website;
        }

        // Extract name
        if (!data.name && (prevLower.includes('your name') || prevLower.includes('isminiz'))) {
          data.name = content.trim();
        }

        // Extract email
        if (!data.email && (prevLower.includes('email') || prevLower.includes('e-posta'))) {
          const emailMatch = content.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
          if (emailMatch) {
            data.email = emailMatch[0];
          }
        }

        // Extract phone
        if (!data.phone && (prevLower.includes('phone') || prevLower.includes('telefon'))) {
          const phoneMatch = content.match(/[\+]?[0-9\s\-\(\)]{7,15}/);
          if (phoneMatch) {
            data.phone = phoneMatch[0].trim();
          }
        }

        // Extract keywords confirmation
        if (data.keywords.length === 0 && (prevLower.includes('keywords') || prevLower.includes('kelime')) && 
            (contentLower.includes('yes') || contentLower.includes('evet') || contentLower.includes('describes'))) {
          // Extract keywords from previous assistant message
          const keywordMatches = prevContent.match(/\d+\.\s*([^\n\r]+)/g);
          if (keywordMatches) {
            keywordMatches.forEach(match => {
              const keyword = match.replace(/\d+\.\s*/, '').trim();
              if (keyword && !data.keywords.includes(keyword)) {
                data.keywords.push(keyword);
              }
            });
          }
        }
      }

      // Extract competitors and customers from assistant messages
      if (message.role === 'assistant') {
        // Clean competitor extraction - look for specific patterns
        if ((contentLower.includes('competitor') || contentLower.includes('rakip')) && 
            !contentLower.includes('calendly') && !contentLower.includes('meeting')) {
          
          // Pattern: "CompanyName (website)" 
          const competitorMatches = content.match(/([A-Za-z\s&\.]+)\s*\(([^)]+)\)/g);
          if (competitorMatches) {
            competitorMatches.forEach(match => {
              const parts = match.match(/([A-Za-z\s&\.]+)\s*\(([^)]+)\)/);
              if (parts) {
                const name = parts[1].trim();
                let website = parts[2].trim();
                
                // Clean up website format
                if (website.includes('boggi.com') || website.includes('italianmoda.com')) {
                  website = website.replace(/.*?(boggi\.com|italianmoda\.com).*/, '$1');
                  if (!website.startsWith('http')) {
                    website = 'https://www.' + website;
                  }
                  
                  // Only add if name is clean (not long text)
                  if (name.length < 50 && !data.competitors.find((c: any) => c.website.includes(website))) {
                    data.competitors.push({
                      name: name,
                      website: website,
                      type: 'foreign',
                      source: 'ai-suggestion'
                    });
                  }
                }
              }
            });
          }
        }

        // Clean customer extraction - similar pattern
        if ((contentLower.includes('customer') || contentLower.includes('müşteri') || contentLower.includes('interested')) &&
            !contentLower.includes('calendly') && !contentLower.includes('meeting')) {
          
          const customerMatches = content.match(/([A-Za-z\s&\.]+)\s*\(([^)]+)\)/g);
          if (customerMatches) {
            customerMatches.forEach(match => {
              const parts = match.match(/([A-Za-z\s&\.]+)\s*\(([^)]+)\)/);
              if (parts) {
                const name = parts[1].trim();
                let website = parts[2].trim();
                
                // Clean up website and exclude non-business sites
                if (!website.includes('calendly') && website.includes('.com')) {
                  website = website.replace(/.*?([\w-]+\.com).*/, '$1');
                  if (!website.startsWith('http')) {
                    website = 'https://www.' + website;
                  }
                  
                  // Only add if name is clean and not duplicate
                  if (name.length < 50 && !data.customers.find((c: any) => c.website.includes(website))) {
                    data.customers.push({
                      name: name,
                      website: website,
                      source: 'ai-suggestion',
                      description: 'Potential customer identified from conversation'
                    });
                  }
                }
              }
            });
          }
        }
      }
    }
  }

  // Clean up duplicates and invalid entries
  data.competitors = data.competitors.filter((comp: any, index: number, array: any[]) => 
    comp.name && comp.website && 
    comp.name.length < 50 && 
    !comp.website.includes('calendly') &&
    array.findIndex((c: any) => c.website === comp.website) === index
  );

  data.customers = data.customers.filter((cust: any, index: number, array: any[]) => 
    cust.name && cust.website && 
    cust.name.length < 50 && 
    !cust.website.includes('calendly') &&
    array.findIndex((c: any) => c.website === cust.website) === index
  );

  return data
}


// Helper function to generate session ID
function generateSessionId(): string {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 8)
  return `sess_${timestamp}_${random}`
}
