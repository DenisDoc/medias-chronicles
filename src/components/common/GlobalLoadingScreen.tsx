'use client';

import { useLoading } from '@/contexts/LoadingContext';
import LoadingSpinner from './LoadingSpinner';
import styles from './GlobalLoadingScreen.module.scss';

export default function GlobalLoadingScreen() {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <div className={styles.overlay}>
      <LoadingSpinner />
    </div>
  );
}
