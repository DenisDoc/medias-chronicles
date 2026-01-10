import { ProcessedTimelineEvent } from '@/types/timeline';
import SourcesContextSection from './SourcesContextSection';
import styles from './TimelineSection.module.scss';

interface TimelineSectionProps {
  event: ProcessedTimelineEvent;
}

export default function TimelineSection({ event }: TimelineSectionProps) {
  // Extract just the year for display
  const year = event.date.split('-')[0];

  return (
    <section
      id={event.id}
      className={`${styles.section} ${!event.isFirstOfDate ? styles.additionalEvent : ''} timeline-section`}
      data-year={year}
      data-century={event.century}
    >
      {/* Content area */}
      <div className={`${styles.contentWrapper} timeline-content`}>
        
        <div className={styles.content} id={`content-${event.id}`}>
          <h2 className={`${styles.info} ${styles.dateMobile}`} id={`title-${event.id}`}>
            {event.date.split(('-'))[0]}
          </h2>
          <h1 className={`${styles.title} title`} id={`title-${event.id}`}>
            <span className={`${styles.titleDecoration} title-decoration`}></span>
            {event.title}
          </h1>
          <p className={`${styles.info} info`} dangerouslySetInnerHTML={{ __html: formatInfo(event.presentation) }}></p>

          {/* Sources and Context sections - render below presentation if data exists */}
          {(event.sources.length > 0 || event.context.length > 0) && (
            <SourcesContextSection
              sources={event.sources}
              context={event.context}
            />
          )}
        </div>
      </div>
    </section>
  );
}

/**
 * Format info text to handle italic emphasis
 * Converts quoted text to italic spans (simple approach)
 */
function formatInfo(info: string): string {
  // This is a simple formatter - you can enhance this to parse Romanian quotes or other formatting
  return info;
}
