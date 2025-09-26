import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json(
        { error: 'Conversation ID is required' },
        { status: 400 }
      )
    }

    // Try conversation_summaries first (as used in the list API)
    let data, error
    
    const { data: testData, error: testError } = await supabaseAdmin
      .from('conversation_summaries')
      .delete()
      .eq('id', id)
      .select()

    if (testError) {
      // If that fails, try conversations table
      const { data: altData, error: altError } = await supabaseAdmin
        .from('conversations')
        .delete()
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
        { error: 'Failed to delete conversation', details: error.message },
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
      message: 'Conversation deleted successfully'
    })

  } catch (error) {
    console.error('Error deleting conversation:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
