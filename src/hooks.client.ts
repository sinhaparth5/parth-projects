import type { HandleClientError } from '@sveltejs/kit';
import supabase from './utils/supabase'; // Import the singleton

export const handleError: HandleClientError = ({ error, event }) => {
  console.error('Client error:', error);
  return {
    message: 'An unexpected error occurred',
    code: (error as any)?.code ?? 'UNKNOWN'
  };
};

// No need for init() if you just want the client available
export { supabase }; // Export it for use elsewhere if needed