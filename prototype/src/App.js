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
import dataCollectionService from './services/DataCollectionService';

// --- Íconos (Simulación de lucide-react) ---
const Home = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const BarChart2 = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>;
const BookOpen = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>;
const Settings = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l-.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2l.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>;
const User = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const ArrowLeft = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>;

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

// --- Componentes de la App (Actualizados) ---
const ZenTree = () => { const [flowers, setFlowers] = useState([]); const handleClick = (e) => { e.stopPropagation(); const newFlower = { id: Date.now(), x: Math.random() * 80 + 10, y: Math.random() * 50 + 10 }; setFlowers(prev => [...prev, newFlower]); }; return ( <div className="relative w-full h-72 pb-4 cursor-pointer" onClick={handleClick}> <svg viewBox="0 0 200 200" className="w-full h-full"> <path d="M 100 200 C 100 180, 80 150, 80 120 S 90 80, 70 60" stroke="#8B5A2B" strokeWidth="5" fill="none" /> <path d="M 80 120 C 100 110, 110 100, 120 80 S 140 50, 150 40" stroke="#8B5A2B" strokeWidth="4" fill="none" /> <path d="M 70 60 C 60 50, 50 40, 40 30" stroke="#8B5A2B" strokeWidth="3" fill="none" /> {flowers.map(f => ( <circle key={f.id} cx={`${f.x}%`} cy={`${f.y}%`} r="3" fill="rgba(236, 72, 153, 0.8)" className="animate-bloom" /> ))} </svg> <p className="absolute bottom-0 w-full text-center text-slate-500 text-sm">Haz clic para ver florecer</p> <style>{`.animate-bloom { animation: bloom 0.5s ease-out forwards; } @keyframes bloom { from { transform: scale(0); opacity: 0; } to { transform: scale(1); opacity: 1; } }`}</style> </div> ); };
const AnalisisRapidoTest = ({ onFinish }) => { const [step, setStep] = useState(0); const questions = [ { q: "En una escala del 1 al 5, ¿cómo calificarías tu nivel de energía hoy?", a: ["Muy bajo", "Bajo", "Normal", "Alto", "Muy alto"] }, { q: "¿Qué emoción describe mejor tu estado de ánimo ahora mismo?", a: ["Tristeza", "Ansiedad", "Calma", "Alegría", "Irritación"] }, { q: "¿Has dedicado tiempo para ti hoy?", a: ["No, nada", "Un poco", "Lo suficiente", "Sí, bastante"] } ]; if (step >= questions.length) { return ( <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center p-8 text-center animate-fade-in"> <h2 className="text-2xl font-bold text-slate-800 mb-4">¡Gracias por compartir!</h2> <p className="text-slate-600 mb-8">Reconocer cómo te sientes es el primer paso. Recuerda ser amable contigo. Te sugerimos explorar la sección de 'Recursos' para una meditación corta.</p> <button onClick={onFinish} className="bg-violet-500 text-white font-semibold py-3 px-8 rounded-full shadow-lg">Finalizar</button> </div> ); } return ( <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center p-6 animate-fade-in"> <div className="w-full max-w-sm text-center"> <p className="font-bold text-slate-700 mb-6 text-xl">{questions[step].q}</p> <div className="space-y-3"> {questions[step].a.map(answer => ( <button key={answer} onClick={() => setStep(s => s + 1)} className="w-full bg-slate-100 text-slate-700 p-4 rounded-lg hover:bg-violet-100 hover:text-violet-700 transition-colors"> {answer} </button> ))} </div> </div> </div> ); };
const RecursoDetalle = ({ resource, onBack }) => ( <div className="fixed inset-0 bg-white z-50 p-6 animate-fade-in overflow-y-auto"> <button onClick={onBack} className="flex items-center gap-2 text-slate-600 font-semibold mb-6"> <ArrowLeft /> Volver </button> <h1 className="text-3xl font-bold text-slate-800 mb-4">{resource.title}</h1> <p className="text-slate-600 whitespace-pre-wrap leading-relaxed">{resource.content}</p> </div> );
const InicioScreen = ({ onStartTest }) => ( <div className="p-6 space-y-6 animate-fade-in text-center"> <h1 className="text-3xl font-bold text-slate-800">Hola, Usuario</h1> <p className="text-slate-500">Tómate un momento para conectar contigo.</p> <ZenTree /> <div className="bg-white/80 p-4 rounded-2xl shadow-sm"> <h2 className="font-bold text-slate-700 mb-2">Análisis Rápido</h2> <p className="text-sm text-slate-500 mb-3">Evalúa tu estado emocional actual.</p> <button onClick={onStartTest} className="w-full bg-violet-500 text-white text-sm font-semibold py-2 rounded-lg hover:bg-violet-600 transition-colors">Comenzar Test</button> </div> </div> );

const RecursosScreen = ({ onSelectResource }) => {
    const resources = {
        Articulos: [
            { id: 1, title: "Técnica de Respiración 4-7-8", short: "Calma tu sistema nervioso en minutos.", content: "1. Siéntate o acuéstate en una posición cómoda.\n2. Cierra los ojos suavemente.\n3. Inhala por la nariz durante 4 segundos.\n4. Sostén la respiración durante 7 segundos.\n5. Exhala completamente por la boca durante 8 segundos, haciendo un sonido suave.\n6. Repite el ciclo 3-5 veces." },
            { id: 2, title: "Meditación de Escaneo Corporal", short: "Conecta con tu cuerpo y libera tensión.", content: "1. Encuentra una posición cómoda.\n2. Cierra los ojos y lleva tu atención a los dedos de tus pies.\n3. Nota cualquier sensación sin juzgar: calor, frío, hormigueo.\n4. Lentamente, mueve tu atención hacia arriba: tobillos, piernas, rodillas, etc.\n5. Continúa subiendo por todo tu cuerpo hasta llegar a la coronilla.\n6. Tómate tu tiempo en cada parte, simplemente observando." },
            { id: 3, title: "Manejo de la Ansiedad Social", short: "Pasos prácticos para sentirte más seguro.", content: "La ansiedad social es común. Empieza por identificar los pensamientos negativos automáticos. Cuestiónalos: ¿son 100% ciertos? Luego, practica la exposición gradual. Empieza con situaciones de bajo riesgo, como saludar a un vecino, y avanza poco a poco. Recuerda que la otra persona probablemente no te está juzgando tan duramente como tú mismo." },
        ],
        Podcasts: [
            { id: 4, title: "Podcast: Entiende Tu Mente", short: "Psicología y bienestar en 20 minutos.", content: "Un podcast popular que explora temas de psicología de manera accesible. Busca 'Entiende Tu Mente' en tu plataforma de podcasts favorita para empezar a escuchar." },
        ]
    };
    return (
        <div className="p-6 space-y-6 animate-fade-in">
            <h1 className="text-3xl font-bold text-slate-800 mb-4">Recursos</h1>
            <div>
                <h2 className="text-xl font-bold text-slate-700 mb-3">Artículos y Técnicas</h2>
                {resources.Articulos.map(r => (
                    <div key={r.id} onClick={() => onSelectResource(r)} className="bg-white/80 p-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow cursor-pointer mb-3">
                        <h3 className="font-bold text-slate-700">{r.title}</h3>
                        <p className="text-sm text-slate-500">{r.short}</p>
                    </div>
                ))}
            </div>
            <div>
                <h2 className="text-xl font-bold text-slate-700 mb-3">Podcasts Recomendados</h2>
                {resources.Podcasts.map(r => (
                    <div key={r.id} onClick={() => onSelectResource(r)} className="bg-white/80 p-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow cursor-pointer mb-3">
                        <h3 className="font-bold text-slate-700">{r.title}</h3>
                        <p className="text-sm text-slate-500">{r.short}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- Componentes sin cambios mayores ---
const SeguimientoScreen = () => ( <div className="p-6 animate-fade-in"> <h1 className="text-3xl font-bold text-slate-800 mb-4">Tu Progreso</h1> <div className="bg-white/80 p-4 rounded-2xl shadow-sm"> <h2 className="font-bold text-slate-700 mb-2">Niveles de Estrés (Última Semana)</h2> <div className="h-40 flex items-end justify-around space-x-2 mt-4"> <div className="w-full bg-teal-300 rounded-t-lg" style={{height: '40%'}}></div> <div className="w-full bg-teal-300 rounded-t-lg" style={{height: '60%'}}></div> <div className="w-full bg-teal-300 rounded-t-lg" style={{height: '50%'}}></div> <div className="w-full bg-teal-300 rounded-t-lg" style={{height: '80%'}}></div> <div className="w-full bg-teal-300 rounded-t-lg" style={{height: '30%'}}></div> <div className="w-full bg-teal-300 rounded-t-lg" style={{height: '40%'}}></div> <div className="w-full bg-teal-300 rounded-t-lg" style={{height: '20%'}}></div> </div> </div> </div> );
const AjustesScreen = () => ( <div className="p-6 space-y-4 animate-fade-in"> <h1 className="text-3xl font-bold text-slate-800 mb-4">Ajustes</h1> <div className="bg-white/80 p-4 rounded-2xl shadow-sm flex justify-between items-center"> <span className="font-semibold text-slate-700">Notificaciones</span> <div className="w-12 h-6 bg-slate-300 rounded-full cursor-pointer p-1"><div className="w-4 h-4 bg-white rounded-full"></div></div> </div> <div className="bg-white/80 p-4 rounded-2xl shadow-sm flex justify-between items-center"> <span className="font-semibold text-slate-700">Modo Oscuro</span> <div className="w-12 h-6 bg-slate-300 rounded-full cursor-pointer p-1"><div className="w-4 h-4 bg-white rounded-full"></div></div> </div> <div className="bg-white/80 p-4 rounded-2xl shadow-sm"> <p className="text-sm text-slate-600">Privacidad de Datos</p> </div> </div> );
const PerfilScreen = () => ( <div className="p-6 space-y-4 text-center animate-fade-in"> <User className="w-24 h-24 mx-auto text-slate-500 bg-white rounded-full p-2"/> <h1 className="text-2xl font-bold text-slate-800">Usuario de ECHO</h1> <p className="text-slate-500">Miembro desde 2024</p> </div> );
const BottomNav = ({ activeScreen, setActiveScreen }) => { const navItems = [ { id: 'inicio', icon: Home, label: 'Inicio' }, { id: 'seguimiento', icon: BarChart2, label: 'Seguimiento' }, { id: 'recursos', icon: BookOpen, label: 'Recursos' }, { id: 'ajustes', icon: Settings, label: 'Ajustes' }, { id: 'perfil', icon: User, label: 'Perfil' }, ]; return ( <div className="absolute bottom-0 left-0 right-0 h-20 bg-white/70 backdrop-blur-md rounded-t-3xl flex justify-around items-center shadow-top"> {navItems.map(item => ( <button key={item.id} onClick={() => setActiveScreen(item.id)} className="flex flex-col items-center justify-center space-y-1"> <item.icon className={`w-7 h-7 transition-colors ${activeScreen === item.id ? 'text-violet-600' : 'text-slate-400'}`} /> <span className={`text-xs font-semibold transition-colors ${activeScreen === item.id ? 'text-violet-600' : 'text-slate-400'}`}>{item.label}</span> </button> ))} </div> ); };

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
            case 'inicio': return <InicioScreen onStartTest={() => setIsTestActive(true)} />;
            case 'recursos': return <RecursosScreen onSelectResource={setActiveResource} />;
            case 'seguimiento': return <SeguimientoScreen onShowAnalytics={() => setShowAnalytics(true)} />;
            case 'ajustes': return <AjustesScreen />;
            case 'perfil': return <PerfilScreen />;
            default: return <InicioScreen onStartTest={() => setIsTestActive(true)} />;
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
                
                <main className="flex-grow overflow-y-auto pb-24">
                    {renderScreen()}
                </main>
                
                {activeScreen === 'inicio' && (
                    <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10">
                        <button onClick={() => setIsHubOpen(true)} className="bg-gradient-to-br from-rose-500 to-orange-400 text-white font-bold py-4 px-6 rounded-full shadow-xl hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-rose-300 transition-all duration-300 transform hover:scale-110 flex items-center gap-3">
                            Momento de Calma
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