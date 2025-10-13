'use client'

import useSWR from 'swr'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { cn, gitInitials } from '@/lib/utils'
import Image from 'next/image'
import { useState } from 'react'

import dynamic from 'next/dynamic';
import DeleteUser from '@/components/admin/DataManagment/DeleteUser'
import Loading from '@/app/loading'
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

const Users  = ({initialData}: {initialData: any}) => {
  const { data, isLoading, error, mutate } = useSWR('/api/admin/users/all-users', fetcher, {
    fallbackData: initialData,
    revalidateOnMount: true,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: 3000, 
  })

  const [sortAsc, setSortAsc] = useState(true);
  const sortedUsers = data ? [...data].sort((a, b) => {
    if (!a.fullName || !b.fullName) return 0;
    return sortAsc
      ? a.fullName.localeCompare(b.fullName)
      : b.fullName.localeCompare(a.fullName)
  }) : [];

  if (isLoading) return <div><Loading/></div>
  if (error) return <div className='dark:text-white'>Error loading users: {error.message}</div>
  if (!data) return <div>No users found</div>

  return (
    <section className='bg-[#FFFFFF] p-3 md:p-5 rounded-2xl all-users min-h-[800px]'>
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-3'>
        <h1 className='font-semibold text-xl dark:text-white'>All Users</h1>
        <Button 
          className='bg-inherit dark:bg-slate-100 flex flex-row shadow rounded-md gap-2 '
          onClick={() => setSortAsc((prev) => !prev)}
          title={sortAsc ? "Sort users from A to Z" : "Sort users from Z to A"}
        >
          {sortAsc ? "A-Z" : "Z-A"}
          <Image src="/icons/admin/arrow-swap.svg" alt='swap' width={20} height={20}/>
        </Button>
      </div>

      <MotionDiv
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1 }}
        className=""
      >
        {/* Responsive Table */}
        <div className='users font-medium w-full'>
          <div className="block md:hidden mt-6">
            {sortedUsers.map((user: User) => (
              <div key={user.id} className="border rounded-lg mb-4 p-3 flex flex-col gap-2 bg-light-300 dark:bg-[#1c293d]">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className='bg-amber-100 text-2xl'>
                      {gitInitials(user.username || user?.fullName || user?.email)}
                    </AvatarFallback>
                  </Avatar>
                  <div className='flex flex-col text-sm min-w-0 flex-1'>
                    <p className='text-dark-200 dark:text-white font-semibold'>{user.fullName}</p>
                    <p className='text-[#64748B] dark:text-gray-300 text-sm overflow-hidden text-ellipsis whitespace-nowrap w-full text-left'>{user.email}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-1 text-xs mt-2">
                  <span className='text-white'>
                    <strong className='dark:text-gray-200'>Date Joined:</strong> {new Date(user.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                  <span className='text-white'>
                    <strong className='dark:text-gray-200'>Last Activity:</strong> {new Date(user.lastActivityDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                  <span className='mt-3'>
                    <strong className='text-sm dark:text-white'>Role:</strong>
                    <select
                      title='Select Role'
                      className={cn("bg-transparent rounded px-2 py-1 text-sm ml-2", user.role === 'ADMIN' 
                        ? 'text-[#027A48] bg-[#ECFDF3]' 
                        : 'text-[#C11574] bg-[#FDF2FA]')}
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
                            mutate();
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
                  </span>
                </div>
                <div className="flex justify-end">
                  <DeleteUser userId={user.id} onDelete={mutate} username={user.fullName}/>
                </div>
              </div>
            ))}
          </div>
          <table className="min-w-full mt-6 border rounded-lg overflow-hidden hidden md:table">
            <thead className="bg-light-300 dark:bg-[#1c293d] dark:text-gray-200 text-[#3A354E] text-sm font-light">
              <tr>
                <th className="px-4 py-2 text-left font-normal ">Name</th>
                <th className="px-4 py-2 text-left font-normal ">Date Joined</th>
                <th className="px-4 py-2 text-center font-normal">Last Activity Date</th>
                <th className="px-4 py-2 text-center font-normal">Role</th>
                <th className="px-4 py-2 text-center font-normal">Action</th>
              </tr>
            </thead>
            <tbody>
              {sortedUsers.map((user: User) => (
                <tr key={user.id} className="border-t">
                  <td className="px-4 py-2 flex flex-row items-center text-sm gap-3">
                    <div className='w-12 h-12 rounded-full '>
                      <Avatar className='w-full h-full  dark:border-gray-700  '>
                        {user?.image ? (
                          <Image 
                            src={user.image} 
                            alt={user.fullName ?? "User"} 
                            fill 
                            className='object-cover rounded-full' />
                        ) : (
                          <AvatarFallback className="bg-amber-100 text-black text-4xl font-bold">
                            {gitInitials(user?.email || user?.fullName || user?.email)}
                          </AvatarFallback>
                        )}
                      </Avatar>
                    </div>
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
                  <td className={cn("px-4 py-2 text-center text-sm flex justify-center  mb-4 ")}>
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
                              mutate();
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