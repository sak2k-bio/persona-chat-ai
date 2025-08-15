'use client';

import { useState, useEffect } from 'react';
import PersonaSelector from '@/components/PersonaSelector';
import ChatInterface from '@/components/ChatInterface';

interface Persona {
  name: string;
  role: string;
  description: string;
  content: string;
  avatar: string;
  color: string;
}

export default function Home() {
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null);
  const [chatId, setChatId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [customApiKey, setCustomApiKey] = useState<string>('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);

  useEffect(() => {
    async function fetchPersonas() {
      try {
        const res = await fetch('/api/prompts');
        const data = await res.json();
        setPersonas(data);
      } catch (error) {
        console.error('Failed to fetch personas:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPersonas();
  }, []);

  const startChat = async (persona: Persona) => {
    try {
      const res = await fetch('/api/chat/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt_name: persona.name }),
      });

      const data = await res.json();
      setChatId(data.chatId);
      setSelectedPersona(persona);
    } catch (error) {
      console.error('Failed to start chat:', error);
    }
  };

  const resetChat = () => {
    setChatId(null);
    setSelectedPersona(null);
  };

  const handleApiKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customApiKey.trim()) {
      setShowApiKeyInput(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (chatId && selectedPersona) {
    return (
      <ChatInterface
        chatId={chatId}
        persona={selectedPersona}
        onReset={resetChat}
        customApiKey={customApiKey}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-amber-600 mb-4 mt-10 gradient-text text-center">
            Choose Your AI Mentor
          </h1>
          <p className="text-white text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mt-5 mb-10 gradient-text text-center">
            Meet two legendary developers and educators from India! 
            Pick your coding mentor and dive into engaging conversations about programming, tech, and life!
          </p>
        </div>
        
        <PersonaSelector personas={personas} onSelectPersona={startChat} />
        
        {/* Custom API Key Section */}
        <div className="mt-16 max-w-2xl mx-auto">
          <div className="text-center mb-6">
            <button
              onClick={() => setShowApiKeyInput(!showApiKeyInput)}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105 transform"
            >
              {showApiKeyInput ? 'Hide' : 'Optional :: Would you like to use your own Gemini API key for testing?'}
            </button>
          </div>
          
          {showApiKeyInput && (
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <form onSubmit={handleApiKeySubmit} className="space-y-4">
                <div>
                  <label htmlFor="apiKey" className="block text-white text-sm font-medium mb-2">
                    Gemini API Key
                  </label>
                  <input
                    type="password"
                    id="apiKey"
                    value={customApiKey}
                    onChange={(e) => setCustomApiKey(e.target.value)}
                    placeholder="Enter your Gemini API key"
                    className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 border border-gray-600"
                  />
                </div>
                <div className="flex space-x-3">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
                  >
                    Save Key
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setCustomApiKey('');
                      setShowApiKeyInput(false);
                    }}
                    className="bg-gray-600 hover:bg-gray-500 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
                  >
                    Clear
                  </button>
                </div>
              </form>
              
              <div className="mt-4 p-4 bg-gray-700 rounded-lg">
                <p className="text-gray-300 text-sm text-center">
                  <strong>Note:</strong> Your API key will not be stored and will only be used while you are actively using the chat. 
                  It will be cleared when you refresh the page or start a new session.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
