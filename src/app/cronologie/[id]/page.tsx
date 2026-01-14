import { getTimelineData, getEventById } from '@/utils/timelineData';
import { notFound } from 'next/navigation';
import TimelineEntry from '@/components/cronologie/TimelineEntry';

// Generate static paths for all 538 entries
export async function generateStaticParams() {
  const events = getTimelineData();
  // Return raw IDs - Next.js will handle URL encoding automatically
  return events.map((event) => ({
    id: event.id.replace('year-', '')
  }));
}

// Page metadata
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = getEventById(`year-${id}`);

  if (!event) {
    return { title: 'Cronică nu a fost găsită' };
  }

  return {
    title: `${event.date.split('-')[0]} - ${event.title}`,
    description: event.presentation.substring(0, 160),
  };
}

// Server Component - generates static HTML at build time
export default async function CronologiePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = getEventById(`year-${id}`);

  if (!event) {
    notFound();
  }

  // Get all events for navigation context
  const allEvents = getTimelineData();

  return <TimelineEntry event={event} allEvents={allEvents} />;
}
