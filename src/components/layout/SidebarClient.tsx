'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Lenis from 'lenis';
import { useNavigation } from '@/contexts/NavigationContext';

interface SidebarClientProps {
  children: React.ReactNode;
}

export default function SidebarClient({ children }: SidebarClientProps) {
  const { activeYear } = useNavigation();
  const rafIdRef = useRef<number | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const navLinksRef = useRef<NodeListOf<Element> | null>(null);
  const prevActiveLinkRef = useRef<HTMLElement | null>(null);

  // Handle "1146-1" → "1146"
  const baseYear = activeYear.split('-')[0];

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

    // Store Lenis in ref for later access
    lenisRef.current = sidebarLenis;

    // Cache sidebar links for animation (avoids querySelectorAll on every activeYear change)
    navLinksRef.current = document.querySelectorAll('.sidebar-link');

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
      lenisRef.current = null;
      sidebarLenis.destroy();
    }

    return cleanup;
  }, []);

  // Update active link highlighting when activeYear changes
  // OPTIMIZED: Only animate 1 link (active) instead of all 500
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // Use cached navLinks, fallback to query if not cached yet
    const navLinks = navLinksRef.current || document.querySelectorAll('.sidebar-link');
    const wrapper = document.querySelector('.sidebar-wrapper') as HTMLElement;

    if (!navLinks.length) return;

    // Find active link based on current year
    const activeLink = Array.from(navLinks).find((link) => {
      const linkYear = link.getAttribute('data-year-value');
      return linkYear === activeYear || linkYear === baseYear;
    }) as HTMLElement | null;

    if (prefersReducedMotion) {
      navLinks.forEach((l) => l.classList.remove('active'));
      activeLink?.classList.add('active');
      return;
    }

    // Animate previous active link back to inactive state (just 1 animation, not 500!)
    if (prevActiveLinkRef.current && prevActiveLinkRef.current !== activeLink) {
      gsap.killTweensOf(prevActiveLinkRef.current);
      gsap.to(prevActiveLinkRef.current, {
        fontSize: '1.25rem',
        color: 'rgba(255,255,255,0.2)',
        duration: 0.4,
        ease: 'power2.out',
      });
    }

    if (activeLink) {
      // Kill any existing animation on this link
      gsap.killTweensOf(activeLink);

      // Only animate the active link with GSAP (not all 500!)
      gsap.to(activeLink, {
        fontSize: '2.25rem',
        color: '#D5C5AB',
        duration: 0.6,
        ease: 'power2.out',
      });

      // Store reference for cleanup on next change
      prevActiveLinkRef.current = activeLink;

      // Auto-center active link in sidebar
      if (wrapper) {
        const wrapperHeight = wrapper.clientHeight;
        const linkOffsetTop = activeLink.offsetTop;
        const linkHeight = activeLink.offsetHeight;
        const targetScroll = linkOffsetTop - (wrapperHeight / 2) + (linkHeight / 2);
        const currentScroll = wrapper.scrollTop;

        if (Math.abs(targetScroll - currentScroll) > 40) {
          if (lenisRef.current) {
            lenisRef.current.scrollTo(targetScroll, {
              duration: 0.8,
              easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            });
          } else {
            wrapper.scrollTo({ top: targetScroll, behavior: 'smooth' });
          }
        }
      }
    }
  }, [activeYear, baseYear]);

  return <>{children}</>;
}
