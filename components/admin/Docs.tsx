'use client'

import useSWR from 'swr';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import DeleteStep from '@/components/admin/DeleteStep';
import { FilePen, FileText } from 'lucide-react';
import DeleteCategory from '@/components/admin/DeleteCategory';
import DeletePart from '@/components/admin/DeletePart';
import Loading from '@/app/loading';
import { useRouter, useSearchParams } from "next/navigation";


const fetcher = (url: string) => fetch(url).then(res => {
    if (!res.ok) throw new Error('Failed to fetch categories')
    return res.json()
});

const Content = ({ initialData }: { initialData: any}) => {
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get("category");
  const {data, isLoading, error, mutate} = useSWR('/api/admin/all-categories', fetcher, {
    fallbackData: initialData,
    revalidateOnMount: true,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: 3000,    
  })
  
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    categoryFromUrl
  );
  
  useEffect(() => {
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [categoryFromUrl]);


  if (!data) return <div className='text-black dark:text-white'>No data found!</div>;
  if (error) return <div className='dark:text-white'>Error: {error.message}</div>;
  if (isLoading) return <div><Loading/></div>;

  return (
   <section className='w-full rounded-2xl bg-white p-2 sm:p-7 all-users max-h-[800px] overflow-auto '>
      <div className='flex flex-wrap items-center justify-between gap-2'>
          <h2 className='text-2xl font-semibold dark:text-white'>All Steps</h2>
          <div className='flex flex-row gap-5'>
            <Button className='bg-primary-admin' asChild>
                <Link className='text-light-800' href="/admin/docs/new">+ Create a New  Step</Link> 
            </Button>
          </div>
      </div>

        {data && 
        <div className='flex flex-col gap-5'>

          {/* filters */}
          <div className='flex flex-row flex-wrap gap-5 mt-5'>
            {/* All Categories Button */}
            <Button
              className={`px-3 py-2 rounded-lg font-medium text-lg shadow
                ${selectedCategory === null ? 'bg-primary-admin text-white' : 'dark:bg-white bg-inherit text-gray-800'}`}
              onClick={() => setSelectedCategory(null)}
            >
              All Categories
            </Button>

            {/* Individual Category Buttons */}
            {data.map((cat: any) => (
              <Button
                className={`px-3 py-2 rounded-lg font-medium text-lg shadow
                  ${selectedCategory === cat.id ? 'bg-primary-admin text-white' : 'bg-inherit dark:bg-white text-gray-800'}`}
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  router.push(`/admin/docs?categoryId=${cat.id}`);
                }}
              >
                {cat.name}
              </Button>
            ))}
          </div>

        
          {/* parts and their steps */}
         <div className='flex flex-col gap-5 mt-8'>
            {(selectedCategory ? data.filter((cat: any) => cat.id === selectedCategory) : data).map((cat: any) => (
              <div key={cat.id} className='bg-light-300 dark:bg-black p-2 sm:p-5 rounded-lg shadow'>
                <div className='flex flex-row gap-5 w-full justify-between'>
                  <h3 className='text-xl font-semibold text-gray-800 dark:text-gray-300 mb-3'>{cat.name}</h3>
                  <DeleteCategory catId={cat.id} catName={cat.name}/>
                </div>
                
                {cat.parts.map((part: any) => (
                  <div key={part.id} className='mb-5 ml-0 sm:ml-5'>
                    <div className='flex flex-row gap-5'>
                      <h4 className='text-lg font-medium text-primary-admin mb-2'>{part.name}</h4>
                      <DeletePart partId={part.id} partName={part.name}/>
                    </div>
                    
                    <ul className='list-disc pl-0 sm:pl-5 text-sm sm:text-base'>
                      {part.steps.map((step: any) => (
                        <li key={step.id} className='text-gray-700 bg-[#c5c5c5] dark:bg-[#242424] dark:text-gray-300 px-3 py-2 mb-2 rounded-lg flex flex-row items-center justify-between'>
                          <div className='flex flex-row items-center gap-2 min-w-0'>
                            <h2 className='whitespace-nowrap'>Step {step.order}: </h2>
                            <Link className='overflow-hidden text-ellipsis whitespace-nowrap pr-3' href={`docs/stepDetails/${step.id}`}>{step.title}</Link>
                         </div>
                          <div className='flex flex-row items-center  justify-center gap-3'>
                            <Link title='Step Details' href={`docs/stepDetails/${step.id}`}><FileText className='w-5 '/></Link>
                            <Link title="Update Step" href={`docs/update/${step.id}`}><FilePen className='text-gray-300 size-5'/></Link>
                            <DeleteStep stepId={step.id} onDelete={mutate} title={step.title}/>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </div>

        </div>}
        

   </section>
  )
}

export default Content 