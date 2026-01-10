import { Source } from '@/types/timeline';
import styles from './SourcesContext.module.scss';

interface SourceItemProps {
  item: Source;
}

export default function SourceItem({ item }: SourceItemProps) {
  // Check if title has a valid URL
  const hasTitleUrl = item.title.url && item.title.url.trim() !== '';

  // Check if info exists and has a valid URL
  const hasInfo = item.info && item.info.text;
  const hasInfoUrl = hasInfo && item?.info?.url && item.info.url.trim() !== '';

  return (
    <div className={styles.item}>
      {/* Title - with optional link */}
      {hasTitleUrl ? (
        <a
          href={item.title.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.itemTitle} ${styles.link}`}
        >
          {item.title.text}
        </a>
      ) : (
        <span className={styles.itemTitle}>{item.title.text}</span>
      )}

      {/* Info - with optional link (only render if info exists) */}
      {hasInfo && (
        hasInfoUrl ? (
          <a
            href={item.info!.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.itemInfo} ${styles.link}`}
          >
            {item.info!.text}
          </a>
        ) : (
          <span className={styles.itemInfo}>{item.info!.text}</span>
        )
      )}
    </div>
  );
}
