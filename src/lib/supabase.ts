import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const isValidConfig = supabaseUrl && supabaseAnonKey && 
  !supabaseUrl.includes('your-supabase-url') && 
  !supabaseAnonKey.includes('your-anon-key');

if (!isValidConfig) {
  console.warn('Supabase not configured. Please add your credentials to .env.local');
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);

export const isSupabaseConfigured = isValidConfig;
