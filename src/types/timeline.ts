export interface TimelineEvent {
  date: string;              // "1146" or "1267-06-03"
  title: string;             // Can be empty ""
  century: string;           // "XII", "XIII", "XIV"
  info: string;              // Event description (always present)
}

export interface ProcessedTimelineEvent extends TimelineEvent {
  id: string;                // Generated from date for anchor links (e.g., "year-1146")
  hasTitle: boolean;         // Whether title should be rendered
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
