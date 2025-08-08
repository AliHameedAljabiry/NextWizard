'use client';

import useSWR from 'swr';
import { cn, gitInitials } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Menu, X } from 'lucide-react';

const fetcher = (url: string) => fetch(url).then(res => res.json());

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: currentUser } = useSWR('/api/auth/authorized-user', fetcher, {
    refreshInterval: 3000,
    revalidateOnFocus: true,
    shouldRetryOnError: false,
  });

  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex w-full items-center justify-between p-4 text-black dark:text-light-600 bg-[#FFFFFF] dark:bg-[#050505] shadow-md border-b dark:border-gray-800">
      <div className='flex flex-row items-center justify-between gap-20'>
        <Link href="/" className="text-2xl flex flex-row items-center ml-8 md:ml-0">
          <Image
            src="icons/nextjs-icon.svg"
            alt="logo"
            className="h-auto invert dark:invert-0 min-w-[40px]"
            width={50}
            height={50}
          />
          <h1 className="font-michroma -ml-3 z-20 hidden md:block">extWizard</h1>
          <h1 className="font-michroma -ml-3 z-20 md:hidden">W</h1>
        </Link>

        {/* Desktop Navigation - Hidden on medium and smaller screens */}
        {currentUser?.id && (
          <div className='hidden md:flex flex-row gap-4'>
            <Link href="/" className={cn(
              'text-lg text-gray-700 dark:text-gray-100 font-medium hover:text-blue-100 hover:underline underline-offset-8 dark:hover:text-primary',
              pathname === '/' && 'text-blue-100 dark:text-primary underline underline-offset-8')}>
              Home
            </Link>

            <Link href="/docs" className={cn(
              'text-lg text-gray-700 dark:text-gray-100 font-medium hover:text-blue-100 hover:underline underline-offset-8 dark:hover:text-primary',
              pathname === '/docs' && 'text-blue-100 dark:text-primary underline underline-offset-8')}>
              Create Project
            </Link>
            
            <Link href="/about" className={cn(
              'text-lg text-gray-700 dark:text-gray-100 font-medium hover:text-blue-100 hover:underline underline-offset-8 dark:hover:text-primary',
              pathname === '/about' && 'text-blue-100 dark:text-primary underline underline-offset-8')}>
              About
            </Link>
            
            <Link href="/contact" className={cn(
              'text-lg text-gray-700 dark:text-gray-100 font-medium hover:text-blue-100 hover:underline underline-offset-8 dark:hover:text-primary',
              pathname === '/contact' && 'text-blue-100 dark:text-primary underline underline-offset-8')}>
              Contact
            </Link>

            {/* Show Admin link only for admins */}
            {currentUser?.role === 'ADMIN' && (
              <Link href='/admin' 
                className={'text-lg text-gray-700 dark:text-gray-100 font-medium hover:text-blue-100 hover:underline underline-offset-8 dark:hover:text-primary'}>
                  Admin
              </Link>  
            )}
          </div>
        )}
      </div>

      <div className="flex items-center gap-5">
        {/* Mobile menu button - Only visible on medium and smaller screens */}
        {currentUser?.id && (
          <button 
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        )}
                
        {!currentUser?.id && (
          <>
            <Link href="/sign-in" className={cn(
              'text-lg text-gray-700 dark:text-gray-100 font-medium hover:text-blue-100 hover:underline underline-offset-8 dark:hover:text-primary',
              pathname === '/login' && 'text-blue-100 dark:text-primary underline underline-offset-8')}>
              Sign in
            </Link>
            <Link href="/sign-up" className={cn(
              'text-lg text-gray-700 dark:text-gray-100 font-medium hover:text-blue-100 hover:underline underline-offset-8 dark:hover:text-primary', 
              pathname === '/register' && 'text-blue-100 dark:text-primary underline underline-offset-8')}>
              Sign up
            </Link>
          </>
        )}

        {currentUser?.id && (
          <Link href='/my-profile' className={cn(
            'text-lg font-medium hover:text-primary', 
            pathname === '/my-profile' && 'text-primary')}>
            <Avatar className='size-12'>
              {currentUser?.image ? (
                <Image 
                  src={currentUser.image ?? 'https://placehold.co/400x600.png'} 
                  alt={currentUser.name ?? "User"} 
                  width={32} 
                  height={32} 
                  className='object-cover rounded-full' />
              ) : (
                <AvatarFallback className="bg-amber-100 text-black text-4xl font-bold">
                  {gitInitials(currentUser?.fullName)}
                </AvatarFallback>
              )}
            </Avatar>
          </Link>
        )}
      </div>

      {/* Mobile Menu - Only visible when isMenuOpen is true */}
      {isMenuOpen && currentUser?.id && (
        <div className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-end" onClick={() => setIsMenuOpen(false)}>
          <div className="w-64 h-full bg-white dark:bg-gray-900 p-6 pt-16 shadow-lg flex flex-col gap-6" onClick={(e) => e.stopPropagation()}>
            <Link href="/" 
              className={cn(
                'text-lg text-gray-700 dark:text-gray-100 font-medium hover:text-blue-100 hover:underline underline-offset-8 dark:hover:text-primary',
                pathname === '/' && 'text-blue-100 dark:text-primary underline underline-offset-8'
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>

            <Link href="/docs" 
              className={cn(
                'text-lg text-gray-700 dark:text-gray-100 font-medium hover:text-blue-100 hover:underline underline-offset-8 dark:hover:text-primary',
                pathname === '/docs' && 'text-blue-100 dark:text-primary underline underline-offset-8'
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              Create Project
            </Link>
            
            <Link href="/about" 
              className={cn(
                'text-lg text-gray-700 dark:text-gray-100 font-medium hover:text-blue-100 hover:underline underline-offset-8 dark:hover:text-primary',
                pathname === '/about' && 'text-blue-100 dark:text-primary underline underline-offset-8'
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            
            <Link href="/contact" 
              className={cn(
                'text-lg text-gray-700 dark:text-gray-100 font-medium hover:text-blue-100 hover:underline underline-offset-8 dark:hover:text-primary',
                pathname === '/contact' && 'text-blue-100 dark:text-primary underline underline-offset-8'
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>

            {/* Show Admin link only for admins */}
            {currentUser?.role === 'ADMIN' && (
              <Link 
                href='/admin' 
                className='text-lg text-gray-700 dark:text-gray-100 font-medium hover:text-blue-100 hover:underline underline-offset-8 dark:hover:text-primary'
                onClick={() => setIsMenuOpen(false)}
              >
                Admin
              </Link>  
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;