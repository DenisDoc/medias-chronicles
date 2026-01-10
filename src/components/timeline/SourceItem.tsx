import { Source } from '@/types/timeline';
import styles from './SourcesContext.module.scss';

interface SourceItemProps {
  item: Source;
}

export default function SourceItem({ item }: SourceItemProps) {
  // Check if source has a valid URL
  const hasUrl = item.url && item.url.trim() !== '';

  // Check if info exists
  const hasInfo = item.info && item.info.trim() !== '';

  const handleClick = () => {
    if (hasUrl) {
      window.open(item.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div
      className={`${styles.item} ${hasUrl ? styles.hasLink : ''}`}
      onClick={handleClick}
    >
      {/* Title - plain text, no link */}
      <span className={styles.itemTitle}>{item.title}</span>

      {/* Info - plain text */}
      {hasInfo && (
        <span className={styles.itemInfo}>{item.info}</span>
      )}
    </div>
  );
}
