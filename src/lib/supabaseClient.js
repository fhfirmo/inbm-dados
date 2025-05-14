// src/lib/supabaseClient.js
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) { // This check is still valid for the new client
  console.error('Missing Supabase environment variables!');
}

export const supabase = createClientComponentClient({ supabaseUrl, supabaseKey: supabaseAnonKey });