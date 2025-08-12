import React, { useState, useEffect } from 'react';

// Analytics Dashboard for Mental Health Data
const AnalyticsDashboard = ({ onClose }) => {
    const [timeRange, setTimeRange] = useState('7d');
    const [mockData, setMockData] = useState(null);

    // Mock data generator for demonstration
    useEffect(() => {
        const generateMockData = () => {
            const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
            const data = {
                assessments: [],
                trends: {
                    mood: [],
                    anxiety: [],
                    stress: [],
                    energy: []
                },
                biometrics: {
                    heartRate: [],
                    stressIndex: []
                },
                interventions: {
                    breathing: Math.floor(Math.random() * 15) + 5,
                    grounding: Math.floor(Math.random() * 10) + 3,
                    affirmations: Math.floor(Math.random() * 12) + 4,
                    canvas: Math.floor(Math.random() * 8) + 2,
                    advanced: Math.floor(Math.random() * 6) + 1
                },
                insights: {
                    averageScore: 3.2 + Math.random() * 1.5,
                    improvementTrend: Math.random() > 0.5 ? 'improving' : 'stable',
                    riskFactors: ['Estrés laboral', 'Sueño irregular'],
                    strengths: ['Uso constante de técnicas', 'Autoevaluación regular']
                }
            };

            // Generate daily data points
            for (let i = days - 1; i >= 0; i--) {
                const date = new Date();
                date.setDate(date.getDate() - i);
                
                data.trends.mood.push({
                    date: date.toISOString().split('T')[0],
                    value: 2 + Math.random() * 3
                });
                
                data.trends.anxiety.push({
                    date: date.toISOString().split('T')[0],
                    value: 1 + Math.random() * 3
                });
                
                data.trends.stress.push({
                    date: date.toISOString().split('T')[0],
                    value: 1 + Math.random() * 3
                });
                
                data.trends.energy.push({
                    date: date.toISOString().split('T')[0],
                    value: 2 + Math.random() * 3
                });

                if (Math.random() > 0.7) { // Some days have biometric data
                    data.biometrics.heartRate.push({
                        date: date.toISOString().split('T')[0],
                        value: 65 + Math.random() * 25
                    });
                }
            }

            return data;
        };

        setMockData(generateMockData());
    }, [timeRange]);

    const renderTrendChart = (data, title, color, unit = '') => {
        const maxValue = Math.max(...data.map(d => d.value));
        const minValue = Math.min(...data.map(d => d.value));
        const range = maxValue - minValue;

        return (
            <div className="bg-white p-4 rounded-xl shadow-sm">
                <h3 className="font-semibold text-slate-700 mb-3">{title}</h3>
                <div className="relative h-32">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                        <polyline
                            fill="none"
                            stroke={color}
                            strokeWidth="2"
                            points={data.map((point, index) => {
                                const x = (index / (data.length - 1)) * 100;
                                const y = 100 - ((point.value - minValue) / range) * 80 - 10;
                                return `${x},${y}`;
                            }).join(' ')}
                        />
                        {data.map((point, index) => {
                            const x = (index / (data.length - 1)) * 100;
                            const y = 100 - ((point.value - minValue) / range) * 80 - 10;
                            return (
                                <circle
                                    key={index}
                                    cx={x}
                                    cy={y}
                                    r="2"
                                    fill={color}
                                />
                            );
                        })}
                    </svg>
                </div>
                <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-slate-500">
                        Promedio: {(data.reduce((sum, d) => sum + d.value, 0) / data.length).toFixed(1)}{unit}
                    </span>
                    <span className="text-sm text-slate-500">
                        {data.length > 1 && (
                            data[data.length - 1].value > data[data.length - 2].value ? '↗️' : '↘️'
                        )}
                    </span>
                </div>
            </div>
        );
    };

    const renderInterventionStats = () => {
        if (!mockData) return null;

        const total = Object.values(mockData.interventions).reduce((sum, val) => sum + val, 0);
        const interventions = [
            { name: 'Respiración', value: mockData.interventions.breathing, color: 'bg-sky-500' },
            { name: 'Anclaje', value: mockData.interventions.grounding, color: 'bg-emerald-500' },
            { name: 'Afirmaciones', value: mockData.interventions.affirmations, color: 'bg-amber-500' },
            { name: 'Canvas', value: mockData.interventions.canvas, color: 'bg-indigo-500' },
            { name: 'Avanzadas', value: mockData.interventions.advanced, color: 'bg-purple-500' }
        ];

        return (
            <div className="bg-white p-4 rounded-xl shadow-sm">
                <h3 className="font-semibold text-slate-700 mb-3">Técnicas Más Utilizadas</h3>
                <div className="space-y-3">
                    {interventions.map((intervention) => (
                        <div key={intervention.name} className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full ${intervention.color}`} />
                            <div className="flex-1">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-700">{intervention.name}</span>
                                    <span className="text-slate-500">{intervention.value} veces</span>
                                </div>
                                <div className="w-full bg-slate-100 rounded-full h-2 mt-1">
                                    <div 
                                        className={`h-2 rounded-full ${intervention.color}`}
                                        style={{ width: `${(intervention.value / total) * 100}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const renderInsightCards = () => {
        if (!mockData) return null;

        const { insights } = mockData;
        
        return (
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-violet-50 to-purple-50 p-4 rounded-xl">
                    <div className="text-2xl font-bold text-violet-600">
                        {insights.averageScore.toFixed(1)}
                    </div>
                    <div className="text-sm text-slate-600">Puntuación Promedio</div>
                    <div className="text-xs text-slate-500 mt-1">
                        {insights.improvementTrend === 'improving' ? '↗️ Mejorando' : '➡️ Estable'}
                    </div>
                </div>
                
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-xl">
                    <div className="text-2xl font-bold text-blue-600">
                        {Object.values(mockData.interventions).reduce((sum, val) => sum + val, 0)}
                    </div>
                    <div className="text-sm text-slate-600">Intervenciones</div>
                    <div className="text-xs text-slate-500 mt-1">Últimos {timeRange}</div>
                </div>
            </div>
        );
    };

    const renderRiskAssessment = () => {
        if (!mockData) return null;

        const riskLevel = mockData.insights.averageScore < 2.5 ? 'high' : 
                         mockData.insights.averageScore < 3.5 ? 'medium' : 'low';
        
        const riskColors = {
            high: 'bg-red-50 border-red-200 text-red-800',
            medium: 'bg-yellow-50 border-yellow-200 text-yellow-800',
            low: 'bg-green-50 border-green-200 text-green-800'
        };

        const riskLabels = {
            high: 'Alto Riesgo',
            medium: 'Riesgo Moderado',
            low: 'Bajo Riesgo'
        };

        return (
            <div className="space-y-4">
                <div className={`p-4 rounded-xl border-2 ${riskColors[riskLevel]}`}>
                    <h3 className="font-semibold mb-2">Evaluación de Riesgo: {riskLabels[riskLevel]}</h3>
                    {riskLevel !== 'low' && (
                        <div className="text-sm space-y-1">
                            <p>Factores de riesgo identificados:</p>
                            <ul className="list-disc list-inside ml-2">
                                {mockData.insights.riskFactors.map((factor, index) => (
                                    <li key={index}>{factor}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                <div className="bg-green-50 p-4 rounded-xl border-2 border-green-200">
                    <h3 className="font-semibold text-green-800 mb-2">Fortalezas Identificadas</h3>
                    <ul className="text-sm text-green-700 space-y-1">
                        {mockData.insights.strengths.map((strength, index) => (
                            <li key={index}>• {strength}</li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    };

    if (!mockData) {
        return (
            <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50">
                <div className="bg-white p-8 rounded-xl">
                    <div className="animate-spin w-8 h-8 border-4 border-violet-500 border-t-transparent rounded-full mx-auto"></div>
                    <p className="text-slate-600 mt-4">Cargando análisis...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-50 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center rounded-t-2xl">
                    <div>
                        <h1 className="text-xl font-bold text-slate-800">Dashboard de Analíticas</h1>
                        <p className="text-sm text-slate-600">Seguimiento de tu bienestar mental</p>
                    </div>
                    <button 
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-600 text-xl font-bold"
                    >
                        ×
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    {/* Time Range Selector */}
                    <div className="flex gap-2">
                        {['7d', '30d', '90d'].map((range) => (
                            <button
                                key={range}
                                onClick={() => setTimeRange(range)}
                                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                                    timeRange === range 
                                        ? 'bg-violet-500 text-white' 
                                        : 'bg-white text-slate-600 hover:bg-violet-50'
                                }`}
                            >
                                {range === '7d' ? '7 días' : range === '30d' ? '30 días' : '3 meses'}
                            </button>
                        ))}
                    </div>

                    {/* Key Metrics */}
                    {renderInsightCards()}

                    {/* Trend Charts */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {renderTrendChart(mockData.trends.mood, 'Estado de Ánimo', '#8b5cf6')}
                        {renderTrendChart(mockData.trends.anxiety, 'Ansiedad', '#ef4444')}
                        {renderTrendChart(mockData.trends.stress, 'Estrés', '#f59e0b')}
                        {renderTrendChart(mockData.trends.energy, 'Energía', '#10b981')}
                    </div>

                    {/* Intervention Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {renderInterventionStats()}
                        <div className="space-y-4">
                            {/* Biometric Summary */}
                            {mockData.biometrics.heartRate.length > 0 && (
                                <div className="bg-white p-4 rounded-xl shadow-sm">
                                    <h3 className="font-semibold text-slate-700 mb-3">Datos Biométricos</h3>
                                    <div className="grid grid-cols-2 gap-4 text-center">
                                        <div>
                                            <div className="text-xl font-bold text-blue-600">
                                                {Math.round(mockData.biometrics.heartRate.reduce((sum, d) => sum + d.value, 0) / mockData.biometrics.heartRate.length)}
                                            </div>
                                            <div className="text-sm text-slate-600">BPM Promedio</div>
                                        </div>
                                        <div>
                                            <div className="text-xl font-bold text-green-600">Normal</div>
                                            <div className="text-sm text-slate-600">Estado</div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Risk Assessment */}
                    {renderRiskAssessment()}

                    {/* Recommendations */}
                    <div className="bg-blue-50 p-4 rounded-xl">
                        <h3 className="font-semibold text-blue-800 mb-3">Recomendaciones Basadas en Datos</h3>
                        <div className="text-sm text-blue-700 space-y-2">
                            <p>• Continúa con el uso regular de técnicas de respiración</p>
                            <p>• Considera agregar más ejercicios de relajación muscular</p>
                            <p>• Mantén un horario consistente para las evaluaciones</p>
                            <p>• Explora las técnicas avanzadas para mayor variedad</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsDashboard;
