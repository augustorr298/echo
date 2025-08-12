import React from 'react';
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
export default RecursosScreen;
