import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin, type ContactSubmission } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const { name, email, company, productCategory, targetCountries, notes } = body
    
    if (!name || !email || !company || !productCategory || !targetCountries) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Get client information
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
               request.headers.get('x-real-ip') || 
               'unknown'
    
    const userAgent = request.headers.get('user-agent') || 'unknown'
    const referrer = request.headers.get('referer') || request.headers.get('referrer') || undefined

    // Prepare data for database
    const contactData: Omit<ContactSubmission, 'id' | 'created_at'> = {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      company: company.trim(),
      product_category: productCategory.trim(),
      target_countries: targetCountries.trim(),
      notes: notes?.trim() || undefined,
      ip_address: ip,
      user_agent: userAgent,
      referrer: referrer,
      status: 'new'
    }

    // Insert into database
    const { data, error } = await supabaseAdmin
      .from('contact_submissions')
      .insert([contactData])
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to save contact information' },
        { status: 500 }
      )
    }

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Contact information saved successfully',
      id: data.id
    })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Handle OPTIONS request for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
