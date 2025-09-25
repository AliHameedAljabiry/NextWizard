'use client'
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from '../ui/dialog';
import Image from 'next/image';
import { Button } from '../ui/button';
import { toast } from '@/hooks/use-toast';
import { deleteProject } from '@/lib/actions/admin/deleteProject';

type DeleteProjectProps = {
  projectId: string;
  onDelete?: () => void;
};
const DeleteProject = ({ projectId, onDelete }: DeleteProjectProps) => {
  const [open, setOpen] = useState(false);

  const handleDeleteProject = async () => {
    try {
      const result = await deleteProject({ projectId });
      toast({
        title: "Success",
        description: "Project deleted successfully",
      });
      setOpen(false)
      if (onDelete) onDelete(); // <-- call mutate after successful delete
      
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while deleting the Project",
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
          title="Delete Project"
        >
          <Image src="/icons/admin/trash.svg" alt="Delete" width={20} height={20} className='min-w-[20px]'/>
        </button>
      </DialogTrigger>

      <DialogContent>
          <DialogTitle className='dark:text-white'>
              Are you sure you want to delete this project?
          </DialogTitle>

          <DialogFooter>
            <Button className='dark:text-white' variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteProject}>
              Delete
            </Button>
          </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};


export default DeleteProject