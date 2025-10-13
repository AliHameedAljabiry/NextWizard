'use client';

import useSWR from 'swr';
import { cn, gitInitials } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Menu, Search, X } from 'lucide-react';
import SearchBox from './Search';

const fetcher = (url: string) => fetch(url).then(res => res.json());

type HeaderProps = {
  session: any | null; 
};

const Header = ({ session }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  //hydrate SWR with session
  const { data: currentUser } = useSWR(
    session ? '/api/auth/authorized-user' : null,
    fetcher,
    {
      fallbackData: session,
      revalidateOnFocus: true,
      shouldRetryOnError: false,
      refreshInterval: 3000,
    }
  );
 
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className=" flex max-h-20 w-full items-center justify-between p-2 xs:p-4 text-black dark:text-light-600 bg-[#FFFFFF] dark:bg-[#050505] shadow-md border-b dark:border-gray-800">
      <div className='flex flex-row items-center justify-between gap-3 xl:gap-20'>
        <Link href="/" className="text-2xl flex flex-row items-center ml-5 sm:ml-12 md:ml-0">
          <Image
            src="/icons/logo1.svg"
            alt="Logo"
            className="h-auto invert dark:invert-0 min-w-[40px] -ml-5 md:hidden rounded-full p-0.5 border border-gray-300 dark:border-gray-700 shadow-[0_0_35px_rgba(147,51,234,0.3)] transition-all duration-300"
            width={50}
            height={50}
          />
          <h1 className="font-michroma -ml-3 xs:ml-0 z-20 hidden md:block ">NextWizard</h1>
        </Link>

        {/* Desktop Navigation - Hidden on medium and smaller screens */}
        {currentUser?.id && (
          <div className='hidden lg:flex flex-row gap-5 mr-0'>
            <Link href="/" className={cn(
              'text-lg text-gray-700 dark:text-gray-100 font-medium hover:text-blue-100 hover:underline underline-offset-8 dark:hover:text-primary',
              pathname === '/' && 'text-blue-100 dark:text-primary underline underline-offset-8')}>
              Home
            </Link>

            <Link href="/docs" className={cn(
              'text-lg text-gray-700 dark:text-gray-100 font-medium hover:text-blue-100 hover:underline underline-offset-8 dark:hover:text-primary whitespace-nowrap',
              pathname === '/docs' && 'text-blue-100 dark:text-primary underline underline-offset-8')}>
              Docs
            </Link>
            
            <Link href="/projects" className={cn(
              'text-lg text-gray-700 dark:text-gray-100 font-medium hover:text-blue-100 hover:underline underline-offset-8 dark:hover:text-primary whitespace-nowrap',
              pathname === '/projects' && 'text-blue-100 dark:text-primary underline underline-offset-8')}>
              Projects
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
                  Dashboard
              </Link>  
            )}

          </div>
        )}
        <form className=" items-center mr-0 xs:mr-3  bg-inherit rounded-lg border border-gray-200 px-3 py-1 shadow-sm min-w-[110px] sm:min-w-[200px] xl:min-w-[400px] w-full ">
          <SearchBox/>
        </form>
      </div>

      <div className="flex items-center gap-1 xs:gap-5">
        {/* Mobile menu button - Only visible on medium and smaller screens */}
        {currentUser?.id && (
          <button 
            onClick={toggleMenu}
            className="lg:hidden p-2 rounded-md"
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
            <div className='w-12 h-12 rounded-full '>
              <Avatar className='w-full h-full border-4 dark:border-gray-700  dark:shadow-[inset_0_0_10px_rgba(255,255,255,0.1),0_0_25px_rgba(0,0,0,0.7)]'>
                {currentUser?.image ? (
                  <Image 
                    src={currentUser.image} 
                    alt={currentUser.name ?? "User"} 
                    fill 
                    className='object-cover rounded-full' />
                ) : (
                  <AvatarFallback className="bg-amber-100 text-black text-4xl font-bold">
                    {gitInitials(currentUser?.email || currentUser?.fullName )}
                  </AvatarFallback>
                )}
              </Avatar>
            </div>
          </Link>
        )}
      </div>

      {/* Mobile Menu - Only visible when isMenuOpen is true */}
      {isMenuOpen && currentUser?.id && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-end" onClick={() => setIsMenuOpen(false)}>
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
              Docs
            </Link>
            <Link href="/projects" 
              className={cn(
                'text-lg text-gray-700 dark:text-gray-100 font-medium hover:text-blue-100 hover:underline underline-offset-8 dark:hover:text-primary',
                pathname === '/projects' && 'text-blue-100 dark:text-primary underline underline-offset-8'
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              Projects
            </Link>
            
            <Link href="/about" 
              className={cn(
                'text-lg text-gray-700  dark:text-gray-100 font-medium hover:text-blue-100 hover:underline underline-offset-8 dark:hover:text-primary',
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