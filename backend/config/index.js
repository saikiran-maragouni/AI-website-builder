const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',

  // API Keys
  gemini: {
    apiKey: process.env.GEMINI_API_KEY || '',
  },

  // Razorpay
  razorpay: {
    keyId: process.env.RAZORPAY_KEY_ID || '',
    keySecret: process.env.RAZORPAY_KEY_SECRET || '',
  },

  // CORS
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',

  // Supabase
  supabase: {
    url: process.env.SUPABASE_URL || '',
    serviceKey: process.env.SUPABASE_SERVICE_KEY || '',
  },
};

module.exports = config;
