import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'prompts.json');
    const data = fs.readFileSync(filePath, 'utf8');
    const prompts = JSON.parse(data);
    
    return NextResponse.json(prompts);
  } catch (error) {
    console.error('Failed to load prompts:', error);
    return NextResponse.json(
      { error: 'Failed to load system prompts.' },
      { status: 500 }
    );
  }
}
