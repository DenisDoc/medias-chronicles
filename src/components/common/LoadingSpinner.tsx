'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './LoadingSpinner.module.scss';

export default function LoadingSpinner() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Animate minute hand (faster, counter-clockwise)
    const minuteHand = gsap.to('.minute-hand', {
      rotation: -360,
      duration: 2,
      ease: 'none',
      repeat: -1,
      transformOrigin: '50% 100%',
    });

    // Animate hour hand (slower, counter-clockwise)
    const hourHand = gsap.to('.hour-hand', {
      rotation: -360,
      duration: 24,
      ease: 'none',
      repeat: -1,
      transformOrigin: '50% 100%',
    });

    return () => {
      minuteHand.kill();
      hourHand.kill();
    };
  }, []);

  return (
    <div className={styles.container}>
      <svg
        ref={svgRef}
        className={styles.spinner}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g transform="translate(50, 50)">
          {/* Static clock face */}
          <circle
            cx="0"
            cy="0"
            r="30"
            stroke="#D5C5AB"
            strokeWidth="1.5"
            fill="none"
          />

          {/* Cardinal direction markers (static) */}
          <line x1="0" y1="-30" x2="0" y2="-25" stroke="#D5C5AB" strokeWidth="1.5" />
          <line x1="0" y1="25" x2="0" y2="30" stroke="#D5C5AB" strokeWidth="1.5" />
          <line x1="-30" y1="0" x2="-25" y2="0" stroke="#D5C5AB" strokeWidth="1.5" />
          <line x1="25" y1="0" x2="30" y2="0" stroke="#D5C5AB" strokeWidth="1.5" />

          {/* Hour hand (slower, shorter) */}
          <line
            className="hour-hand"
            x1="0"
            y1="0"
            x2="0"
            y2="-15"
            stroke="#D5C5AB"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* Minute hand (faster, longer) */}
          <line
            className="minute-hand"
            x1="0"
            y1="0"
            x2="0"
            y2="-22"
            stroke="#D5C5AB"
            strokeWidth="1"
            strokeLinecap="round"
          />

          {/* Center dot (static) */}
          <circle
            cx="0"
            cy="0"
            r="2"
            fill="#D5C5AB"
          />
        </g>
      </svg>
    </div>
  );
}
