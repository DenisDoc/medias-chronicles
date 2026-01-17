'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { usePathname } from 'next/navigation';

interface NavigationContextType {
  activeYear: string;
  setActiveYear: (year: string) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // Extract initial year from pathname
  const getYearFromPath = (path: string): string => {
    const segments = path.split('/');
    const lastSegment = segments[segments.length - 1] || '';
    // Handle "1146-1" → "1146"
    return lastSegment.split('-')[0];
  };

  const [activeYear, setActiveYear] = useState(() => getYearFromPath(pathname));

  // Sync with pathname on initial load and when navigating via browser back/forward
  useEffect(() => {
    const yearFromPath = getYearFromPath(pathname);
    if (yearFromPath && yearFromPath !== activeYear) {
      setActiveYear(yearFromPath);
    }
  }, [pathname]);

  return (
    <NavigationContext.Provider value={{ activeYear, setActiveYear }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within NavigationProvider');
  }
  return context;
}
