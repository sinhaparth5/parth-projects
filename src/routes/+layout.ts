import supabase from '../utils/supabase';
import type { LayoutLoad } from './$types'
import type { Database } from '../utils/types/database'

export const load: LayoutLoad = async ({ fetch, depends }) => {
  depends('supabase:auth')

  const { data: { session } } = await supabase.auth.getSession()

  return {
    supabase,
    session
  }
}