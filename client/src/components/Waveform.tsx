import { useEffect, useRef } from "react";

export function Waveform() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    window.addEventListener("resize", resize);
    resize();

    const draw = () => {
      const width = canvas.width / window.devicePixelRatio;
      const height = canvas.height / window.devicePixelRatio;

      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 2;
      
      const colors = ["rgba(99, 102, 241, 0.5)", "rgba(45, 212, 191, 0.5)", "rgba(236, 72, 153, 0.3)"];
      
      colors.forEach((color, i) => {
        ctx.strokeStyle = color;
        ctx.beginPath();
        
        for (let x = 0; x < width; x++) {
          const y = height / 2 + 
            Math.sin(x * 0.01 + time + i) * 30 * 
            Math.sin(x * 0.005 + time * 0.5); // Modulation
            
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        
        ctx.stroke();
      });

      time += 0.05;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-[200px] opacity-70"
    />
  );
}
