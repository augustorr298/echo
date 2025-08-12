import React from 'react';
import ZenTree from './ZenTree';
const InicioScreen = ({ onStartTest }) => (
  <div className="p-6 space-y-6 animate-fade-in text-center">
    <h1 className="text-3xl font-bold text-slate-800">Hola, Usuario</h1>
    <p className="text-slate-500">Tómate un momento para conectar contigo.</p>
    <ZenTree />
    <div className="bg-white/80 p-4 rounded-2xl shadow-sm">
      <h2 className="font-bold text-slate-700 mb-2">Análisis Rápido</h2>
      <p className="text-sm text-slate-500 mb-3">Evalúa tu estado emocional actual.</p>
      <button onClick={onStartTest} className="w-full bg-violet-500 text-white text-sm font-semibold py-2 rounded-lg hover:bg-violet-600 transition-colors">Comenzar Test</button>
    </div>
  </div>
);
export default InicioScreen;
