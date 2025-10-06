import { fetchSidebarData } from '@/app/api/docs/categories/route'
import { auth } from '@/auth'
import MobileSidebarToggle from '@/components/MobileSidebarToggle'
import Sidebar from '@/components/Sidebar'
import { redirect } from 'next/navigation'
import React, { ReactNode } from 'react'


const DocsLayout = async ({children}: {children: ReactNode}) => {
  const session = await auth()

  if (!session?.user?.id) redirect("/sign-in")
    
  const categoriesWithParts = await fetchSidebarData();
  return (
    <div className="flex min-h-screen overflow-auto relative">
      {/* Desktop sidebar - hidden on mobile */}
      <aside className="hidden md:block w-64 border-r border-gray-200 dark:border-gray-800 p-4 overflow-y-auto">
        <Sidebar data={categoriesWithParts} />
      </aside>
      
      {/* Mobile sidebar toggle button */}
      <div className="md:hidden">
        <MobileSidebarToggle data={categoriesWithParts} />
      </div>
      
      <main className="flex-1 max-h-[88vh] px-6 overflow-y-auto hide-scrollbar">
        {children}
      </main>
    </div>
  );
}

export default DocsLayout