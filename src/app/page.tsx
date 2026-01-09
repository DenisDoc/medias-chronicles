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
  const [isLoading, setIsLoading] = useState(true);

  // Handle browser back/forward navigation
  useYearNavigation(events);

  useEffect(() => {
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
  }, []);

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

          {/* Gradient overlays */}
          <div className={styles.gradientRight}></div>
          <div className={styles.gradientLeft}></div>

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
