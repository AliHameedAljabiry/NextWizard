import ProjectsAdmin from '@/components/admin/Projects'
import { db } from '@/database/drizzle'
import { projects } from '@/database/schema'
import { desc } from 'drizzle-orm'
import React from 'react'

export const dynamic = 'force-dynamic';

const Page = async () => {
  const allProjects = await db.select().from(projects).orderBy(desc(projects.createdAt))
  

  const initialData = allProjects as any;
  return (
    <div>
       <ProjectsAdmin initialData={initialData} />
    </div>
  )
}

export default Page