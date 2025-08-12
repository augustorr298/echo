import React, { useState, useEffect, useRef } from 'react';

// --- Estructura de Carpetas (Revisada) ---
// src/
// ├── App.js                  (Componente principal)
// ├── components/
// │   ├── CrisisHubModal.js     (Modal que se abre al necesitar ayuda)
// │   ├── BreathingExercise.js
// │   ├── GroundingExercise.js
// │   └── CalmingCanvas.js
// └── icons/
//     └── CalmIcon.js           (Nuevo ícono)

// --- Ícono de Calma (Nuevo) ---
// src/icons/CalmIcon.js
const CalmIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" strokeOpacity="0.8"/>
        <path d="M7 12C7 12 9 14 12 14C15 14 17 12 17 12" strokeOpacity="0.8"/>
    </svg>
);

// --- Componente de Ejercicio de Respiración ---
// src/components/BreathingExercise.js
const BreathingExercise = ({ onBack }) => {
    const [text, setText] = useState('Prepárate...');
    
    useEffect(() => {
        const sequence = [
            { text: 'Inhala...', duration: 4000 },
            { text: 'Sostén', duration: 4000 },
            { text: 'Exhala...', duration: 4000 },
            { text: 'Sostén', duration: 4000 },
        ];
        
        let currentIndex = 0;
        const interval = setInterval(() => {
            setText(sequence[currentIndex].text);
            currentIndex = (currentIndex + 1) % sequence.length;
        }, 4000);
        
        setTimeout(() => setText('Inhala...'), 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 bg-gradient-to-br from-sky-200 to-sky-300 flex flex-col items-center justify-center z-30 p-4">
            <div className="relative w-64 h-64 flex items-center justify-center">
                <div className="absolute w-full h-full bg-gradient-to-br from-sky-400 to-sky-500 rounded-full animate-breathe shadow-2xl"></div>
                <p className="z-10 text-4xl font-light text-white">{text}</p>
            </div>
            <button
                onClick={onBack}
                className="mt-16 bg-white/80 backdrop-blur-sm text-sky-800 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-white transition-all duration-300"
            >
                Me siento mejor
            </button>
            <style>{`
                @keyframes breathe {
                    0%, 100% { transform: scale(0.8); opacity: 0.8; }
                    25% { transform: scale(1); opacity: 1; }
                    50%, 75% { transform: scale(1); opacity: 1; }
                }
                .animate-breathe {
                    animation: breathe 16s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
};

// --- Componente de Ejercicio de Anclaje (Grounding) ---
// src/components/GroundingExercise.js
const GroundingExercise = ({ onBack }) => {
    const exercises = [
        { instruction: "Respira profundo. Ahora, nombra...", emphasis: "5 cosas", detail: "que puedas ver a tu alrededor." },
        { instruction: "Concéntrate en lo que escuchas. ¿Cuáles son...", emphasis: "4 sonidos", detail: "que puedes oír ahora mismo?" },
        { instruction: "Activa tu sentido del tacto. Siente...", emphasis: "3 cosas", detail: "que estén a tu alcance." },
        { instruction: "¿Qué puedes oler? Identifica...", emphasis: "2 aromas", detail: "distintos en el aire." },
        { instruction: "Finalmente, ¿cuál es...", emphasis: "1 cosa", detail: "que puedas saborear?" },
        { instruction: "Estás en el presente. Estás a salvo.", emphasis: "", detail: "" },
    ];
    const [step, setStep] = useState(0);

    const handleNext = () => {
        if (step < exercises.length - 1) {
            setStep(step + 1);
        } else {
            onBack();
        }
    };

    return (
        <div className="fixed inset-0 bg-gradient-to-br from-emerald-200 to-teal-200 flex flex-col items-center justify-center z-30 p-8 text-center">
            <div className="max-w-lg bg-white/50 backdrop-blur-sm p-8 md:p-12 rounded-3xl shadow-lg">
                <p className="text-3xl md:text-4xl text-teal-800 leading-relaxed font-light">
                    {exercises[step].instruction}{' '}
                    <span className="font-semibold text-teal-900">{exercises[step].emphasis}</span>
                    {' '}{exercises[step].detail}
                </p>
            </div>
            <button
                onClick={handleNext}
                className="mt-12 bg-white text-teal-700 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-emerald-50 transition-colors duration-300"
            >
                {step === exercises.length - 1 ? "He terminado" : "Siguiente"}
            </button>
        </div>
    );
};

// --- Componente de Lienzo Relajante ---
// src/components/CalmingCanvas.js
const CalmingCanvas = ({ onBack }) => {
    const canvasRef = useRef(null);
    const particles = useRef([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        
        const mouse = { x: null, y: null };
        
        const handleInteraction = (x, y) => {
            mouse.x = x;
            mouse.y = y;
            for (let i = 0; i < 5; i++) {
                particles.current.push(new Particle(mouse.x, mouse.y));
            }
        };

        const handleMouseMove = (event) => handleInteraction(event.x, event.y);
        const handleTouchMove = (event) => {
            event.preventDefault();
            const touch = event.touches[0];
            handleInteraction(touch.clientX, touch.clientY);
        };

        class Particle {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.size = Math.random() * 6 + 1;
                this.speedX = Math.random() * 2 - 1;
                this.speedY = Math.random() * 2 - 1;
                this.color = `hsla(${Math.random() * 60 + 220}, 80%, 70%, 0.8)`;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.size > 0.2) this.size -= 0.1;
            }
            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particles.current.length; i++) {
                particles.current[i].update();
                particles.current[i].draw();
                if (particles.current[i].size <= 0.3) {
                    particles.current.splice(i, 1);
                    i--;
                }
            }
            animationFrameId = requestAnimationFrame(animate);
        };
        animate();

        window.addEventListener('resize', resizeCanvas);
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('touchmove', handleTouchMove, { passive: false });

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('touchmove', handleTouchMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="fixed inset-0 bg-gradient-to-br from-indigo-200 to-purple-200 z-30">
            <canvas ref={canvasRef} className="w-full h-full"></canvas>
            <div className="absolute inset-0 flex flex-col items-center justify-end p-8 pointer-events-none">
                 <p className="text-purple-800 text-lg mb-4 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full">Dibuja en la pantalla con tu dedo.</p>
                <button
                    onClick={onBack}
                    className="bg-white text-purple-700 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-indigo-50 transition-colors duration-300 pointer-events-auto"
                >
                    Listo
                </button>
            </div>
        </div>
    );
};

// --- Componente del Modal de Crisis ---
// src/components/CrisisHubModal.js
const CrisisHubModal = ({ onSelectTool, onClose }) => {
    return (
        <div className="fixed inset-0 bg-slate-900 bg-opacity-70 flex flex-col items-center justify-center z-20 p-4 backdrop-blur-md">
            <div className="w-full max-w-md text-center">
                <h2 className="text-3xl font-light text-white mb-2">Tranquil@, todo está bien.</h2>
                <p className="text-lg text-slate-300 mb-8">Elige una herramienta para encontrar calma.</p>
                
                <div className="space-y-4">
                    <button onClick={() => onSelectTool('breathing')} className="w-full bg-gradient-to-br from-sky-500 to-cyan-400 text-white p-6 rounded-2xl text-left text-xl font-semibold hover:from-sky-600 hover:to-cyan-500 transition-all transform hover:scale-105 shadow-lg">
                        Respira conmigo
                    </button>
                    <button onClick={() => onSelectTool('grounding')} className="w-full bg-gradient-to-br from-emerald-500 to-teal-400 text-white p-6 rounded-2xl text-left text-xl font-semibold hover:from-emerald-600 hover:to-teal-500 transition-all transform hover:scale-105 shadow-lg">
                        Anclaje a tierra (5-4-3-2-1)
                    </button>
                    <button onClick={() => onSelectTool('canvas')} className="w-full bg-gradient-to-br from-indigo-500 to-purple-400 text-white p-6 rounded-2xl text-left text-xl font-semibold hover:from-indigo-600 hover:to-purple-500 transition-all transform hover:scale-105 shadow-lg">
                        Un momento de distracción
                    </button>
                </div>
            </div>
            <button onClick={onClose} className="absolute top-6 right-6 text-white bg-slate-700/50 rounded-full w-10 h-10 flex items-center justify-center text-2xl font-bold hover:bg-slate-600/50 transition-colors">
                &times;
            </button>
        </div>
    );
};

// --- Componente Principal de la App ---
// src/App.js
export default function App() {
    const [isHubOpen, setIsHubOpen] = useState(false);
    const [activeTool, setActiveTool] = useState(null);

    const handleSelectTool = (tool) => {
        setIsHubOpen(false);
        setActiveTool(tool);
    };

    const handleBackToMain = () => {
        setActiveTool(null);
    };

    const renderActiveTool = () => {
        switch (activeTool) {
            case 'breathing':
                return <BreathingExercise onBack={handleBackToMain} />;
            case 'grounding':
                return <GroundingExercise onBack={handleBackToMain} />;
            case 'canvas':
                return <CalmingCanvas onBack={handleBackToMain} />;
            default:
                return null;
        }
    };

    return (
        <div className="relative bg-slate-100 min-h-screen font-sans text-slate-800 flex flex-col items-center justify-center p-4 overflow-hidden">
            {/* Fondo decorativo */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-violet-50 via-rose-50 to-teal-50 -z-10"></div>
            <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-violet-200/50 rounded-full filter blur-3xl opacity-50"></div>
            <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-rose-200/50 rounded-full filter blur-3xl opacity-50"></div>

            <div className="text-center z-10">
                <h1 className="text-5xl font-bold mb-2 text-slate-700">Aura</h1>
                <p className="text-slate-500 text-lg">Tu espacio para la claridad emocional.</p>
            </div>

            <div className="my-8 p-6 bg-white/60 backdrop-blur-md rounded-2xl shadow-sm w-full max-w-lg text-center z-10">
                <p className="text-slate-600">Aquí estará tu diario y tu registro de emociones.</p>
            </div>

            {/* Botón de Calma */}
            <div className="fixed bottom-0 left-0 right-0 flex justify-center p-6 z-10">
                 <button
                    onClick={() => setIsHubOpen(true)}
                    className="bg-gradient-to-br from-rose-500 to-orange-400 text-white font-bold py-4 px-6 rounded-full shadow-xl hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-rose-300 transition-all duration-300 transform hover:scale-110 flex items-center gap-3"
                    aria-label="Abrir centro de ayuda"
                >
                    <CalmIcon />
                    <span>Momento de Calma</span>
                </button>
            </div>
           
            {isHubOpen && <CrisisHubModal onSelectTool={handleSelectTool} onClose={() => setIsHubOpen(false)} />}
            
            {renderActiveTool()}
        </div>
    );
}
