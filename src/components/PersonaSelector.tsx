'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Persona {
  name: string;
  role: string;
  description: string;
  content: string;
  avatar: string;
  color: string;
}

interface PersonaSelectorProps {
  personas: Persona[];
  onSelectPersona: (persona: Persona) => void;
}

export default function PersonaSelector({ personas, onSelectPersona }: PersonaSelectorProps) {
  const [hoveredPersona, setHoveredPersona] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
      {personas.map((persona) => (
        <div
          key={persona.name}
          className={`relative bg-gray-800 rounded-2xl p-8 transition-all duration-500 ease-out transform cursor-pointer ${
            hoveredPersona === persona.name 
              ? 'scale-105 rotate-y-2 shadow-2xl ring-2 ring-amber-500/50' 
              : 'scale-100 rotate-y-0 shadow-lg'
          } hover:scale-105 hover:rotate-y-2 hover:shadow-2xl hover:ring-2 hover:ring-amber-500/50`}
          style={{
            transformStyle: 'preserve-3d',
            perspective: '1000px',
            transform: hoveredPersona === persona.name 
              ? 'perspective(1000px) rotateY(2deg) scale(1.05)' 
              : 'perspective(1000px) rotateY(0deg) scale(1)'
          }}
          onMouseEnter={() => setHoveredPersona(persona.name)}
          onMouseLeave={() => setHoveredPersona(null)}
          onClick={() => onSelectPersona(persona)}
        >
          {/* 3D Card Background with Gradient */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 opacity-100 transition-opacity duration-500"></div>
          
          {/* Content Container with 3D positioning */}
          <div className="relative z-10" style={{ transform: 'translateZ(20px)' }}>
            {/* Avatar Section */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-2xl transition-all duration-500 hover:scale-110">
                  <Image
                    src={persona.avatar}
                    alt={`${persona.name} avatar`}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
                {/* Decorative icon overlay with 3D effect */}
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-125 hover:bg-amber-400">
                  {persona.name === 'Hitesh Choudhary' ? (
                    // Chai cup icon for Hitesh
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM8 12a2 2 0 114 0 2 2 0 01-4 0z"/>
                    </svg>
                  ) : (
                    // Rocket icon for Piyush
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2L3 7v11c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V7l-7-5z"/>
                    </svg>
                  )}
                </div>
              </div>
            </div>

            {/* Name and Role with 3D text effect */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2 transition-all duration-300 hover:text-amber-400 drop-shadow-lg">
                {persona.name}
              </h2>
              <p className="text-gray-300 text-lg transition-all duration-300 hover:text-white">
                {persona.role}
              </p>
            </div>

            {/* Description with enhanced readability */}
            <div className="text-center mb-8">
              <p className="text-gray-300 leading-relaxed text-base transition-all duration-300 hover:text-gray-200">
                {persona.description}
              </p>
            </div>

            {/* Call to Action Section with 3D button effect */}
            <div className="text-center">
              <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold py-3 px-8 rounded-full flex items-center justify-center mx-auto space-x-2 shadow-lg transition-all duration-300 hover:from-amber-400 hover:to-amber-500 hover:shadow-2xl hover:scale-105 transform hover:-translate-y-1">
                <svg className="w-5 h-5 transition-transform duration-300 hover:rotate-12" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span>Let's Talk!</span>
              </div>
            </div>
          </div>

          {/* 3D Shadow Effect */}
          <div 
            className={`absolute inset-0 rounded-2xl transition-all duration-500 ${
              hoveredPersona === persona.name 
                ? 'shadow-2xl' 
                : 'shadow-lg'
            }`}
            style={{
              transform: 'translateZ(-10px)',
              filter: hoveredPersona === persona.name 
                ? 'blur(20px) brightness(0.8)' 
                : 'blur(10px) brightness(0.9)'
            }}
          ></div>
        </div>
      ))}
    </div>
  );
}
