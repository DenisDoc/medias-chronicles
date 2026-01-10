'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import gsap from 'gsap';
import Lenis from 'lenis';
import { getYearFromEventId } from '@/utils/urlNavigation';

interface SidebarClientProps {
  children: React.ReactNode;
}

export default function SidebarClient({ children }: SidebarClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rafIdRef = useRef<number | null>(null);
  const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isNavigatingRef = useRef(false);

  // Debounced URL update function
  const updateURL = useCallback((year: string) => {
    if (updateTimeoutRef.current) {
      clearTimeout(updateTimeoutRef.current);
    }

    updateTimeoutRef.current = setTimeout(() => {
      const currentYear = searchParams.get('year');
      // Only update if year is different and we're not programmatically navigating
      if (currentYear !== year && !isNavigatingRef.current) {
        router.replace(`?year=${year}`, { scroll: false });
      }
    }, 300); // 300ms debounce
  }, [router, searchParams]);

  // Make isNavigatingRef available to child components via window
  useEffect(() => {
    (window as any).__isNavigating = isNavigatingRef;
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // Detect mobile device
    const isMobile = window.innerWidth < 768;

    // 🔹 Lenis elements (MUST be different)
    const wrapper = document.querySelector('.sidebar-wrapper') as HTMLElement;
    const content = document.querySelector('.sidebar-content') as HTMLElement;
    const sidebar = document.querySelector('.sidebar') as HTMLElement;

    if (!wrapper || !content || !sidebar) return;

    // 🔹 Initialize Lenis with mobile optimization
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

    // 🔹 RAF loop
    const raf = (time: number) => {
      sidebarLenis.raf(time);
      rafIdRef.current = requestAnimationFrame(raf);
    };

    rafIdRef.current = requestAnimationFrame(raf);

    // 🔹 Timeline container
    const scrollContainer = document.querySelector('.timeline') as HTMLElement;
    if (!scrollContainer) return cleanup;

    // 🔹 Sections & nav links
    const sections = document.querySelectorAll('[id^="year-"]');
    const navLinks = document.querySelectorAll('.sidebar-link');

    if (!sections.length || !navLinks.length) return cleanup;

    // 🔹 IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const id = entry.target.getAttribute('id');
          const year = entry.target.getAttribute('data-year');
          const century = entry.target.getAttribute('data-century');

          // Find active link using the YEAR, not the full event ID
          // For "year-1146-2", we want to find the link for "year-1146"
          const yearId = `year-${year}`;
          const activeLink = document.querySelector(
            `.sidebar-link[data-year="${yearId}"]`
          ) as HTMLElement | null;

          if (prefersReducedMotion) {
            navLinks.forEach((l) => l.classList.remove('active'));
            activeLink?.classList.add('active');
          } else {
            // 🔹 Reset all links
            gsap.to(navLinks, {
              fontSize: '1.25rem',
              color: 'rgba(255,255,255,0.2)',
              fontWeight: 300,
              duration: 0.6,
              ease: 'power2.out',
            });

            if (activeLink) {
              // 🔹 Activate link
              gsap.to(activeLink, {
                fontSize: '2.25rem',
                color: '#D5C5AB',
                duration: 0.6,
                ease: 'power2.out',
              });

              // 🔹 Auto-center active link (Lenis-safe)
              const linkRect = activeLink.getBoundingClientRect();
              const wrapperRect = wrapper.getBoundingClientRect();

              const linkCenter =
                linkRect.top + linkRect.height / 2;
              const wrapperCenter =
                wrapperRect.top + wrapperRect.height / 2;

              const offset = linkCenter - wrapperCenter;

              if (Math.abs(offset) > 40) {
                sidebarLenis.scrollTo(
                  sidebarLenis.scroll + offset,
                  {
                    duration: 0.8,
                    easing: (t) =>
                      Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                  }
                );
              }
            }

            animateCenturyFocus(century);
          }

          // 🔹 Notify other systems
          window.dispatchEvent(
            new CustomEvent('timeline:section-change', {
              detail: { year, century, sectionId: id },
            })
          );

          // ✅ UPDATE URL LAST - after all UI updates
          // Only update if not programmatically navigating
          if (id && !isNavigatingRef.current) {
            const yearFromId = getYearFromEventId(id);
            updateURL(yearFromId);
          }
        });
      },
      {
        root: scrollContainer,
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section));

    function cleanup() {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      observer.disconnect();
      sidebarLenis.destroy();
    }

    return cleanup;
  }, []);

  function animateCenturyFocus(activeCentury: string | null) {
    if (!activeCentury) return;

    gsap.to('.century-divider', {
      opacity: 0.4,
      scale: 1,
      duration: 0.5,
      ease: 'power2.out',
    });

    gsap.to('.century-line', {
      boxShadow: 'none',
      filter: 'none',
      duration: 0.5,
    });

    const activeDivider = document.querySelector(
      `.century-divider[data-century="${activeCentury}"]`
    );

    if (!activeDivider) return;

    gsap.to(activeDivider, {
      opacity: 1,
      scale: 1.1,
      duration: 0.5,
      ease: 'power2.out',
    });

    gsap.to(activeDivider.querySelectorAll('.century-line'), {
      boxShadow: '0 0 20px rgba(198, 168, 124, 0.6)',
      filter: 'brightness(1.3)',
      duration: 0.5,
    });

    const label = activeDivider.querySelector('.label');
    if (label) {
      gsap.to(label, {
        textShadow: '0 0 10px rgba(198, 168, 124, 0.4)',
        duration: 0.5,
      });
    }
  }

  return <>{children}</>;
}
