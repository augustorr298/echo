import React, { useState, useEffect, useRef } from 'react';
import { 
  ProgressiveMuscleRelaxation, 
  SoundTherapy, 
  ColorTherapy, 
  MindfulWalking, 
  VisualizationJourney 
} from './components/AdvancedCalmingTools';
import MentalHealthAssessment from './components/MentalHealthAssessment';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import RecursosScreen from './components/RecursosScreen';
import InicioScreen from './components/InicioScreen';
import SeguimientoScreen from './components/SeguimientoScreen';
import AjustesScreen from './components/AjustesScreen';
import PerfilScreen from './components/PerfilScreen';
import BottomNav from './components/BottomNav';
import ZenTree from './components/ZenTree';
import AnalisisRapidoTest from './components/AnalisisRapidoTest';
import RecursoDetalle from './components/RecursoDetalle';
import { ArrowLeft, Home, BarChart2, BookOpen, Settings, User } from './components/icons';
import dataCollectionService from './services/DataCollectionService';

// --- Componentes de Herramientas de Calma ---
const BreathingExercise = ({ onBack }) => { const [text, setText] = useState('Prepárate...'); useEffect(() => { const sequence = ['Inhala...', 'Sostén', 'Exhala...', 'Sostén']; let i = 0; const timer = setInterval(() => { i = (i + 1) % 4; setText(sequence[i]); }, 4000); setTimeout(() => setText('Inhala...'), 500); return () => clearInterval(timer); }, []); return <div className="fixed inset-0 bg-gradient-to-br from-sky-200 to-sky-300 flex flex-col items-center justify-center z-50 p-4"><div className="relative w-64 h-64 flex items-center justify-center"><div className="absolute w-full h-full bg-gradient-to-br from-sky-400 to-sky-500 rounded-full animate-breathe shadow-2xl"></div><p className="z-10 text-4xl font-light text-white">{text}</p></div><button onClick={onBack} className="mt-16 bg-white/80 backdrop-blur-sm text-sky-800 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-white transition-all duration-300">Me siento mejor</button><style>{`.animate-breathe { animation: breathe 16s ease-in-out infinite; } @keyframes breathe { 0%, 100% { transform: scale(0.8); opacity: 0.8; } 25% { transform: scale(1); opacity: 1; } 50% { transform: scale(1); opacity: 1; } 75% { transform: scale(0.8); opacity: 0.8; } }`}</style></div>; };
const GroundingExercise = ({ onBack }) => { const [step, setStep] = useState(0); const exercises = [ { instruction: "Respira profundo. Ahora, nombra...", emphasis: "5 cosas", detail: "que puedas ver a tu alrededor." }, { instruction: "Concéntrate en lo que escuchas. ¿Cuáles son...", emphasis: "4 sonidos", detail: "que puedes oír ahora mismo?" }, { instruction: "Activa tu sentido del tacto. Siente...", emphasis: "3 cosas", detail: "que estén a tu alcance." }, { instruction: "¿Qué puedes oler? Identifica...", emphasis: "2 aromas", detail: "distintos en el aire." }, { instruction: "Finalmente, ¿cuál es...", emphasis: "1 cosa", detail: "que puedas saborear?" }, { instruction: "Estás en el presente. Estás a salvo.", emphasis: "", detail: "" }, ]; const handleNext = () => { if (step < exercises.length - 1) { setStep(step + 1); } else { onBack(); } }; return <div className="fixed inset-0 bg-gradient-to-br from-emerald-200 to-teal-200 flex flex-col items-center justify-center z-50 p-8 text-center"><div className="max-w-lg bg-white/50 backdrop-blur-sm p-8 md:p-12 rounded-3xl shadow-lg"><p className="text-3xl md:text-4xl text-teal-800 leading-relaxed font-light">{exercises[step].instruction}{' '}<span className="font-semibold text-teal-900">{exercises[step].emphasis}</span>{' '}{exercises[step].detail}</p></div><button onClick={handleNext} className="mt-12 bg-white text-teal-700 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-emerald-50 transition-colors duration-300">{step === exercises.length - 1 ? "He terminado" : "Siguiente"}</button></div>; };
const CalmingCanvas = ({ onBack }) => { const canvasRef = useRef(null); useEffect(() => { const canvas = canvasRef.current; const ctx = canvas.getContext('2d'); let animationFrameId; const particles = []; const resizeCanvas = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }; resizeCanvas(); class Particle { constructor(x, y) { this.x = x; this.y = y; this.size = Math.random() * 5 + 1; this.speedX = Math.random() * 2 - 1; this.speedY = Math.random() * 2 - 1; this.color = `hsla(${Math.random() * 60 + 220}, 80%, 70%, 0.8)`; } update() { this.x += this.speedX; this.y += this.speedY; if (this.size > 0.2) this.size -= 0.1; } draw() { ctx.fillStyle = this.color; ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill(); } } const handleInteraction = (x, y) => { for (let i = 0; i < 5; i++) particles.push(new Particle(x, y)); }; const handleMouseMove = e => handleInteraction(e.clientX, e.clientY); const handleTouchMove = e => { e.preventDefault(); handleInteraction(e.touches[0].clientX, e.touches[0].clientY); }; const animate = () => { ctx.clearRect(0, 0, canvas.width, canvas.height); for (let i = 0; i < particles.length; i++) { particles[i].update(); particles[i].draw(); if (particles[i].size <= 0.3) { particles.splice(i, 1); i--; } } animationFrameId = requestAnimationFrame(animate); }; animate(); window.addEventListener('resize', resizeCanvas); canvas.addEventListener('mousemove', handleMouseMove); canvas.addEventListener('touchmove', handleTouchMove, { passive: false }); return () => { window.removeEventListener('resize', resizeCanvas); canvas.removeEventListener('mousemove', handleMouseMove); canvas.removeEventListener('touchmove', handleTouchMove); cancelAnimationFrame(animationFrameId); }; }, []); return <div className="fixed inset-0 bg-gradient-to-br from-indigo-200 to-purple-200 z-50"><canvas ref={canvasRef} className="w-full h-full"></canvas><div className="absolute inset-0 flex flex-col items-center justify-end p-8 pointer-events-none"><p className="text-purple-800 text-lg mb-4 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full">Dibuja en la pantalla con tu dedo.</p><button onClick={onBack} className="bg-white text-purple-700 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-indigo-50 transition-colors duration-300 pointer-events-auto">Listo</button></div></div>; };

const PositiveAffirmations = ({ onBack }) => {
    const affirmations = [
        "Estoy haciendo lo mejor que puedo, y eso es suficiente.",
        "Merezco sentir paz y tranquilidad.",
        "Soy capaz de superar los desafíos que se presenten.",
        "Elijo enfocarme en lo positivo.",
        "Cada respiración que tomo me llena de calma.",
        "Soy fuerte, valiente y resiliente."
    ];
    const [index, setIndex] = useState(0);
    const nextAffirmation = () => setIndex((prev) => (prev + 1) % affirmations.length);

    return (
        <div className="fixed inset-0 bg-gradient-to-br from-amber-200 to-yellow-300 flex flex-col items-center justify-center z-50 p-8 text-center">
            <div className="max-w-lg bg-white/50 backdrop-blur-sm p-8 md:p-12 rounded-3xl shadow-lg">
                <p className="text-3xl md:text-4xl text-amber-800 leading-relaxed font-light">"{affirmations[index]}"</p>
            </div>
            <button onClick={nextAffirmation} className="mt-12 bg-white text-amber-700 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-yellow-50 transition-colors duration-300">Siguiente</button>
            <button onClick={onBack} className="mt-4 text-sm text-amber-800/80">Volver</button>
        </div>
    );
};

const CrisisHubModal = ({ onSelectTool, onClose }) => {
    const [showAdvanced, setShowAdvanced] = useState(false);

    const basicTools = [
        { id: 'breathing', name: 'Respira conmigo', gradient: 'from-sky-500 to-cyan-400', hoverGradient: 'hover:from-sky-600 hover:to-cyan-500' },
        { id: 'grounding', name: 'Anclaje a tierra (5-4-3-2-1)', gradient: 'from-emerald-500 to-teal-400', hoverGradient: 'hover:from-emerald-600 hover:to-teal-500' },
        { id: 'affirmations', name: 'Afirmaciones Positivas', gradient: 'from-amber-500 to-yellow-400', hoverGradient: 'hover:from-amber-600 hover:to-yellow-500' },
        { id: 'canvas', name: 'Un momento de distracción', gradient: 'from-indigo-500 to-purple-400', hoverGradient: 'hover:from-indigo-600 hover:to-purple-500' }
    ];

    const advancedTools = [
        { id: 'muscle-relaxation', name: 'Relajación Muscular Progresiva', gradient: 'from-violet-500 to-purple-400', hoverGradient: 'hover:from-violet-600 hover:to-purple-500' },
        { id: 'sound-therapy', name: 'Terapia de Sonidos', gradient: 'from-slate-600 to-slate-500', hoverGradient: 'hover:from-slate-700 hover:to-slate-600' },
        { id: 'color-therapy', name: 'Cromoterapia', gradient: 'from-pink-500 to-rose-400', hoverGradient: 'hover:from-pink-600 hover:to-rose-500' },
        { id: 'mindful-walking', name: 'Caminata Consciente', gradient: 'from-green-500 to-emerald-400', hoverGradient: 'hover:from-green-600 hover:to-emerald-500' },
        { id: 'visualization', name: 'Viaje de Visualización', gradient: 'from-blue-500 to-indigo-400', hoverGradient: 'hover:from-blue-600 hover:to-indigo-500' }
    ];

    const currentTools = showAdvanced ? advancedTools : basicTools;

    return (
        <div className="fixed inset-0 bg-slate-900 bg-opacity-70 flex flex-col items-center justify-center z-40 p-4 backdrop-blur-md">
            <div className="w-full max-w-md text-center">
                <h2 className="text-3xl font-light text-white mb-2">Tranquil@, todo está bien.</h2>
                <p className="text-lg text-slate-300 mb-6">Elige una herramienta para encontrar calma.</p>
                
                {/* Toggle between basic and advanced tools */}
                <div className="flex bg-slate-800 rounded-lg p-1 mb-6">
                    <button 
                        onClick={() => setShowAdvanced(false)}
                        className={`flex-1 py-2 px-4 rounded-md text-sm font-semibold transition-all ${
                            !showAdvanced ? 'bg-white text-slate-800' : 'text-slate-300 hover:text-white'
                        }`}
                    >
                        Básicas
                    </button>
                    <button 
                        onClick={() => setShowAdvanced(true)}
                        className={`flex-1 py-2 px-4 rounded-md text-sm font-semibold transition-all ${
                            showAdvanced ? 'bg-white text-slate-800' : 'text-slate-300 hover:text-white'
                        }`}
                    >
                        Avanzadas
                    </button>
                </div>

                <div className="space-y-3 max-h-80 overflow-y-auto">
                    {currentTools.map((tool) => (
                        <button 
                            key={tool.id}
                            onClick={() => onSelectTool(tool.id)} 
                            className={`w-full bg-gradient-to-br ${tool.gradient} text-white p-4 rounded-xl text-left text-lg font-semibold ${tool.hoverGradient} transition-all transform hover:scale-105 shadow-lg`}
                        >
                            {tool.name}
                        </button>
                    ))}
                </div>
            </div>
            <button onClick={onClose} className="absolute top-6 right-6 text-white bg-slate-700/50 rounded-full w-10 h-10 flex items-center justify-center text-2xl font-bold hover:bg-slate-600/50 transition-colors">&times;</button>
        </div>
    );
};

// --- Componente Principal de la App (Lógica Actualizada) ---
export default function App() {
    const [activeScreen, setActiveScreen] = useState('inicio');
    const [isHubOpen, setIsHubOpen] = useState(false);
    const [activeTool, setActiveTool] = useState(null);
    const [isTestActive, setIsTestActive] = useState(false);
    const [showAnalytics, setShowAnalytics] = useState(false);
    const [activeResource, setActiveResource] = useState(null);

    // Initialize data collection service
    useEffect(() => {
        dataCollectionService.initialize();
    }, []);

    const handleAssessmentComplete = (results) => {
        // Save assessment results
        dataCollectionService.saveAssessment(results);
        setIsTestActive(false);
        
        // Show results or redirect to recommendations
        console.log('Assessment completed:', results);
    };

    const handleInterventionComplete = (type, duration, effectiveness) => {
        // Track intervention usage
        dataCollectionService.saveInterventionUsage(type, duration, effectiveness);
    };

    const renderScreen = () => {
        switch (activeScreen) {
            case 'inicio': return <InicioScreen 
                onStartTest={() => setIsTestActive(true)} 
                onStartBreathing={() => setActiveTool('breathing')} 
            />;
            case 'recursos': return <RecursosScreen onSelectResource={setActiveResource} />;
            case 'seguimiento': return <SeguimientoScreen onShowAnalytics={() => setShowAnalytics(true)} />;
            case 'ajustes': return <AjustesScreen />;
            case 'perfil': return <PerfilScreen />;
            default: return <InicioScreen 
                onStartTest={() => setIsTestActive(true)} 
                onStartBreathing={() => setActiveTool('breathing')} 
            />;
        }
    };

    const renderActiveTool = () => {
        switch (activeTool) {
            case 'breathing': return <BreathingExercise onBack={() => setActiveTool(null)} />;
            case 'grounding': return <GroundingExercise onBack={() => setActiveTool(null)} />;
            case 'canvas': return <CalmingCanvas onBack={() => setActiveTool(null)} />;
            case 'affirmations': return <PositiveAffirmations onBack={() => setActiveTool(null)} />;
            case 'muscle-relaxation': return <ProgressiveMuscleRelaxation onBack={() => setActiveTool(null)} />;
            case 'sound-therapy': return <SoundTherapy onBack={() => setActiveTool(null)} />;
            case 'color-therapy': return <ColorTherapy onBack={() => setActiveTool(null)} />;
            case 'mindful-walking': return <MindfulWalking onBack={() => setActiveTool(null)} />;
            case 'visualization': return <VisualizationJourney onBack={() => setActiveTool(null)} />;
            default: return null;
        }
    };

    return (
        <div className="w-full min-h-screen bg-slate-200 flex items-center justify-center p-4 font-sans">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-violet-100 via-rose-100 to-teal-100 -z-10 animate-bg-pan"></div>
            <div className="relative w-full max-w-sm h-[800px] bg-slate-100 rounded-[40px] shadow-2xl overflow-hidden border-8 border-slate-800 flex flex-col">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-6 bg-slate-800 rounded-b-xl z-20"></div>
                
                <main className="flex-grow overflow-y-auto">
                    {renderScreen()}
                </main>
                
                {activeScreen === 'inicio' && (
                    <div className="px-6 py-2 pb-24 bg-gradient-to-t from-slate-200/50 to-transparent">
                        <button 
                            onClick={() => setIsHubOpen(true)} 
                            className="w-full bg-gradient-to-r from-rose-500 to-orange-400 text-white font-bold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-rose-300 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                        >
                            ༄ Momento de Calma ༄ 
                        </button>
                    </div>
                )}

                <BottomNav activeScreen={activeScreen} setActiveScreen={setActiveScreen} />
            </div>

            {isHubOpen && <CrisisHubModal onSelectTool={(tool) => { setIsHubOpen(false); setActiveTool(tool); }} onClose={() => setIsHubOpen(false)} />}
            {renderActiveTool()}
            {isTestActive && <MentalHealthAssessment onComplete={handleAssessmentComplete} onClose={() => setIsTestActive(false)} />}
            {showAnalytics && <AnalyticsDashboard onClose={() => setShowAnalytics(false)} />}
            {activeResource && <RecursoDetalle resource={activeResource} onBack={() => setActiveResource(null)} />}
            
            <style>{`
                .shadow-top { box-shadow: 0 -4px 15px rgba(0,0,0,0.05); }
                .animate-fade-in { animation: fadeIn 0.5s ease-in-out; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
                .animate-bg-pan {
                    background-size: 400% 400%;
                    animation: bg-pan 25s ease infinite;
                }
                @keyframes bg-pan {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
            `}</style>
        </div>
    );
}