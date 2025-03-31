import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { registerSchema } from '$lib/schema/auth';
import { ZodError } from 'zod';

export const actions: Actions = {
  default: async ({ request, locals }) => {
    const formData = Object.fromEntries(await request.formData());
   
    try {
      // Validate form data with Zod
      const { username, email, password } = registerSchema.parse(formData);
     
      // Get the site URL from environment variable or use a fallback
      const siteUrl = process.env.PUBLIC_SITE_URL || 'http://localhost:5173';
     
      const { error } = await locals.supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
            role: 'user' // Default role
          },
          emailRedirectTo: `${siteUrl}/auth/callback`
        }
      });
     
      if (error) {
        return fail(400, { error: error.message });
      }
     
      // Return success with redirect URL instead of throwing redirect
      return {
        success: true,
        redirectTo: '/verify-email'
      };
    } catch (err) {
      if (err instanceof Response) {
        throw err;
      }
     
      if (err instanceof ZodError) {
        // This is a Zod validation error
        return fail(400, {
          error: err.errors.map(e => e.message).join(', '),
          values: formData
        });
      }
     
      console.error('Registration error:', err);
      return fail(500, { error: 'An unexpected error occurred during registration' });
    }
  }
};