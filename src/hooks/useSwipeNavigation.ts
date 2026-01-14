'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ProcessedTimelineEvent } from '@/types/timeline';

const SWIPE_THRESHOLD = 100; // Minimum swipe distance in pixels

export function useSwipeNavigation(
  currentId: string,
  allEvents: ProcessedTimelineEvent[]
) {
  const router = useRouter();
  const touchStartY = useRef(0);
  const isNavigating = useRef(false);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isNavigating.current) return;

      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchEndY - touchStartY.current;

      // Check if swipe meets minimum threshold
      if (Math.abs(deltaY) < SWIPE_THRESHOLD) return;

      const currentIndex = allEvents.findIndex(e => e.id === currentId);

      // Swipe down (positive deltaY) → previous entry
      if (deltaY > 0 && currentIndex > 0) {
        const prevEvent = allEvents[currentIndex - 1];
        navigateToEntry(prevEvent.id);
      }

      // Swipe up (negative deltaY) → next entry
      if (deltaY < 0 && currentIndex < allEvents.length - 1) {
        const nextEvent = allEvents[currentIndex + 1];
        navigateToEntry(nextEvent.id);
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
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
