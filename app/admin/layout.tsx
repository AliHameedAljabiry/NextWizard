import { auth } from '@/auth'
import AdminHeader from '@/components/admin/AdminHeader'
import AdminSidebar from '@/components/admin/AdminSidebar'
import { db } from '@/database/drizzle'
import { users } from '@/database/schema'
import { eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'
import React, { ReactNode } from 'react'
import '@/styles/admin.css';
import { ThemeToggle } from '@/components/ThemeToggle'
import MobileAdminSidebarToggle from '@/components/admin/MobileAdminSidebarToggle'

const AdminLayout = async ({children} : {children: ReactNode}) => {
    const session = await auth() 

    if (!session?.user?.id) redirect("/sign-in")

    const isAdmin = await db
        .select({ isAdmin: users.role })
        .from(users)
        .where(eq(users.id, session?.user?.id))
        .limit(1)
        .then((res) => res[0]?.isAdmin == "ADMIN")
    
    if (!isAdmin) redirect("/")

  return (
    <main className='flex min-h-screen w-full flex-row '>
        {/* Desktop sidebar - hidden on mobile and small devices */}
        <aside className="hidden [@media(min-width:910px)]:block w-64 border-r border-gray-200 dark:border-gray-800 overflow-y-auto">
          <AdminSidebar />
        </aside>
        {/* Mobile sidebar toggle button */}
          <div className="md:hidden">
            <MobileAdminSidebarToggle  />
          </div>
        <div className="admin-container p-2 sm:p-6">
            <AdminHeader />
            {children}
        </div>
    </main>
  )
}

export default AdminLayout