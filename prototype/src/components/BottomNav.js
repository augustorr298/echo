import React from 'react';
import { Home, BarChart2, BookOpen, Settings, User } from './icons';
const BottomNav = ({ activeScreen, setActiveScreen }) => {
  const navItems = [
    { id: 'inicio', icon: Home, label: 'Inicio' },
    { id: 'seguimiento', icon: BarChart2, label: 'Seguimiento' },
    { id: 'recursos', icon: BookOpen, label: 'Recursos' },
    { id: 'ajustes', icon: Settings, label: 'Ajustes' },
    { id: 'perfil', icon: User, label: 'Perfil' },
  ];
  return (
    <div className="absolute bottom-0 left-0 right-0 h-20 bg-white/70 backdrop-blur-md rounded-t-3xl flex justify-around items-center shadow-top">
      {navItems.map(item => (
        <button key={item.id} onClick={() => setActiveScreen(item.id)} className="flex flex-col items-center justify-center space-y-1">
          <item.icon className={`w-7 h-7 transition-colors ${activeScreen === item.id ? 'text-violet-600' : 'text-slate-400'}`} />
          <span className={`text-xs font-semibold transition-colors ${activeScreen === item.id ? 'text-violet-600' : 'text-slate-400'}`}>{item.label}</span>
        </button>
      ))}
    </div>
  );
};
export default BottomNav;
