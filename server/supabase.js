const { createClient } = require('@supabase/supabase-js');

// dotenv is configured in index.js, but fallback load here just in case
if (!process.env.SUPABASE_URL) {
  require('dotenv').config();
}

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn('Supabase URL or Service Key is missing in server environment variables.');
}

const supabase = createClient(supabaseUrl || '', supabaseServiceKey || '', {
  auth: {
    persistSession: false
  }
});

module.exports = supabase;
