'use client';

import { useEffect, useRef, useState } from 'react';
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
export default function InitialScrollHandler({
  events
}: InitialScrollHandlerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  /**
   * The final, validated year we want to scroll to.
   * This is intentionally separated from scrolling logic.
   */
  const [resolvedYear, setResolvedYear] = useState<string | null>(null);

  /**
   * Prevents multiple scroll attempts AFTER a successful scroll.
   * Do NOT set this too early.
   */
  const hasScrolledRef = useRef(false);

  /**
   * STEP 1:
   * Resolve the target year from the URL.
   * This effect may run multiple times — that is EXPECTED.
   */
  useEffect(() => {
    if (!events || events.length === 0) return;

    const yearParam = extractYearFromURL(searchParams);

    if (!yearParam) return;

    // Check if this is a client-side navigation (flag set by SidebarLink)
    const isClientNav = sessionStorage.getItem('__clientNavigation');
    if (isClientNav === 'true') {
      // Don't scroll, let the navigation handler in SidebarLink do it
      return;
    }

    let targetYear = yearParam;

    // If invalid year → find nearest valid one
    if (!isValidYear(yearParam, events)) {
      const nearest = findNearestYear(yearParam, events);

      if (!nearest) {
        console.warn('No valid or nearest year found, redirecting home');
        router.replace('/', { scroll: false });
        return;
      }

      console.log('Updating URL to nearest valid year:', nearest);

      router.replace(`/?year=${nearest}`, { scroll: false });
      targetYear = nearest;
    }

    setResolvedYear(targetYear);
  }, [searchParams, events, router]);

  /**
   * STEP 2:
   * Perform the actual scroll.
   * This MUST wait until the DOM element exists.
   */
  useEffect(() => {
    if (!resolvedYear) return;
    if (hasScrolledRef.current) return;

    const selector = `[data-year="${resolvedYear}"]`;
    const targetEl = document.querySelector(selector);

    if (!targetEl) {
      /**
       * DOM is not ready yet.
       * Retry on the next animation frame.
       */
      requestAnimationFrame(() => {
        setResolvedYear(resolvedYear);
      });
      return;
    }

    /**
     * Perform scroll only when the element exists.
     * Use `auto` to avoid fighting scroll-driven animations.
     */
    targetEl.scrollIntoView({ behavior: 'auto', block: 'start'});

    /**
     * Lock scrolling ONLY after success.
     */
    hasScrolledRef.current = true;
  }, [resolvedYear]);

  return null;
}