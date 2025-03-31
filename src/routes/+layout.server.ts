// src/routes/+layout.server.ts
export const load = async ({ locals }) => {
  const { data: { user } } = await locals.supabase.auth.getUser();
  
  return {
    user
  };
};