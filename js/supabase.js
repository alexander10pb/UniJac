import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'

const SUPABASE_URL = "https://qfibxdixndfwvcvmzfqv.supabase.co"
const SUPABASE_KEY = "sb_publishable_N1kcFVFRtLFw9Ywbjy6nLg_31X-KQOc"

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY)