import React, { useState } from 'react';
import { saveTestResult } from './firestoreHelpers';
const questions = [
  { q: "En una escala del 1 al 5, ¿cómo calificarías tu nivel de energía hoy?", a: ["Muy bajo", "Bajo", "Normal", "Alto", "Muy alto"] },
  { q: "¿Qué emoción describe mejor tu estado de ánimo ahora mismo?", a: ["Tristeza", "Ansiedad", "Calma", "Alegría", "Irritación"] },
  { q: "¿Has dedicado tiempo para ti hoy?", a: ["No, nada", "Un poco", "Lo suficiente", "Sí, bastante"] }
];
const AnalisisRapidoTest = ({ onFinish }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [saving, setSaving] = useState(false);
  const handleAnswer = async (answer) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setSaving(true);
      try {
        await saveTestResult({ answers: newAnswers });
      } catch (e) {
        // Optionally handle error
      }
      setSaving(false);
      onFinish();
    }
  };
  if (step >= questions.length) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center p-8 text-center animate-fade-in">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">¡Gracias por compartir!</h2>
        <p className="text-slate-600 mb-8">Reconocer cómo te sientes es el primer paso. Recuerda ser amable contigo. Te sugerimos explorar la sección de 'Recursos' para una meditación corta.</p>
        <button onClick={onFinish} className="bg-violet-500 text-white font-semibold py-3 px-8 rounded-full shadow-lg">Finalizar</button>
      </div>
    );
  }
  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center p-6 animate-fade-in">
      <div className="w-full max-w-sm text-center">
        <p className="font-bold text-slate-700 mb-6 text-xl">{questions[step].q}</p>
        <div className="space-y-3">
          {questions[step].a.map(answer => (
            <button key={answer} onClick={() => handleAnswer(answer)} className="w-full bg-slate-100 text-slate-700 p-4 rounded-lg hover:bg-violet-100 hover:text-violet-700 transition-colors">
              {answer}
            </button>
          ))}
        </div>
      </div>
      {saving && <div className="mt-4 text-slate-400">Guardando...</div>}
    </div>
  );
};
export default AnalisisRapidoTest;
