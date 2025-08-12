import React, { useRef, useEffect } from 'react';
const CalmingCanvas = ({ onBack }) => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    const particles = [];
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 5 + 1;
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
    const handleInteraction = (x, y) => {
      for (let i = 0; i < 5; i++) particles.push(new Particle(x, y));
    };
    const handleMouseMove = e => handleInteraction(e.clientX, e.clientY);
    const handleTouchMove = e => {
      e.preventDefault();
      handleInteraction(e.touches[0].clientX, e.touches[0].clientY);
    };
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        if (particles[i].size <= 0.3) {
          particles.splice(i, 1);
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
    <div className="fixed inset-0 bg-gradient-to-br from-indigo-200 to-purple-200 z-50">
      <canvas ref={canvasRef} className="w-full h-full"></canvas>
      <div className="absolute inset-0 flex flex-col items-center justify-end p-8 pointer-events-none">
        <p className="text-purple-800 text-lg mb-4 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full">Dibuja en la pantalla con tu dedo.</p>
        <button onClick={onBack} className="bg-white text-purple-700 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-indigo-50 transition-colors duration-300 pointer-events-auto">Listo</button>
      </div>
    </div>
  );
};
export default CalmingCanvas;
