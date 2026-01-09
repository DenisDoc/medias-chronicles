'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './RomanNumeralDisplay.module.scss';

interface RomanNumeralDisplayProps {
  value: string;           // e.g., "XII"
  previous?: string;       // e.g., "XI"
  className?: string;
}

// All possible Roman numeral characters in display order (kept for reference)
const ROMAN_CHARS = ['I', 'V', 'X', 'L', 'C', 'D', 'M'];

export default function RomanNumeralDisplay({ value, previous, className }: RomanNumeralDisplayProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isFirstRenderRef = useRef(true);
  const slotRefs = useRef<Array<HTMLElement | null>>([]);

  // Pad to same length. Roman numerals are left-aligned, so pad on the right.
  const maxLength = Math.max(value.length, previous?.length || 0);
  const paddedCurrent = value.padEnd(maxLength, ' ');
  const paddedPrevious = (previous || '').padEnd(maxLength, ' ');

  // debug logs removed

  const characters = paddedCurrent.split('');
  const prevCharacters = paddedPrevious.split('');

  useEffect(() => {
    // Only run animations after first mount and when previous value exists
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      return;
    }

    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // New approach: each slot contains two rows: [previous, current].
    // We animate the inner stack from 0% -> -100% to reveal the current char.
    characters.forEach((char, index) => {
      const prevChar = prevCharacters[index];
      if (char === prevChar) return; // nothing to do

      const slotStack = slotRefs.current[index];
      if (!slotStack) return;

      // If we had a previous character, animate from 0 -> -100%.
      // If there was no previous (space), just set the final position.
      if (prevChar && prevChar !== ' ') {
        gsap.fromTo(slotStack, { yPercent: 0 }, { yPercent: -100, duration: 0.6, ease: 'power2.inOut' });
      } else {
        gsap.set(slotStack, { yPercent: -100 });
      }
    });
  }, [value, previous]);

  return (
    <div className={`${styles.romanDisplay} ${className || ''}`} ref={containerRef}>
      {characters.map((char, index) => {
        if (char === ' ') {
          return (
            <span key={index} className={styles.staticSpace}>
              {' '}
            </span>
          );
        }

        const prevChar = prevCharacters[index] || ' ';
        // The stack contains two rows: previous (top) and current (bottom).
        // On initial render, if there was no previous char, we position to show current.
        const initialY = prevChar && prevChar !== ' ' ? 0 : -100;

        return (
          <div key={index} className={`${styles.romanSlot} romanSlot`}>
            <div
              className={`${styles.romanStack} romanStack`}
              data-index={index}
              ref={(el) => { slotRefs.current[index] = el; }}
              style={{ transform: `translateY(${initialY}%)` }}
            >
              <div className={styles.romanItem}>{prevChar === ' ' ? '' : prevChar}</div>
              <div className={styles.romanItem}>{char}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
