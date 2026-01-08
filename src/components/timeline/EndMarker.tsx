import styles from './EndMarker.module.scss';

export default function EndMarker() {
  return (
    <div className={styles.marker}>
      <div className={styles.line}></div>
      <p className={styles.text}>End of Archive</p>
    </div>
  );
}
