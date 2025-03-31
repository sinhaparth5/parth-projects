import { createSupabaseServerClient } from "@supabase/auth-helpers-sveltekit";
import type { Handle } from "@sveltejs/kit";

const publicSupabaseUrl = import.meta.env.VITE_PUBLIC_SUPABASE_URL;
const publicSupabaseAnonKey = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY;

export const handle: Handle = async ({ event, resolve }) => {
    event.locals.supabase = createSupabaseServerClient({
        supabaseUrl: publicSupabaseUrl,
        supabaseKey: publicSupabaseAnonKey,
        event,
    })

    event.locals.getSession = async () => {
        const {
            data: { session },
        } = await event.locals.supabase.auth.getSession()
        return session
    }

    return resolve(event, {
        filterSerializedResponseHeaders(name) {
            return name === 'content-range'
        },
    })
}