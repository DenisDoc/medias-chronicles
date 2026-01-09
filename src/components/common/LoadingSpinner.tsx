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
        viewBox="0 160 500 600"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <g opacity="0.15">
          {/* Tower body and structure */}
          <path d="M150,1200 L150,550 L160,530 L160,400 L340,400 L340,530 L350,550 L350,1200" stroke="#D5C5AB" strokeLinejoin="round" strokeWidth="1.5" fill="none" />
          <path d="M150,900 L350,900" stroke="#D5C5AB" strokeDasharray="10 10" strokeWidth="0.5" />
          <path d="M150,700 L350,700" stroke="#D5C5AB" strokeDasharray="10 10" strokeWidth="0.5" />

          {/* Clock housing */}
          <rect height="120" stroke="#D5C5AB" strokeWidth="1.5" width="180" x="160" y="400" fill="none" />

          {/* Roof/spire */}
          <path d="M160,400 L250,50 L340,400" stroke="#D5C5AB" strokeLinejoin="round" strokeWidth="1.5" fill="none" />
          <path d="M180,320 L250,120 L320,320" stroke="#D5C5AB" strokeOpacity="0.5" strokeWidth="0.5" fill="none" />
          <path d="M200,250 L250,180 L300,250" stroke="#D5C5AB" strokeOpacity="0.5" strokeWidth="0.5" fill="none" />
          <line stroke="#D5C5AB" strokeOpacity="0.5" strokeWidth="0.5" x1="250" x2="250" y1="50" y2="400" />

          {/* Side decorative elements */}
          <path d="M160,400 L140,320 L180,320 L160,400" stroke="#D5C5AB" strokeLinejoin="round" strokeWidth="1.2" fill="none" />
          <line stroke="#D5C5AB" strokeWidth="1" x1="160" x2="160" y1="320" y2="300" />
          <path d="M340,400 L320,320 L360,320 L340,400" stroke="#D5C5AB" strokeLinejoin="round" strokeWidth="1.2" fill="none" />
          <line stroke="#D5C5AB" strokeWidth="1" x1="340" x2="340" y1="320" y2="300" />
          <path d="M200,400 L190,340 L220,340 L210,400" stroke="#D5C5AB" strokeLinejoin="round" strokeWidth="1" fill="none" />
          <line stroke="#D5C5AB" strokeWidth="1" x1="205" x2="205" y1="340" y2="330" />
          <path d="M300,400 L280,340 L310,340 L290,400" stroke="#D5C5AB" strokeLinejoin="round" strokeWidth="1" fill="none" />
          <line stroke="#D5C5AB" strokeWidth="1" x1="295" x2="295" y1="340" y2="330" />

          {/* Spire top */}
          <line stroke="#D5C5AB" strokeWidth="1.5" x1="250" x2="250" y1="50" y2="10" />
          <circle cx="250" cy="10" r="3" stroke="#D5C5AB" strokeWidth="1.5" fill="none" />
        </g>

        {/* Clock face (full opacity) */}
        <circle cx="250" cy="460" r="40" stroke="#D5C5AB" strokeWidth="1.2" fill="none" />

        {/* Cardinal markers */}
        <line stroke="#D5C5AB" strokeWidth="1" x1="250" x2="250" y1="425" y2="435" />
        <line stroke="#D5C5AB" strokeWidth="1" x1="250" x2="250" y1="485" y2="495" />
        <line stroke="#D5C5AB" strokeWidth="1" x1="285" x2="275" y1="460" y2="460" />
        <line stroke="#D5C5AB" strokeWidth="1" x1="215" x2="225" y1="460" y2="460" />

        {/* Animated clock hands */}
        <g transform="translate(250, 460)">
          {/* Hour hand (slower, shorter) */}
          <line
            className="hour-hand"
            x1="0"
            y1="0"
            x2="0"
            y2="-20"
            stroke="#D5C5AB"
            strokeWidth="0.8"
            strokeLinecap="round"
          />

          {/* Minute hand (faster, longer) */}
          <line
            className="minute-hand"
            x1="0"
            y1="0"
            x2="0"
            y2="-30"
            stroke="#D5C5AB"
            strokeWidth="0.8"
            strokeLinecap="round"
          />
        </g>

        {/* Center dot */}
        <circle cx="250" cy="460" r="3" fill="#D5C5AB" />
      </svg>
    </div>
  );
}
