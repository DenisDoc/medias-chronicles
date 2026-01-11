'use client';

import { useState } from 'react';
import templates from '@/data/email_templates';
import styles from './ArchiveContribution.module.scss';

type TemplateKey = 'create' | 'edit' | 'bugs_and_suggestions';

export default function ArchiveContribution() {
  const [copiedTemplate, setCopiedTemplate] = useState<TemplateKey | null>(null);

  const handleCopyTemplate = async (templateKey: TemplateKey) => {
    try {
      await navigator.clipboard.writeText(templates[templateKey].template);
      setCopiedTemplate(templateKey);
      setTimeout(() => setCopiedTemplate(null), 2000); // Reset after 2s
    } catch (err) {
      console.error('Failed to copy template:', err);
    }
  };

  // Generate mailto link with subject from the copied template
  const createMailtoLink = () => {
    // Use the subject of the copied template, or a generic subject if none copied
    const subject = copiedTemplate
      ? templates[copiedTemplate].subject
      : 'Contribuție - Arhiva Cronologică Mediaș';
    return `mailto:test@test.com?subject=${encodeURIComponent(subject)}`;
  };

  return (
    <div className={`${styles.container} archive-contribution-section`}>
      {/* Header section - full width */}
      <header className={styles.header}>
        <h1 className={styles.title}>
          Contribuie la Arhiva Cronologică <br></br> Istorică Mediaș
        </h1>
        <p className={styles.subtitle}>
          Puteți sprijini dezvoltarea continuă a arhivei prin furnizarea de<br></br>informații suplimentare sau corecții, urmărind instrucțiunile.
        </p>
      </header>

      {/* Steps and Options row */}
      <div className={styles.contentRow}>
        {/* Steps column */}
        <div className={styles.stepsColumn}>
          <div className={styles.steps}>
            <div className={styles.step}>
              <h4 className={styles.stepTitle}>Selectează</h4>
              <p className={styles.stepDescription}>
                Selectați un șablon din lista alăturată acesta va fi copiat automat în clipboard.
              </p>
            </div>

            <div className={styles.step}>
              <h4 className={styles.stepTitle}>Pregătește</h4>
              <p className={styles.stepDescription}>
                Apasă butonul „Contribuie" pentru a deschide clientul tău de email. Lipește șablonul în corpul mesajului.
              </p>
            </div>

            <div className={styles.step}>
              <h4 className={styles.stepTitle}>Completează & trimite</h4>
              <p className={styles.stepDescription}>
                Urmează instrucțiunile, completează câmpurile si trimite email-ul
              </p>
            </div>

          </div>
        </div>

        {/* Options column */}
        <div className={styles.optionsColumn}>
          <button
            className={styles.optionCard}
            onClick={() => handleCopyTemplate('create')}
          >
            <span className={styles.optionLabel}>Adaugă informații în arhivă</span>
            <span className={`${styles.optionIcon} ${copiedTemplate === 'create' ? styles.copied : ''}`}>
              {copiedTemplate === 'create' ? '✓' : '⿻'}
            </span>
          </button>

          <button
            className={styles.optionCard}
            onClick={() => handleCopyTemplate('edit')}
          >
            <span className={styles.optionLabel}>Modifică informații în arhivă</span>
            <span className={`${styles.optionIcon} ${copiedTemplate === 'edit' ? styles.copied : ''}`}>
              {copiedTemplate === 'edit' ? '✓' : '⿻'}
            </span>
          </button>

          <button
            className={styles.optionCard}
            onClick={() => handleCopyTemplate('bugs_and_suggestions')}
          >
            <span className={styles.optionLabel}>Întrebări, sugestii, bug-uri</span>
            <span className={`${styles.optionIcon} ${copiedTemplate === 'bugs_and_suggestions' ? styles.copied : ''}`}>
              {copiedTemplate === 'bugs_and_suggestions' ? '✓' : '⿻'}
            </span>
          </button>

          <a
            href={createMailtoLink()}
            className={styles.ctaButton}
          >
            <span className={styles.ctaLabel}>Contribuie</span>
            <span className={styles.ctaIcon}>→</span>
          </a>
        </div>
      </div>
    </div>
  );
}
