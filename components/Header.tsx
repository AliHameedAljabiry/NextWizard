'use client';

import useSWR from 'swr';
import { cn, gitInitials } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { Avatar, AvatarFallback } from './ui/avatar';



const fetcher = (url: string) => fetch(url).then(res => res.json());

const Header = () => {
  const { data: currentUser } = useSWR('/api/admin/users/authorized-user', fetcher, {
    refreshInterval: 3000,
    revalidateOnFocus: true,
    shouldRetryOnError: false,
  });

  const pathname = usePathname();

 //bg-light-300
 //bg-[#FFFFFF]

  return (
    <div className="flex w-full items-center justify-between p-4  text-black dark:text-light-600 bg-[#FFFFFF] dark:bg-[#050505] shadow-md border-b dark:border-gray-800">
      <div className='flex flxe-row items-center justify-between gap-20'>
      
        <Link href="/" className="text-2xl flex flex-row items-center ">
          <Image
                src="icons/nextjs-icon.svg"
                alt="logo"
                className="h-auto invert dark:invert-0 "
                width={50}
                height={50}
              />
          <h1 className="font-michroma -ml-3 z-20  ">extWizard</h1>
        </Link>

        
      {currentUser?.id && currentUser?.id !== undefined && 
        <div className='flex flex-row gap-4'>
            <Link href="/docs" className={cn(
              'text-lg text-gray-700 dark:text-gray-100 font-medium hover:text-blue-100 hover:underline  underline-offset-8 dark:hover:text-primary',
                pathname === '/docs' && 'text-blue-100 dark:text-primary underline  underline-offset-8')}>
              Create Project
            </Link>
        </div>}

      </div>

      <div className="flex items-center gap-5 ">
        <Link href="/" className={cn(
          'text-lg text-gray-700 dark:text-gray-100 font-medium hover:text-blue-100 hover:underline  underline-offset-8 dark:hover:text-primary',
           pathname === '/' && 'text-blue-100 dark:text-primary underline  underline-offset-8')}>
          Home
        </Link>
        <Link href="/about" className={cn(
          'text-lg text-gray-700 dark:text-gray-100 font-medium hover:text-blue-100 hover:underline  underline-offset-8 dark:hover:text-primary',
           pathname === '/about' && 'text-blue-100 dark:text-primary underline  underline-offset-8')}>
          About
        </Link>
        <Link href="/contact" className={cn(
          'text-lg text-gray-700 dark:text-gray-100 font-medium hover:text-blue-100 hover:underline  underline-offset-8 dark:hover:text-primary',
           pathname === '/contact' && 'text-blue-100 dark:text-primary underline  underline-offset-8')}>
          Contact
        </Link>
        {!currentUser?.id && currentUser?.id === undefined && (
          <>
            <Link href="/sign-in" className={cn(
              'text-lg text-gray-700 dark:text-gray-100 font-medium hover:text-blue-100 hover:underline  underline-offset-8 dark:hover:text-primary',
               pathname === '/login' && 'text-blue-100 dark:text-primary underline  underline-offset-8')}>
              Sign in
            </Link>
            <Link href="/sign-up" className={cn('text-lg text-gray-700 dark:text-gray-100 font-medium hover:text-blue-100 hover:underline  underline-offset-8 dark:hover:text-primary', pathname === '/register' && 'text-blue-100 dark:text-primary underline  underline-offset-8')}>
              Sign up
            </Link>
          </>
        )}

        {/* Show Admin link only for admins */}
        {currentUser?.role === 'ADMIN' && (
          <Link href='/admin' 
            className={'text-lg text-gray-700 dark:text-gray-100 font-medium hover:text-blue-100 hover:underline  underline-offset-8 dark:hover:text-primary'}>
              Admin
          </Link>  
        )}

        {currentUser?.id && currentUser?.id !== undefined &&  
              <Link href='/my-profile' className={cn('text-lg font-medium hover:text-primary', pathname === '/my-profile' && 'text-primary')}>
              <Avatar className='size-12'>
                      {currentUser?.image ? (<Image 
                        src={currentUser.image ?? 'https://placehold.co/400x600.png' } 
                        alt={currentUser.name ?? "User"} 
                        width={32} 
                        height={32} 
                        className='object-cover rounded-full' />
                      ) : (
                        <AvatarFallback className="bg-amber-100 text-black text-4xl font-bold ">
                          {gitInitials(currentUser?.fullName)}
                        </AvatarFallback>
                      )}
                    </Avatar>
            </Link>}
      </div>
    </div>
  );
};

export default Header;

/**
 can you update the logo image to have src depends on mode?
'use client';

import useSWR from 'swr';
import { cn, gitInitials } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { Avatar, AvatarFallback } from './ui/avatar';
import lightNextJsIcon from "icons/nextjs-icon.svg" // use this for dark mode 
import darkNextJsIcon from "images/darkNextJsIcon.png" // use this for light mode 


//bg-[#25292e]

const fetcher = (url: string) => fetch(url).then(res => res.json());

const Header =  (ifUser: {ifUser: string}) => {
    const { data: currentUser, error, isLoading, mutate } = useSWR('/api/users/authorized-user'  , fetcher, {
      refreshInterval: 3000,
      revalidateOnFocus: true,
      shouldRetryOnError: false
      
    });
    const pathname = usePathname();

    
  console.log("currentUser:", currentUser?.id);
  
    
  return (
    <div className=' flex w-full items-center justify-between p-4  text-black dark:text-light-600 bg-white dark:bg-[#0d1117] shadow-md border-b border-gray-800'>
        <Link href="/" className='text-2xl flex flex-row items-center'>
            <Image src={} alt='logo' className='h-auto' width={50} height={50}/>
            <h1 className='-ml-2 font-michroma '>extWizard</h1>
        </Link>
        <div className='flex items-center gap-5'>
            <Link href="/" className={cn('text-lg font-medium hover:text-primary', pathname === '/' && 'text-primary' )}>Home</Link>
            <Link href="/about" className={cn('text-lg font-medium hover:text-primary', pathname === '/about' && 'text-primary')}>About</Link>
            <Link href="/contact" className={cn('text-lg font-medium hover:text-primary', pathname === '/contact' && 'text-primary')}>Contact</Link>
<<<<<<< HEAD
            {!currentUser?.id && currentUser?.id === undefined && 
              <Link href="/sign-in" className={cn('text-lg font-medium hover:text-primary', pathname === '/login' && 'text-primary')}>Sign in</Link>
              }
            {!currentUser?.id && currentUser?.id === undefined && 
              <Link href="/sign-up" className={cn('text-lg font-medium hover:text-primary', pathname === '/register' && 'text-primary')}>Sign up</Link>
              }
            {currentUser?.id && currentUser?.id !== undefined &&  
              <Link href='/my-profile' className={cn('text-lg font-medium hover:text-primary', pathname === '/my-profile' && 'text-primary')}>
=======
            {!currentUser?.id && currentUser?.id === undefined && <Link href="/sign-in" className={cn('text-lg font-medium hover:text-primary', pathname === '/login' && 'text-primary')}>Login</Link>}
            {!currentUser?.id && currentUser?.id === undefined && <Link href="/sign-up" className={cn('text-lg font-medium hover:text-primary', pathname === '/register' && 'text-primary')}>Register</Link>}
            {currentUser?.id && currentUser?.id !== undefined &&  <Link href='/my-profile' className={cn('text-lg font-medium hover:text-primary', pathname === '/my-profile' && 'text-primary')}>
>>>>>>> 2bf72e99f5f96c1cae9d7acd44d9381636596724
              <Avatar className='size-8'>
                      {currentUser?.image ? (<Image 
                        src={currentUser.image ?? 'https://placehold.co/400x600.png' } 
                        alt={currentUser.name ?? "User"} 
                        width={32} 
                        height={32} 
                        className='object-cover rounded-full' />
                      ) : (
                        <AvatarFallback className="bg-amber-100 text-black text-xl font-bold">
                          {gitInitials(currentUser?.fullName)}
                        </AvatarFallback>
                      )}
                    </Avatar>
            </Link>}
        </div>
    </div>
  )
}

export default Header 
 */
