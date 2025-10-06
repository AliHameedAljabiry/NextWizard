"use client";

import React, { useState } from 'react'
import Image from 'next/image'
import { toast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { deleteStep } from '@/lib/actions/admin/deleteStep';


type DeleteStepProps = {
  stepId: string;
  onDelete?: () => void;
  title: string;
};

const DeleteStep = ({ stepId, onDelete, title }: DeleteStepProps) => {
  const [open, setOpen] = useState(false);

  const handleDeleteUser = async () => {
    try {
      const result = await deleteStep({ stepId });
      toast({
        title: "Success",
        description: "Step deleted successfully",
      });
      setOpen(false)
      if (onDelete) onDelete(); 
      
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while deleting the step",
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
          title="Delete Step"
        >
          <Image src="/icons/admin/trash.svg" alt="Delete" width={20} height={20} className='min-w-[20px]' />
        </button>
      </DialogTrigger>

      <DialogContent>
          <DialogTitle className='dark:text-white'>
              Are you sure you want to delete <b>{title}</b>?
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

export default DeleteStep;