

import { auth } from '@/auth'
import RealTimeProjects from '@/components/RealTimeProjects'
import { db } from '@/database/drizzle'
import { projects } from '@/database/schema'
import { desc } from 'drizzle-orm'
import { redirect } from 'next/navigation'
import React from 'react'

const Page = async () => {
  const session = await auth()
    if (!session) redirect("/sign-in");
  const allProjects = await db.select().from(projects).orderBy(desc(projects.createdAt))


const initialData = allProjects as any;
  return (
    <div>
      <RealTimeProjects initialData={initialData} />
    </div>
  )
}

export default Page