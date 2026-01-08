'use client';

import { useState, useEffect } from 'react';
import OdometerDigit from './OdometerDigit';
import styles from './OdometerNumber.module.scss';

interface OdometerNumberProps {
  value: number | string;
  className?: string;
}

export default function OdometerNumber({ value, className }: OdometerNumberProps) {
  const [previousValue, setPreviousValue] = useState<string>(String(value));
  const currentValue = String(value);

  useEffect(() => {
    if (currentValue !== previousValue) {
      setPreviousValue(currentValue);
    }
  }, [currentValue, previousValue]);

  // Pad both values to same length for smooth transitions
  const maxLength = Math.max(currentValue.length, previousValue.length);
  const paddedCurrent = currentValue.padStart(maxLength, ' ');
  const paddedPrevious = previousValue.padStart(maxLength, ' ');

  const digits = paddedCurrent.split('');
  const prevDigits = paddedPrevious.split('');

  return (
    <div className={`${styles.odometerNumber} ${className || ''}`}>
      {digits.map((char, index) => {
        // If it's a space or non-digit, render as static text
        if (char === ' ' || isNaN(parseInt(char))) {
          return (
            <span key={index} className={styles.staticChar}>
              {char}
            </span>
          );
        }

        const digit = parseInt(char);
        const prevDigit = prevDigits[index] === ' ' || isNaN(parseInt(prevDigits[index]))
          ? undefined
          : parseInt(prevDigits[index]);

        return (
          <OdometerDigit
            key={index}
            value={digit}
            previous={prevDigit}
          />
        );
      })}
    </div>
  );
}
