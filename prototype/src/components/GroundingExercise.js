import React, { useState } from 'react';
const GroundingExercise = ({ onBack }) => {
  const [step, setStep] = useState(0);
  const exercises = [
    { instruction: "Respira profundo. Ahora, nombra...", emphasis: "5 cosas", detail: "que puedas ver a tu alrededor." },
    { instruction: "Concéntrate en lo que escuchas. ¿Cuáles son...", emphasis: "4 sonidos", detail: "que puedes oír ahora mismo?" },
    { instruction: "Activa tu sentido del tacto. Siente...", emphasis: "3 cosas", detail: "que estén a tu alcance." },
    { instruction: "¿Qué puedes oler? Identifica...", emphasis: "2 aromas", detail: "distintos en el aire." },
    { instruction: "Finalmente, ¿cuál es...", emphasis: "1 cosa", detail: "que puedas saborear?" },
    { instruction: "Estás en el presente. Estás a salvo.", emphasis: "", detail: "" },
  ];
  const handleNext = () => {
    if (step < exercises.length - 1) {
      setStep(step + 1);
    } else {
      onBack();
    }
  };
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-emerald-200 to-teal-200 flex flex-col items-center justify-center z-50 p-8 text-center">
      <div className="max-w-lg bg-white/50 backdrop-blur-sm p-8 md:p-12 rounded-3xl shadow-lg">
        <p className="text-3xl md:text-4xl text-teal-800 leading-relaxed font-light">
          {exercises[step].instruction}{' '}
          <span className="font-semibold text-teal-900">{exercises[step].emphasis}</span>{' '}
          {exercises[step].detail}
        </p>
      </div>
      <button onClick={handleNext} className="mt-12 bg-white text-teal-700 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-emerald-50 transition-colors duration-300">
        {step === exercises.length - 1 ? "He terminado" : "Siguiente"}
      </button>
    </div>
  );
};
export default GroundingExercise;
