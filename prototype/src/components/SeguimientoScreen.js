import React from 'react';

const SeguimientoScreen = ({ onShowAnalytics }) => (
  <div className="p-6 animate-fade-in space-y-6">
    <h1 className="text-3xl font-bold text-slate-800 mb-4">Tu Progreso</h1>
    
    {/* Quick Analytics Summary */}
    <div className="bg-gradient-to-br from-violet-50 to-purple-50 p-4 rounded-2xl shadow-sm">
      <h2 className="font-bold text-violet-800 mb-3">Resumen Semanal</h2>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-violet-600">3.4/5</div>
          <div className="text-sm text-slate-600">Bienestar Promedio</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">12</div>
          <div className="text-sm text-slate-600">Intervenciones</div>
        </div>
      </div>
      <button 
        onClick={onShowAnalytics}
        className="w-full bg-gradient-to-r from-violet-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-violet-600 hover:to-purple-700 transition-all"
      >
        Ver Analytics Completos
      </button>
    </div>

    {/* Simple Stress Chart */}
    <div className="bg-white/80 p-4 rounded-2xl shadow-sm">
      <h2 className="font-bold text-slate-700 mb-2">Niveles de Estrés (Última Semana)</h2>
      <div className="h-40 flex items-end justify-around space-x-2 mt-4">
        <div className="w-full bg-teal-300 rounded-t-lg" style={{height: '40%'}}></div>
        <div className="w-full bg-teal-300 rounded-t-lg" style={{height: '60%'}}></div>
        <div className="w-full bg-teal-300 rounded-t-lg" style={{height: '50%'}}></div>
        <div className="w-full bg-teal-300 rounded-t-lg" style={{height: '80%'}}></div>
        <div className="w-full bg-teal-300 rounded-t-lg" style={{height: '30%'}}></div>
        <div className="w-full bg-teal-300 rounded-t-lg" style={{height: '40%'}}></div>
        <div className="w-full bg-teal-300 rounded-t-lg" style={{height: '20%'}}></div>
      </div>
      <div className="flex justify-between text-xs text-slate-500 mt-2">
        <span>L</span><span>M</span><span>M</span><span>J</span><span>V</span><span>S</span><span>D</span>
      </div>
    </div>

    {/* Recent Activity */}
    <div className="bg-white/80 p-4 rounded-2xl shadow-sm">
      <h2 className="font-bold text-slate-700 mb-3">Actividad Reciente</h2>
      <div className="space-y-3">
        <div className="flex items-center gap-3 p-2 bg-sky-50 rounded-lg">
          <div className="w-3 h-3 bg-sky-500 rounded-full"></div>
          <div className="flex-1">
            <div className="text-sm font-semibold text-slate-700">Ejercicio de Respiración</div>
            <div className="text-xs text-slate-500">Hace 2 horas • 5 min</div>
          </div>
          <div className="text-sm text-sky-600 font-semibold">Efectivo</div>
        </div>
        
        <div className="flex items-center gap-3 p-2 bg-emerald-50 rounded-lg">
          <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
          <div className="flex-1">
            <div className="text-sm font-semibold text-slate-700">Evaluación Mental</div>
            <div className="text-xs text-slate-500">Ayer • 3.2/5</div>
          </div>
          <div className="text-sm text-emerald-600 font-semibold">Completado</div>
        </div>
        
        <div className="flex items-center gap-3 p-2 bg-purple-50 rounded-lg">
          <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
          <div className="flex-1">
            <div className="text-sm font-semibold text-slate-700">Terapia de Sonidos</div>
            <div className="text-xs text-slate-500">Hace 3 días • 10 min</div>
          </div>
          <div className="text-sm text-purple-600 font-semibold">Muy Efectivo</div>
        </div>
      </div>
    </div>
  </div>
);

export default SeguimientoScreen;
