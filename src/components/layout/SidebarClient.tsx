'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import Lenis from 'lenis';

interface SidebarClientProps {
  children: React.ReactNode;
}

export default function SidebarClient({ children }: SidebarClientProps) {
  const pathname = usePathname(); // "/cronologie/1146" or "/cronologie/1%20Epoca%20desc%C4%83lec%C4%83tului"
  const rafIdRef = useRef<number | null>(null);

  // Extract year from current path
  // pathname is already decoded by Next.js usePathname()
  const currentYear = pathname.split('/').pop() || '';
  const baseYear = currentYear.split('-')[0]; // Handle "1146-1" → "1146"

  // Initialize Lenis for sidebar scrolling
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // Detect mobile device
    const isMobile = window.innerWidth < 768;

    // Lenis elements
    const wrapper = document.querySelector('.sidebar-wrapper') as HTMLElement;
    const content = document.querySelector('.sidebar-content') as HTMLElement;
    const sidebar = document.querySelector('.sidebar') as HTMLElement;

    if (!wrapper || !content || !sidebar) return;

    // Initialize Lenis with mobile optimization
    const sidebarLenis = new Lenis({
      wrapper,
      content,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: !prefersReducedMotion,
      wheelMultiplier: 1,
      touchMultiplier: isMobile ? 1.5 : 2,
      duration: isMobile ? 1.0 : 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      infinite: false,
      syncTouch: true,
      syncTouchLerp: 0.1,
    });

    // RAF loop
    const raf = (time: number) => {
      sidebarLenis.raf(time);
      rafIdRef.current = requestAnimationFrame(raf);
    };

    rafIdRef.current = requestAnimationFrame(raf);

    function cleanup() {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      sidebarLenis.destroy();
    }

    return cleanup;
  }, []);

  // Update active link highlighting when route changes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const navLinks = document.querySelectorAll('.sidebar-link');
    const wrapper = document.querySelector('.sidebar-wrapper') as HTMLElement;

    if (!navLinks.length) return;

    // Find active link based on current year
    const activeLink = Array.from(navLinks).find((link) => {
      const linkYear = link.getAttribute('data-year-value');
      return linkYear === currentYear || linkYear === baseYear;
    }) as HTMLElement | null;

    if (prefersReducedMotion) {
      navLinks.forEach((l) => l.classList.remove('active'));
      activeLink?.classList.add('active');
    } else {
      // Reset all links
      gsap.to(navLinks, {
        fontSize: '1.25rem',
        color: 'rgba(255,255,255,0.2)',
        fontWeight: 300,
        duration: 0.6,
        ease: 'power2.out',
      });

      if (activeLink) {
        // Activate link
        gsap.to(activeLink, {
          fontSize: '2.25rem',
          color: '#D5C5AB',
          duration: 0.6,
          ease: 'power2.out',
        });

        // Auto-center active link in sidebar
        if (wrapper) {
          const sidebarLenis = (wrapper as any).__lenis;
          if (sidebarLenis) {
            const linkRect = activeLink.getBoundingClientRect();
            const wrapperRect = wrapper.getBoundingClientRect();

            const linkCenter = linkRect.top + linkRect.height / 2;
            const wrapperCenter = wrapperRect.top + wrapperRect.height / 2;
            const offset = linkCenter - wrapperCenter;

            if (Math.abs(offset) > 40) {
              sidebarLenis.scrollTo(sidebarLenis.scroll + offset, {
                duration: 0.8,
                easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
              });
            }
          }
        }
      }
    }
  }, [pathname, currentYear, baseYear]);

  return <>{children}</>;
}
