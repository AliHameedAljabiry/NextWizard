'use client';

import { useState } from 'react';
import Sidebar from './Sidebar';
import { Menu, X } from 'lucide-react';

export default function MobileSidebarToggle({ data }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Toggle button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed z-30 top-5  left-4  p-2 bg-gray-100 dark:bg-gray-500 dark:hover:bg-gray-300 rounded-md shadow-md"
        aria-label="Toggle sidebar"
      >
        {isOpen ? <X size={20}  /> : <Menu size={20} />}
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
