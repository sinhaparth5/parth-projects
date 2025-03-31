// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
        interface Platform {
            env: Env
            cf: CfProperties
            ctx: ExecutionContext
        }
        interface Locals {
            supabase: import('@supabase/supabase-js').SupabaseClient;
            getSession(): Promise<import('@supabase/supabase-js').Session | null>;
        }
        interface PageData {
            session: import('@supabase/supabase-js').Session | null;
        }
    }
}

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PUBLIC_SUPABASE_URL: string;
            PUBLIC_SUPABASE_ANON_KEY: string;
        }
    }
}

export {};