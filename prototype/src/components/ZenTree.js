import React from 'react';
const ZenTree = () => {
  const [flowers, setFlowers] = React.useState([]);
  const handleClick = (e) => {
    e.stopPropagation();
    const newFlower = {
      id: Date.now(),
      x: Math.random() * 80 + 10,
      y: Math.random() * 50 + 10
    };
    setFlowers(prev => [...prev, newFlower]);
  };
  return (
    <div className="relative w-full h-72 pb-4 cursor-pointer" onClick={handleClick}>
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <path d="M 100 200 C 100 180, 80 150, 80 120 S 90 80, 70 60" stroke="#8B5A2B" strokeWidth="5" fill="none" />
        <path d="M 80 120 C 100 110, 110 100, 120 80 S 140 50, 150 40" stroke="#8B5A2B" strokeWidth="4" fill="none" />
        <path d="M 70 60 C 60 50, 50 40, 40 30" stroke="#8B5A2B" strokeWidth="3" fill="none" />
        {flowers.map(f => (
          <circle key={f.id} cx={`${f.x}%`} cy={`${f.y}%`} r="3" fill="rgba(236, 72, 153, 0.8)" className="animate-bloom" />
        ))}
      </svg>
      <p className="absolute bottom-0 w-full text-center text-slate-500 text-sm">Haz clic para ver florecer</p>
      <style>{`.animate-bloom { animation: bloom 0.5s ease-out forwards; } @keyframes bloom { from { transform: scale(0); opacity: 0; } to { transform: scale(1); opacity: 1; } }`}</style>
    </div>
  );
};
export default ZenTree;
