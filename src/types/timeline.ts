export interface TextWithUrl {
  text: string;
  url: string;
}

export interface Source {
  title: TextWithUrl;        // { text, url }
  info?: TextWithUrl;        // { text, url }
  date?: string;             // Optional reference date
  source_type?: string;      // e.g. "archive", "book", "article"
}

export interface Event {
  title: string;
  presentation: string;
  sources: Source[];
  context: Source[];
}

export interface TimelineEntry {
  date: string;              // "1146" or "1267-06-03"
  century: string;           // "XII", "XIII", "XIV"
  data: Event[];             // Array of events for this date
}

// ===============================
// Flattened / processed structures
// ===============================

// Represents a SINGLE event extracted from TimelineEntry.data
export interface TimelineEvent {
  date: string;              // Inherited from parent entry
  century: string;           // Inherited from parent entry
  title: string;             // From Event.title
  presentation: string;      // From Event.presentation
  sources: Source[];         // From Event.sources
  context: Source[];         // From Event.context
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
