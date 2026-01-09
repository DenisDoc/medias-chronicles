'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './OdometerDigit.module.scss';

interface OdometerDigitProps {
  value: number;
  previous?: number;
}

export default function OdometerDigit({ value, previous }: OdometerDigitProps) {
  const digitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (digitRef.current && previous !== undefined && previous !== value) {
      const element = digitRef.current;

      // Animate from previous to current value
      gsap.fromTo(
        element,
        { y: '-100%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 0.3, ease: 'power2.out' }
      );
    }
  }, [value, previous]);

  return (
    <div className={styles.digit} ref={digitRef}>
      {value}
    </div>
  );
}
