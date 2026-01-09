const { createClient } = require('@supabase/supabase-js');
const config = require('./index');

// Initialize Supabase client with service key for server-side operations
const supabase = createClient(
    config.supabase.url,
    config.supabase.serviceKey,
    {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
    }
);

module.exports = supabase;
