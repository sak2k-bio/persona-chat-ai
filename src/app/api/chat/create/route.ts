import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    // Validate environment variables
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      console.error('Missing Supabase environment variables:', {
        SUPABASE_URL: supabaseUrl ? 'Set' : 'Missing',
        SUPABASE_SERVICE_ROLE_KEY: supabaseKey ? 'Set' : 'Missing'
      });
      return NextResponse.json(
        { error: "Database configuration error. Please check environment variables." },
        { status: 500 }
      );
    }

    // Create Supabase client inside the function
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    const { prompt_name } = await request.json();
    
    const filePath = path.join(process.cwd(), 'prompts.json');
    const data = fs.readFileSync(filePath, 'utf8');
    const systemPrompts = JSON.parse(data);
    const selectedPrompt = systemPrompts.find((p: any) => p.name === prompt_name);

    if (!selectedPrompt) {
      return NextResponse.json(
        { error: "Prompt not found" },
        { status: 404 }
      );
    }

    const newHistory = [{ role: "system", content: selectedPrompt.content }];
    const chatId = uuidv4();

    const { data: newSession, error } = await supabase
      .from('chat_sessions')
      .insert([{ id: chatId, prompt_name, history: newHistory }]);

    if (error) throw error;

    return NextResponse.json({ chatId, prompt_name }, { status: 201 });
    
  } catch (error: any) {
    console.error('API Error:', error.message);
    return NextResponse.json(
      { error: "Failed to create chat session." },
      { status: 500 }
    );
  }
}
