import timelineData from '@/data/timeline.json';
import { TimelineEntry, ProcessedTimelineEvent, CenturyGroup, SidebarNavItem } from '@/types/timeline';

/**
 * Generate stable ID from date for anchor links
 */
export function generateEventId(date: string): string {
  // Extract year from date (e.g., "1267-06-03" -> "1267", "1146" -> "1146")
  const year = date.split('-')[0];
  return `year-${year}`;
}

/**
 * Process timeline data from JSON into flattened ProcessedTimelineEvent array
 * Each TimelineEntry with multiple events in data[] is expanded into separate ProcessedTimelineEvent items
 */
export function processTimelineData(): ProcessedTimelineEvent[] {
  const entries = timelineData as TimelineEntry[];
  const processedEvents: ProcessedTimelineEvent[] = [];

  entries.forEach((entry) => {
    // Each entry can have multiple events in its data array
    entry.data.forEach((event, index) => {
      // Generate unique ID for each event
      // If it's the only event for this date: "year-1146"
      // If multiple events for same date: "year-1146-1", "year-1146-2", etc.
      const baseId = generateEventId(entry.date);
      const id = entry.data.length > 1 ? `${baseId}-${index + 1}` : baseId;

      processedEvents.push({
        // Inherited from parent entry
        date: entry.date,
        century: entry.century,

        // From the Event object
        title: event.title,
        presentation: event.presentation,
        sources: event.sources,
        context: event.context,

        // Metadata for rendering
        id,
        hasTitle: event.title.trim() !== '',
        isFirstOfDate: index === 0,
        eventIndex: index,
      });
    });
  });

  return processedEvents;
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
 * Generate sidebar navigation items with century dividers
 * Only creates ONE link per year, even if multiple events exist for that year
 */
export function generateSidebarNavigation(
  events: ProcessedTimelineEvent[]
): SidebarNavItem[] {
  const items: SidebarNavItem[] = [];
  let currentCentury: string | null = null;
  const seenYears = new Set<string>();

  events.forEach((event) => {
    const year = event.date.split('-')[0];

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

    // Only add link for the first event of each year
    if (!seenYears.has(year)) {
      seenYears.add(year);
      items.push({
        id: event.id,
        year,
        isCenturyDivider: false
      });
    }
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

/**
 * Find an event by year
 * Returns the FIRST event for that year if multiple exist
 */
export function findEventByYear(
  year: string,
  events: ProcessedTimelineEvent[]
): ProcessedTimelineEvent | null {
  // First, try to find the first event of that date
  const firstEvent = events.find(event => {
    const eventYear = event.date.split('-')[0];
    return eventYear === year && event.isFirstOfDate;
  });

  if (firstEvent) return firstEvent;

  // Fallback: return any event matching the year
  return events.find(event => {
    const eventYear = event.date.split('-')[0];
    return eventYear === year;
  }) || null;
}

/**
 * Get all available years in the timeline
 */
export function getAvailableYears(events: ProcessedTimelineEvent[]): string[] {
  return events.map(event => event.date.split('-')[0]);
}
