import { invalidate } from '$app/navigation'
import { createClient } from '@supabase/supabase-js'
import type { LayoutLoad } from './$types'
import type { Database } from '../utils/types/database'

const publicSupabaseUrl = import.meta.env.VITE_PUBLIC_SUPABASE_URL;
const publicSupabaseAnonKey = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY;

export const load: LayoutLoad = async ({ fetch, data, depends }) => {
  depends('supabase:auth')

  const supabase = createClient<Database>(
    publicSupabaseUrl,
    publicSupabaseAnonKey,
    {
      global: {
        fetch: fetch
      },
      auth: {
        persistSession: true,
        autoRefreshToken: true
      }
    }
  )

  const { data: { session } } = await supabase.auth.getSession()

  return {
    supabase,
    session
  }
}