'use client'

import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import useSWR from 'swr';
import { FilePen } from 'lucide-react';
import DeleteProject from './DeleteProject';
import Loading from '@/app/loading';

const fetcher = (url: string) => fetch(url).then(res => {
    return res.json()
});

const ProjectsAdmin = ({initialData}: {initialData: Project}) => {
    const {data, isLoading, error, mutate} = useSWR('/api/admin/projects', fetcher, {
        fallbackData: initialData,
        revalidateOnMount: true,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        refreshInterval: 3000,    
    })
    if (!data) return <div className='text-black dark:text-white'>No data found!</div>;
    if (error) return <div className='dark:text-white'>Error: {error.message}</div>;
    if (isLoading) return <div><Loading/></div>;

  return (
    <section className='bg-[#FFFFFF] p-5 rounded-2xl all-users min-h-screen'>
        <div className='flex flex-wrap items-center justify-between gap-2'>
          <h2 className='text-2xl font-semibold dark:text-white'>All Projects</h2>
          <div className='flex flex-row gap-5'>
            <Button className='bg-primary-admin' asChild>
                <Link className='text-light-800' href="/admin/projects/new">+ Create a New  Project</Link> 
            </Button>
          </div>
        </div>
        {/* Table */}
        <table className='min-w-full mt-6 border  rounded-lg overflow-hidden'>
            <thead className="bg-light-300 dark:bg-[#1c293d] dark:text-gray-200  text-[#3A354E] text-sm font-light ">
                <tr className=''>
                    <th className='px-4 py-2 text-left font-normal'>Title</th>
                    <th className='px-4 py-2 text-center font-normal'>Author</th>
                    <th className='px-4 py-2 text-center font-normal'>Published On</th>
                    <th className='px-4 py-2 text-center font-normal'>Is Free</th>
                    <th className='px-4 py-2 text-center font-normal'>Actions</th>
                </tr>
            </thead>
            <tbody>
                {data.map((project: Project) => (
                    <tr key={project.id} className='border-b '>
                        <td className='px-4 py-2 text-dark-200 dark:text-white text-sm'>{project.title}</td>
                        <td className='px-4 py-2 text-center text-dark-200 dark:text-white text-sm'>{project.author}</td>
                        <td className='px-4 py-2 text-center text-dark-200 dark:text-white text-sm'>
                            {project.publishDate ? (
                                new Date(project.publishDate).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric',
                                })
                            ) : (
                                'No date'
                            )}
                        </td>
                        <td className='px-4 py-2 text-center text-dark-200 dark:text-white text-sm'>{project.isFree}</td>
                        <td className='px-4 py-2 flex items-center gap-3 justify-center '>
                            <Link href={`/admin/projects/update/${project.id}`} title='Update Project'>
                                <FilePen className='dark:text-gray-300 size-5 '/>
                            </Link>
                            <DeleteProject projectId={project.id} onDelete={mutate} />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </section>
  )
}

export default ProjectsAdmin