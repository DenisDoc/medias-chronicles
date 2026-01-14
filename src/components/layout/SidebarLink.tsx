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

    // Use View Transitions API for smooth page transition
    if (typeof document !== 'undefined' && 'startViewTransition' in document) {
      (document as any).startViewTransition(() => {
        router.push(`/cronologie/${year}`);
      });
    } else {
      router.push(`/cronologie/${year}`);
    }

    // Close mobile menu after navigation
    if (onNavigate) {
      setTimeout(onNavigate, 100);
    }
  };

  return (
    <a
      href={`/cronologie/${year}`}
      className={`${styles.link} sidebar-link`}
      data-year-value={year}
      data-first={isFirstOfCentury}
      onClick={handleClick}
    >
      {year}
    </a>
  );
}
