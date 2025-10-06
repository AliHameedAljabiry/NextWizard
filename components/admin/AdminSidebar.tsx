'use client'

import useSWR from 'swr'
import { adminSideBarLinks } from '@/constants'
import { cn, gitInitials } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { ThemeToggle } from '../ThemeToggle'

const fetcher = (url: string) => fetch(url).then(res => res.json())

const Sidebar =  () => {

const { data: currentUser } = useSWR('/api/auth/authorized-user', fetcher, {
    refreshInterval: 3000,
    revalidateOnFocus: true,
    shouldRetryOnError: false,
  });

  const pathname = usePathname();

  return (
    <div className='admin-sidebar dark:bg-[#0d1117] shadow dark:text-white max-w-64'>
      <div>
        <Link href="/" className="text-2xl flex flex-row items-center mt-4 sm:mt-0">
          <Image
                src="/icons/nextjs-icon.svg"
                alt="logo"
                className="h-auto invert dark:invert-0"
                width={50}
                height={50}
              />
          <h1 className="font-michroma hidden sm:block  -ml-3 z-20  ">extWizard</h1>
        </Link>

        <div className='mt-10 flex flex-col gap-5'>
          {adminSideBarLinks.map((link) => {
            //isSelected will be true when: 
              // 1- if the pathname  is equel to /admin this will be the admin home page wich has the path /admin
              // 2- if the pathname is note equel to /admin and includes any link.route (this means 
                  // that the /admin is part of the path not all of it) and pathname length has more than one charecter it means more than / 
            // otherwise it will be false
            const isSelected = (link.route !== '/admin' && pathname.includes(link.route) && link.route.length > 1) || pathname == link.route;

            return (
                <Link href={link.route} key={link.route}>
                  <div className={cn('link', isSelected && 'bg-[#7777] dark:bg-[#7777] shadow-sm')}>
                    <div className='relative size-5'>
                    <Image src={link.img} alt='admin' className={` ${isSelected ? 'dark:brightness-100 brightness-0 ' : 'brightness-0  dark:brightness-100'} object-contain`} width={20} height={20}/>
                    </div>

                    <p className={cn(isSelected ? ' text-black dark:text-white ' : 'text-dark')}>{link.text}</p>
                  </div>
                </Link>
            )
          })}
        </div>
      </div>

      <div className='mt-72 flex  flex-row gap-2 rounded-full border border-light-400 px-6 py-2 shadow-sm max-md:px-2'>
        <Avatar>
          <AvatarFallback className='bg-amber-100 dark:text-black test-2xl'>
            {gitInitials(currentUser?.fullName || '')}
          </AvatarFallback>
        </Avatar>

        <div className=" flex-col min-w-0 flex-1 hidden xs:flex">
          <p className="text-dark-200 dark:text-white font-semibold">
            {currentUser?.fullName}
          </p>
          <p
            title={currentUser?.email}
            className="text-[#64748B] dark:text-gray-300 text-sm overflow-hidden text-ellipsis whitespace-nowrap w-full text-left"
          >
            {currentUser?.email}
          </p>

        </div>
      </div>
      <div className='w-fit flex flex-row items-center justify-center mx-auto'>
        <ThemeToggle />
      </div>
    </div>
  )
}

export default Sidebar