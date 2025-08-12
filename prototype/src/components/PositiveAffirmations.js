import React, { useState } from 'react';
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
export default PositiveAffirmations;
