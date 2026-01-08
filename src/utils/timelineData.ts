import timelineData from '@/data/timeline.json';
import { TimelineEvent, ProcessedTimelineEvent, CenturyGroup, SidebarNavItem } from '@/types/timeline';

/**
 * Generate stable ID from date for anchor links
 */
export function generateEventId(date: string): string {
  // Extract year from date (e.g., "1267-06-03" -> "1267", "1146" -> "1146")
  const year = date.split('-')[0];
  return `year-${year}`;
}

/**
 * Process raw timeline data
 * Adds id and hasTitle flags to each event
 */
export function processTimelineData(): ProcessedTimelineEvent[] {
  return (timelineData as TimelineEvent[]).map(event => ({
    ...event,
    id: generateEventId(event.date),
    hasTitle: event.title.trim() !== ''
  }));
}

/**
 * Group events by century for rendering
 */
export function groupEventsByCentury(events: ProcessedTimelineEvent[]): CenturyGroup[] {
  const groups: Map<string, ProcessedTimelineEvent[]> = new Map();

  events.forEach(event => {
    const existing = groups.get(event.century) || [];
    groups.set(event.century, [...existing, event]);
  });

  return Array.from(groups.entries()).map(([century, events]) => ({
    century,
    events,
    firstEventId: events[0].id
  }));
}

/**
 * Generate sidebar navigation items
 * Logic: Show all events, insert century dividers when century changes
 * The first event of each century will be styled larger via CSS/className
 */
export function generateSidebarNavigation(
  events: ProcessedTimelineEvent[]
): SidebarNavItem[] {
  const items: SidebarNavItem[] = [];
  let currentCentury: string | null = null;

  events.forEach((event) => {
    // Insert century divider when century changes (including before first event)
    if (event.century !== currentCentury) {
      items.push({
        id: `century-divider-${event.century}`,
        year: '',
        isCenturyDivider: true,
        century: event.century
      });

      currentCentury = event.century;
    }

    // Add event link
    const year = event.date.split('-')[0];
    items.push({
      id: event.id,
      year,
      isCenturyDivider: false
    });
  });

  return items;
}

/**
 * Check if this is the first event of a century
 * Used to determine larger sidebar link styling
 */
export function isFirstEventOfCentury(
  events: ProcessedTimelineEvent[],
  currentEvent: ProcessedTimelineEvent
): boolean {
  const centuryEvents = events.filter(e => e.century === currentEvent.century);
  return centuryEvents[0]?.id === currentEvent.id;
}

/**
 * Get all timeline events (main export for SSG)
 */
export function getTimelineData(): ProcessedTimelineEvent[] {
  return processTimelineData();
}
