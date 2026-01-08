'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './OdometerDigit.module.scss';

interface OdometerDigitProps {
  value: number;      // 0-9
  previous?: number;  // Previous value for animation
}

export default function OdometerDigit({ value, previous }: OdometerDigitProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const oldDigitRef = useRef<HTMLSpanElement>(null);
  const newDigitRef = useRef<HTMLSpanElement>(null);

  const shouldAnimate = previous !== undefined && previous !== value;

  useEffect(() => {
    if (!shouldAnimate || !wrapperRef.current) return;

    const oldDigit = oldDigitRef.current;
    const newDigit = newDigitRef.current;

    if (!oldDigit || !newDigit) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      // Skip animation, just swap
      if (oldDigit) oldDigit.style.opacity = '0';
      if (newDigit) newDigit.style.opacity = '1';
      return;
    }

    // Create flip animation timeline
    const tl = gsap.timeline();

    // Old digit slides up and fades
    tl.to(oldDigit, {
      yPercent: -100,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.inOut'
    }, 0);

    // New digit slides in from bottom
    tl.fromTo(newDigit,
      { yPercent: 100, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.6, ease: 'power2.inOut' },
      0
    );
  }, [value, previous, shouldAnimate]);

  return (
    <div className={styles.digitWrapper} ref={wrapperRef}>
      <span
        className={`${styles.digit} ${styles.digitOld}`}
        ref={oldDigitRef}
      >
        {previous ?? value}
      </span>
      {shouldAnimate && (
        <span
          className={`${styles.digit} ${styles.digitNew}`}
          ref={newDigitRef}
        >
          {value}
        </span>
      )}
    </div>
  );
}
