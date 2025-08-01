"use client";

import React, { useState } from 'react'
import Image from 'next/image'
import { toast } from "@/hooks/use-toast";
import { deleteUser } from '@/lib/actions/admin/deleteUser';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';


type DeleteUserProps = {
  userId: string;
  onDelete?: () => void;
  username: string;
};

const DeleteUser = ({ userId, onDelete, username }: DeleteUserProps) => {
  const [open, setOpen] = useState(false);

  const handleDeleteUser = async () => {
    try {
      const result = await deleteUser({ userId });
      toast({
        title: "Success",
        description: "User deleted successfully",
      });
      setOpen(false)
      if (onDelete) onDelete(); // <-- call mutate after successful delete
      
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while deleting the user",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type='button'
          className="text-red-500 hover:text-red-700"
          title="Delete User"
        >
          <Image src="/icons/admin/trash.svg" alt="Delete" width={20} height={20} />
        </button>
      </DialogTrigger>

      <DialogContent>
          <DialogTitle className='dark:text-white'>
              Are you sure you want to delete <b>{username}</b>?
          </DialogTitle>

          <DialogFooter>
            <Button className='dark:text-white' variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteUser}>
              Delete
            </Button>
          </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteUser;