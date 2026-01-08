import { SidebarNavItem } from '@/types/timeline';
import CenturyDivider from '../timeline/CenturyDivider';
import SidebarClient from './SidebarClient';
import SidebarLink from './SidebarLink';
import styles from './Sidebar.module.scss';

interface SidebarProps {
  navItems: SidebarNavItem[];
}

export default function Sidebar({ navItems }: SidebarProps) {
  return (
    <aside className={`${styles.sidebar} sidebar`}>
      <SidebarClient>
        {/* 🔹 SCROLL WRAPPER (Lenis wrapper) */}
        <div className={`${styles.wrapper} sidebar-wrapper`}>
          {/* 🔹 SCROLL CONTENT (Lenis content) */}
          <div className={`${styles.content} sidebar-content content`}>
            <div className={styles.navList}>
              {navItems.map((item, index) => {
                if (item.isCenturyDivider) {
                  return (
                    <CenturyDivider
                      key={item.id}
                      century={item.century || ''}
                    />
                  );
                }

                // Determine if this is the first event of a new century
                const isFirstOfCentury =
                  index === 0 || navItems[index - 1].isCenturyDivider;

                return (
                  <SidebarLink
                    key={item.id}
                    targetId={item.id}
                    year={item.year}
                    isFirstOfCentury={isFirstOfCentury}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </SidebarClient>
    </aside>
  );
}
