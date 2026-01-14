'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getTimelineData } from '@/utils/timelineData';
import LoadingSpinner from '@/components/common/LoadingSpinner';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Get first timeline entry
    const events = getTimelineData();
    const firstEvent = events[0];

    if (!firstEvent) {
      return;
    }

    // Client-side redirect to first entry
    const firstId = firstEvent.id.replace('year-', '');
    router.replace(`/cronologie/${firstId}`);
  }, [router]);

  return <LoadingSpinner />;
}
