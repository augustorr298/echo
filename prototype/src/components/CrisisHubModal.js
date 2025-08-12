import React from 'react';
const CrisisHubModal = ({ onSelectTool, onClose }) => {
  return (
    <div className="fixed inset-0 bg-slate-900 bg-opacity-70 flex flex-col items-center justify-center z-40 p-4 backdrop-blur-md">
      <div className="w-full max-w-md text-center">
        <h2 className="text-3xl font-light text-white mb-2">Tranquil@, todo está bien.</h2>
        <p className="text-lg text-slate-300 mb-8">Elige una herramienta para encontrar calma.</p>
        <div className="space-y-3">
          <button onClick={() => onSelectTool('breathing')} className="w-full bg-gradient-to-br from-sky-500 to-cyan-400 text-white p-5 rounded-xl text-left text-lg font-semibold hover:from-sky-600 hover:to-cyan-500 transition-all transform hover:scale-105 shadow-lg">Respira conmigo</button>
          <button onClick={() => onSelectTool('grounding')} className="w-full bg-gradient-to-br from-emerald-500 to-teal-400 text-white p-5 rounded-xl text-left text-lg font-semibold hover:from-emerald-600 hover:to-teal-500 transition-all transform hover:scale-105 shadow-lg">Anclaje a tierra (5-4-3-2-1)</button>
          <button onClick={() => onSelectTool('affirmations')} className="w-full bg-gradient-to-br from-amber-500 to-yellow-400 text-white p-5 rounded-xl text-left text-lg font-semibold hover:from-amber-600 hover:to-yellow-500 transition-all transform hover:scale-105 shadow-lg">Afirmaciones Positivas</button>
          <button onClick={() => onSelectTool('canvas')} className="w-full bg-gradient-to-br from-indigo-500 to-purple-400 text-white p-5 rounded-xl text-left text-lg font-semibold hover:from-indigo-600 hover:to-purple-500 transition-all transform hover:scale-105 shadow-lg">Un momento de distracción</button>
        </div>
      </div>
      <button onClick={onClose} className="absolute top-6 right-6 text-white bg-slate-700/50 rounded-full w-10 h-10 flex items-center justify-center text-2xl font-bold hover:bg-slate-600/50 transition-colors">&times;</button>
    </div>
  );
};
export default CrisisHubModal;
