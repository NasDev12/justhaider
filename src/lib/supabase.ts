import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Please set up your Supabase environment variables by clicking the "Connect to Supabase" button in the top right corner.');
}

// Create a temporary client that won't make actual API calls
const tempUrl = 'https://placeholder-project.supabase.co';
const tempKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTYwMDAwMDAwMCwiZXhwIjoxNjAwMDAwMDAwfQ.K4KIjkf0VPfn5qFeI8M-pQOu8x8T0u7gAs7IRKIQgvY';

export const supabase = createClient(
  supabaseUrl || tempUrl,
  supabaseAnonKey || tempKey
);