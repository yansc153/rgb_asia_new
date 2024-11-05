import React, { useEffect, useRef } from 'react';

const ASCIIBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    const rgbAscii = [
      "██████╗     ██████╗     ██████╗ ",
      "██╔══██╗    ██╔══██╗    ██╔══██╗",
      "██████╔╝    ██╔═══╗     ██████╔╝",
      "██╔══██╗    ██╔══██╗    ██╔══██╗",
      "██║  ██║    ██████╔╝    ██████╔╝",
      "╚═╝  ╚═╝    ╚═════╝     ╚═════╝ "
    ];

    // Matrix rain effect with multiple layers
    const layers = [
      { fontSize: 14, speed: 1, opacity: 0.15, chars: "01" },
      { fontSize: 20, speed: 1.5, opacity: 0.1, chars: "アイウエオカキクケコ" },
      { fontSize: 16, speed: 0.8, opacity: 0.12, chars: "RGB" }
    ];

    const drops: number[][] = layers.map(layer => 
      new Array(Math.floor(canvas.width / layer.fontSize)).fill(0)
    );

    // Hexagon grid
    const hexagons: { x: number; y: number; size: number; rotation: number }[] = [];
    const hexagonCount = 20;
    for (let i = 0; i < hexagonCount; i++) {
      hexagons.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 30 + 10,
        rotation: Math.random() * Math.PI * 2
      });
    }

    // Wave effect for ASCII art
    let waveOffset = 0;
    const waveSpeed = 0.05;
    const waveAmplitude = 10;

    // Particle system
    const particles: { x: number; y: number; vx: number; vy: number; life: number }[] = [];
    const particleCount = 50;

    // Glitch effect
    let glitchTimeout: number | null = null;
    let isGlitching = false;

    const createGlitch = () => {
      if (isGlitching) return;
      isGlitching = true;
      
      setTimeout(() => {
        isGlitching = false;
      }, 150);

      glitchTimeout = window.setTimeout(() => {
        createGlitch();
      }, Math.random() * 2000 + 500);
    };

    createGlitch();

    const drawMatrixRain = () => {
      ctx.fillStyle = 'rgba(13, 2, 8, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      layers.forEach((layer, layerIndex) => {
        ctx.fillStyle = `rgba(0, 255, 65, ${layer.opacity})`;
        ctx.font = `${layer.fontSize}px monospace`;

        drops[layerIndex].forEach((drop, i) => {
          const char = layer.chars[Math.floor(Math.random() * layer.chars.length)];
          const x = i * layer.fontSize;
          const y = drop * layer.fontSize;

          ctx.fillText(char, x, y);

          if (y > canvas.height && Math.random() > 0.95) {
            drops[layerIndex][i] = 0;
          }
          drops[layerIndex][i] += layer.speed;
        });
      });
    };

    const drawHexagons = () => {
      ctx.strokeStyle = 'rgba(0, 255, 65, 0.1)';
      ctx.lineWidth = 1;

      hexagons.forEach(hex => {
        ctx.save();
        ctx.translate(hex.x, hex.y);
        ctx.rotate(hex.rotation += 0.002);
        
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const angle = (i * Math.PI) / 3;
          const x = hex.size * Math.cos(angle);
          const y = hex.size * Math.sin(angle);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();
        ctx.restore();

        // Move hexagons
        hex.y += 0.5;
        if (hex.y > canvas.height + hex.size) {
          hex.y = -hex.size;
          hex.x = Math.random() * canvas.width;
        }
      });
    };

    const drawParticles = () => {
      // Add new particles
      while (particles.length < particleCount) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          life: 1
        });
      }

      // Update and draw particles
      ctx.strokeStyle = 'rgba(0, 255, 65, 0.2)';
      particles.forEach((particle, i) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life -= 0.01;

        if (particle.life <= 0) {
          particles.splice(i, 1);
          return;
        }

        // Connect nearby particles
        particles.forEach(other => {
          const dx = other.x - particle.x;
          const dy = other.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        });
      });
    };

    const drawRGBAscii = () => {
      ctx.font = '28px monospace';
      const baseColor = isGlitching 
        ? `rgba(${Math.random() * 255}, 255, ${Math.random() * 255}, 0.4)`
        : 'rgba(0, 255, 65, 0.4)';
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const startX = centerX - 200;
      const startY = centerY - 80;

      rgbAscii.forEach((line, index) => {
        const yOffset = Math.sin(waveOffset + index * 0.5) * waveAmplitude;
        
        if (!isGlitching) {
          ctx.fillStyle = 'rgba(0, 255, 65, 0.1)';
          ctx.fillText(line, startX + 2, startY + index * 35 + yOffset + 2);
        }

        ctx.fillStyle = baseColor;
        const glitchOffset = isGlitching ? Math.random() * 10 - 5 : 0;
        const glitchY = isGlitching ? Math.random() * 5 - 2.5 : 0;
        ctx.fillText(line, startX + glitchOffset, startY + index * 35 + yOffset + glitchY);

        if (!isGlitching && Math.random() > 0.85) {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
          ctx.fillText(line, startX, startY + index * 35 + yOffset);
        }
      });

      waveOffset += waveSpeed;
    };

    const drawGlitchEffect = () => {
      if (!isGlitching) return;

      for (let i = 0; i < 5; i++) {
        ctx.fillStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, 255, 0.1)`;
        ctx.fillRect(
          Math.random() * canvas.width,
          Math.random() * canvas.height,
          Math.random() * 200,
          Math.random() * 10
        );
      }

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      const offset = Math.floor(Math.random() * 50);
      
      for (let i = 0; i < pixels.length; i += 4) {
        if (Math.random() > 0.99) {
          pixels[i] = pixels[i + offset] || pixels[i];
          pixels[i + 1] = pixels[i + 1 + offset] || pixels[i + 1];
        }
      }
      
      ctx.putImageData(imageData, 0, 0);
    };

    const draw = () => {
      drawMatrixRain();
      drawHexagons();
      drawParticles();
      drawRGBAscii();
      drawGlitchEffect();
    };

    const interval = setInterval(draw, 33);

    return () => {
      clearInterval(interval);
      if (glitchTimeout) clearTimeout(glitchTimeout);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none opacity-70"
    />
  );
};

export default ASCIIBackground;