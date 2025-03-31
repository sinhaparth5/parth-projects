import { createClient } from "@supabase/supabase-js";
// import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import type { Database } from './types/database';

export const supabase = createClient<Database>(
    // PUBLIC_SUPABASE_URL,
    // PUBLIC_SUPABASE_ANON_KEY
    import.meta.env.VITE_PUBLIC_SUPABASE_URL,
    import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY
)