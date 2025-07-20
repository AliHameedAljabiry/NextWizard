"use client";

import useSWR from 'swr';
import { signOut } from "next-auth/react";
import React, { useState } from "react";
import Image from "next/image";
import { redirect, useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogFooter, DialogTitle } from '@/components/ui/dialog';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { gitInitials } from '@/lib/utils';


const fetcher = (url: string) => fetch(url).then(res => res.json());

const MyProfile = () => {
    
    
    const { data: currentUser, error, isLoading, mutate } = useSWR('/api/users/authorized-user', fetcher, {
        refreshInterval: 3000,
        revalidateOnFocus: true,
        revalidateOnReconnect: true,
        
    });
    const [open, setOpen] = useState(false);
 
    const router = useRouter();

    
    
    const handleSignOut = async () => {
        try {
            mutate('/api/users/authorized-user', false); // Optionally mutate the SWR cache    
            await signOut({ redirect: false });
            router.push('/'); // Redirect to home page after sign out
            redirect('/');
           
            
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

  return (
    <div className="min-h-screen flex items-center justify-center  p-4">
      <div className="w-full max-w-xl rounded-2xl h-[500px] shadow-[0_0_25px_rgba(0,0,0,0.8)] bg-gradient-to-br from-[#1a1a1a] to-[#111] border border-gray-800 p-6 space-y-6 transform transition duration-500 hover:scale-[1.01]">

        {/* 3D Profile Image */}
        <div className="flex justify-center">
            <div className="w-32 h-32">
                <Avatar className="w-full h-full border-4 border-gray-700 shadow-[inset_0_0_10px_rgba(255,255,255,0.1),0_0_25px_rgba(0,0,0,0.7)] transform hover:rotate-1 transition-transform duration-500">
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
        {!isLoading && currentUser && <div className="text-center space-y-3 text-white ">
          <h2 className="text-2xl font-semibold">{currentUser?.fullName}</h2>
          {currentUser?.fullName && <p className="text-sm text-gray-200">@{currentUser?.username || currentUser?.fullName.toLowerCase().replace(/\s+/g, '') }</p>}
          <p className="text-sm text-gray-300">{currentUser?.email}</p>
        </div>}

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
                    <DialogTitle>
                        Are you sure you want to Sign Out?
                    </DialogTitle>
                    <DialogFooter>
                        <Button 
                            variant="outline" 
                            onClick={() => setOpen(false)}
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
