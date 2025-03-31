import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { loginSchema } from '$lib/schema/auth';
import { ZodError } from 'zod';

export const actions: Actions = {
  default: async ({ request, locals, cookies }) => {
    const formData = Object.fromEntries(await request.formData());
    
    try {
      const { email, password } = loginSchema.parse(formData);
      const { data, error } = await locals.supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        return fail(400, { error: error.message });
      }
      const { data: {session} } = await locals.supabase.auth.getSession();
      // Return a success status with a redirect URL
      return {
        success: true,
        redirectTo: '/',
        session
      };
      
    } catch (err) {
      if (err instanceof ZodError) {
        // This is a Zod validation error
        return fail(400, {
          error: err.errors.map(e => e.message).join(', '),
          values: formData
        });
      }
      
      console.error('Login error:', err);
      return fail(500, { error: 'An unexpected error occurred during login' });
    }
  }
};