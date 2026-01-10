'use client';

import { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { ProcessedTimelineEvent } from '@/types/timeline';
import { extractYearFromURL, isValidYear, findNearestYear, getEventIdFromYear } from '@/utils/urlNavigation';

/**
 * Handle browser back/forward navigation
 * Listens to URL changes and scrolls to the appropriate year
 */
export function useYearNavigation(events: ProcessedTimelineEvent[]) {
  const searchParams = useSearchParams();
  const previousYearRef = useRef<string | null>(null);

  useEffect(() => {
    const handlePopState = () => {
      // Set flag to skip loading screen on browser back/forward
      sessionStorage.setItem('__clientNavigation', 'true');

      // Get current year from URL
      const currentYear = extractYearFromURL(new URLSearchParams(window.location.search));

      // Don't scroll if year hasn't changed
      if (currentYear === previousYearRef.current) return;

      previousYearRef.current = currentYear;

      if (!currentYear) {
        // No year param - scroll to top
        const scrollContainer = document.querySelector('.timeline') as HTMLElement;
        if (scrollContainer) {
          scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
        }
        return;
      }

      // Validate year and find nearest if invalid
      let targetYear = currentYear;
      if (!isValidYear(currentYear, events)) {
        targetYear = findNearestYear(currentYear, events);
        if (!targetYear) return;
      }

      // Set navigation flag to prevent IntersectionObserver updates
      const isNavigatingRef = (window as any).__isNavigating;
      if (isNavigatingRef) {
        isNavigatingRef.current = true;
      }

      // Get elements - target the content container, not the section
      const sectionId = getEventIdFromYear(targetYear);
      const contentId = `content-${sectionId}`;
      const target = document.getElementById(contentId);
      if (!target) return;

      const scrollContainer = document.querySelector('.timeline') as HTMLElement;
      if (!scrollContainer) return;

      const lenis = (window as any).__timelineLenis;

      // Calculate scroll position
      const containerRect = scrollContainer.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      const scrollTop = scrollContainer.scrollTop;
      const offset =
        targetRect.top -
        containerRect.top +
        scrollTop -
        containerRect.height / 2 +
        targetRect.height / 2;

      // Scroll with Lenis if available
      if (lenis) {
        lenis.scrollTo(offset, {
          duration: 1.5,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          onComplete: () => {
            // Clear navigation flag
            if (isNavigatingRef) {
              isNavigatingRef.current = false;
            }
          }
        });
      } else {
        // Fallback to native scroll
        scrollContainer.scrollTo({
          top: offset,
          behavior: 'smooth'
        });

        // Clear navigation flag after delay
        if (isNavigatingRef) {
          setTimeout(() => {
            isNavigatingRef.current = false;
          }, 1500);
        }
      }
    };

    // Listen to popstate events (browser back/forward)
    window.addEventListener('popstate', handlePopState);

    // Initialize previousYearRef with current year
    previousYearRef.current = extractYearFromURL(searchParams);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [events, searchParams]);
}
