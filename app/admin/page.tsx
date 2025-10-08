'use client'

import  useSWR  from 'swr'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { cn, gitInitials } from '@/lib/utils'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Loading from '../loading'

// Stats Card Component
const StatsCard = ({ title, value, className }: { title: string, value: number, className?: string }) => (
  <motion.div 
    className={cn(
      "bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg transform transition-transform hover:scale-105",
      className
    )}
    whileHover={{ y: -5 }}
  >
    <h3 className="text-md font-medium text-gray-900 dark:text-gray-200">{title}</h3>
    <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{value}</p>
  </motion.div>
)

// Recent Users Preview Component
const RecentUsersPreview = ({ users }: { users: any[] }) => (
  <div className="space-y-4 max-h-[470px] overflow-y-auto hide-scrollbar">
    <div className="grid grid-cols-1 gap-4">
      {users.map((user) => (
        <div key={user.id} className="flex items-center space-x-3 relative">
          <div className='w-12 h-12 rounded-full '>
            <Avatar className='w-full h-full  dark:border-gray-700  '>
              {user?.image ? (
                <Image 
                  src={user.image} 
                  alt={user.name ?? "User"} 
                  fill 
                  className='object-cover rounded-full' />
              ) : (
                <AvatarFallback className="bg-amber-100 text-black text-4xl font-bold">
                  {gitInitials(user?.fullName)}
                </AvatarFallback>
              )}
            </Avatar>
          </div>
          {user.role === 'ADMIN' && <Avatar className="w-3 absolute h-3 bottom-0 left-5 bg-green  rounded-full"></Avatar>}
          <div>
            <p className="text-sm font-medium">{user.fullName}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
          </div>
        </div>
      ))}
    </div>
    
  </div>
)

// Recent Projects Preview Component
const RecentProjectsPreview = ({ projects }: { projects: any[] }) => (
  <div className="space-y-4 max-h-[470px] overflow-y-auto hide-scrollbar">
    <div className="space-y-2">
      {projects.map((project) => (
        <div key={project.id} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg relative">
          <div className=''>
            <p className="font-medium w-[90%]">{project.title}</p>
            <div className='flex flex-row  items-center gap-2  w-full mt-2'>
              {project.authorImageUrl && <Image src={project.authorImageUrl} alt={project.author} width={40} height={40} className="rounded-full"/>}
              <p className="text-md text-gray-900 dark:text-gray-300">{project.author}</p>
            </div>
          </div>
          <span className=" absolute top-0 right-0 mt-3 mr-3 text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
            {project.isFree ? 'Free' : 'Paid'}
          </span>
        </div>
      ))}
    </div>
    
  </div>
)

// Recent category Preview Component
const RecentcategoryPreview = ({ category }: { category: any[] }) => (
  <div className="space-y-4 max-h-[470px] overflow-y-auto hide-scrollbar">
    <div className="space-y-2">
      {category.map((c) => (
        <div key={c.id}>
        {c.parts.map((p: any) => (
          <div key={p.id} className='mb-4 border-2 border-gray-200 dark:border-gray-600 p-3 rounded-lg'>
            <p className="text-sm text-gray-900 dark:text-gray-300 mb-2">{c.name} &gt;&gt; {p.name}  </p>
          {p.steps.map((s: any) => (
            <div key={s.id} className=" p-3 bg-gray-50 dark:bg-gray-700 rounded-lg mb-2 shadow">
              <Link href={`/admin/docs/stepDetails/${s.id}`} className="font-medium " title='View Step Details'>Step {s.order}: {s.title}</Link> 
            </div>
          ))}
          </div>
        ))}
        </div>
      ))}
    </div>
    
  </div>
)


const fetcher = (url: string) => fetch(url).then(res => {
  if (!res.ok) {
    throw new Error('Failed to fetch users')
  }
  return res.json()
})

export default function AdminHomePage() {
  // Fetch stats
  const { data: stats, isLoading, error: statsError } = useSWR('/api/admin/stats', fetcher, {
    revalidateOnMount: true,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: 60000, 
  })
  
    // Fetch recent users
  const { data: recentUsers, isLoading: usersLoading, error } = useSWR('/api/admin/users/all-users', fetcher, {
    revalidateOnMount: true,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: 60000, 
  })

    // Fetch recent projects
  const { data: recentProjects, isLoading: projectsLoading } = useSWR('/api/admin/projects', fetcher, {
    revalidateOnMount: true,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: 60000, 
  })

  // Fetch recent category
  const { data: recentcategory, isLoading: categoryLoading } = useSWR('/api/admin/all-categories', fetcher, {
    revalidateOnMount: true,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: 60000, 
  })
  

  if (isLoading) return <div><Loading/></div>
  

  if (statsError || !stats) return <div>Error loading admin dashboard</div>

  return (
    <div className="space-y-6 max-h-screen overflow-auto hide-scrollbar">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold dark:text-white">Admin Dashboard</h1>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <StatsCard 
          title="Total Users" 
          value={stats.totalUsers} 
          className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800"
        />
        <StatsCard 
          title="Total Projects" 
          value={stats.totalProjects} 
          className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800"
        />
        <StatsCard 
          title="Total Steps" 
          value={stats.totalSteps} 
          className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800"
        />
      </div>

      {/* Preview Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Users Section */}
        <Card className="bg-white dark:bg-gray-800 shadow-lg">
          <CardHeader>
            <div className='flex flex-row items-center justify-between w-full'>
              <CardTitle>Users</CardTitle>
              <Button  className="mt-2 bg-[#0f0f0f] hover:bg-[#0f0f0f] dark:bg-white  text-white" asChild>
                <Link className='text-white dark:text-black font-semibold' href="/admin/users">View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {usersLoading ? (
              <div><Loading/></div>
            ) : (
              <RecentUsersPreview users={recentUsers || []} />
            )}
          </CardContent>
        </Card>

        {/* Projects Section */}
        <Card className="bg-white dark:bg-gray-800 shadow-lg">
          <CardHeader>
           <div className='flex flex-row items-center justify-between w-full'>
              <CardTitle>Projects</CardTitle>
              <Button  className="mt-2 bg-[#0f0f0f] hover:bg-[#0f0f0f] dark:bg-white  text-white" asChild>
                <Link className='text-white dark:text-black font-semibold' href="/admin/projects">View All</Link>
              </Button>
            </div>
            
          </CardHeader>
          <CardContent>
            {projectsLoading ? (
              <div><Loading/></div>
            ) : (
              <RecentProjectsPreview projects={recentProjects || []} />
            )}
          </CardContent>
        </Card>

        {/* category Section */}
        <Card className="bg-white dark:bg-gray-800 shadow-lg">
          <CardHeader>
            <div className='flex flex-row items-center justify-between w-full'>
              <CardTitle>Steps</CardTitle>
              <Button  className="mt-2 bg-[#0f0f0f] hover:bg-[#0f0f0f] dark:bg-white  text-white" asChild>
                <Link className='text-white dark:text-black font-semibold' href="/admin/docs">View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {categoryLoading ? (
              <div><Loading/></div>
            ) : (
              <RecentcategoryPreview category={recentcategory || []} />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

