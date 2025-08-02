"use client";

import React, { useState } from 'react'
import Image from 'next/image'
import { toast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { deleteStep } from '@/lib/actions/admin/deleteStep';
import { deleteCategory } from '@/lib/actions/admin/deleteCategory';


type DeleteCatProps = {
  catId: string;
  onDelete?: () => void;
  catName: string;
};

const DeleteCategory = ({ catId, onDelete, catName }: DeleteCatProps) => {
  const [open, setOpen] = useState(false);

  const handleDeleteUser = async () => {
    try {
      const result = await deleteCategory({ catId });
      toast({
        title: "Success",
        description: "Category deleted successfully",
      });
      setOpen(false)
      if (onDelete) onDelete(); 
      
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while deleting the Category",
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
          title={`Delete ${catName}`}
        >
          <Image src="/icons/admin/trash.svg" alt="Delete" width={20} height={20} />
        </button>
      </DialogTrigger>

      <DialogContent>
          <DialogTitle className='dark:text-white font-normal leading-6 '>
              Are you sure you want to delete <b>{catName}</b>? This action will delete the <b>{catName}</b> and all its parts and all the steps that related to these parst 
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

export default DeleteCategory;