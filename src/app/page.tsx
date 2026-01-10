'use client';

import { Suspense, useState, useEffect } from 'react';
import { getTimelineData, generateSidebarNavigation } from '@/utils/timelineData';
import LayoutWrapper from '@/components/layout/LayoutWrapper';
import TimelineSection from '@/components/timeline/TimelineSection';
import EndMarker from '@/components/timeline/EndMarker';
import TimelineAnimations from '@/components/timeline/TimelineAnimations';
import GlobalBackground from '@/components/timeline/GlobalBackground';
import InitialScrollHandler from '@/components/timeline/InitialScrollHandler';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { useYearNavigation } from '@/hooks/useYearNavigation';
import styles from './page.module.scss';

function TimelineContent() {
  const events = getTimelineData();
  const navItems = generateSidebarNavigation(events);

  // Check sessionStorage to skip loading on client-side navigation
  const [isLoading, setIsLoading] = useState(() => {
    if (typeof window !== 'undefined') {
      const isClientNav = sessionStorage.getItem('__clientNavigation');
      console.log('[TimelineContent] Initializing isLoading state, __clientNavigation flag:', isClientNav);
      if (isClientNav === 'true') {
        sessionStorage.removeItem('__clientNavigation');
        console.log('[TimelineContent] Client navigation detected, skipping loading screen');
        return false;
      }
    }
    console.log('[TimelineContent] Initial page load, showing loading screen');
    return true;
  });

  // Handle browser back/forward navigation
  useYearNavigation(events);

  useEffect(() => {
    // Skip loading logic if already false
    if (!isLoading) return;

    // Minimum 1 second loading time
    const minLoadTime = 1000;
    const startTime = Date.now();

    // Check for Lenis initialization
    const checkLenis = setInterval(() => {
      const lenis = (window as any).__timelineLenis;
      const elapsed = Date.now() - startTime;

      if (lenis && elapsed >= minLoadTime) {
        clearInterval(checkLenis);
        setIsLoading(false);
      }
    }, 50);

    // Fallback: hide loading after 2 seconds even if Lenis not ready
    const timeout = setTimeout(() => {
      clearInterval(checkLenis);
      setIsLoading(false);
    }, 2000);

    return () => {
      clearInterval(checkLenis);
      clearTimeout(timeout);
    };
  }, [isLoading]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <InitialScrollHandler events={events} />
      <LayoutWrapper navItems={navItems}>
        <section className={`${styles.timeline} timeline`}>
          {/* Global background year/century (sticky) */}
          <GlobalBackground />

          {/* Timeline content with animations */}
          <div className={styles.timelineContent}>
            <TimelineAnimations>
              {events.map((event) => (
                <TimelineSection key={event.id} event={event} />
              ))}
              <EndMarker />
            </TimelineAnimations>
          </div>
        </section>
      </LayoutWrapper>
    </>
  );
}

export default function Home() {
  return (
    <div className={styles.page}>
      <Suspense fallback={<LoadingSpinner />}>
        <TimelineContent />
      </Suspense>
    </div>
  );
}
