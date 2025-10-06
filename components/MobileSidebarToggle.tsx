'use client';

import { useState } from 'react';
import Sidebar from './Sidebar';
import { Menu, PanelLeft, X } from 'lucide-react';

interface MobileSidebarToggleProps {
  data: any; // Replace 'any' with the actual type if known, e.g., 'SidebarDataType'
}

export default function MobileSidebarToggle({ data }: MobileSidebarToggleProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Toggle button */}
      <button 
        type='button'
        onClick={() => setIsOpen(!isOpen)}
        className="fixed z-30 top-5  left-3  p-2 bg-inherit dark:bg-inherit "
        aria-label="Toggle sidebar"
      >
        {isOpen ? <X size={20}  /> : <PanelLeft size={40} className='p-2 -mt-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-800 hover:dark:bg-gray-700 hover:bg-gray-400 '/>}
      </button>

      {/* Mobile sidebar */}
      {isOpen && (
        <div className="fixed inset-0 z-20 bg-black bg-opacity-50" onClick={() => setIsOpen(false)}>
          <aside 
            className="w-64 h-full bg-white dark:bg-gray-900 p-4 overflow-y-auto border-r border-gray-200 dark:border-gray-800"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="pt-8">
              <Sidebar data={data} />
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
