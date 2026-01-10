export interface Source {
  title: string;    // Source title
  url: string;      // Source URL
  info: string;     // Required additional info
}

export interface Event {
  title: string;
  presentation: string;
  sources: Source[];
  context: Source[];
}

export interface TimelineEntry {
  date: string;     // "1146" or "1267-06-03"
  century: string;  // "XII", "XIII", "XIV"
  data: Event[];
}

// ===============================
// Flattened / processed structures
// ===============================

export interface TimelineEvent {
  date: string;
  century: string;
  title: string;
  presentation: string;
  sources: Source[];
  context: Source[];
}

// Includes anchor ID and positional flags
export interface ProcessedTimelineEvent extends TimelineEvent {
  id: string;                // Generated anchor ID (e.g., "year-1146", "year-1146-2")
  isFirstOfDate: boolean;    // Whether this is the first event for this date
  eventIndex: number;        // Index within the date's data array (0, 1, 2...)
}

// ===============================
// Grouping & navigation
// ===============================

export interface CenturyGroup {
  century: string;           // "XII", "XIII", etc.
  events: ProcessedTimelineEvent[];
  firstEventId: string;      // For sidebar links
}

export interface SidebarNavItem {
  id: string;                // Anchor link target
  year: string;              // Display year
  isCenturyDivider: boolean; // Whether this is a divider or link
  century?: string;          // If divider, the century Roman numeral
}
