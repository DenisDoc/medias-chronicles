import { Source } from '@/types/timeline';
import SourceItem from './SourceItem';
import styles from './SourcesContext.module.scss';

interface SourceSectionProps {
  title: string;
  items: Source[];
  type: 'context' | 'sources';
}

export default function SourceSection({ title, items }: SourceSectionProps) {
  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <div className={styles.items}>
        {items.map((item, index) => (
          <SourceItem key={index} item={item} />
        ))}
      </div>
    </div>
  );
}
