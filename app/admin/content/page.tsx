'use client'

import useSWR from 'swr';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'
import DeleteStep from '@/components/admin/DeleteStep';
import { FileText, PenLineIcon } from 'lucide-react';
import DeleteCategory from '@/components/admin/DeleteCategory';
import DeletePart from '@/components/admin/DeletePart';


const fetcher = (url: string) => fetch(url).then(res => res.json())

const page = () => {
  const {data: allCategories, isLoading, error, mutate} = useSWR('/api/admin/all-categories', fetcher, {
    refreshInterval: 3000,
    
  })

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);


  
  
  return (
   <section className='w-full rounded-2xl bg-white p-7 all-users'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
            <h2 className='text-2xl font-semibold dark:text-white'>All Steps</h2>
            <div className='flex flex-row gap-5'>
              <Button className='bg-primary-admin' asChild>
                  <Link className='text-light-800' href="/admin/content/new">+ Create a New  Step</Link> 
              </Button>
            </div>
        </div>

        {allCategories && 
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
            {allCategories.map((cat: any) => (
              <Button
                className={`px-3 py-2 rounded-lg font-medium text-lg shadow
                  ${selectedCategory === cat.id ? 'bg-primary-admin text-white' : 'bg-inherit dark:bg-white text-gray-800'}`}
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.name}
              </Button>
            ))}
          </div>

        
          {/* parts and their steps */}
         <div className='flex flex-col gap-5 mt-8'>
            {(selectedCategory ? allCategories.filter((cat: any) => cat.id === selectedCategory) : allCategories).map((cat: any) => (
              <div key={cat.id} className='bg-light-300 dark:bg-black p-5 rounded-lg shadow'>
                <div className='flex flex-row gap-5 w-full justify-between'>
                  <h3 className='text-xl font-semibold text-gray-800 dark:text-gray-300 mb-3'>{cat.name}</h3>
                  <DeleteCategory catId={cat.id} catName={cat.name}/>
                </div>
                
                {cat.parts.map((part: any) => (
                  <div key={part.id} className='mb-5 ml-5'>
                    <div className='flex flex-row gap-5'>
                      <h4 className='text-lg font-medium text-primary-admin mb-2'>{part.name}</h4>
                      <DeletePart partId={part.id} partName={part.name}/>
                    </div>
                    
                    <ul className='list-disc pl-6'>
                      {part.steps.map((step: any) => (
                        <li key={step.id} className='text-gray-700 bg-[#c5c5c5] dark:bg-[#242424] dark:text-gray-300 px-3 py-2 mb-2 rounded-lg flex flex-row items-center justify-between'>
                          <div className='flex flex-row items-center gap-2'>
                            <h2>Step {step.order}: </h2>
                            <Link href={`content/stepDetails/${step.id}`}>{step.title}</Link>
                         </div>
                          <div className='flex flex-row items-center  justify-center gap-3'>
                            <Link title='Step Details' href={`content/stepDetails/${step.id}`}><FileText className='w-5 '/></Link>
                            <Link title="Update Step" href={`content/update/${step.id}`}><PenLineIcon className='text-primary-admin size-5'/></Link>
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

export default page