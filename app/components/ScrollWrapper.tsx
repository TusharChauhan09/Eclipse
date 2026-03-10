'use client';

import { useRef, useEffect } from 'react';

export default function ScrollWrapper({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const fill = fillRef.current;
    if (!container || !fill) return;

    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const progress = scrollHeight > clientHeight ? scrollTop / (scrollHeight - clientHeight) : 0;
      fill.style.transform = `scaleX(${progress})`;
    };

    container.addEventListener('scroll', onScroll, { passive: true });
    return () => container.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <div className="scroll-progress-track">
        <div ref={fillRef} className="scroll-progress-fill" />
      </div>
      <div ref={containerRef} className="scroll-container">
        {children}
      </div>
    </>
  );
}
