import type { PageServerLoad } from "./auth/login/$types";
export const load: PageServerLoad = async ({ setHeaders }) => {
    setHeaders({
        'Cache-Control': 'private, max-age=0'
    });
    return {}
}