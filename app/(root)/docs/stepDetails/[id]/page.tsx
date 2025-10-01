
import { getStepById } from '@/app/api/admin/stepById/route'
import DeleteStep from '@/components/admin/DeleteStep';
import GoBack from '@/components/GoBack';
import StepCard from '@/components/StepCard';
import { highlightCode } from '@/lib/highlight';
import { FilePen, FileText } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

const StepDetails = async ({ params }: { params: Promise<{ id: string }> }) => {
    const stepId = (await params).id;
  
    const stepDetails = await getStepById(stepId)
 
    const step = stepDetails.step;

    const codeHtml = step.code ? await highlightCode(step.code, 'ts') : null;

    return (
        <div className='max-w-4xl flex flex-col p-6'>
            <GoBack/>
            <div className='flex flex-row gap-1 mt-10'>
                <h1 className='text-xl font-bold dark:text-white'>{`${stepDetails.category.name} >>`}</h1>
                <h1 className='text-xl font-bold dark:text-white'>{stepDetails.part.name}</h1>
            </div>
                <div className='mt-6 space-y-4'>
                    <StepCard step={{ ...step, codeHtml }} />
                </div>

            </div>
    )
}

export default StepDetails
