import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updateData } = body
    
    if (!id) {
      return NextResponse.json(
        { error: 'Conversation ID is required' },
        { status: 400 }
      )
    }

    // Validate required fields
    const requiredFields = ['contact_name', 'email']
    const missingFields = requiredFields.filter(field => !updateData[field])
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      )
    }

    // Prepare update data
    const conversationUpdate = {
      product: updateData.product || null,
      target_country: updateData.target_country || null,
      gtip_code: updateData.gtip_code || null,
      sales_channels: Array.isArray(updateData.sales_channels) ? updateData.sales_channels : [],
      website: updateData.website || null,
      contact_name: updateData.contact_name,
      email: updateData.email,
      phone: updateData.phone || null,
      keywords: Array.isArray(updateData.keywords) ? updateData.keywords : [],
      competitors: Array.isArray(updateData.competitors) ? updateData.competitors : [],
      customers: Array.isArray(updateData.customers) ? updateData.customers : [],
      language: updateData.language || 'en',
      conversation_data: {
        timestamp: new Date().toISOString(),
        lastModified: new Date().toISOString(),
        manualUpdate: true,
        summaryData: {
          email: updateData.email,
          phone: updateData.phone,
          product: updateData.product,
          website: updateData.website,
          gtipCode: updateData.gtip_code,
          keywords: Array.isArray(updateData.keywords) ? updateData.keywords : [],
          customers: Array.isArray(updateData.customers) ? updateData.customers : [],
          competitors: Array.isArray(updateData.competitors) ? updateData.competitors : [],
          contactName: updateData.contact_name,
          salesChannels: Array.isArray(updateData.sales_channels) ? updateData.sales_channels : [],
          targetCountry: updateData.target_country
        }
      }
    }

    console.log('Updating conversation with data:', conversationUpdate);

    // Try conversation_summaries first (as used in the list API)
    let data, error
    
    const { data: testData, error: testError } = await supabaseAdmin
      .from('conversation_summaries')
      .update(conversationUpdate)
      .eq('id', id)
      .select()

    if (testError) {
      // If that fails, try conversations table
      const { data: altData, error: altError } = await supabaseAdmin
        .from('conversations')
        .update(conversationUpdate)
        .eq('id', id)
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
        { error: 'Failed to update conversation', details: error.message },
        { status: 500 }
      )
    }

    if (!data || data.length === 0) {
      return NextResponse.json(
        { error: 'Conversation not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      conversation: data?.[0] || null,
      message: 'Conversation updated successfully'
    })

  } catch (error) {
    console.error('Error updating conversation:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
