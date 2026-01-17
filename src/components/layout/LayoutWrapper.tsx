'use client';

import { useState, ReactNode, useRef, useEffect, startTransition, addTransitionType } from 'react';
import gsap from 'gsap';
import Header from './Header';
import Sidebar from './Sidebar';
import { SidebarNavItem } from '@/types/timeline';
import styles from './LayoutWrapper.module.scss';

import {ViewTransition} from 'react';

interface LayoutWrapperProps {
  navItems: SidebarNavItem[];
  children: ReactNode;
}

export default function LayoutWrapper({ navItems, children }: LayoutWrapperProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Prevent body scroll when menu is open on mobile
  useEffect(() => {
    if (menuOpen && window.innerWidth < 768) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }

    return () => {
      document.body.classList.remove('menu-open');
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!sidebarRef.current || !overlayRef.current) return;

    // Only animate on mobile (< 768px)
    const isMobile = window.innerWidth < 768;
    if (!isMobile) return;

    if (menuOpen) {
      // Animate sidebar up from bottom using bottom property
      gsap.to(sidebarRef.current, {
        bottom: 0,
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
      // Animate sidebar down using bottom property
      gsap.to(sidebarRef.current, {
        bottom: '-100vh',
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
  }, [menuOpen]);

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
        >
        <Sidebar navItems={navItems} menuOpen={menuOpen} onClose={closeMenu} /> 
        </div>
        
       <ViewTransition>
        {children}
          </ViewTransition>
      </main>
    </>
  );
}
