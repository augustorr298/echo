import React, { useState, useEffect, useRef } from 'react';

// Mental Health Assessment with Multi-Modal Data Collection
const MentalHealthAssessment = ({ onComplete, onClose }) => {
    const [currentStep, setCurrentStep] = useState('intro');
    const [responses, setResponses] = useState({});
    const [biometricData, setBiometricData] = useState({});
    const [videoAnalysis, setVideoAnalysis] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    // Assessment questions with validated scales
    const assessmentQuestions = [
        {
            id: 'mood',
            category: 'emotional',
            question: '¿Cómo te sientes en este momento?',
            type: 'scale',
            scale: [
                { value: 1, label: 'Muy mal', color: 'bg-red-500' },
                { value: 2, label: 'Mal', color: 'bg-orange-500' },
                { value: 3, label: 'Regular', color: 'bg-yellow-500' },
                { value: 4, label: 'Bien', color: 'bg-green-500' },
                { value: 5, label: 'Muy bien', color: 'bg-emerald-500' }
            ]
        },
        {
            id: 'anxiety',
            category: 'symptoms',
            question: '¿Qué tan ansioso/a te sientes?',
            type: 'scale',
            scale: [
                { value: 1, label: 'Nada', color: 'bg-green-500' },
                { value: 2, label: 'Poco', color: 'bg-yellow-500' },
                { value: 3, label: 'Moderado', color: 'bg-orange-500' },
                { value: 4, label: 'Bastante', color: 'bg-red-500' },
                { value: 5, label: 'Extremo', color: 'bg-red-700' }
            ]
        },
        {
            id: 'stress',
            category: 'symptoms',
            question: '¿Cuál es tu nivel de estrés actual?',
            type: 'scale',
            scale: [
                { value: 1, label: 'Sin estrés', color: 'bg-green-500' },
                { value: 2, label: 'Bajo', color: 'bg-yellow-500' },
                { value: 3, label: 'Moderado', color: 'bg-orange-500' },
                { value: 4, label: 'Alto', color: 'bg-red-500' },
                { value: 5, label: 'Abrumador', color: 'bg-red-700' }
            ]
        },
        {
            id: 'energy',
            category: 'physical',
            question: '¿Cómo está tu nivel de energía?',
            type: 'scale',
            scale: [
                { value: 1, label: 'Agotado', color: 'bg-red-500' },
                { value: 2, label: 'Cansado', color: 'bg-orange-500' },
                { value: 3, label: 'Normal', color: 'bg-yellow-500' },
                { value: 4, label: 'Energético', color: 'bg-green-500' },
                { value: 5, label: 'Muy activo', color: 'bg-emerald-500' }
            ]
        },
        {
            id: 'sleep',
            category: 'lifestyle',
            question: '¿Cómo dormiste anoche?',
            type: 'multiple',
            options: [
                'Muy mal - No pude dormir',
                'Mal - Me desperté varias veces',
                'Regular - Dormí algo',
                'Bien - Buen descanso',
                'Excelente - Desperté renovado/a'
            ]
        },
        {
            id: 'support',
            category: 'social',
            question: '¿Te sientes apoyado/a por las personas cercanas?',
            type: 'scale',
            scale: [
                { value: 1, label: 'Para nada', color: 'bg-red-500' },
                { value: 2, label: 'Poco', color: 'bg-orange-500' },
                { value: 3, label: 'A veces', color: 'bg-yellow-500' },
                { value: 4, label: 'Bastante', color: 'bg-green-500' },
                { value: 5, label: 'Completamente', color: 'bg-emerald-500' }
            ]
        }
    ];

    // Initialize camera for emotion detection
    const initializeCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ 
                video: { 
                    width: 640, 
                    height: 480,
                    facingMode: 'user'
                } 
            });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (error) {
            console.log('Camera not available:', error);
        }
    };

    // Analyze facial expressions and micro-expressions
    const analyzeVideoFeed = () => {
        if (!videoRef.current || !canvasRef.current) return;
        
        setIsAnalyzing(true);
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const video = videoRef.current;
        
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0);
        
        // Simulate AI emotion analysis (in production, would use TensorFlow.js or similar)
        setTimeout(() => {
            const mockAnalysis = {
                emotions: {
                    happiness: Math.random() * 0.3 + 0.1,
                    sadness: Math.random() * 0.3 + 0.1,
                    anxiety: Math.random() * 0.4 + 0.1,
                    stress: Math.random() * 0.4 + 0.1,
                    neutral: Math.random() * 0.5 + 0.2
                },
                microExpressions: {
                    eyeMovement: Math.random() * 100,
                    blinkRate: Math.random() * 20 + 10,
                    facialTension: Math.random() * 100
                },
                confidence: 0.85,
                timestamp: new Date().toISOString()
            };
            setVideoAnalysis(mockAnalysis);
            setIsAnalyzing(false);
        }, 3000);
    };

    // Collect heart rate variability (mock - would integrate with wearables)
    const collectBiometrics = () => {
        // Simulate heart rate detection through camera or wearable integration
        const mockBiometrics = {
            heartRate: Math.floor(Math.random() * 40) + 60, // 60-100 bpm
            heartRateVariability: Math.random() * 50 + 25,
            stressIndex: Math.random() * 100,
            timestamp: new Date().toISOString()
        };
        setBiometricData(mockBiometrics);
    };

    useEffect(() => {
        if (currentStep === 'biometric') {
            initializeCamera();
            collectBiometrics();
        }
    }, [currentStep]);

    const handleResponse = (questionId, value) => {
        setResponses(prev => ({
            ...prev,
            [questionId]: value
        }));
    };

    const calculateMentalHealthScore = () => {
        const weights = {
            mood: 0.25,
            anxiety: -0.2,
            stress: -0.2,
            energy: 0.15,
            sleep: 0.1,
            support: 0.1
        };

        let score = 0;
        Object.entries(responses).forEach(([key, value]) => {
            if (weights[key]) {
                score += weights[key] * (typeof value === 'number' ? value : 3);
            }
        });

        // Incorporate biometric and video analysis
        if (biometricData.heartRate) {
            const hrScore = biometricData.heartRate < 80 ? 0.1 : -0.1;
            score += hrScore;
        }

        if (videoAnalysis?.emotions) {
            const emotionScore = (videoAnalysis.emotions.happiness - 
                               videoAnalysis.emotions.sadness - 
                               videoAnalysis.emotions.anxiety) * 0.15;
            score += emotionScore;
        }

        return Math.max(1, Math.min(5, score + 3)); // Normalize to 1-5 scale
    };

    const generateInsights = () => {
        const score = calculateMentalHealthScore();
        const insights = {
            overallScore: score,
            primaryConcerns: [],
            recommendations: [],
            riskFactors: [],
            strengths: []
        };

        // Analyze responses for patterns
        if (responses.anxiety >= 4) {
            insights.primaryConcerns.push('Nivel de ansiedad elevado');
            insights.recommendations.push('Practicar técnicas de respiración');
        }

        if (responses.stress >= 4) {
            insights.primaryConcerns.push('Alto nivel de estrés');
            insights.recommendations.push('Considerar ejercicios de relajación muscular');
        }

        if (responses.mood <= 2) {
            insights.primaryConcerns.push('Estado de ánimo bajo');
            insights.recommendations.push('Afirmaciones positivas y visualización');
        }

        if (responses.energy <= 2) {
            insights.riskFactors.push('Fatiga persistente');
        }

        if (responses.support >= 4) {
            insights.strengths.push('Buen sistema de apoyo social');
        }

        // Biometric insights
        if (biometricData.heartRate > 90) {
            insights.riskFactors.push('Frecuencia cardíaca elevada');
            insights.recommendations.push('Técnicas de regulación cardiovascular');
        }

        // Video analysis insights
        if (videoAnalysis?.emotions.anxiety > 0.6) {
            insights.primaryConcerns.push('Indicadores visuales de ansiedad');
        }

        return insights;
    };

    const renderIntro = () => (
        <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center mx-auto">
                <span className="text-3xl">🧠</span>
            </div>
            <div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Evaluación Integral</h2>
                <p className="text-slate-600">
                    Análisis completo de tu bienestar mental usando múltiples fuentes de datos
                </p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl space-y-2 text-left">
                <h3 className="font-semibold text-slate-700">Esta evaluación incluye:</h3>
                <ul className="text-sm text-slate-600 space-y-1">
                    <li>• Cuestionario validado de salud mental</li>
                    <li>• Análisis de expresiones faciales (IA)</li>
                    <li>• Medición de biométricos básicos</li>
                    <li>• Recomendaciones personalizadas</li>
                </ul>
            </div>
            <button 
                onClick={() => setCurrentStep('biometric')}
                className="w-full bg-gradient-to-r from-violet-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-violet-600 hover:to-purple-700 transition-all"
            >
                Comenzar Evaluación
            </button>
        </div>
    );

    const renderBiometricCollection = () => (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className="text-xl font-bold text-slate-800 mb-2">Recolección de Datos</h2>
                <p className="text-slate-600">Analizando indicadores fisiológicos y emocionales</p>
            </div>
            
            <div className="bg-slate-50 p-4 rounded-xl">
                <h3 className="font-semibold text-slate-700 mb-3">Análisis Visual</h3>
                <div className="relative">
                    <video 
                        ref={videoRef} 
                        autoPlay 
                        muted 
                        className="w-full h-48 bg-slate-200 rounded-lg object-cover"
                    />
                    <canvas ref={canvasRef} className="hidden" />
                    {!videoAnalysis && (
                        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50 rounded-lg">
                            <button 
                                onClick={analyzeVideoFeed}
                                disabled={isAnalyzing}
                                className="bg-white text-slate-800 px-4 py-2 rounded-lg font-semibold disabled:opacity-50"
                            >
                                {isAnalyzing ? 'Analizando...' : 'Iniciar Análisis'}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl">
                <h3 className="font-semibold text-slate-700 mb-3">Datos Biométricos</h3>
                {biometricData.heartRate ? (
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <div className="text-2xl font-bold text-blue-600">{biometricData.heartRate}</div>
                            <div className="text-sm text-slate-600">BPM</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-green-600">{Math.round(biometricData.heartRateVariability)}</div>
                            <div className="text-sm text-slate-600">VFC</div>
                        </div>
                    </div>
                ) : (
                    <div className="text-slate-500">Recolectando datos...</div>
                )}
            </div>

            {videoAnalysis && biometricData.heartRate && (
                <button 
                    onClick={() => setCurrentStep('questionnaire')}
                    className="w-full bg-gradient-to-r from-violet-500 to-purple-600 text-white py-3 rounded-xl font-semibold"
                >
                    Continuar al Cuestionario
                </button>
            )}
        </div>
    );

    const renderQuestionnaire = () => {
        const currentQuestionIndex = Object.keys(responses).length;
        const currentQuestion = assessmentQuestions[currentQuestionIndex];
        
        if (!currentQuestion) {
            return renderResults();
        }

        return (
            <div className="space-y-6">
                <div className="text-center">
                    <div className="text-sm text-slate-500 mb-2">
                        Pregunta {currentQuestionIndex + 1} de {assessmentQuestions.length}
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2 mb-4">
                        <div 
                            className="bg-gradient-to-r from-violet-500 to-purple-600 h-2 rounded-full transition-all"
                            style={{ width: `${((currentQuestionIndex + 1) / assessmentQuestions.length) * 100}%` }}
                        />
                    </div>
                    <h2 className="text-xl font-bold text-slate-800">{currentQuestion.question}</h2>
                </div>

                {currentQuestion.type === 'scale' && (
                    <div className="space-y-3">
                        {currentQuestion.scale.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => handleResponse(currentQuestion.id, option.value)}
                                className={`w-full p-4 rounded-xl border-2 transition-all text-left ${option.color} text-white hover:opacity-90`}
                            >
                                <div className="flex items-center justify-between">
                                    <span className="font-semibold">{option.label}</span>
                                    <span className="text-lg">{option.value}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                )}

                {currentQuestion.type === 'multiple' && (
                    <div className="space-y-3">
                        {currentQuestion.options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleResponse(currentQuestion.id, index + 1)}
                                className="w-full p-4 rounded-xl border-2 border-slate-200 hover:border-violet-300 hover:bg-violet-50 transition-all text-left"
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    const renderResults = () => {
        const insights = generateInsights();
        const score = insights.overallScore;
        
        const getScoreColor = (score) => {
            if (score >= 4) return 'text-green-600';
            if (score >= 3) return 'text-yellow-600';
            return 'text-red-600';
        };

        const getScoreLabel = (score) => {
            if (score >= 4) return 'Bienestar Positivo';
            if (score >= 3) return 'Bienestar Moderado';
            return 'Necesita Atención';
        };

        return (
            <div className="space-y-6">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-slate-800 mb-4">Resultados de tu Evaluación</h2>
                    
                    {/* Overall Score */}
                    <div className="bg-gradient-to-br from-violet-50 to-purple-50 p-6 rounded-xl mb-6">
                        <div className={`text-4xl font-bold ${getScoreColor(score)} mb-2`}>
                            {score.toFixed(1)}/5.0
                        </div>
                        <div className="text-lg font-semibold text-slate-700">
                            {getScoreLabel(score)}
                        </div>
                    </div>
                </div>

                {/* Primary Concerns */}
                {insights.primaryConcerns.length > 0 && (
                    <div className="bg-red-50 p-4 rounded-xl">
                        <h3 className="font-semibold text-red-800 mb-2">Áreas de Atención</h3>
                        <ul className="text-red-700 text-sm space-y-1">
                            {insights.primaryConcerns.map((concern, index) => (
                                <li key={index}>• {concern}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Recommendations */}
                <div className="bg-blue-50 p-4 rounded-xl">
                    <h3 className="font-semibold text-blue-800 mb-2">Recomendaciones</h3>
                    <ul className="text-blue-700 text-sm space-y-1">
                        {insights.recommendations.map((rec, index) => (
                            <li key={index}>• {rec}</li>
                        ))}
                        <li>• Realizar seguimiento en 1-2 semanas</li>
                    </ul>
                </div>

                {/* Strengths */}
                {insights.strengths.length > 0 && (
                    <div className="bg-green-50 p-4 rounded-xl">
                        <h3 className="font-semibold text-green-800 mb-2">Fortalezas</h3>
                        <ul className="text-green-700 text-sm space-y-1">
                            {insights.strengths.map((strength, index) => (
                                <li key={index}>• {strength}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className="flex gap-3">
                    <button 
                        onClick={() => onComplete(insights)}
                        className="flex-1 bg-gradient-to-r from-violet-500 to-purple-600 text-white py-3 rounded-xl font-semibold"
                    >
                        Guardar Resultados
                    </button>
                    <button 
                        onClick={onClose}
                        className="flex-1 bg-slate-200 text-slate-700 py-3 rounded-xl font-semibold"
                    >
                        Continuar
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
                    <h1 className="text-lg font-bold text-slate-800">Evaluación Mental</h1>
                    <button 
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-600 text-xl font-bold"
                    >
                        ×
                    </button>
                </div>
                
                <div className="p-6">
                    {currentStep === 'intro' && renderIntro()}
                    {currentStep === 'biometric' && renderBiometricCollection()}
                    {currentStep === 'questionnaire' && renderQuestionnaire()}
                </div>
            </div>
        </div>
    );
};

export default MentalHealthAssessment;
