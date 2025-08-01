'use client';

import { useTheme } from '@/components/ThemeProvider';
import { Sun, Moon, Monitor } from 'lucide-react';
import { cn } from '@/lib/utils';

export const ThemeToggle = () => {
  const { mode, setMode } = useTheme();

  return (
    <div className="flex flex-row items-center gap-2 border rounded-3xl p-2 border-gray-500">
      <button title="Light Mode" onClick={() => setMode('Light Mode')}>
        <Sun className={cn('size-5', mode === 'Light Mode' && 'text-yellow-400')} />
      </button>
      <button title="Device Mode" onClick={() => setMode('Device Mode')}>
        <Monitor className={cn('size-5', mode === 'Device Mode' && 'text-blue-500')} />
      </button>
      <button title="Dark Mode" onClick={() => setMode('Dark Mode')}>
        <Moon className={cn('size-5', mode === 'Dark Mode' && 'text-purple-500')} />
      </button>
    </div>
  );
};
