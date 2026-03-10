'use client';

import { useEffect, useRef } from 'react';

interface Dot {
  x: number;
  y: number;
  r: number;
}

export default function HalftoneCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const widthRef = useRef(0);
  const heightRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    function generateHalftone(w: number, h: number) {
      const offscreen = document.createElement('canvas');
      const oCtx = offscreen.getContext('2d', { willReadFrequently: true });
      if (!oCtx) return;
      offscreen.width = w;
      offscreen.height = h;

      oCtx.fillStyle = 'black';
      oCtx.fillRect(0, 0, w, h);

      const fontSize = w * 0.18;
      oCtx.fillStyle = 'white';
      oCtx.font = `900 ${fontSize}px Inter, sans-serif`;
      oCtx.textAlign = 'center';
      oCtx.textBaseline = 'middle';
      oCtx.fillText('ECLIPSE', w / 2, h / 2);

      const imgData = oCtx.getImageData(0, 0, w, h).data;
      const step = Math.max(6, Math.floor(w / 150));
      const maxRadius = step * 0.6;

      const newDots: Dot[] = [];

      for (let y = 0; y < h; y += step) {
        for (let x = 0; x < w; x += step) {
          const i = (y * w + x) * 4;
          const brightness = imgData[i] / 255;
          const normalizedY = y / h;
          let radius = 0;
          let drawProbability = 1;

          if (brightness > 0.5) {
            radius = maxRadius * (1 - normalizedY * 0.8);
            drawProbability = 1 - normalizedY * 0.5;
          } else {
            radius = maxRadius * 0.3 * normalizedY;
            drawProbability = normalizedY * 0.8;
          }

          if (Math.random() < drawProbability) {
            const jitterX = (Math.random() - 0.5) * (normalizedY * step * 2);
            const jitterY = (Math.random() - 0.5) * (normalizedY * step * 2);
            if (radius > 0.5) {
              newDots.push({ x: x + step / 2 + jitterX, y: y + step / 2 + jitterY, r: radius });
            }
          }
        }
      }

      dotsRef.current = newDots;
    }

    function drawDots() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, widthRef.current, heightRef.current);
      ctx.fillStyle = '#F2F2F0';
      ctx.beginPath();
      for (const dot of dotsRef.current) {
        ctx.moveTo(dot.x + dot.r, dot.y);
        ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
      }
      ctx.fill();
    }

    function resize() {
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.parentElement?.clientWidth ?? 0;
      const h = canvas.parentElement?.clientHeight ?? 0;
      widthRef.current = w;
      heightRef.current = h;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      if (!ctx) return;
      ctx.scale(dpr, dpr);
      generateHalftone(w, h);
      drawDots();
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas || !ctx) return;
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const w = widthRef.current;
      const h = heightRef.current;

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = '#F2F2F0';
      ctx.beginPath();

      for (const dot of dotsRef.current) {
        const dx = dot.x - mouseX;
        const dy = dot.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 100;
        let drawX = dot.x;
        let drawY = dot.y;
        let r = dot.r;

        if (dist < maxDist && dist > 0) {
          const force = (maxDist - dist) / maxDist;
          drawX += (dx / dist) * force * 10;
          drawY += (dy / dist) * force * 10;
          r *= 1 - force * 0.5;
        }

        if (r > 0) {
          ctx.moveTo(drawX + r, drawY);
          ctx.arc(drawX, drawY, r, 0, Math.PI * 2);
        }
      }
      ctx.fill();
    };

    const handleMouseLeave = () => drawDots();

    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 100);
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    resize();
    document.fonts.ready.then(resize);

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <main className="hero-section">
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      />
    </main>
  );
}
