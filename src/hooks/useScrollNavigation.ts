'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ProcessedTimelineEvent } from '@/types/timeline';

function debounce(func: Function, wait: number) {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function useScrollNavigation(
  currentId: string,
  allEvents: ProcessedTimelineEvent[]
) {
  const router = useRouter();
  const isNavigating = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (isNavigating.current) return;

      const scrollTop = window.scrollY || window.pageYOffset;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;

      // Scrolled to bottom (within 50px) → navigate to next
      if (scrollTop + clientHeight >= scrollHeight - 50) {
        const currentIndex = allEvents.findIndex(e => e.id === currentId);
        if (currentIndex < allEvents.length - 1) {
          const nextEvent = allEvents[currentIndex + 1];
          navigateToEntry(nextEvent.id);
        }
      }

      // Scrolled to top (within 50px) → navigate to previous
      if (scrollTop <= 50 && scrollTop >= 0) {
        const currentIndex = allEvents.findIndex(e => e.id === currentId);
        if (currentIndex > 0) {
          const prevEvent = allEvents[currentIndex - 1];
          navigateToEntry(prevEvent.id);
        }
      }
    };

    const debouncedScroll = debounce(handleScroll, 200);
    window.addEventListener('scroll', debouncedScroll);

    return () => window.removeEventListener('scroll', debouncedScroll);
  }, [currentId, allEvents]);

  function navigateToEntry(eventId: string) {
    isNavigating.current = true;
    const cleanId = eventId.replace('year-', '');

    // Use View Transitions API if available
    if (typeof document !== 'undefined' && 'startViewTransition' in document) {
      (document as any).startViewTransition(() => {
        router.push(`/cronologie/${cleanId}`);
      });
    } else {
      router.push(`/cronologie/${cleanId}`);
    }

    // Reset navigation flag after transition
    setTimeout(() => {
      isNavigating.current = false;
    }, 1000);
  }
}
