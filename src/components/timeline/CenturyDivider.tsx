import styles from './CenturyDivider.module.scss';

interface CenturyDividerProps {
  century: string;
}

export default function CenturyDivider({ century }: CenturyDividerProps) {
  return (
    <div className={`${styles.divider} century-divider`} data-century={century}>
      <div className={`${styles.line} century-line`}></div>
      
      <span className={styles.label}>
        SEC
        <br />
        {century}
      </span>
       
      <div className={`${styles.line} century-line`}></div>
    </div>
  );
}
