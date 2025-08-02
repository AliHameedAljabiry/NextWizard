"use client";

import React, { useState } from 'react'
import Image from 'next/image'
import { toast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { deleteStep } from '@/lib/actions/admin/deleteStep';
import { deleteCategory } from '@/lib/actions/admin/deleteCategory';
import { deletePart } from '@/lib/actions/admin/deletePart';


type DeletePartProps = {
  partId: string;
  onDelete?: () => void;
  partName: string;
};

const DeletePart = ({ partId, onDelete, partName }: DeletePartProps) => {
  const [open, setOpen] = useState(false);

  const handleDeleteUser = async () => {
    try {
      const result = await deletePart({ partId });
      toast({
        title: "Success",
        description: "Part deleted successfully",
      });
      setOpen(false)
      if (onDelete) onDelete(); 
      
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while deleting the Part",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type='button'
          className="text-red-500 hover:text-red-700 mb-2"
          title={`Delete ${partName}`}
        >
          <Image src="/icons/admin/trash.svg" alt="Delete" width={20} height={20} />
        </button>
      </DialogTrigger>

      <DialogContent>
          <DialogTitle className='dark:text-white font-normal leading-6'>
              Are you sure you want to delete <b>{partName}</b>? This action will delete the <b>{partName}</b> and all the steps that related to this part
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

export default DeletePart;