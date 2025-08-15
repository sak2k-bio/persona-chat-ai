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
      </div>
    </div>
  );
}
