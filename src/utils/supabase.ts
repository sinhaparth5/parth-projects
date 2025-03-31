import { createClient } from "@supabase/supabase-js";
// import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import type { Database } from './types/database';

const supabase = createClient<Database>(
    // PUBLIC_SUPABASE_URL,
    // PUBLIC_SUPABASE_ANON_KEY
    import.meta.env.VITE_PUBLIC_SUPABASE_URL,
    import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY,
    {
        auth: {
            persistSession: false
        }
    }
)

supabase.auth.onAuthStateChange((event, session) => {
    console.log('Auth event:', event, session); // For debugging
});


export default supabase;