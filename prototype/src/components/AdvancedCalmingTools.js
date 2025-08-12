import React, { useState, useEffect, useRef } from 'react';

// Progressive Muscle Relaxation Tool
export const ProgressiveMuscleRelaxation = ({ onBack }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [timer, setTimer] = useState(15);
  
  const muscleGroups = [
    { name: "Pies y pantorrillas", instruction: "Tensa los músculos de tus pies y pantorrillas. Mantén la tensión..." },
    { name: "Muslos y glúteos", instruction: "Ahora tensa los músculos de tus muslos y glúteos. Siente la tensión..." },
    { name: "Abdomen", instruction: "Contrae tu abdomen como si alguien fuera a golpearte. Mantén..." },
    { name: "Brazos y puños", instruction: "Cierra los puños y tensa todos los músculos de tus brazos..." },
    { name: "Hombros y cuello", instruction: "Levanta los hombros hacia las orejas, tensa el cuello..." },
    { name: "Rostro", instruction: "Arruga la frente, cierra fuerte los ojos, aprieta la mandíbula..." },
    { name: "Todo el cuerpo", instruction: "Ahora tensa todo tu cuerpo a la vez. Cada músculo tenso..." }
  ];

  useEffect(() => {
    let interval;
    if (isActive && timer > 0) {
      interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsActive(false);
      setTimer(15);
      if (currentStep < muscleGroups.length - 1) {
        setTimeout(() => setCurrentStep(currentStep + 1), 2000);
      }
    }
    return () => clearInterval(interval);
  }, [isActive, timer, currentStep, muscleGroups.length]);

  const startExercise = () => {
    setIsActive(true);
    setTimer(15);
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 flex flex-col items-center justify-center z-50 p-8 text-center">
      <div className="max-w-lg bg-white/60 backdrop-blur-sm p-8 rounded-3xl shadow-lg">
        <h2 className="text-2xl font-bold text-indigo-800 mb-4">Relajación Muscular</h2>
        <h3 className="text-xl font-semibold text-indigo-700 mb-6">{muscleGroups[currentStep].name}</h3>
        
        <div className="relative w-32 h-32 mx-auto mb-6">
          <div className={`absolute w-full h-full rounded-full border-4 border-indigo-300 ${isActive ? 'animate-pulse' : ''}`}>
            <div className="w-full h-full bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white text-2xl font-bold">{isActive ? timer : '15'}</span>
            </div>
          </div>
        </div>

        <p className="text-indigo-800 text-lg mb-8 leading-relaxed">
          {isActive ? muscleGroups[currentStep].instruction : "Prepárate para tensar y relajar cada grupo muscular."}
        </p>

        <div className="flex gap-4 justify-center">
          {!isActive ? (
            <button onClick={startExercise} className="bg-indigo-500 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-indigo-600 transition-colors">
              {currentStep === 0 ? "Comenzar" : "Siguiente Grupo"}
            </button>
          ) : (
            <div className="text-indigo-600 font-semibold">
              {timer > 10 ? "Tensiona" : "Relaja..."}
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-center space-x-2">
          {muscleGroups.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentStep ? 'bg-indigo-500' : 
                index < currentStep ? 'bg-indigo-300' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      <button onClick={onBack} className="mt-8 bg-white text-indigo-700 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-indigo-50 transition-colors">
        {currentStep === muscleGroups.length - 1 && !isActive ? "Finalizar" : "Volver"}
      </button>
    </div>
  );
};

// Sound Therapy Tool
export const SoundTherapy = ({ onBack }) => {
  const [selectedSound, setSelectedSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef(null);

  const sounds = [
    { id: 'rain', name: 'Lluvia suave', color: 'from-blue-400 to-blue-600', emoji: '🌧️' },
    { id: 'ocean', name: 'Olas del mar', color: 'from-cyan-400 to-blue-500', emoji: '🌊' },
    { id: 'forest', name: 'Bosque tranquilo', color: 'from-green-400 to-green-600', emoji: '🌲' },
    { id: 'birds', name: 'Canto de pájaros', color: 'from-yellow-400 to-orange-500', emoji: '🐦' },
    { id: 'fire', name: 'Chimenea crepitante', color: 'from-orange-400 to-red-500', emoji: '🔥' },
    { id: 'wind', name: 'Viento suave', color: 'from-gray-400 to-gray-600', emoji: '💨' }
  ];

  const togglePlayback = (sound) => {
    if (selectedSound === sound.id && isPlaying) {
      setIsPlaying(false);
    } else {
      setSelectedSound(sound.id);
      setIsPlaying(true);
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 flex flex-col items-center justify-center z-50 p-8">
      <div className="max-w-md w-full bg-white/10 backdrop-blur-md p-8 rounded-3xl shadow-xl">
        <h2 className="text-3xl font-bold text-white mb-2 text-center">Terapia de Sonidos</h2>
        <p className="text-slate-300 text-center mb-8">Selecciona un sonido relajante</p>

        <div className="grid grid-cols-2 gap-4 mb-8">
          {sounds.map((sound) => (
            <button
              key={sound.id}
              onClick={() => togglePlayback(sound)}
              className={`p-6 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                selectedSound === sound.id && isPlaying
                  ? `bg-gradient-to-br ${sound.color} shadow-lg`
                  : 'bg-white/20 hover:bg-white/30'
              }`}
            >
              <div className="text-4xl mb-2">{sound.emoji}</div>
              <div className="text-white font-semibold text-sm">{sound.name}</div>
              {selectedSound === sound.id && isPlaying && (
                <div className="mt-2">
                  <div className="w-6 h-6 border-2 border-white rounded-full animate-spin border-t-transparent mx-auto"></div>
                </div>
              )}
            </button>
          ))}
        </div>

        {selectedSound && (
          <div className="mb-6">
            <label className="block text-white mb-2">Volumen</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
              className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        )}
      </div>

      <button onClick={onBack} className="mt-8 bg-white text-slate-800 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-slate-100 transition-colors">
        Volver
      </button>
    </div>
  );
};

// Color Therapy Tool
export const ColorTherapy = ({ onBack }) => {
  const [selectedColor, setSelectedColor] = useState('blue');
  const [intensity, setIntensity] = useState(50);

  const colors = [
    { id: 'blue', name: 'Azul - Calma', bg: 'from-blue-300 to-blue-500', benefit: 'Reduce la ansiedad y promueve la tranquilidad' },
    { id: 'green', name: 'Verde - Equilibrio', bg: 'from-green-300 to-green-500', benefit: 'Restaura el equilibrio emocional y físico' },
    { id: 'purple', name: 'Violeta - Espiritualidad', bg: 'from-purple-300 to-purple-500', benefit: 'Fomenta la introspección y meditación' },
    { id: 'pink', name: 'Rosa - Amor propio', bg: 'from-pink-300 to-pink-500', benefit: 'Aumenta la autoestima y el amor propio' },
    { id: 'yellow', name: 'Amarillo - Energía', bg: 'from-yellow-300 to-yellow-500', benefit: 'Eleva el ánimo y aumenta la energía positiva' },
    { id: 'orange', name: 'Naranja - Creatividad', bg: 'from-orange-300 to-orange-500', benefit: 'Estimula la creatividad y la confianza' }
  ];

  const currentColor = colors.find(c => c.id === selectedColor);

  return (
    <div className={`fixed inset-0 bg-gradient-to-br ${currentColor.bg} flex flex-col items-center justify-center z-50 p-8 transition-all duration-1000`}
         style={{ filter: `brightness(${intensity}%)` }}>
      
      <div className="max-w-lg bg-white/30 backdrop-blur-sm p-8 rounded-3xl shadow-lg text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Cromoterapia</h2>
        <h3 className="text-xl font-semibold text-white mb-4">{currentColor.name}</h3>
        <p className="text-white/90 text-lg mb-8 leading-relaxed">{currentColor.benefit}</p>

        <div className="mb-6">
          <label className="block text-white mb-4 font-semibold">Selecciona un color:</label>
          <div className="grid grid-cols-3 gap-3">
            {colors.map((color) => (
              <button
                key={color.id}
                onClick={() => setSelectedColor(color.id)}
                className={`p-3 rounded-lg transition-all ${
                  selectedColor === color.id 
                    ? 'ring-4 ring-white shadow-lg transform scale-105' 
                    : 'hover:scale-105'
                } bg-gradient-to-br ${color.bg}`}
                title={color.name}
              >
                <div className="w-8 h-8 rounded-full bg-white/30"></div>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <label className="block text-white mb-2 font-semibold">Intensidad del color:</label>
          <input
            type="range"
            min="30"
            max="120"
            value={intensity}
            onChange={(e) => setIntensity(e.target.value)}
            className="w-full h-3 bg-white/30 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <p className="text-white/80 text-sm">Respira profundo y permite que el color te envuelva con su energía sanadora.</p>
      </div>

      <button onClick={onBack} className="mt-8 bg-white/80 text-gray-800 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-white transition-colors">
        Volver
      </button>
    </div>
  );
};

// Mindful Walking Guide
export const MindfulWalking = ({ onBack }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isWalking, setIsWalking] = useState(false);
  const [stepCount, setStepCount] = useState(0);

  const walkingSteps = [
    { title: "Preparación", instruction: "Encuentra un lugar donde puedas caminar 10-15 pasos sin obstáculos. Puede ser dentro o fuera de casa." },
    { title: "Postura", instruction: "Párate erguido, con los pies separados al ancho de los hombros. Relaja los brazos a los costados." },
    { title: "Respiración", instruction: "Toma tres respiraciones profundas. Con cada exhalación, libera cualquier tensión de tu cuerpo." },
    { title: "Primer paso", instruction: "Levanta lentamente tu pie derecho. Siente cómo se transfiere el peso a tu pie izquierdo." },
    { title: "Movimiento consciente", instruction: "Mueve el pie derecho hacia adelante muy lentamente. Observa cada sensación." },
    { title: "Contacto", instruction: "Coloca suavemente el pie derecho en el suelo. Siente la conexión con la tierra." },
    { title: "Continúa", instruction: "Repite con el pie izquierdo. Camina como si cada paso fuera una meditación." }
  ];

  const nextStep = () => {
    if (currentStep < walkingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsWalking(true);
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-green-200 via-emerald-200 to-teal-200 flex flex-col items-center justify-center z-50 p-8">
      <div className="max-w-lg bg-white/60 backdrop-blur-sm p-8 rounded-3xl shadow-lg text-center">
        <h2 className="text-3xl font-bold text-emerald-800 mb-6">Caminata Consciente</h2>

        {!isWalking ? (
          <>
            <div className="mb-6">
              <div className="text-6xl mb-4">🚶‍♀️</div>
              <h3 className="text-xl font-semibold text-emerald-700 mb-4">
                {walkingSteps[currentStep].title}
              </h3>
              <p className="text-emerald-800 text-lg leading-relaxed">
                {walkingSteps[currentStep].instruction}
              </p>
            </div>

            <div className="flex justify-center space-x-2 mb-6">
              {walkingSteps.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    index === currentStep ? 'bg-emerald-500' : 
                    index < currentStep ? 'bg-emerald-300' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            <button 
              onClick={nextStep}
              className="bg-emerald-500 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-emerald-600 transition-colors"
            >
              {currentStep === walkingSteps.length - 1 ? "Comenzar Caminata" : "Siguiente"}
            </button>
          </>
        ) : (
          <>
            <div className="text-8xl mb-6 animate-bounce">👣</div>
            <h3 className="text-2xl font-semibold text-emerald-700 mb-4">Camina Conscientemente</h3>
            <div className="text-6xl font-bold text-emerald-600 mb-4">{stepCount}</div>
            <p className="text-emerald-800 mb-8">Pasos mindful completados</p>
            
            <button 
              onClick={() => setStepCount(stepCount + 1)}
              className="bg-emerald-500 text-white font-semibold py-4 px-8 rounded-full shadow-lg hover:bg-emerald-600 transition-colors mb-4 text-lg"
            >
              Registrar Paso
            </button>
            
            <p className="text-emerald-700 text-sm">Presiona cada vez que completes un paso consciente</p>
          </>
        )}
      </div>

      <button onClick={onBack} className="mt-8 bg-white text-emerald-700 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-emerald-50 transition-colors">
        Volver
      </button>
    </div>
  );
};

// Visualization Journey
export const VisualizationJourney = ({ onBack }) => {
  const [currentScene, setCurrentScene] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timer, setTimer] = useState(60);

  const scenes = [
    {
      title: "Playa Serena",
      description: "Estás en una playa hermosa y tranquila. Sientes la arena tibia bajo tus pies...",
      fullText: "Estás caminando por una playa hermosa y completamente tranquila. La arena es suave y tibia bajo tus pies descalzos. Puedes escuchar el sonido rítmico de las olas que llegan suavemente a la orilla. El sol está comenzando a ponerse, pintando el cielo con tonos dorados y rosados. Una brisa marina suave acaricia tu rostro, llevando consigo el aroma fresco del océano. Te sientes completamente en paz, sin preocupaciones, solo tú y la inmensidad del mar.",
      color: "from-blue-300 to-cyan-400",
      emoji: "🏖️"
    },
    {
      title: "Bosque Encantado",
      description: "Te encuentras en un sendero de bosque mágico, rodeado de árboles antiguos...",
      fullText: "Estás caminando por un sendero serpenteante en un bosque encantado. Los árboles antiguos se alzan majestuosamente a tu alrededor, sus copas formando un dosel verde que filtra suavemente la luz dorada del sol. Puedes escuchar el canto melodioso de los pájaros y el susurro gentil del viento entre las hojas. El aire es puro y fresco, lleno del aroma de la tierra húmeda y las flores silvestres. Cada paso que das te conecta más profundamente con la naturaleza y contigo mismo.",
      color: "from-green-300 to-emerald-400",
      emoji: "🌲"
    },
    {
      title: "Jardín de Paz",
      description: "Estás en un jardín secreto lleno de flores coloridas y fuentes cristalinas...",
      fullText: "Has descubierto un jardín secreto, un oasis de tranquilidad. Flores de todos los colores imaginables florecen a tu alrededor: rosas rojas, lirios blancos, lavanda púrpura. En el centro del jardín hay una fuente de agua cristalina que produce un sonido melodioso y relajante. Mariposas coloridas danzan de flor en flor, y abejas zumban suavemente mientras recolectan néctar. El aire está perfumado con la fragancia dulce de las flores. Te sientas en un banco de mármol blanco, sintiéndote completamente seguro y en armonía.",
      color: "from-pink-300 to-rose-400",
      emoji: "🌸"
    }
  ];

  useEffect(() => {
    let interval;
    if (isPlaying && timer > 0) {
      interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsPlaying(false);
      setTimer(60);
    }
    return () => clearInterval(interval);
  }, [isPlaying, timer]);

  const startVisualization = () => {
    setIsPlaying(true);
    setTimer(60);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentSceneData = scenes[currentScene];

  return (
    <div className={`fixed inset-0 bg-gradient-to-br ${currentSceneData.color} flex flex-col items-center justify-center z-50 p-8 transition-all duration-1000`}>
      <div className="max-w-2xl bg-white/40 backdrop-blur-sm p-8 rounded-3xl shadow-lg text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Viaje de Visualización</h2>
        
        <div className="text-8xl mb-6">{currentSceneData.emoji}</div>
        
        <h3 className="text-2xl font-semibold text-white mb-6">{currentSceneData.title}</h3>

        {!isPlaying ? (
          <>
            <p className="text-white text-lg mb-8 leading-relaxed">
              {currentSceneData.description}
            </p>
            
            <div className="flex justify-center space-x-2 mb-6">
              {scenes.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentScene(index)}
                  className={`w-4 h-4 rounded-full transition-all ${
                    index === currentScene ? 'bg-white' : 'bg-white/50 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>

            <button 
              onClick={startVisualization}
              className="bg-white text-gray-800 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
            >
              Comenzar Visualización
            </button>
          </>
        ) : (
          <>
            <div className="text-4xl font-bold text-white mb-6">{formatTime(timer)}</div>
            <div className="max-h-64 overflow-y-auto mb-6">
              <p className="text-white text-lg leading-relaxed px-4">
                {currentSceneData.fullText}
              </p>
            </div>
            <div className="w-full bg-white/30 rounded-full h-2 mb-6">
              <div 
                className="bg-white h-2 rounded-full transition-all duration-1000"
                style={{ width: `${((60 - timer) / 60) * 100}%` }}
              ></div>
            </div>
            <button 
              onClick={() => setIsPlaying(false)}
              className="bg-white/80 text-gray-800 font-semibold py-2 px-6 rounded-full shadow-lg hover:bg-white transition-colors"
            >
              Pausar
            </button>
          </>
        )}
      </div>

      <button onClick={onBack} className="mt-8 bg-white/80 text-gray-800 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-white transition-colors">
        Volver
      </button>
    </div>
  );
};
