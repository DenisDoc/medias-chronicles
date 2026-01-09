// New types for JSON structure
export interface Source {
  title: string;
  info?: string;
  date?: string;
  url?: string;
  source_type?: string;
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

// Updated: This now represents a SINGLE event from the data array
export interface TimelineEvent {
  date: string;              // Inherited from parent entry
  century: string;           // Inherited from parent entry
  title: string;             // From Event.title
  presentation: string;      // From Event.presentation (renamed from 'info')
  sources: Source[];         // From Event.sources
  context: Source[];         // From Event.context
}

// ProcessedTimelineEvent now includes anchor ID and flags
export interface ProcessedTimelineEvent extends TimelineEvent {
  id: string;                // Generated anchor ID (e.g., "year-1146", "year-1146-2")
  hasTitle: boolean;         // Whether title should be rendered
  isFirstOfDate: boolean;    // Whether this is the first event for this date
  eventIndex: number;        // Index within the date's data array (0, 1, 2...)
}

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
