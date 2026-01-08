import { getTimelineData, generateSidebarNavigation } from '@/utils/timelineData';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import TimelineSection from '@/components/timeline/TimelineSection';
import EndMarker from '@/components/timeline/EndMarker';
import TimelineAnimations from '@/components/timeline/TimelineAnimations';
import GlobalBackground from '@/components/timeline/GlobalBackground';
import styles from './page.module.scss';

export default function Home() {
  const events = getTimelineData();
  const navItems = generateSidebarNavigation(events);

  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.main}>
        <Sidebar navItems={navItems} />

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
      </main>
    </div>
  );
}
