'use client';

import useSWR from 'swr'
import { Search } from 'lucide-react'
import React from 'react'
import { Input } from '../ui/input'


const fetcher = (url: string) => fetch(url).then(res => res.json())

const AdminHeader = () => {
    const { data: currentUser } = useSWR('/api/users/authorized-user', fetcher, {
        refreshInterval: 3000,
        revalidateOnFocus: true,
        shouldRetryOnError: false,
    });
   
  return (
    <header className='admin-header dark:bg-[#050505] '>
        
        <div>
            <h2 className='text-2xl font-semibold dark:text-white text-dark-400'>Welcome, {currentUser?.fullName}</h2>
            <p className='text-slate-500 text-base dark:text-gray-200'>Monitor all of your users and contant here</p>
        </div>

        
        <form className="flex items-center bg-white rounded-md border border-gray-200 px-3 py-1 shadow-sm min-w-[320px] w-full max-w-md">
          <Search className="text-[#647488] mr-2" size={20} />
          <Input
            type="text"
            placeholder="Search users, books by title, author, or genre."
            className="flex-1 bg-transparent border-none outline-none focus:ring-0 text-[#647488] placeholder-[#647488]"
          />
        </form>
    </header>
  )
}

export default AdminHeader