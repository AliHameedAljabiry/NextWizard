'use client';

import { useState } from 'react';
import { Menu, PanelLeft, X } from 'lucide-react';
import AdminSidebar from './AdminSidebar';



export default function MobileSidebarToggle() {
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
        {isOpen ? <X className='text-red-700 -mt-3 ml-28' size={25}  /> : <PanelLeft size={40} className='p-1 -mt-2 -ml-4 rounded-lg text-gray-600  border-r-2 dark:border-gray-300  dark:text-gray-400 hover:text-gray-800 hover:dark:bg-gray-700 hover:bg-gray-400 '/>}
      </button>

      {/* Mobile sidebar */}
      {isOpen && (
        <div className="fixed inset-0 z-20 bg-black bg-opacity-50" onClick={() => setIsOpen(false)}>
          <aside 
            className="w-44 h-full bg-white dark:bg-gray-900 hide-scrollbar  overflow-y-auto border-r border-gray-200 dark:border-gray-800"
            onClick={(e) => e.stopPropagation()}
          >
            <AdminSidebar  />
          </aside>
        </div>
      )}
    </>
  );
}
