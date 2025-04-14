import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL ?? '',
  import.meta.env.VITE_SUPABASE_ANON_KEY ?? '',
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    },
    global: {
      headers: {
        'x-application-name': 'luxe-doors'
      }
    }
  }
);

// Helper functions
export const getCurrentUser = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
};

export const isAdmin = async () => {
  const user = await getCurrentUser();
  return user?.role === 'service_role';
};