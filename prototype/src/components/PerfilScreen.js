import React from 'react';
import { User } from './icons';
const PerfilScreen = () => (
  <div className="p-6 space-y-4 text-center animate-fade-in">
    <User className="w-24 h-24 mx-auto text-slate-500 bg-white rounded-full p-2" />
    <h1 className="text-2xl font-bold text-slate-800">Usuario de ECHO</h1>
    <p className="text-slate-500">Miembro desde 2024</p>
  </div>
);
export default PerfilScreen;
