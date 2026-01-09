import { ProcessedTimelineEvent } from '@/types/timeline';

/**
 * Extract year from URL search parameters
 */
export function extractYearFromURL(searchParams: URLSearchParams): string | null {
  return searchParams.get('year');
}

/**
 * Check if a year string is valid and exists in the timeline
 */
export function isValidYear(
  year: string,
  events: ProcessedTimelineEvent[]
): boolean {
  const yearNum = parseInt(year, 10);
  if (isNaN(yearNum)) return false;

  return events.some(event => {
    const eventYear = event.date.split('-')[0];
    return eventYear === year;
  });
}

/**
 * Find the nearest valid year to a target year
 * Used when user visits an invalid year URL
 * Prioritizes the first event of each date
 */
export function findNearestYear(
  targetYear: string,
  events: ProcessedTimelineEvent[]
): string {
  const target = parseInt(targetYear, 10);

  // If invalid number, return first year
  if (isNaN(target) || events.length === 0) {
    return events[0]?.date.split('-')[0] || '';
  }

  let nearest = events[0];
  let minDiff = Infinity;

  // Only consider first events of each date to avoid duplicates
  events.forEach(event => {
    if (!event.isFirstOfDate) return;

    const eventYear = parseInt(event.date.split('-')[0], 10);
    const diff = Math.abs(eventYear - target);
    if (diff < minDiff) {
      minDiff = diff;
      nearest = event;
    }
  });

  return nearest.date.split('-')[0];
}

/**
 * Convert year to event ID format (year-XXXX)
 */
export function getEventIdFromYear(year: string): string {
  return `year-${year}`;
}

/**
 * Extract year from event ID
 * Handles both formats: "year-XXXX" and "year-XXXX-N" (for multiple events per year)
 * Returns: "XXXX"
 */
export function getYearFromEventId(id: string): string {
  // Remove "year-" prefix and any suffix like "-1", "-2"
  const withoutPrefix = id.replace('year-', '');
  // Extract just the year part (before any dash)
  return withoutPrefix.split('-')[0];
}
