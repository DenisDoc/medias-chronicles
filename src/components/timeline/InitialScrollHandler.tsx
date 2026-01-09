'use client';

import { useEffect, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ProcessedTimelineEvent } from '@/types/timeline';
import {
  extractYearFromURL,
  isValidYear,
  findNearestYear,
  getEventIdFromYear,
} from '@/utils/urlNavigation';

interface InitialScrollHandlerProps {
  events: ProcessedTimelineEvent[];
}

export default function InitialScrollHandler({ events }: InitialScrollHandlerProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const hasScrolledRef = useRef(false);

  useEffect(() => {
    if (hasScrolledRef.current) return;
    if (typeof window === 'undefined') return;

    const yearParam = extractYearFromURL(searchParams);
    if (!yearParam) return;

    let targetYear = yearParam;

    // Validate year and find nearest if invalid
    if (!isValidYear(yearParam, events)) {
      targetYear = findNearestYear(yearParam, events);

      // Update URL to the valid nearest year
      if (targetYear) {
        router.replace(`/?year=${targetYear}`, { scroll: false });
      } else {
        // If no valid year found, go to home
        router.replace('/', { scroll: false });
        return;
      }
    }

    // Wait for Lenis to be ready with polling
    const checkLenis = setInterval(() => {
      const lenis = (window as any).__timelineLenis;
      if (!lenis) return;

      clearInterval(checkLenis);

      const targetId = getEventIdFromYear(targetYear);
      const target = document.getElementById(targetId);
      if (!target) return;

      const scrollContainer = document.querySelector('.timeline') as HTMLElement;
      if (!scrollContainer) return;

      // Calculate scroll position to center the target
      const containerRect = scrollContainer.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      const scrollTop = scrollContainer.scrollTop;

      // Center the target with a small offset from top
      const offset =
        targetRect.top -
        containerRect.top +
        scrollTop -
        containerRect.height / 2 +
        targetRect.height / 2;

      // Scroll using Lenis with smooth animation
      lenis.scrollTo(offset, {
        duration: 1.5,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });

      hasScrolledRef.current = true;
    }, 50);

    // Cleanup: Stop polling after 2 seconds
    const timeout = setTimeout(() => {
      clearInterval(checkLenis);
      // If Lenis never loaded, fall back to native scroll
      if (!hasScrolledRef.current) {
        const targetId = getEventIdFromYear(targetYear);
        const target = document.getElementById(targetId);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'center' });
          hasScrolledRef.current = true;
        }
      }
    }, 2000);

    return () => {
      clearInterval(checkLenis);
      clearTimeout(timeout);
    };
  }, [searchParams, events, router]);

  return null; // No UI rendered
}
