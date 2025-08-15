import { NextResponse } from 'next/server';

export async function GET() {
  // Check environment variables (without exposing sensitive values)
  const envCheck = {
    SUPABASE_URL: process.env.SUPABASE_URL ? 'Set' : 'Missing',
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY ? 'Set' : 'Missing',
    GEMINI_API_KEY: process.env.GEMINI_API_KEY ? 'Set' : 'Missing',
    GEMINI_MODEL: process.env.GEMINI_MODEL || 'gemini-1.5-flash (default)',
    NODE_ENV: process.env.NODE_ENV || 'development'
  };

  // Check if Supabase URL is valid
  let supabaseUrlValid = false;
  if (process.env.SUPABASE_URL) {
    try {
      const url = new URL(process.env.SUPABASE_URL);
      supabaseUrlValid = url.hostname.includes('supabase.co');
    } catch (error) {
      supabaseUrlValid = false;
    }
  }

  return NextResponse.json({
    message: 'Environment variables check',
    environment: envCheck,
    supabaseUrlValid,
    timestamp: new Date().toISOString()
  });
}
