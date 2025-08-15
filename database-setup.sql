-- Database setup for Persona Chat App
-- Run this in your Supabase SQL editor

-- Create the chat_sessions table
CREATE TABLE chat_sessions (
  id UUID PRIMARY KEY,
  prompt_name TEXT NOT NULL,
  history JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security (recommended for production)
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all operations (for demo purposes)
-- In production, you might want to restrict this based on user authentication
CREATE POLICY "Allow all operations" ON chat_sessions FOR ALL USING (true);

-- Create an index on prompt_name for better query performance
CREATE INDEX idx_chat_sessions_prompt_name ON chat_sessions(prompt_name);

-- Create an index on created_at for sorting
CREATE INDEX idx_chat_sessions_created_at ON chat_sessions(created_at);

-- Optional: Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create a trigger to automatically update updated_at
CREATE TRIGGER update_chat_sessions_updated_at 
    BEFORE UPDATE ON chat_sessions 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
