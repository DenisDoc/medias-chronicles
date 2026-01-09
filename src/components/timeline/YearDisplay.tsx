"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./YearDisplay.module.scss";

interface YearDisplayProps {
  value: string;
  previous?: string;
}

export default function YearDisplay({ value, previous }: YearDisplayProps) {
  const stackRefs = useRef<Array<HTMLDivElement | null>>([]);
  const topRefs = useRef<Array<HTMLDivElement | null>>([]);
  const bottomRefs = useRef<Array<HTMLDivElement | null>>([]);
  const isFirstRef = useRef(true);

  const splitAndPad = (strA: string, strB: string) => {
    const a = strA.split("");
    const b = strB.split("");
    const max = Math.max(a.length, b.length);
    while (a.length < max) a.unshift("0");
    while (b.length < max) b.unshift("0");
    return { a, b };
  };

  useEffect(() => {
    const { a: digits, b: prevDigits } = splitAndPad(value, previous || value);

    for (let i = 0; i < digits.length; i++) {
      const top = topRefs.current[i];
      const bottom = bottomRefs.current[i];
      if (top) top.textContent = prevDigits[i] ?? digits[i];
      if (bottom) bottom.textContent = "";
      const stack = stackRefs.current[i];
      if (stack) gsap.set(stack, { yPercent: 0 });
    }

    isFirstRef.current = false;
  }, []);

  useEffect(() => {
    if (isFirstRef.current) return;
    if (!previous && !value) return;

    const { a: digits, b: prevDigits } = splitAndPad(value, previous || "");

    // Animate digits right-to-left with a small stagger so large jumps look coherent.
    const staggerMs = 0.04; // seconds per index
    for (let i = 0; i < digits.length; i++) {
      const stack = stackRefs.current[i];
      const top = topRefs.current[i];
      const bottom = bottomRefs.current[i];
      if (!stack || !top || !bottom) continue;

      const newDigit = digits[i] || "0";
      // Use the authoritative previous value from props for comparison
      const oldDigit = prevDigits[i] || "0";

      if (newDigit === oldDigit) {
        // Ensure bottom is cleared for unchanged slots
        bottom.textContent = "";
        continue;
      }

      bottom.textContent = newDigit;
      gsap.set(stack, { yPercent: 0 });

      // right-to-left stagger: calculate delay so the rightmost (units) animates first
      const delay = (digits.length - 1 - i) * staggerMs;

      gsap.to(stack, {
        yPercent: -50,
        duration: 0.5,
        ease: "power2.inOut",
        delay,
        onComplete: () => {
          top.textContent = newDigit;
          bottom.textContent = "";
          gsap.set(stack, { yPercent: 0 });
        },
      });
    }
  }, [value, previous]);

  const digits = value.split("");
  const prevDigits = (previous || value).split("");
  const maxLen = Math.max(digits.length, prevDigits.length);
  while (digits.length < maxLen) digits.unshift("0");
  while (prevDigits.length < maxLen) prevDigits.unshift("0");

  return (
    <div className={styles.yearDisplay} aria-hidden="false">
      {digits.map((_, i) => (
        <div className={styles.digitSlot} key={i}>
          <div
            className={styles.digitStack}
            ref={(el) => {
              stackRefs.current[i] = el;
            }}
          >
            <div
              className={styles.digitItem}
              ref={(el) => {
                topRefs.current[i] = el;
              }}
            />
            <div
              className={styles.digitItem}
              ref={(el) => {
                bottomRefs.current[i] = el;
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
