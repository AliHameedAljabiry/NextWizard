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
    <main className='flex min-h-screen w-full flex-row'>
        
        <AdminSidebar/>
        <div className="admin-container">
            <AdminHeader />
            {children}
        </div>
    </main>
  )
}

export default AdminLayout