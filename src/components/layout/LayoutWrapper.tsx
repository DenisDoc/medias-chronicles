'use client';

import { useState, ReactNode, useRef, useEffect } from 'react';
import gsap from 'gsap';
import Header from './Header';
import Sidebar from './Sidebar';
import { SidebarNavItem } from '@/types/timeline';
import styles from './LayoutWrapper.module.scss';

interface LayoutWrapperProps {
  navItems: SidebarNavItem[];
  children: ReactNode;
}

export default function LayoutWrapper({ navItems, children }: LayoutWrapperProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [windowHeight, setWindowHeight] = useState(0);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Set window height on client mount
  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, []);

  useEffect(() => {
    if (!sidebarRef.current || !overlayRef.current || windowHeight === 0) return;

    // Only animate on mobile (< 768px)
    const isMobile = window.innerWidth < 768;
    if (!isMobile) return;

    if (menuOpen) {
      // Animate sidebar up from bottom
      gsap.to(sidebarRef.current, {
        y: 0,
        duration: 0.5,
        ease: 'power3.out',
      });

      // Fade in overlay
      gsap.to(overlayRef.current, {
        opacity: 1,
        pointerEvents: 'auto',
        duration: 0.4,
        ease: 'power2.out',
      });
    } else {
      // Animate sidebar down
      gsap.to(sidebarRef.current, {
        y: windowHeight,
        duration: 0.5,
        ease: 'power3.in',
      });

      // Fade out overlay
      gsap.to(overlayRef.current, {
        opacity: 0,
        pointerEvents: 'none',
        duration: 0.4,
        ease: 'power2.out',
      });
    }
  }, [menuOpen, windowHeight]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      
      {/* Mobile menu overlay - always rendered but hidden */}
      <div 
        ref={overlayRef}
        className={styles.menuOverlay}
        onClick={closeMenu}
        style={{ 
          opacity: 0,
          pointerEvents: 'none',
        }}
      ></div>
      
      <main className={styles.main}>
        {/* Sidebar container - always rendered */}
        <div 
          ref={sidebarRef}
          className={styles.sidebarContainer}
          style={{ 
            y: (typeof window !== 'undefined' && window.innerWidth < 768) ? windowHeight : 0,
          }}
        >
          <Sidebar navItems={navItems} menuOpen={menuOpen} onClose={closeMenu} />
        </div>
        
        {/* Timeline content */}
        {children}
      </main>
    </>
  );
}
