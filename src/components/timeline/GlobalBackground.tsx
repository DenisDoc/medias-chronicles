'use client';

import { useState, useEffect } from 'react';
import OdometerNumber from './OdometerNumber';
import styles from './GlobalBackground.module.scss';

export default function GlobalBackground() {
  const [currentYear, setCurrentYear] = useState<string>('1146');
  const [currentCentury, setCurrentCentury] = useState<string>('XII');

  useEffect(() => {
    // Listen for section changes
    const handleSectionChange = (event: CustomEvent) => {
      const { year, century } = event.detail;
      if (year) setCurrentYear(year);
      if (century) setCurrentCentury(century);
    };

    window.addEventListener('timeline:section-change', handleSectionChange as EventListener);

    return () => {
      window.removeEventListener('timeline:section-change', handleSectionChange as EventListener);
    };
  }, []);

  return (
    <>
      {/* Global background year - fixed/sticky */}
      <div className={styles.bgYearGlobal}>
        <OdometerNumber value={currentYear} />
      </div>

      {/* Global background century - fixed/sticky */}
      <div className={styles.bgCenturyGlobal}>
        {currentCentury}
      </div>
    </>
  );
}
