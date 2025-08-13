'use client'

import useSWR from 'swr'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { cn, gitInitials } from '@/lib/utils'
import Image from 'next/image'
import { useState } from 'react'

import dynamic from 'next/dynamic';
import DeleteUser from '@/components/admin/DataManagment/DeleteUser'
const MotionDiv = dynamic(() =>
  import('framer-motion').then((mod) => mod.motion.div),
  { ssr: false }
);


const fetcher = (url: string) => fetch(url).then(res => {
  if (!res.ok) {
    throw new Error('Failed to fetch users')
  }
  return res.json()
})

const Users = ({initialData}: {initialData: any}) => {
  const { data, isLoading, error, mutate } = useSWR('/api/admin/users/all-users', fetcher, {
    fallbackData: initialData,
    revalidateOnMount: true,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: 3000, 
  })
 
  // Sort users by name
  const [sortAsc, setSortAsc] = useState(true);
  const sortedUsers = data ? [...data].sort((a, b) => {
    if (!a.fullName || !b.fullName) return 0;
    return sortAsc
      ? a.fullName.localeCompare(b.fullName)
      : b.fullName.localeCompare(a.fullName)
  }) : [];

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading users: {error.message}</div>
  if (!data) return <div>No users found</div>

  return (
    <section className='bg-[#FFFFFF] p-5 rounded-2xl all-users min-h-screen'>
      <div className='flex flex-row justify-between items-center'>
        <h1 className='font-semibold text-xl dark:text-white'>All Users</h1>
        <Button 
          className='bg-inherit dark:bg-slate-100 flex flex-row shadow rounded-md gap-2 '
          onClick={() => setSortAsc((prev) => !prev)}
          title={sortAsc ? "Sort users from A to Z" : "Sort users from Z to A"}
        >
          {sortAsc ? "A-Z" : "Z-A"}
          <Image src="/icons/admin/arrow-swap.svg" className='' alt='swap' width={20} height={20}/>
        </Button>
      </div>

      <MotionDiv
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1 }}
        className=""
      >
        <div className='users font-medium '>
          <table className="min-w-full mt-6 border  rounded-lg overflow-hidden">
            <thead className="bg-light-300 dark:bg-[#1c293d] dark:text-gray-200  text-[#3A354E] text-sm font-light ">
              <tr>
                  <th className="px-4 py-2 text-left font-normal">Name</th>
                  <th className="px-4 py-2 text-left font-normal">Date Joined</th>
                  <th className="px-4 py-2 text-center font-normal">Last Activity Date</th>
                  <th className="px-4 py-2 text-center font-normal">Role</th>
                  <th className="px-4 py-2 text-center font-normal">Action</th>
              </tr>
            </thead>
            
            <tbody className=''>
              {sortedUsers.map((user: User) => (
                <tr key={user.id} className="border-t ">
                  <td className="px-4 py-2 flex flex-row items-center text-sm gap-3">
                    <Avatar>
                        <AvatarFallback className='bg-amber-100 text-2xl'>
                            {gitInitials(user.fullName)}
                        </AvatarFallback>
                    </Avatar>
                    <div className='flex flex-col max-md:hidden text-sm'>
                      <p className='text-dark-200 dark:text-white font-semibold'>{user.fullName}</p>
                      <p className='text-light-500 dark:text-gray-300 text-xs max-xl:hidden'>{user.email}</p>
                    </div>
                  </td>
                  <td className="px-4 py-2 text-[#3A354E] dark:text-gray-300 text-sm">
                    {new Date(user.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </td>
                  <td className="px-4 py-2 text-[#3A354E] dark:text-gray-300 text-sm text-center">
                    {new Date(user.lastActivityDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </td>

                  <td className={cn("px-4 py-2 text-center  text-sm flex justify-center" )}>
                    <div className={cn("w-fit rounded-md", user.role === 'ADMIN' 
                          ? 'text-[#027A48] bg-[#ECFDF3]' 
                          : 'text-[#C11574] bg-[#FDF2FA]')}>
                      <select
                        title='Select Role'
                        className={cn("bg-transparent rounded px-2 py-1 text-sm ")}
                        value={user.role}
                        onChange={async (e) => {
                          const newRole = e.target.value;
                          try {
                            const res = await fetch('/api/admin/users/update-role', {
                              method: 'POST',
                              headers: {
                                'Content-Type': 'application/json',
                              },
                              body: JSON.stringify({ userId: user.id, role: newRole }),
                            });

                            if (res.ok) {
                              mutate(); // refresh the users
                            } else {
                              console.error('Failed to update role');
                            }
                          } catch (error) {
                            console.error('Error updating role:', error);
                          }
                        }}
                      >
                        <option value="USER">User</option>
                        <option value="ADMIN">Admin</option>
                      </select>
                    </div>
                  </td>

                  
                  <td className="px-4 py-2 text-center">
                    <DeleteUser userId={user.id} onDelete={mutate} username={user.fullName}/>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </MotionDiv>
    </section>
  )
}

export default Users