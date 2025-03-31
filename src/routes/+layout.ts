import { invalidate } from '$app/navigation';
import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ fetch, data, depends }) => {
  depends('supabase:auth');

  const supabase = createSupabaseLoadClient({
    supabaseUrl: import.meta.env.VITE_PUBLIC_SUPABASE_URL,
    supabaseKey: import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY,
    event: { fetch },
    serverSession: null, // Don't use server session
    options: {
      auth: {
        onAuthStateChange: () => {
          invalidate('supabase:auth');
        }
      }
    }
  });

  // Get user instead of session
  const { data: { user } } = await supabase.auth.getUser();
  
  return { 
    supabase, 
    user: user || data.user // Fallback to server user if client-side is null
  };
};
