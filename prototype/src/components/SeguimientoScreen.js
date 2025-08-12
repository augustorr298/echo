import React, { useState, useEffect } from 'react';
import { Calendar, TrendingUp, Award, Target, Clock, BarChart3 } from './icons';
import authService from '../services/AuthService';
import { getUserInterventionStats, getUserAssessments, getRecentInterventions } from './firestoreHelpers';

const SeguimientoScreen = ({ onShowAnalytics }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);
  const [weeklyMood, setWeeklyMood] = useState([]);
  const [currentStreak, setCurrentStreak] = useState(0);

  useEffect(() => {
    const unsubscribe = authService.initialize((currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        loadProgressData();
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe && unsubscribe();
  }, []);

  const loadProgressData = async () => {
    try {
      // Load user statistics
      const userStats = await getUserInterventionStats();
      setStats(userStats);

      // Load recent interventions
      const recent = await getRecentInterventions(5);
      setRecentActivity(recent || []);

      // Load weekly mood/assessment data
      const assessments = await getUserAssessments();
      if (assessments) {
        // Process last 7 days of mood data
        const last7Days = assessments.slice(0, 7).reverse();
        setWeeklyMood(last7Days);
      }

      // Calculate current streak based on loaded stats
      if (userStats && userStats.totalSessions > 0) {
        setCurrentStreak(Math.min(userStats.totalSessions, 14)); // Cap at 14 days for demo
      } else {
        setCurrentStreak(1); // Default streak for new users
      }

      setLoading(false);
    } catch (error) {
      console.error('Error loading progress data:', error);
      setLoading(false);
    }
  };

  const formatTimeAgo = (timestamp) => {
    if (!timestamp) return 'Hace poco';
    const now = new Date();
    const time = new Date(timestamp);
    const diffMs = now - time;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) return `Hace ${diffDays} día${diffDays > 1 ? 's' : ''}`;
    if (diffHours > 0) return `Hace ${diffHours} hora${diffHours > 1 ? 's' : ''}`;
    return 'Hace poco';
  };

  const getToolEmoji = (tool) => {
    const toolEmojis = {
      'respiracion': '🫁',
      'meditacion': '🧘‍♀️',
      'sonidos': '🎵',
      'relajacion': '🌊',
      'mindfulness': '🌸',
      'visualization': '🌅'
    };
    return toolEmojis[tool?.toLowerCase()] || '✨';
  };

  const getMoodColor = (level) => {
    if (level <= 2) return 'bg-red-400';
    if (level <= 3) return 'bg-yellow-400';
    if (level <= 4) return 'bg-teal-400';
    return 'bg-green-400';
  };

  if (loading) {
    return (
      <div className="p-6 text-center animate-fade-in">
        <div className="animate-spin w-8 h-8 border-4 border-violet-500 border-t-transparent rounded-full mx-auto"></div>
        <p className="text-slate-500 mt-4">Cargando tu progreso...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-6 text-center animate-fade-in space-y-6">
        <div className="bg-gradient-to-br from-violet-100 to-purple-100 rounded-full w-24 h-24 mx-auto flex items-center justify-center">
          <BarChart3 className="w-12 h-12 text-violet-600" />
        </div>
        
        <div>
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Tu Progreso</h1>
          <p className="text-slate-500">
            Inicia sesión para ver tu progreso personalizado y estadísticas de bienestar
          </p>
        </div>
      </div>
    );
  }

  const weeklyAverage = weeklyMood.length > 0 
    ? (weeklyMood.reduce((sum, mood) => sum + (mood.score || 0), 0) / weeklyMood.length).toFixed(1)
    : '0.0';

  return (
    <div className="p-6 animate-fade-in space-y-6">
      <h1 className="text-3xl font-bold text-slate-800 mb-4">Tu Progreso</h1>
      
      {/* Quick Analytics Summary */}
      <div className="bg-gradient-to-br from-violet-50 to-purple-50 p-5 rounded-2xl shadow-sm">
        <h2 className="font-bold text-violet-800 mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Resumen Semanal
        </h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-violet-600">{weeklyAverage}/5</div>
            <div className="text-sm text-slate-600">Bienestar Promedio</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{stats?.totalSessions || 0}</div>
            <div className="text-sm text-slate-600">Intervenciones</div>
          </div>
        </div>
        
        {/* Streak Display */}
        <div className="bg-white/60 rounded-xl p-3 mb-4">
          <div className="flex items-center justify-center gap-2">
            <Award className="w-5 h-5 text-orange-500" />
            <span className="font-semibold text-slate-700">Racha actual: {currentStreak} días</span>
            <span className="text-2xl">🔥</span>
          </div>
        </div>

        <button 
          onClick={onShowAnalytics}
          className="w-full bg-gradient-to-r from-violet-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-violet-600 hover:to-purple-700 transition-all"
        >
          Ver Analytics Completos
        </button>
      </div>

      {/* Weekly Mood Chart */}
      <div className="bg-white/90 p-5 rounded-2xl shadow-sm">
        <h2 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          Niveles de Bienestar (Última Semana)
        </h2>
        <div className="h-40 flex items-end justify-around space-x-2 mt-4">
          {weeklyMood.length > 0 ? weeklyMood.map((mood, index) => (
            <div 
              key={index}
              className={`w-full rounded-t-lg transition-all hover:opacity-80 ${getMoodColor(mood.score)}`}
              style={{height: `${(mood.score / 5) * 100}%`}}
              title={`${mood.score}/5 - ${mood.date}`}
            />
          )) : (
            // Default bars if no data
            ['40%', '60%', '50%', '80%', '30%', '40%', '20%'].map((height, index) => (
              <div 
                key={index}
                className="w-full bg-slate-300 rounded-t-lg"
                style={{height}}
              />
            ))
          )}
        </div>
        <div className="flex justify-between text-xs text-slate-500 mt-2">
          <span>L</span><span>M</span><span>M</span><span>J</span><span>V</span><span>S</span><span>D</span>
        </div>
        {weeklyMood.length === 0 && (
          <p className="text-center text-slate-500 text-sm mt-2">
            Completa evaluaciones diarias para ver tu progreso
          </p>
        )}
      </div>

      {/* Usage Statistics */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-sky-50 p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-blue-600" />
            <span className="font-semibold text-blue-800">Tiempo Total</span>
          </div>
          <div className="text-2xl font-bold text-blue-600">
            {Math.round((stats?.totalMinutes || 0) / 60)}h {(stats?.totalMinutes || 0) % 60}m
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-5 h-5 text-green-600" />
            <span className="font-semibold text-green-800">Meta Semanal</span>
          </div>
          <div className="text-2xl font-bold text-green-600">
            {Math.min(Math.round(((stats?.totalSessions || 0) / 7) * 100), 100)}%
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white/90 p-5 rounded-2xl shadow-sm">
        <h2 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Actividad Reciente
        </h2>
        
        {recentActivity.length > 0 ? (
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gradient-to-r from-slate-50 to-white rounded-lg border-l-4 border-violet-300">
                <div className="text-2xl">{getToolEmoji(activity.tool)}</div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-slate-700 capitalize">
                    {activity.tool || 'Herramienta de Calma'}
                  </div>
                  <div className="text-xs text-slate-500">
                    {formatTimeAgo(activity.createdAt)} • {activity.duration || 5} min
                  </div>
                </div>
                <div className="text-sm text-violet-600 font-semibold">
                  {activity.effectiveness || 'Efectivo'}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="text-4xl mb-2">🌱</div>
            <p className="text-slate-500">Comienza a usar las herramientas de calma para ver tu actividad aquí</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SeguimientoScreen;
