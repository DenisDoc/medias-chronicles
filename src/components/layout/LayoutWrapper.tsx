'use client';

import { useState, ReactNode } from 'react';
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

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      
      {/* Mobile menu overlay */}
      {menuOpen && (
        <div 
          className={styles.menuOverlay}
          onClick={closeMenu}
        ></div>
      )}
      
      <main className={styles.main}>
        <Sidebar navItems={navItems} menuOpen={menuOpen} onClose={closeMenu} />
        {children}
      </main>
    </>
  );
}
