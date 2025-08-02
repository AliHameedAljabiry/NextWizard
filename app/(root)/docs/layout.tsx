import { fetchSidebarData } from '@/app/api/content/categories/route'
import { auth } from '@/auth'
import Sidebar from '@/components/Sidebar'
import { redirect } from 'next/navigation'
import React, { ReactNode } from 'react'

const MainContentLayout = async ({children}: {children: ReactNode}) => {
  const session = await auth()

  if (!session?.user?.id) redirect("/sign-in")
    

  const categoriesWithParts = await fetchSidebarData();
  return (
      <div className="flex min-h-screen  overflow-auto">
        <aside className="w-64 border-r border-gray-200 dark:border-gray-800 p-4 overflow-y-auto">
          <Sidebar data={categoriesWithParts} />
        </aside>
        <main className="flex-1 max-h-[88vh] px-6 overflow-y-auto">
          {children}
        </main>
      </div>
    );
}

export default MainContentLayout