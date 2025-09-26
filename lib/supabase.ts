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
