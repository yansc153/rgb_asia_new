import React, { useEffect, useRef } from 'react';

const CursorTrail = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef<{ x: number; y: number; }>({ x: 0, y: 0 });
  const pointsRef = useRef<Array<{ x: number; y: number; alpha: number; }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      cursorRef.current = {
        x: e.clientX,
        y: e.clientY
      };
    };

    window.addEventListener('mousemove', handleMouseMove);

    const draw = () => {
      ctx.fillStyle = 'rgba(13, 2, 8, 0.3)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add new point
      pointsRef.current.push({
        x: cursorRef.current.x,
        y: cursorRef.current.y,
        alpha: 1
      });

      // Draw points
      pointsRef.current.forEach((point, i) => {
        point.alpha *= 0.95;
        
        ctx.beginPath();
        ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 65, ${point.alpha})`;
        ctx.fill();

        // Draw line to next point
        if (i < pointsRef.current.length - 1) {
          const nextPoint = pointsRef.current[i + 1];
          ctx.beginPath();
          ctx.moveTo(point.x, point.y);
          ctx.lineTo(nextPoint.x, nextPoint.y);
          ctx.strokeStyle = `rgba(0, 255, 65, ${point.alpha * 0.5})`;
          ctx.stroke();
        }
      });

      // Remove old points
      pointsRef.current = pointsRef.current.filter(point => point.alpha > 0.01);
    };

    const interval = setInterval(draw, 16);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-50"
    />
  );
};

export default CursorTrail;