import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    event.locals.supabase = createSupabaseServerClient({
        supabaseUrl: import.meta.env.VITE_PUBLIC_SUPABASE_URL,
        supabaseKey: import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY,
        event,
    });
    event.locals.getUser = async () => {
        const { data: { session } } = await event.locals.supabase.auth.getUser();
        return session;
    };
    return resolve(event, {
        filterSerializedResponseHeaders(name) {
            return name === 'content-range';
        },
    });
};
