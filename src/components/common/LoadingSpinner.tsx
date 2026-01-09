'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './LoadingSpinner.module.scss';

export default function LoadingSpinner() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const lines = svgRef.current.querySelectorAll('.spinner-line');

    // Rotate the entire group continuously
    const rotation = gsap.to('.spinner-group', {
      rotation: 360,
      duration: 1.2,
      ease: 'none',
      repeat: -1,
    });

    // Pulse the center dot
    gsap.to('.spinner-dot', {
      scale: 1.3,
      opacity: 0.5,
      duration: 0.6,
      ease: 'power2.inOut',
      repeat: -1,
      yoyo: true,
    });

    // Stagger fade the lines
    gsap.to(lines, {
      opacity: 0.3,
      duration: 0.3,
      stagger: 0.1,
      ease: 'power2.inOut',
      repeat: -1,
      yoyo: true,
    });

    return () => {
      rotation.kill();
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
        <g className="spinner-group" transform="translate(50, 50)">
          {/* Outer circle */}
          <circle
            className="spinner-circle"
            cx="0"
            cy="0"
            r="30"
            stroke="#D5C5AB"
            strokeWidth="1.5"
            fill="none"
          />

          {/* Center dot */}
          <circle
            className="spinner-dot"
            cx="0"
            cy="0"
            r="2"
            fill="#D5C5AB"
          />

          {/* Cardinal direction lines */}
          <line className="spinner-line" x1="0" y1="-30" x2="0" y2="-25" stroke="#D5C5AB" strokeWidth="1.5" />
          <line className="spinner-line" x1="0" y1="25" x2="0" y2="30" stroke="#D5C5AB" strokeWidth="1.5" />
          <line className="spinner-line" x1="-30" y1="0" x2="-25" y2="0" stroke="#D5C5AB" strokeWidth="1.5" />
          <line className="spinner-line" x1="25" y1="0" x2="30" y2="0" stroke="#D5C5AB" strokeWidth="1.5" />

          {/* Diagonal lines */}
          <line className="spinner-line" x1="0" y1="0" x2="15" y2="-15" stroke="#D5C5AB" strokeWidth="1" />
          <line className="spinner-line" x1="0" y1="0" x2="-10" y2="10" stroke="#D5C5AB" strokeWidth="1" />
        </g>
      </svg>
      <p className={styles.text}>Încărcare...</p>
    </div>
  );
}
