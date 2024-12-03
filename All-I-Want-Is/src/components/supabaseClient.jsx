import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY;

// Create the client
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Export the client as the default export
export default supabase;
