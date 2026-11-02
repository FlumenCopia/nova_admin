'use client';

import { useEffect, useRef, useState } from 'react';

export default function AnimatedStatNumber({ value, duration = 1800 }) {
  const [displayValue, setDisplayValue] = useState(value);
  const elementRef = useRef(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    const rawText = String(value || '').trim();
    const target = parseInt(rawText.replace(/\D/g, ''), 10);
    const suffix = rawText.includes('+') ? '+' : (rawText.includes('%') ? '%' : '');

    // If non-numeric (e.g. "Overnight"), display directly
    if (isNaN(target)) {
      setDisplayValue(value);
      return;
    }

    // Initial starting state
    setDisplayValue(`0${suffix}`);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animatedRef.current) {
            animatedRef.current = true;
            let start = 0;
            const stepTime = 20;
            const steps = duration / stepTime;
            const increment = target / steps;

            const timer = setInterval(() => {
              start += increment;
              if (start >= target) {
                setDisplayValue(`${target}${suffix}`);
                clearInterval(timer);
              } else {
                setDisplayValue(`${Math.floor(start)}${suffix}`);
              }
            }, stepTime);
          }
        });
      },
      { threshold: 0.25 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={elementRef} className="stat-number">
      {displayValue}
    </span>
  );
}

