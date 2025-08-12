import React, { useState, useEffect } from 'react';
import { TrendingUp, Clock, Target, Award } from './icons';
import { getUserInterventionStats, getUserAssessments } from './firestoreHelpers';
import authService from '../services/AuthService';

// Simplified Analytics Dashboard focused on key insights
const AnalyticsDashboard = ({ onClose }) => {
    const [timeRange, setTimeRange] = useState('7d');
    const [stats, setStats] = useState(null);
    const [assessments, setAssessments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadAnalyticsData();
    }, []);

    const loadAnalyticsData = async () => {
        try {
            const userStats = await getUserInterventionStats();
            setStats(userStats);

            const userAssessments = await getUserAssessments();
            setAssessments(userAssessments || []);

            setLoading(false);
        } catch (error) {
            console.error('Error loading analytics:', error);
            setLoading(false);
        }
    };

    const calculateWeeklyAverage = () => {
        if (!assessments.length) return 0;
        const recentAssessments = assessments.slice(0, 7);
        const average = recentAssessments.reduce((sum, assessment) => sum + (assessment.score || 0), 0) / recentAssessments.length;
        return average.toFixed(1);
    };

    const getMostUsedTool = () => {
        if (!stats?.favoriteTools || Object.keys(stats.favoriteTools).length === 0) {
            return 'Respiración';
        }
        return Object.keys(stats.favoriteTools).reduce((a, b) => 
            stats.favoriteTools[a] > stats.favoriteTools[b] ? a : b
        );
    };

    const getProgressTrend = () => {
        if (assessments.length < 2) return 'stable';
        const recent = assessments.slice(0, 3);
        const older = assessments.slice(3, 6);
        
        const recentAvg = recent.reduce((sum, a) => sum + (a.score || 0), 0) / recent.length;
        const olderAvg = older.reduce((sum, a) => sum + (a.score || 0), 0) / older.length;
        
        if (recentAvg > olderAvg + 0.3) return 'improving';
        if (recentAvg < olderAvg - 0.3) return 'declining';
        return 'stable';
    };

    const getTrendIcon = () => {
        const trend = getProgressTrend();
        if (trend === 'improving') return '📈';
        if (trend === 'declining') return '📉';
        return '➡️';
    };

    const getTrendText = () => {
        const trend = getProgressTrend();
        if (trend === 'improving') return 'Mejorando';
        if (trend === 'declining') return 'Necesita atención';
        return 'Estable';
    };

    const getTrendColor = () => {
        const trend = getProgressTrend();
        if (trend === 'improving') return 'text-green-600';
        if (trend === 'declining') return 'text-red-600';
        return 'text-blue-600';
    };

    const getWellnessLevel = () => {
        const average = parseFloat(calculateWeeklyAverage());
        if (average >= 4) return { level: 'Excelente', color: 'text-green-600', emoji: '🌟' };
        if (average >= 3) return { level: 'Bueno', color: 'text-blue-600', emoji: '😊' };
        if (average >= 2) return { level: 'Regular', color: 'text-yellow-600', emoji: '😐' };
        return { level: 'Necesita apoyo', color: 'text-red-600', emoji: '💙' };
    };

    if (loading) {
        return (
            <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50">
                <div className="bg-white p-8 rounded-xl">
                    <div className="animate-spin w-8 h-8 border-4 border-violet-500 border-t-transparent rounded-full mx-auto"></div>
                    <p className="text-slate-600 mt-4">Cargando tu análisis...</p>
                </div>
            </div>
        );
    }

    const wellness = getWellnessLevel();

    return (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="p-6 border-b">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-800">Tu Resumen de Bienestar</h1>
                            <p className="text-slate-600">Insights clave de tu progreso</p>
                        </div>
                        <button 
                            onClick={onClose}
                            className="text-slate-400 hover:text-slate-600 text-2xl font-bold w-8 h-8 flex items-center justify-center"
                        >
                            ×
                        </button>
                    </div>
                </div>

                <div className="p-6 space-y-6">
                    {/* Overall Wellness Score */}
                    <div className="text-center bg-gradient-to-br from-violet-50 to-purple-50 p-6 rounded-xl">
                        <div className="text-4xl mb-2">{wellness.emoji}</div>
                        <h2 className="text-xl font-bold text-slate-800 mb-1">Estado General</h2>
                        <div className={`text-2xl font-bold ${wellness.color}`}>{wellness.level}</div>
                        <div className="text-slate-600 text-sm mt-2">
                            Promedio: {calculateWeeklyAverage()}/5 esta semana
                        </div>
                    </div>

                    {/* Key Metrics Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-blue-50 p-4 rounded-xl text-center">
                            <div className="text-2xl font-bold text-blue-600">
                                {stats?.totalSessions || 0}
                            </div>
                            <div className="text-sm text-slate-600 flex items-center justify-center gap-1">
                                <Target className="w-4 h-4" />
                                Sesiones completadas
                            </div>
                        </div>

                        <div className="bg-green-50 p-4 rounded-xl text-center">
                            <div className="text-2xl font-bold text-green-600">
                                {Math.round((stats?.totalMinutes || 0) / 60)}h
                            </div>
                            <div className="text-sm text-slate-600 flex items-center justify-center gap-1">
                                <Clock className="w-4 h-4" />
                                Tiempo dedicado
                            </div>
                        </div>
                    </div>

                    {/* Progress Trend */}
                    <div className="bg-white border-2 border-slate-100 p-4 rounded-xl">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-semibold text-slate-800 mb-1">Tendencia de Progreso</h3>
                                <div className={`text-lg font-semibold ${getTrendColor()}`}>
                                    {getTrendIcon()} {getTrendText()}
                                </div>
                            </div>
                            <TrendingUp className={`w-8 h-8 ${getTrendColor()}`} />
                        </div>
                    </div>

                    {/* Favorite Tool */}
                    <div className="bg-amber-50 p-4 rounded-xl">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-semibold text-slate-800 mb-1">Tu Herramienta Favorita</h3>
                                <div className="text-lg font-semibold text-amber-700 capitalize">
                                    ✨ {getMostUsedTool()}
                                </div>
                                <div className="text-sm text-slate-600">
                                    La que más te ha ayudado
                                </div>
                            </div>
                            <Award className="w-8 h-8 text-amber-600" />
                        </div>
                    </div>

                    {/* Simple Recommendations */}
                    <div className="bg-violet-50 p-4 rounded-xl">
                        <h3 className="font-semibold text-violet-800 mb-3">💡 Recomendaciones</h3>
                        <div className="space-y-2 text-sm text-violet-700">
                            {stats?.totalSessions < 5 && (
                                <p>• Intenta usar las herramientas de calma más frecuentemente</p>
                            )}
                            {parseFloat(calculateWeeklyAverage()) < 3 && (
                                <p>• Considera hablar con un profesional de la salud mental</p>
                            )}
                            {stats?.totalSessions > 10 && (
                                <p>• ¡Excelente consistencia! Sigue así 🎉</p>
                            )}
                            <p>• Mantén un registro regular de tu estado de ánimo</p>
                            <p>• Explora diferentes herramientas para encontrar las que mejor te funcionen</p>
                        </div>
                    </div>

                    {/* Data Note */}
                    <div className="text-center text-xs text-slate-500 p-4 bg-slate-50 rounded-lg">
                        📊 Los datos se basan en tus evaluaciones y uso de herramientas de calma.
                        <br />
                        Para mejores insights, úsala regularmente y registra tu estado de ánimo.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsDashboard;
