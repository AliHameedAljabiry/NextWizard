"use client";

import useSWR from 'swr';
import { signOut } from "next-auth/react";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogFooter, DialogTitle } from '@/components/ui/dialog';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { gitInitials } from '@/lib/utils';
import { mutate } from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

const MyProfile = () => {
    const { data: currentUser, error, isLoading } = useSWR('/api/auth/authorized-user', fetcher, {
        refreshInterval: 3000,
        revalidateOnFocus: true,
        revalidateOnReconnect: true,
    });
    
    const [open, setOpen] = useState(false);
    const router = useRouter();

    // Use useEffect for redirect instead of direct call
    useEffect(() => {
        if (!isLoading && !currentUser) {
            router.push('/sign-in');
        }
        }, [currentUser, isLoading, router]);

        console.log(currentUser);

        const handleSignOut = async () => {
        try {
            // Clear all cache first
            mutate(() => true, undefined, { revalidate: false });
            
            // Sign out
            await signOut({ 
                redirect: true,
                callbackUrl: '/' 
            });
            
            // Force hard navigation as fallback
            window.location.href = '/';
            
        } catch (error) {
            console.error("Error signing out:", error);
            // Fallback: force hard navigation
            window.location.href = '/';
        } finally {
            setOpen(false);
        }
    };

    // Show loading state
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="text-center">Loading...</div>
            </div>
        );
    }

    // Don't render if no user (will redirect via useEffect)
    if (!currentUser) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="text-center">Redirecting...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="sign-out">
                {/* 3D Profile Image */}
                <div className="flex justify-center">
                    <div className="w-32 h-32">
                        <Avatar className="w-full h-full border-4 dark:border-gray-700 dark:shadow-[inset_0_0_10px_rgba(255,255,255,0.1),0_0_25px_rgba(0,0,0,0.7)] transform hover:rotate-1 transition-transform duration-500">
                            {currentUser?.image ? (
                                <Image
                                    src={currentUser.image}
                                    alt={currentUser.fullName ?? "User"}
                                    fill
                                    className="object-cover rounded-full"
                                />
                            ) : (
                                <AvatarFallback className="bg-amber-100 text-black text-6xl font-bold">
                                    {gitInitials(currentUser?.fullName)}
                                </AvatarFallback>
                            )}
                        </Avatar>
                    </div>
                </div>

                {/* Info Section */}
                {!isLoading && currentUser && (
                    <div className="text-center space-y-3 dark:text-white">
                        <h2 className="text-2xl font-semibold">{currentUser?.fullName}</h2>
                        {currentUser?.fullName && (
                            <p className="text-sm dark:text-gray-200">
                                @{currentUser?.username || currentUser?.fullName.toLowerCase().replace(/\s+/g, '')}
                            </p>
                        )}
                        <p className="text-sm dark:text-gray-300">{currentUser?.email}</p>
                    </div>
                )}

                {/* Sign Out Button */}
                <div className="flex justify-center items-center h-1/2">
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <button
                                type="button"
                                className="px-6 py-2 bg-red-600 max-h-fit hover:bg-red-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                                title="Sign Out"
                            >
                                Sign Out
                            </button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogTitle className='dark:text-white'>
                                Are you sure you want to Sign Out?
                            </DialogTitle>
                            <DialogFooter>
                                <Button 
                                    variant="outline" 
                                    onClick={() => setOpen(false)}
                                    className='dark:text-white'
                                >
                                    Cancel
                                </Button>
                                <Button 
                                    variant="destructive" 
                                    onClick={handleSignOut}
                                >
                                    Sign Out
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;