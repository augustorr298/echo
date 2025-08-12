import React, { useState, useEffect, useMemo } from 'react';
import ZenTree from './ZenTree';
import authService from '../services/AuthService';
import { getUserInterventionStats, getUserAssessments, saveAssessmentResult } from './firestoreHelpers';
import { TrendingUp, Clock } from './icons';

const moodOptions = [
  { value: 1, label: '😔', text: 'Bajo' },
  { value: 2, label: '😕', text: 'Inquieto' },
  { value: 3, label: '😐', text: 'Neutral' },
  { value: 4, label: '🙂', text: 'Mejor' },
  { value: 5, label: '😊', text: 'Positivo' }
];

const mindfulQuotes = [
  { text: "La paz viene de adentro. No la busques afuera.", author: "Buda" },
  { text: "Lo que somos hoy es el resultado de nuestros pensamientos de ayer.", author: "Buda" },
  { text: "La mente que no está ocupada es una mente feliz.", author: "Eckhart Tolle" },
  { text: "El presente es el único momento que realmente tenemos.", author: "Thich Nhat Hanh" },
  { text: "No puedes detener las olas, pero puedes aprender a surfear.", author: "Jon Kabat-Zinn" },
  { text: "La felicidad no es algo que pospones para el futuro; es algo que diseñas para el presente.", author: "Jim Rohn" },
  { text: "Entre estímulo y respuesta hay un espacio. En ese espacio está nuestro poder de elegir.", author: "Viktor Frankl" },
  { text: "La única manera de dar sentido al cambio es sumergirse en él, moverse con él y unirse a la danza.", author: "Alan Watts" },
  { text: "Tu tarea no es buscar el amor, sino encontrar todas las barreras que has construido contra él.", author: "Rumi" },
  { text: "El dolor es inevitable, pero el sufrimiento es opcional.", author: "Haruki Murakami" },
  { text: "No somos seres humanos teniendo una experiencia espiritual; somos seres espirituales teniendo una experiencia humana.", author: "Pierre Teilhard de Chardin" },
  { text: "La calma es la cuna del poder.", author: "Josiah Gilbert Holland" },
  { text: "Donde quiera que estés, estate ahí completamente.", author: "Eckhart Tolle" },
  { text: "La respiración es el puente que conecta la vida y la conciencia.", author: "Thich Nhat Hanh" },
  { text: "Lo que pensamos, nos convertimos.", author: "Buda" }
];

const InicioScreen = ({ onStartTest }) => {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [assessments, setAssessments] = useState([]);
  const [savingMood, setSavingMood] = useState(false);
  const [lastMood, setLastMood] = useState(null);
  const [timeOfDay, setTimeOfDay] = useState('');
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  const currentQuote = mindfulQuotes[currentQuoteIndex];

  const handleQuoteClick = () => {
    setCurrentQuoteIndex((prev) => (prev + 1) % mindfulQuotes.length);
  };

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setTimeOfDay('Buenos días');
    else if (hour < 19) setTimeOfDay('Buenas tardes');
    else setTimeOfDay('Buenas noches');

    const unsubscribe = authService.initialize(async currentUser => {
      setUser(currentUser);
      if (currentUser) {
        const s = await getUserInterventionStats();
        setStats(s);
        const a = await getUserAssessments();
        setAssessments(a || []);
        if (a && a.length) setLastMood(a[0]);
      }
    });
    return () => unsubscribe && unsubscribe();
  }, []);

  const handleQuickMood = async (value) => {
    if (!user || savingMood) return;
    try {
      setSavingMood(true);
      const moodObj = { score: value, context: 'quick-mood', createdManual: true };
      await saveAssessmentResult(moodObj);
      const newAssessment = { ...moodObj, score: value, createdAt: new Date().toISOString() };
      setLastMood(newAssessment);
      setAssessments(prev => [newAssessment, ...prev]);
    } catch (e) {
      console.error('Error saving mood', e);
    } finally {
      setSavingMood(false);
    }
  };

  const weeklyAverage = assessments.length
    ? (assessments.slice(0, 7).reduce((sum, a) => sum + (a.score || 0), 0) / Math.min(7, assessments.length)).toFixed(1)
    : null;

  const lastMoodEmoji = lastMood ? moodOptions.find(m => m.value === lastMood.score)?.label : '—';

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Greeting */}
      <div className="text-center space-y-1">
        <h1 className="text-3xl font-bold text-slate-800">
          {timeOfDay}{user ? `, ${user.displayName || 'amig@'}` : ''}
        </h1>
        <p className="text-slate-500">Tómate un momento para reconectar contigo.</p>
      </div>

      {/* Motivational Quote - Clickable */}
      <div className="text-center px-4">
        <button 
          onClick={handleQuoteClick}
          className="group transition-all hover:scale-[1.02] focus:outline-none"
        >
          <p className="text-slate-600 italic font-light text-sm leading-relaxed mb-1 group-hover:text-slate-700 transition-colors">
            "{currentQuote.text}"
          </p>
          <p className="text-slate-400 text-xs font-medium group-hover:text-slate-500 transition-colors">
            — {currentQuote.author}
          </p>
        </button>
      </div>

      {/* Zen Visual */}
      <ZenTree />

      {/* Analysis CTA - Smaller and refined */}
      <div className="bg-gradient-to-br from-violet-500 to-purple-600 text-white p-4 rounded-2xl shadow-lg">
        <h2 className="font-bold mb-1 text-lg">Análisis Completo</h2>
        <p className="text-xs font-light text-violet-100 mb-3 leading-relaxed">
          Obtén insights sobre tu bienestar emocional
        </p>
        <button
          onClick={onStartTest}
          className="w-full bg-white/20 hover:bg-white/30 font-semibold py-2.5 rounded-lg transition-colors text-sm"
        >
          Comenzar Evaluación
        </button>
      </div>

      {/* Stats - Now below analysis */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/80 p-4 rounded-2xl shadow-sm text-center">
          <div className="flex items-center justify-center gap-2 mb-2 text-violet-600">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-semibold">Promedio</span>
          </div>
          <div className="text-2xl font-bold text-slate-800">{weeklyAverage || '—'}</div>
          <div className="text-xs text-slate-500">/5 esta semana</div>
        </div>

        <div className="bg-white/80 p-4 rounded-2xl shadow-sm text-center">
          <div className="flex items-center justify-center gap-2 mb-2 text-emerald-600">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-semibold">Sesiones</span>
          </div>
          <div className="text-2xl font-bold text-slate-800">{stats?.totalSessions || 0}</div>
          <div className="text-xs text-slate-500">completadas</div>
        </div>
      </div>

      {/* Quick Mood - Fixed sizing */}
      <div className="bg-white/80 p-5 rounded-2xl shadow-sm">
        <h2 className="font-bold text-slate-700 mb-3 text-center">¿Cómo te sientes ahora?</h2>
        <div className="flex justify-center gap-6 mb-4">
          {moodOptions.map(m => (
            <button
              key={m.value}
              onClick={() => handleQuickMood(m.value)}
              disabled={savingMood}
              className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl transition-all hover:scale-110 border-2 ${
                lastMood?.score === m.value 
                  ? 'border-violet-500 bg-violet-50' 
                  : 'border-slate-200 hover:border-violet-300'
              }`}
              title={m.text}
            >
              {m.label}
            </button>
          ))}
        </div>
        <div className="text-center text-xs text-slate-500">
          {lastMoodEmoji !== '—' ? `Último registro: ${lastMoodEmoji}` : 'Registra tu estado de ánimo'}
        </div>
      </div>
    </div>
  );
};

export default InicioScreen;