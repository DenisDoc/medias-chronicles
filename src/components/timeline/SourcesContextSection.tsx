import { Source } from '@/types/timeline';
import SourceSection from './SourceSection';
import styles from './SourcesContext.module.scss';

interface SourcesContextSectionProps {
  sources: Source[];
  context: Source[];
}

export default function SourcesContextSection({ sources, context }: SourcesContextSectionProps) {
  const hasContext = context.length > 0;
  const hasSources = sources.length > 0;
  const hasBothSections = hasContext && hasSources;

  return (
    <div className={styles.container}>
      <div className={hasBothSections ? styles.grid : styles.gridSingle}>
        {/* Vertical divider bar - only show if both sections have data */}
        {hasBothSections && <div className={styles.divider}></div>}

          {/* Sources section (right) - only render if has data */}
        {hasSources && <SourceSection title="Surse" items={sources} type="sources" />}

        {/* Context section (left) - only render if has data */}
        {hasContext && <SourceSection title="Context" items={context} type="context" />}
      </div>
    </div>
  );
}
