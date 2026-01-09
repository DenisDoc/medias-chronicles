'use client';

import styles from './Sidebar.module.scss';

interface SidebarLinkProps {
  targetId: string;
  year: string;
  isFirstOfCentury: boolean;
  onNavigate?: () => void;
}

export default function SidebarLink({ targetId, year, isFirstOfCentury, onNavigate }: SidebarLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    const target = document.getElementById(targetId);
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
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
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
      
      // Close menu after scroll (assume ~1s for smooth scroll)
      if (onNavigate) {
        setTimeout(onNavigate, 1000);
      }
    }
  };

  return (
    <a
      href={`#${targetId}`}
      className={`${styles.link} sidebar-link`}
      data-year={targetId}
      data-first={isFirstOfCentury}
      onClick={handleClick}
    >
      {year}
    </a>
  );
}
