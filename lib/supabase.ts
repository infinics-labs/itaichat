import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// For client-side operations
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// For server-side operations with elevated privileges
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey)

// Database types
export interface ConversationRecord {
  id?: string
  uuid?: string
  session_id?: string
  created_at?: string
  product?: string
  target_country?: string
  gtip_code?: string
  sales_channels?: string[]
  website?: string
  contact_name?: string
  email?: string
  phone?: string
  keywords?: string[]
  competitors?: any[]
  customers?: any[]
  language?: string
  conversation_data?: any
}

export interface ContactSubmission {
  id?: string
  created_at?: string
  name: string
  email: string
  company: string
  product_category: string
  target_countries: string
  notes?: string
  ip_address?: string
  user_agent?: string
  referrer?: string
  status?: 'new' | 'waiting' | 'contacted' | 'demo_scheduled' | 'declined' | 'ignored'
  demo_scheduled_at?: string
  follow_up_notes?: string
  admin_notes?: string
}

export interface DemoRequest {
  id?: string
  uuid?: string
  name: string
  email: string
  company: string
  product_category: string
  target_countries: string
  notes?: string
  created_at?: string
  updated_at?: string
}
