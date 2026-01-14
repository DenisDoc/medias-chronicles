'use client';

import { ProcessedTimelineEvent } from '@/types/timeline';
import SourcesContextSection from '@/components/timeline/SourcesContextSection';
import GlobalBackground from '@/components/timeline/GlobalBackground';
import { useScrollNavigation } from '@/hooks/useScrollNavigation';
import { useSwipeNavigation } from '@/hooks/useSwipeNavigation';
import styles from './TimelineEntry.module.scss';

interface TimelineEntryProps {
  event: ProcessedTimelineEvent;
  allEvents: ProcessedTimelineEvent[];
}

export default function TimelineEntry({ event, allEvents }: TimelineEntryProps) {
  // Enable scroll-based navigation
  useScrollNavigation(event.id, allEvents);

  // Enable swipe navigation (mobile)
  useSwipeNavigation(event.id, allEvents);

  // Extract just the year for display
  const year = event.date.split('-')[0];

  return (
    <div className={styles.timelineEntry}>
      <GlobalBackground />

      <section className={styles.content}>
        <h2 className={`${styles.dateMobile} title`}>
          {year}
        </h2>

        <h1 className={`${styles.title} title`}>
          <span className={`${styles.titleDecoration} title-decoration`}></span>
          {event.title}
        </h1>

        <p className={`${styles.info} info`}
           dangerouslySetInnerHTML={{ __html: event.presentation }} />

        {(event.sources.length > 0 || event.context.length > 0) && (
          <SourcesContextSection
            sources={event.sources}
            context={event.context}
          />
        )}
      </section>
    </div>
  );
}
