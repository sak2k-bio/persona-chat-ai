'use client';

import { useState, useEffect, useCallback } from 'react';

export default function MouseShadow() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    // Use requestAnimationFrame for smooth performance
    requestAnimationFrame(() => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleMouseMoveWithThrottle = (e: MouseEvent) => {
      handleMouseMove(e);
      
      // Clear previous timeout
      clearTimeout(timeoutId);
      
      // Hide shadow after mouse stops moving
      timeoutId = setTimeout(() => {
        setIsVisible(false);
      }, 100);
    };

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMoveWithThrottle, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMoveWithThrottle);
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(timeoutId);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return (
    <>
      {/* Lightweight primary glow */}
      <div
        className="fixed pointer-events-none z-50 transition-all duration-200 ease-out "
        style={{
          left: mousePosition.x - 15,
          top: mousePosition.y - 15,
          opacity: isVisible ? 0.6 : 0.1,
        }}
      >
        <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full blur-sm"></div>
      </div>

      {/* Simple secondary effect */}
      <div
        className="fixed pointer-events-none z-40 transition-opacity duration-300 ease-out"
        style={{
          left: mousePosition.x - 20,
          top: mousePosition.y - 20,
          opacity: isVisible ? 0.2 : 0,
        }}
      >
        <div className="w-10 h-10 bg-gradient-to-br from-yellow-300 to-amber-400 rounded-full blur-md"></div>
      </div>
    </>
  );
}
