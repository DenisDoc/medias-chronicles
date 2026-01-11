'use client';

import styles from './Header.module.scss';

interface HeaderProps {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}

export default function Header({ menuOpen, setMenuOpen }: HeaderProps) {
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        {/* Logo area - placeholder for future */}
      </div>
      <nav className={styles.nav}>
        {/* Navigation items - placeholder for future */}
      </nav>
      <button 
        className={`${styles.mobileMenu} ${menuOpen ? styles.active : ''}`}
        aria-label="Menu"
        onClick={toggleMenu}
      >
        <span className={styles.hamburger}></span>
        <span className={styles.hamburger}></span>
        <span className={styles.hamburger}></span>
      </button>
    </header>
  );
}




