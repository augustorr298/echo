import React from 'react';
const AjustesScreen = () => (
  <div className="p-6 space-y-4 animate-fade-in">
    <h1 className="text-3xl font-bold text-slate-800 mb-4">Ajustes</h1>
    <div className="bg-white/80 p-4 rounded-2xl shadow-sm flex justify-between items-center">
      <span className="font-semibold text-slate-700">Notificaciones</span>
      <div className="w-12 h-6 bg-slate-300 rounded-full cursor-pointer p-1"><div className="w-4 h-4 bg-white rounded-full"></div></div>
    </div>
    <div className="bg-white/80 p-4 rounded-2xl shadow-sm flex justify-between items-center">
      <span className="font-semibold text-slate-700">Modo Oscuro</span>
      <div className="w-12 h-6 bg-slate-300 rounded-full cursor-pointer p-1"><div className="w-4 h-4 bg-white rounded-full"></div></div>
    </div>
    <div className="bg-white/80 p-4 rounded-2xl shadow-sm">
      <p className="text-sm text-slate-600">Privacidad de Datos</p>
    </div>
  </div>
);
export default AjustesScreen;
