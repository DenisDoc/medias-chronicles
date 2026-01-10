'use client';

import { useRouter } from 'next/navigation';
import styles from './Sidebar.module.scss';

interface SidebarLinkProps {
  targetId: string;
  year: string;
  isFirstOfCentury: boolean;
  onNavigate?: () => void;
}

export default function SidebarLink({ targetId, year, isFirstOfCentury, onNavigate }: SidebarLinkProps) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    // Update URL with shallow routing (no component remount)
    router.push(`/?year=${year}`, { scroll: false });

    // Set navigation flag to prevent IntersectionObserver from updating URL
    const isNavigatingRef = (window as any).__isNavigating;
    if (isNavigatingRef) {
      isNavigatingRef.current = true;
    }

    // Target the content container, not the section
    const contentId = `content-${targetId}`;
    const target = document.getElementById(contentId);
    if (!target) return;

    // Get the timeline scroll container
    const scrollContainer = document.querySelector('.timeline') as HTMLElement;
    if (!scrollContainer) return;

    // Get the timeline's Lenis instance
    const lenis = (window as any).__timelineLenis;

    // Calculate the target scroll position
    const containerRect = scrollContainer.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const scrollTop = scrollContainer.scrollTop;

    // Calculate offset to center the target
    const offset = targetRect.top - containerRect.top + scrollTop - (containerRect.height / 2) + (targetRect.height / 2);

    // Use Lenis if available, otherwise use native scroll
    if (lenis) {
      lenis.scrollTo(offset, {
        duration: 1.5,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        onComplete: () => {
          // Clear navigation flag when scroll completes
          if (isNavigatingRef) {
            isNavigatingRef.current = false;
          }
        }
      });

      // Close menu after scroll completes (1.5s + small delay for safety)
      if (onNavigate) {
        setTimeout(onNavigate, 1000);
      }
    } else {
      scrollContainer.scrollTo({
        top: offset,
        behavior: 'smooth'
      });

      // Clear navigation flag after native scroll
      if (isNavigatingRef) {
        setTimeout(() => {
          isNavigatingRef.current = false;
        }, 1500);
      }

      // Close menu after scroll (assume ~1s for smooth scroll)
      if (onNavigate) {
        setTimeout(onNavigate, 1000);
      }
    }
  };

  return (
    <a
      href={`/?year=${year}`}
      className={`${styles.link} sidebar-link`}
      data-year={`year-${year}`}
      data-first={isFirstOfCentury}
      onClick={handleClick}
    >
      {year}
    </a>
  );
}
