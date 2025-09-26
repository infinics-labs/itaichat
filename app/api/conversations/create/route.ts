import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const requiredFields = ['contact_name', 'email']
    const missingFields = requiredFields.filter(field => !body[field])
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      )
    }

    // Generate session ID
    const sessionId = `sess_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`
    
    // Prepare data for database
    const conversationRecord = {
      session_id: sessionId,
      product: body.product || null,
      target_country: body.target_country || null,
      gtip_code: body.gtip_code || null,
      sales_channels: Array.isArray(body.sales_channels) ? body.sales_channels : [],
      website: body.website || null,
      contact_name: body.contact_name,
      email: body.email,
      phone: body.phone || null,
      keywords: Array.isArray(body.keywords) ? body.keywords : [],
      competitors: Array.isArray(body.competitors) ? body.competitors : [],
      customers: Array.isArray(body.customers) ? body.customers : [],
      language: body.language || 'en',
      conversation_data: {
        timestamp: new Date().toISOString(),
        manualEntry: true,
        summaryData: {
          email: body.email,
          phone: body.phone,
          product: body.product,
          website: body.website,
          gtipCode: body.gtip_code,
          keywords: Array.isArray(body.keywords) ? body.keywords : [],
          customers: Array.isArray(body.customers) ? body.customers : [],
          competitors: Array.isArray(body.competitors) ? body.competitors : [],
          contactName: body.contact_name,
          salesChannels: Array.isArray(body.sales_channels) ? body.sales_channels : [],
          targetCountry: body.target_country
        }
      }
    }

    console.log('Creating conversation with data:', conversationRecord);

    // Use the correct table name (check which one exists)
    let data, error
    
    // Try conversation_summaries first (as used in the list API)
    const { data: testData, error: testError } = await supabaseAdmin
      .from('conversation_summaries')
      .insert([conversationRecord])
      .select()

    if (testError) {
      // If that fails, try conversations table
      const { data: altData, error: altError } = await supabaseAdmin
        .from('conversations')
        .insert([conversationRecord])
        .select()
      
      data = altData
      error = altError
    } else {
      data = testData
      error = testError
    }

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to create conversation', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      conversation: data?.[0] || null,
      message: 'Conversation created successfully'
    })

  } catch (error) {
    console.error('Error creating conversation:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
