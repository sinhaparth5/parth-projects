import { createClient } from '@supabase/supabase-js'
import type { HandleClientError } from '@sveltejs/kit'

// This function handles client-side errors
export const handleError: HandleClientError = ({ error, event }) => {
  console.error('Client error:', error)
  
  return {
    message: 'An unexpected error occurred',
    code: (error as any)?.code ?? 'UNKNOWN'
  }
}

// Initialize Supabase client
export function init() {
  const supabase = createClient(
    import.meta.env.VITE_PUBLIC_SUPABASE_URL,
    import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY
  )
  
  return {
    supabase
  }
}