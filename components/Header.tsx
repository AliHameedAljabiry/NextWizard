'use client';

import useSWR from 'swr';
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { Avatar } from './ui/avatar';
import { Session } from 'next-auth';

const fetcher = (url: string) => fetch(url).then(res => res.json());

const Header = () => {
    const { data: currentUser, error, isLoading, mutate } = useSWR('/api/users/authorized-user', fetcher, {
      refreshInterval: 3000,
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
        
    });
    const pathname = usePathname();

    
 

    
  return (
    <div className='flex w-full items-center justify-between p-4  text-light-600 bg-black shadow-md'>
        <Link href="/" className='text-2xl flex flex-row items-center'>
            <Image src="icons/nextjs-icon.svg" alt='logo' className='h-auto' width={50} height={50}/>
            <h1 className='-ml-2 font-michroma '>extWizard</h1>
        </Link>
        <div className='flex items-center gap-5'>
            <Link href="/" className={cn('text-lg font-medium hover:text-primary', pathname === '/' && 'text-primary' )}>Home</Link>
            <Link href="/about" className={cn('text-lg font-medium hover:text-primary', pathname === '/about' && 'text-primary')}>About</Link>
            <Link href="/contact" className={cn('text-lg font-medium hover:text-primary', pathname === '/contact' && 'text-primary')}>Contact</Link>
            <Link href="/sign-in" className={cn('text-lg font-medium hover:text-primary', pathname === '/login' && 'text-primary')}>Login</Link>
            <Link href="/sign-up" className={cn('text-lg font-medium hover:text-primary', pathname === '/register' && 'text-primary')}>Register</Link>
            {currentUser?.image && <Link href='/my-profile' className={cn('text-lg font-medium hover:text-primary', pathname === '/my-profile' && 'text-primary')}>
              <Avatar className='size-8'>
                      {currentUser?.image && <Image 
                        src={currentUser.image } 
                        alt={currentUser.name ?? "User"} 
                        width={32} 
                        height={32} 
                        className='object-cover rounded-full' />}
                    </Avatar>
            </Link>}
        </div>
    </div>
  )
}

export default Header