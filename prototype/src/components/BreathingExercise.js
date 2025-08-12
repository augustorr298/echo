import React, { useState, useEffect } from 'react';
const BreathingExercise = ({ onBack }) => {
  const [text, setText] = useState('Prepárate...');
  useEffect(() => {
    const sequence = ['Inhala...', 'Sostén', 'Exhala...', 'Sostén'];
    let i = 0;
    const timer = setInterval(() => {
      i = (i + 1) % 4;
      setText(sequence[i]);
    }, 4000);
    setTimeout(() => setText('Inhala...'), 500);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-sky-200 to-sky-300 flex flex-col items-center justify-center z-50 p-4">
      <div className="relative w-64 h-64 flex items-center justify-center">
        <div className="absolute w-full h-full bg-gradient-to-br from-sky-400 to-sky-500 rounded-full animate-breathe shadow-2xl"></div>
        <p className="z-10 text-4xl font-light text-white">{text}</p>
      </div>
      <button onClick={onBack} className="mt-16 bg-white/80 backdrop-blur-sm text-sky-800 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-white transition-all duration-300">Me siento mejor</button>
      <style>{`.animate-breathe { animation: breathe 16s ease-in-out infinite; } @keyframes breathe { 0%, 100% { transform: scale(0.8); opacity: 0.8; } 25% { transform: scale(1); opacity: 1; } 50% { transform: scale(1); opacity: 1; } 75% { transform: scale(0.8); opacity: 0.8; } }`}</style>
    </div>
  );
};
export default BreathingExercise;
