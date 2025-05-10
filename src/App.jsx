import React, { useState, useEffect } from 'react';
import DeckSelector from './DeckSelector';

export default function App() {
  const [showLanding, setShowLanding] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowLanding(false), 4000);
    return () => clearTimeout(timer);
  }, []);

if (showLanding) {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="text-center animate-fade-in transition-opacity duration-1000 ease-in">
        <img
          src="/Reclining Muse Logo Design.png"
          alt="Muse logo"
          className="mx-auto mb-6 max-w-xs opacity-0 animate-fade-in delay-200"
          style={{ animationFillMode: 'forwards' }}
        />
        <h1 className="text-2xl font-bold mb-4 opacity-0 animate-fade-in delay-500" style={{ animationFillMode: 'forwards' }}>
          Welcome to Muse
        </h1>
        <p className="text-gray-400 opacity-0 animate-fade-in delay-700" style={{ animationFillMode: 'forwards' }}>
          Preparing your experience...
        </p>
      </div>
    </div>
  );
}



  return <DeckSelector />;
}