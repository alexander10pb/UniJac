const SUPABASE_URL = "https://qfibxdixndfwvcvmzfqv.supabase.co";
const SUPABASE_KEY = "sb_publishable_N1kcFVFRtLFw9Ywbjy6nLg_31X-KQOc";

window.supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);
