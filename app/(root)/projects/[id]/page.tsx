import { auth } from '@/auth'
import { Avatar } from '@/components/ui/avatar'
import { Card, CardTitle } from '@/components/ui/card'
import { db } from '@/database/drizzle'
import { projects } from '@/database/schema'
import { cn } from '@/lib/utils'
import { desc, eq } from 'drizzle-orm'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import React from 'react'

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
 const projectId = (await params).id
  const session = await auth()
  if (!session) redirect("/sign-in");

  const project = await db.select().from(projects).where(eq(projects.id, projectId))
  const currentProject = project[0]

  return (
     <div className='m-10 '>
         <div className=' flex flex-col w-full border rounded-lg shadow hover:shadow-lg transition min-h-[450px] relative  overflow-hidden'>
            <div className='w-full h-1/2' >
                {currentProject.imageUrl && <Image src={currentProject?.imageUrl} alt='card' width={2000} height={1000} className='object-cover'/>}
            </div>
         
            <div className={cn(currentProject.isFree === 'FREE' ? 
                'bg-green-600' : 
                'bg-[#9301f5]' ,
                'absolute top-0 right-0 min-w-[85px] text-center text-white text-xs font-bold px-3 py-1 rotate-45 transform translate-x-[25%] translate-y-[36%] shadow-md'
                )}
            >{currentProject.isFree}</div>
            <div className='px-4 mt-2  text-sm text-gray-900 font-medium dark:text-gray-300'>
                Published on:<span> </span> 
                {currentProject.publishDate ? (
                    new Date(currentProject.publishDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                    })
                ) : (
                    'No date'
                )}
            </div>
            <div className='px-4 h-1/3 flex w-full flex-col items-center justify-start mt-10 mb-10'>
                <h1 className="text-xl font-semibold mb-3 dark:text-white">{currentProject.title}</h1>
                <div className='flex w-full flex-col sm:flex-row gap-6 items-center justify-around mt-3'>
                    <div className='flex flex-col items-center p-3  border rounded-lg  shadow'>
                        <p className='font-semibold dark:text-gray-300 mb-2'>By: {currentProject.author}</p>
                        {currentProject.authorImageUrl && <Image src={currentProject.authorImageUrl} alt={currentProject.author} width={100} height={100} className="rounded-full"/>}
                    </div>

                    <div className='flex flex-col items-center justify-around '>
                        <a href={currentProject.githubUrl ?? undefined} target="_blank" rel="noopener noreferrer" className='text-lg bg-[#e0e0e0] dark:bg-[#1a1919] w-full flex items-center shadow p-3 rounded-lg hover:bg-[#bdbdbd] mb-3'>
                            <Avatar className='w-14 h-14'>
                                <Image src="/icons/github-icon.svg" alt="GitHub Logo" className='dark:invert' width={100} height={100}/>
                            </Avatar>
                            <span className='ml-2 dark:text-gray-300'>GitHub Repo</span>
                        </a>
                        <a href={currentProject.videoUrl ?? undefined} target="_blank" rel="noopener noreferrer" className='text-lg bg-[#e0e0e0] dark:bg-[#1a1919] w-full flex items-center shadow p-3 rounded-lg hover:bg-[#bdbdbd] mb-3'>
                            <Avatar className='w-14 h-14'>
                                <Image src="/icons/youtube.svg" alt="GitHub Logo"  width={100} height={100}/>
                            </Avatar>
                            <span className='ml-2 dark:text-gray-300'>YouTube Video</span>
                        </a>
                    </div>
                </div>
        


            </div>
        </div>           
    
    </div>
  )
}

export default Page