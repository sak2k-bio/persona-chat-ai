import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Multiple Gemini API keys for fallback system
const GEMINI_API_KEYS = [
  process.env.GEMINI_API_KEY,
  process.env.GEMINI_API_KEY_2,
  process.env.GEMINI_API_KEY_3,
  process.env.GEMINI_API_KEY_4
].filter(Boolean); // Remove any undefined keys

const DEFAULT_GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-1.5-flash';

// Track which keys are currently overloaded
let overloadedKeys = new Set<string>();
let currentKeyIndex = 0;

function getGeminiUrl(model: string = DEFAULT_GEMINI_MODEL) {
	return `https://generativelanguage.googleapis.com/v1/models/${model}:generateContent`;
}

// Get the next available API key
function getNextAvailableKey(): string | null {
	// Try to find a key that's not overloaded
	for (let i = 0; i < GEMINI_API_KEYS.length; i++) {
		const keyIndex = (currentKeyIndex + i) % GEMINI_API_KEYS.length;
		const key = GEMINI_API_KEYS[keyIndex];
		if (key && !overloadedKeys.has(key)) {
			return key;
		}
	}
	
	// If all keys are overloaded, reset the overloaded status and try again
	if (overloadedKeys.size === GEMINI_API_KEYS.length) {
		console.log('All API keys are overloaded, resetting overload status');
		overloadedKeys.clear();
		return GEMINI_API_KEYS[0] || null;
	}
	
	return null;
}

// Mark a key as overloaded
function markKeyAsOverloaded(key: string) {
	overloadedKeys.add(key);
	console.log(`API key marked as overloaded. Total overloaded keys: ${overloadedKeys.size}`);
	
	// Move to next key
	currentKeyIndex = (currentKeyIndex + 1) % GEMINI_API_KEYS.length;
}

// Gemini helper functions
const MAX_PROMPT_TOKENS = 3000;

function estimateTokens(text: string) {
	return Math.ceil(text.length / 4);
}

function buildGeminiContents(history: any[]) {
	// Include system message as first user message, then filter out system role
	const systemMsg = history.find((m) => m.role === 'system');
	const userAssistantHistory = history.filter((msg) => msg.role !== 'system');
	
	let contents = [];
	
	// Add system message as first user message if it exists
	if (systemMsg) {
		contents.push({
			role: 'user',
			parts: [{ text: `System: ${systemMsg.content}\n\nUser: ${userAssistantHistory[0]?.content || ''}` }]
		});
		
		// Add remaining conversation history
		if (userAssistantHistory.length > 1) {
			contents.push(...userAssistantHistory.slice(1).map((msg) => ({
				role: msg.role === 'user' ? 'user' : 'model',
				parts: [{ text: msg.content }],
			})));
		}
	} else {
		// Fallback if no system message
		contents = userAssistantHistory.map((msg) => ({
			role: msg.role === 'user' ? 'user' : 'model',
			parts: [{ text: msg.content }],
		}));
	}
	
	return contents;
}

function trimConversationIfNeeded(history: any[]) {
	while (estimateTokens(JSON.stringify(history)) > MAX_PROMPT_TOKENS && history.length > 2) {
		history.splice(1, 2);
	}
}

async function sendPromptToGemini(history: any[]) {
	trimConversationIfNeeded(history);
	const contents = buildGeminiContents(history);

	const body = {
		contents,
		generationConfig: {
			temperature: 0.7,
			maxOutputTokens: 1000,
		},
	};

	// Try each available API key
	for (let attempt = 0; attempt < GEMINI_API_KEYS.length; attempt++) {
		const apiKey = getNextAvailableKey();
		if (!apiKey) {
			console.error('No available API keys');
			return getFallbackResponse(history);
		}

		try {
			console.log(`Attempting with API key ${attempt + 1}/${GEMINI_API_KEYS.length}`);
			
			const response = await fetch(`${getGeminiUrl()}?key=${apiKey}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(body),
			});

			if (response.ok) {
				const data = await response.json();
				const assistantReply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';
				
				// If successful, reset overload status for this key
				overloadedKeys.delete(apiKey);
				console.log(`Success with API key ${attempt + 1}`);
				
				return assistantReply;
			}

			// Handle specific error cases
			if (response.status === 503) {
				console.log(`API key ${attempt + 1} is overloaded (503), trying next key`);
				markKeyAsOverloaded(apiKey);
				continue; // Try next key
			}

			if (response.status === 429) {
				console.log(`API key ${attempt + 1} has rate limit exceeded (429), trying next key`);
				markKeyAsOverloaded(apiKey);
				continue; // Try next key
			}

			// For other errors, log and try next key
			const errText = await response.text().catch(() => '');
			console.log(`API key ${attempt + 1} failed with status ${response.status}: ${errText}`);
			
			if (response.status >= 500) {
				// Server errors, mark as overloaded temporarily
				markKeyAsOverloaded(apiKey);
				continue;
			}
			
			// For client errors (4xx), don't retry with other keys
			throw new Error(`Gemini API error: ${response.status} ${response.statusText} ${errText}`);

		} catch (error) {
			console.error(`Error with API key ${attempt + 1}:`, error);
			
			// If it's a network error, try next key
			if (error instanceof Error && error.message.includes('fetch')) {
				continue;
			}
			
			// For other errors, don't retry
			break;
		}
	}

	// If all keys failed, return fallback response
	console.log('All API keys failed, using fallback response');
	return getFallbackResponse(history);
}

// Fallback response when all Gemini API keys are unavailable
function getFallbackResponse(history: any[]) {
	const systemMsg = history.find((m) => m.role === 'system');
	const personaName = systemMsg?.content.includes('Hitesh Choudhary') ? 'Hitesh' : 'Piyush';
	
	if (personaName === 'Hitesh') {
		return `Haan ji, saare Gemini API keys busy hain abhi. Chai piyenge aur thoda wait karenge? 😊\n\nMeanwhile, aap apne question ko aur detail mein explain kar sakte hain. Main ready hun help karne ke liye!`;
	} else {
		return `Hey everyone! All Gemini API keys are overloaded right now. Let's chill and wait a bit! 😊\n\nMeanwhile, you can explain your question in more detail. I'm ready to help once the APIs are back!`;
	}
}

export async function POST(
	request: NextRequest,
	{ params }: { params: Promise<{ chat_id: string }> }
) {
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

		// Check if we have any Gemini API keys
		if (GEMINI_API_KEYS.length === 0) {
			console.error('No Gemini API keys configured');
			return NextResponse.json(
				{ error: "AI service not configured. Please check environment variables." },
				{ status: 500 }
			);
		}

		// Create Supabase client inside the function
		const supabase = createClient(supabaseUrl, supabaseKey);

		const { chat_id } = await params;
		const { userMessage } = await request.json();

		const { data: sessionData, error: fetchError } = await supabase
			.from('chat_sessions')
			.select('history')
			.eq('id', chat_id)
			.single();

		if (fetchError) {
			return NextResponse.json({ error: 'Chat session not found.' }, { status: 404 });
		}

		const conversationHistory = sessionData.history;
		conversationHistory.push({ role: 'user', content: userMessage });

		const assistantReply = await sendPromptToGemini(conversationHistory);

		if (!assistantReply) {
			return NextResponse.json({ error: 'Failed to get a response from Gemini.' }, { status: 500 });
		}

		conversationHistory.push({ role: 'assistant', content: assistantReply });

		const { error: updateError } = await supabase
			.from('chat_sessions')
			.update({ history: conversationHistory })
			.eq('id', chat_id);

		if (updateError) {
			throw updateError;
		}

		return NextResponse.json({ assistantReply });
	} catch (error: any) {
		console.error('API Error:', error.message);
		return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
	}
}
