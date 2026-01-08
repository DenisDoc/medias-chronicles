'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Lenis from 'lenis';

interface SidebarClientProps {
  children: React.ReactNode;
}

export default function SidebarClient({ children }: SidebarClientProps) {
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // 🔹 Lenis elements (MUST be different)
    const wrapper = document.querySelector('.sidebar-wrapper') as HTMLElement;
    const content = document.querySelector('.sidebar-content') as HTMLElement;
    const sidebar = document.querySelector('.sidebar') as HTMLElement;

    if (!wrapper || !content || !sidebar) return;

    // 🔹 Initialize Lenis
    const sidebarLenis = new Lenis({
      wrapper,
      content,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: !prefersReducedMotion,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      infinite: false,
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

          const activeLink = document.querySelector(
            `.sidebar-link[href="#${id}"]`
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
