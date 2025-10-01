'use client';

import useSWR from 'swr'
import React from 'react'
import AdminSearchBox from './AdminSearch';


const fetcher = (url: string) => fetch(url).then(res => res.json())

const AdminHeader = () => {
    const { data: currentUser } = useSWR('/api/auth/authorized-user', fetcher, {
        refreshInterval: 3000,
        revalidateOnFocus: true,
        shouldRetryOnError: false,
    });
   
  return (
    <header className='admin-header dark:bg-[#050505] '>
        
        <div className='ml-12 md:ml-0 '>
            <h2 className='text-lg sm:text-2xl font-semibold dark:text-white text-dark-400'>Welcome, {currentUser?.fullName}</h2>
            <p className='text-slate-500 text-base dark:text-gray-200'>Monitor all of your users and contant here</p>
        </div>

        
        <form className="flex items-center bg-inherit rounded-lg border border-gray-200 px-3 py-1 shadow-sm min-w-[320px] w-full max-w-md">
          <AdminSearchBox/>
        </form>
    </header>
  )
}

export default AdminHeader