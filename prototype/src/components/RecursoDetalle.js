import React from 'react';
import { ArrowLeft } from './icons';
const RecursoDetalle = ({ resource, onBack }) => (
  <div className="fixed inset-0 bg-white z-50 p-6 animate-fade-in overflow-y-auto">
    <button onClick={onBack} className="flex items-center gap-2 text-slate-600 font-semibold mb-6">
      <ArrowLeft /> Volver
    </button>
    <h1 className="text-3xl font-bold text-slate-800 mb-4">{resource.title}</h1>
    <p className="text-slate-600 whitespace-pre-wrap leading-relaxed">{resource.content}</p>
  </div>
);
export default RecursoDetalle;
