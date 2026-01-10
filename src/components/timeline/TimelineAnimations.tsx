'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { LenisContext } from '@/contexts/LenisContext';

interface TimelineAnimationsProps {
  children: React.ReactNode;
}

export default function TimelineAnimations({ children }: TimelineAnimationsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);
  const rafIdRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Register GSAP plugin
    gsap.registerPlugin(ScrollTrigger);

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // Get the timeline scroll container
    const scrollContainer = document.querySelector('.timeline') as HTMLElement;
    if (!scrollContainer) return;

    // Initialize Lenis smooth scroll on the timeline container with mobile optimization
    const lenis = new Lenis({
      wrapper: scrollContainer,
      content: scrollContainer,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: !prefersReducedMotion,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
      syncTouch: true,
      syncTouchLerp: 0.1,
    });

    setLenisInstance(lenis);

    // Store Lenis instance globally for sidebar access
    (window as any).__timelineLenis = lenis;

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // RAF loop for Lenis
    function raf(time: number) {
      lenis.raf(time);
      rafIdRef.current = requestAnimationFrame(raf);
    }

    rafIdRef.current = requestAnimationFrame(raf);

    if (!prefersReducedMotion) {
      // Wait for DOM to be ready
      const timer = setTimeout(() => {
        initializeAnimations(scrollContainer);
      }, 100);

      return () => {
        clearTimeout(timer);
        if (rafIdRef.current) {
          cancelAnimationFrame(rafIdRef.current);
        }
        lenis.destroy();
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        setLenisInstance(null);
        delete (window as any).__timelineLenis;
      };
    }

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      lenis.destroy();
      setLenisInstance(null);
      delete (window as any).__timelineLenis;
    };
  }, []);

  function initializeAnimations(scrollContainer: HTMLElement) {
    // Progressive Content Reveal
    gsap.utils.toArray('.timeline-section').forEach((section: any) => {
      const decoration = section.querySelector('.title-decoration');
      const title = section.querySelector('.title');
      const info = section.querySelector('.info');

      // Create timeline for this section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
          scroller: scrollContainer
        }
      });

      // Sequence of animations
      if (decoration) {
        tl.fromTo(decoration,
          { scaleX: 0, transformOrigin: 'left center' },
          { scaleX: 1, duration: 0.8, ease: 'power2.out' },
          0
        );
      }

      if (title) {
        tl.fromTo(title,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          0.15
        );
      }

      if (info) {
        tl.fromTo(info,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
          0.3
        );
      }
    });

    // Enhanced sidebar hover
    const sidebarLinks = gsap.utils.toArray('.sidebar-link');
    sidebarLinks.forEach((link: any) => {
      link.addEventListener('mouseenter', () => {
        gsap.to(link, {
          scale: 1.05,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      link.addEventListener('mouseleave', () => {
        gsap.to(link, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    });

    // Refresh ScrollTrigger after initialization
    ScrollTrigger.refresh();
  }

  return (
    <LenisContext.Provider value={{ lenis: lenisInstance }}>
      <div ref={containerRef}>{children}</div>
    </LenisContext.Provider>
  );
}
