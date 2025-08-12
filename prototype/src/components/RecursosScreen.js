import React, { useState } from 'react';
import { BookOpen } from './icons';

// 🔥🔥🔥 UPDATED VERSION - PROPER COMPONENT FILE 🔥🔥🔥

const RecursosScreen = ({ onSelectResource }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Icons (simulated)
  const HeadphonesIcon = () => <div className="w-6 h-6 bg-purple-500 rounded-md flex items-center justify-center text-white text-xs font-bold">🎧</div>;
  const VideoIcon = () => <div className="w-6 h-6 bg-red-500 rounded-md flex items-center justify-center text-white text-xs font-bold">📹</div>;
  const PhoneIcon = () => <div className="w-6 h-6 bg-green-500 rounded-md flex items-center justify-center text-white text-xs font-bold">📞</div>;
  const HeartIcon = () => <div className="w-6 h-6 bg-pink-500 rounded-md flex items-center justify-center text-white text-xs font-bold">💝</div>;
  const BrainIcon = () => <div className="w-6 h-6 bg-indigo-500 rounded-md flex items-center justify-center text-white text-xs font-bold">🧠</div>;
  const StarIcon = () => <div className="w-6 h-6 bg-yellow-500 rounded-md flex items-center justify-center text-white text-xs font-bold">⭐</div>;
  const UsersIcon = () => <div className="w-6 h-6 bg-teal-500 rounded-md flex items-center justify-center text-white text-xs font-bold">👥</div>;
  const BookIcon = () => <div className="w-6 h-6 bg-orange-500 rounded-md flex items-center justify-center text-white"><BookOpen className="w-4 h-4" /></div>;

  const resources = [
    // Técnicas de Respiración
    {
      id: 1,
      category: 'breathing',
      type: 'Técnica',
      title: "Respiración 4-7-8",
      short: "Calma tu sistema nervioso en minutos",
      icon: <HeartIcon />,
      difficulty: "Principiante",
      duration: "5 min",
      content: "La técnica 4-7-8 es una poderosa herramienta de relajación:\n\n1. Siéntate cómodamente con la espalda recta\n2. Coloca la punta de tu lengua detrás de tus dientes superiores\n3. Exhala completamente por la boca\n4. Inhala por la nariz contando hasta 4\n5. Sostén la respiración contando hasta 7\n6. Exhala por la boca contando hasta 8\n7. Repite 3-4 ciclos\n\n💡 Consejo: Practica antes de dormir para mejorar tu descanso."
    },
    {
      id: 2,
      category: 'breathing',
      type: 'Técnica',
      title: "Respiración Cuadrada",
      short: "Equilibra tu energía y concentración",
      icon: <HeartIcon />,
      difficulty: "Principiante",
      duration: "3 min",
      content: "También conocida como respiración en caja:\n\n1. Inhala durante 4 segundos\n2. Sostén durante 4 segundos\n3. Exhala durante 4 segundos\n4. Sostén vacío durante 4 segundos\n5. Repite el ciclo\n\n✨ Ideal para momentos de estrés o antes de presentaciones importantes."
    },

    // Meditación
    {
      id: 3,
      category: 'meditation',
      type: 'Meditación',
      title: "Escaneo Corporal Completo",
      short: "Conecta con tu cuerpo y libera tensión",
      icon: <BrainIcon />,
      difficulty: "Intermedio",
      duration: "15 min",
      content: "Técnica de mindfulness para relajación profunda:\n\n1. Acuéstate en una superficie cómoda\n2. Cierra los ojos suavemente\n3. Comienza por los dedos de los pies\n4. Nota sensaciones sin juzgar\n5. Mueve lentamente hacia arriba\n6. Dedica 1-2 minutos a cada parte del cuerpo\n7. Termina en la coronilla\n\n🌟 Perfecto para liberar tensión acumulada del día."
    },
    {
      id: 4,
      category: 'meditation',
      type: 'Meditación',
      title: "Atención Plena en 5 Minutos",
      short: "Mindfulness rápido para el día a día",
      icon: <BrainIcon />,
      difficulty: "Principiante",
      duration: "5 min",
      content: "Meditación perfecta para principiantes:\n\n1. Siéntate cómodamente\n2. Cierra los ojos o mira un punto fijo\n3. Respira naturalmente\n4. Cuenta cada exhalación del 1 al 10\n5. Si te distraes, vuelve al 1\n6. Continúa durante 5 minutos\n\n💫 Practica diariamente para mejores resultados."
    },

    // Podcasts
    {
      id: 5,
      category: 'podcasts',
      type: 'Podcast',
      title: "Entiende Tu Mente",
      short: "Psicología accesible con Molo Cebrián",
      icon: <HeadphonesIcon />,
      difficulty: "Todos",
      duration: "20-30 min",
      content: "Podcast semanal sobre psicología y bienestar:\n\n📻 Disponible en: Spotify, Apple Podcasts, Google Podcasts\n🎯 Temas: Ansiedad, autoestima, relaciones, estrés\n👨‍⚕️ Presentador: Molo Cebrián (psicólogo)\n\n🔥 Episodios recomendados:\n• 'Cómo gestionar la ansiedad'\n• 'El poder de la autocompasión'\n• 'Técnicas para dormir mejor'"
    },

    // Videos
    {
      id: 6,
      category: 'videos',
      type: 'Video',
      title: "Yoga para la Ansiedad",
      short: "15 minutos de movimiento consciente",
      icon: <VideoIcon />,
      difficulty: "Principiante",
      duration: "15 min",
      content: "Secuencia de yoga diseñada para calmar la mente:\n\n🧘‍♀️ Instructor: Xuan Lan (Yoga con Xuan)\n📺 Plataforma: YouTube\n🎯 Beneficios: Reduce cortisol, mejora flexibilidad\n\n🌟 Incluye:\n• Respiración consciente\n• Posturas de apertura de pecho\n• Torsiones suaves\n• Relajación final\n\n💡 Ideal para practicar por las mañanas o antes de dormir."
    },

    // Líneas de Ayuda
    {
      id: 7,
      category: 'emergency',
      type: 'Emergencia',
      title: "Teléfono de la Esperanza",
      short: "717 003 717 - Apoyo emocional 24/7",
      icon: <PhoneIcon />,
      difficulty: "Crisis",
      duration: "Disponible 24h",
      content: "Servicio gratuito de apoyo emocional:\n\n📞 Número: 717 003 717\n⏰ Horario: 24 horas, 365 días\n🆓 Coste: Completamente gratuito\n🌍 Cobertura: Nacional (España)\n\n💝 Servicios:\n• Escucha activa y apoyo emocional\n• Orientación en crisis\n• Información sobre recursos locales\n• Chat online también disponible\n\n🆘 Llama si sientes que necesitas hablar con alguien de inmediato."
    },

    // Apps Recomendadas
    {
      id: 8,
      category: 'apps',
      type: 'App',
      title: "Headspace",
      short: "Meditación y mindfulness para todos",
      icon: <StarIcon />,
      difficulty: "Todos",
      duration: "3-60 min",
      content: "App líder en meditación y bienestar:\n\n📱 Disponible: iOS y Android\n💰 Modelo: Freemium (contenido gratis + premium)\n🌟 Rating: 4.8/5 estrellas\n\n🎯 Características:\n• Meditaciones guiadas desde 3 minutos\n• Programas específicos (sueño, ansiedad, enfoque)\n• Historias para dormir\n• Música para concentrarse\n• Recordatorios personalizables\n\n✨ Ideal para crear un hábito de meditación diario."
    }
  ];

  const categories = [
    { id: 'all', name: 'Todos', icon: '🌟' },
    { id: 'breathing', name: 'Respiración', icon: '🫁' },
    { id: 'meditation', name: 'Meditación', icon: '🧘' },
    { id: 'podcasts', name: 'Podcasts', icon: '🎧' },
    { id: 'videos', name: 'Videos', icon: '📹' },
    { id: 'emergency', name: 'Emergencia', icon: '🆘' },
    { id: 'apps', name: 'Apps', icon: '📱' }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.short.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Principiante': return 'bg-green-100 text-green-800';
      case 'Intermedio': return 'bg-yellow-100 text-yellow-800';
      case 'Avanzado': return 'bg-red-100 text-red-800';
      case 'Crisis': return 'bg-red-500 text-white';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-slate-800">Recursos de Bienestar</h1>
        <p className="text-slate-500">Herramientas, técnicas y apoyo para tu salud mental</p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Buscar recursos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 pl-10 bg-white/80 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-300"
        />
        <div className="absolute left-3 top-3.5 text-slate-400">🔍</div>
      </div>

      {/* Category Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
              selectedCategory === category.id
                ? 'bg-violet-500 text-white shadow-md'
                : 'bg-white/80 text-slate-600 hover:bg-violet-100'
            }`}
          >
            <span className="text-sm">{category.icon}</span>
            <span className="text-sm font-medium">{category.name}</span>
          </button>
        ))}
      </div>

      {/* Resources Grid */}
      <div className="space-y-4">
        {filteredResources.map(resource => (
          <div
            key={resource.id}
            onClick={() => onSelectResource(resource)}
            className="bg-white/90 backdrop-blur-sm p-5 rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer border border-slate-100 hover:border-violet-200"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                {resource.icon}
              </div>
              
              <div className="flex-grow min-w-0">
                <div className="flex items-start gap-2 mb-2">
                  <h3 className="font-bold text-slate-800 text-lg flex-grow">{resource.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ${getDifficultyColor(resource.difficulty)}`}>
                    {resource.difficulty}
                  </span>
                </div>
                
                <p className="text-slate-600 text-sm mb-3 line-clamp-2">{resource.short}</p>
                
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <div className="flex items-center gap-1">
                    <span>📂</span>
                    <span>{resource.type}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>⏱️</span>
                    <span>{resource.duration}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex-shrink-0 text-slate-400">
                <span className="text-lg">→</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredResources.length === 0 && (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">🤔</div>
          <h3 className="text-lg font-semibold text-slate-700 mb-2">No encontramos recursos</h3>
          <p className="text-slate-500">Intenta con otros términos de búsqueda o categorías</p>
        </div>
      )}

      {/* Emergency Notice */}
      <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-2xl p-4 mt-8">
        <div className="flex items-center gap-3">
          <div className="text-red-500 text-xl">🆘</div>
          <div>
            <h4 className="font-semibold text-red-800">¿Necesitas ayuda inmediata?</h4>
            <p className="text-red-600 text-sm">Llama al 717 003 717 - Teléfono de la Esperanza (24h gratuito)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecursosScreen;
