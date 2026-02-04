// Supabase setup - optional, will use localStorage as fallback
let supabase = null;
export const useLocalStorage = !process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!useLocalStorage) {
  try {
    const { createClient } = require('@supabase/supabase-js');
    supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
  } catch (error) {
    console.log('Supabase setup skipped - using localStorage demo mode');
  }
}

export { supabase };
