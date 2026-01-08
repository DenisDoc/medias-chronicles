import styles from './Header.module.scss';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        {/* Logo area - placeholder for future */}
      </div>
      <nav className={styles.nav}>
        {/* Navigation items - placeholder for future */}
      </nav>
      <button className={styles.mobileMenu} aria-label="Menu">
        <span className="material-symbols-outlined">menu</span>
      </button>
    </header>
  );
}
