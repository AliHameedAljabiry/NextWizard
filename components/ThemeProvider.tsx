'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type ThemeMode = 'Light Mode' | 'Dark Mode' | 'Device Mode';

interface ThemeContextType {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  mode: 'Device Mode',
  setMode: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState<ThemeMode>('Device Mode');

  // Apply the theme class
  useEffect(() => {
    const root = document.documentElement;
    const stored = localStorage.getItem('theme') as ThemeMode | null;

    const applyTheme = (theme: ThemeMode) => {
      if (theme === 'Dark Mode') {
        root.classList.add('dark');
      } else if (theme === 'Light Mode') {
        root.classList.remove('dark');
      } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        prefersDark ? root.classList.add('dark') : root.classList.remove('dark');
      }
    };

    const themeToUse = stored || 'Device Mode';
    setMode(themeToUse);
    applyTheme(themeToUse);
  }, []);

  // On change, update class and storage
  const handleSetMode = (newMode: ThemeMode) => {
    setMode(newMode);
    localStorage.setItem('theme', newMode);

    const root = document.documentElement;
    if (newMode === 'Dark Mode') root.classList.add('dark');
    else if (newMode === 'Light Mode') root.classList.remove('dark');
    else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      prefersDark ? root.classList.add('dark') : root.classList.remove('dark');
    }

  };

  return (
    <ThemeContext.Provider value={{ mode, setMode: handleSetMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
