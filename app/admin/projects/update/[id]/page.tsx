import ProjectsForm from '@/components/admin/DataManagment/ProjectsForm'
import GoBack from '@/components/GoBack'
import React from 'react'

const Page = async ({ params }: { params: Promise<{id: string}>}) => {
  const id = (await params).id
 return (
   <>
        <GoBack/>

        <section className='w-full max-w-4xl auth-form data-form mt-7 max-h-[730px] overflow-auto hide-scrollbar'>
            <ProjectsForm type="update" projectId={id}/>
        </section>
    </>
  )
}

export default Page