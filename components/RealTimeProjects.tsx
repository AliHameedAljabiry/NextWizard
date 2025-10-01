'use client';

import React from 'react'
import useSWR from 'swr'
import { Card, CardTitle } from './ui/card';
import Image from 'next/image';
import { Avatar } from './ui/avatar';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const fetcher = (url: string) => fetch(url).then((res) => {
    if (!res.ok) throw new Error('Failed to fetch projects');
    return res.json();
})

export default function RealTimeProjects({initialData}: {initialData: Project}) {
    const { data, error } = useSWR('/api/projects', fetcher, {
        fallbackData: initialData,
        revalidateOnMount: true,
        revalidateOnFocus: true,
        refreshInterval: 3000,
    })
    
    if (!data) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className='mt-5 px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
            {data.map((project: Project) => (
                <Card key={project.id} className=" border rounded-lg shadow hover:shadow-lg transition min-h-[450px] relative overflow-hidden">
                    <div className='w-full h-1/2 relative'>
                        <Link href={`projects/${project.id}`}>
                            {project.imageUrl && <Image src={project.imageUrl} alt='card' fill className='object-fill'/>}
                        </Link>
                    </div>
                    <div className='px-4 mt-2  text-sm text-gray-900 font-medium dark:text-gray-300'>
                        Published on:<span> </span> 
                        {project.publishDate ? (
                            new Date(project.publishDate).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                            })
                        ) : (
                            'No date'
                        )}
                    </div>
                    <div className='px-4 h-1/3 flex flex-col items-center justify-center'>
                        <CardTitle className="text-md font-semibold mb-2">
                            <Link href={`projects/${project.id}`}>
                                {project.title}             
                            </Link>
                        </CardTitle>
                        <div className='flex flex-row items-center justify-between w-full border rounded-lg p-1 shadow'>
                            <p className='font-semibold'>By: {project.author}</p>
                            {project.authorImageUrl && <Image src={project.authorImageUrl} alt={project.author} width={40} height={40} className="rounded-full"/>}
                        </div>
                    </div>
                    <div className={cn(project.isFree === 'FREE' ? 
                        'bg-green-600' : 
                        'bg-[#9301f5]' ,
                        'absolute top-0 right-0 min-w-[85px] text-center text-white text-xs font-bold px-3 py-1 rotate-45 transform translate-x-[25%] translate-y-[36%] shadow-md'
                        )}
                    >{project.isFree}</div>

                    <div className='flex items-center justify-around'>
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className='text-sm bg-[#e0e0e0] dark:bg-[#1a1919] flex items-center shadow px-2 py-1 rounded-lg hover:bg-[#bdbdbd] mb-3'>
                            <Avatar className='w-6 h-6'>
                                <Image src="/icons/github-icon.svg" alt="GitHub Logo" className='dark:invert' width={24} height={24}/>
                            </Avatar>
                            <span className='ml-2'>GitHub Repo</span>
                        </a>
                        <a href={project.videoUrl} target="_blank" rel="noopener noreferrer" className='text-sm bg-[#e0e0e0] dark:bg-[#1a1919] flex items-center shadow px-2 py-1 rounded-lg hover:bg-[#bdbdbd] mb-3'>
                            <Avatar className='w-6 h-6'>
                                <Image src="/icons/youtube.svg" alt="GitHub Logo"  width={24} height={24}/>
                            </Avatar>
                            <span className='ml-2'>YouTube Video</span>
                        </a>
                    </div>
                </Card>
            ))}
        </div>
    )
}