import DataForm from '@/components/admin/DataManagment/DataForm'
import GoBack from '@/components/GoBack'
import React from 'react'

const UpdateStep = async ({ params }: { params: Promise<{id: string}>}) => {
  const id = (await params).id
  return (
   <>
        <GoBack/>

        <section className='w-full max-w-4xl auth-form data-form mt-7'>
            <DataForm type="update" stepId={id}/>
        </section>
    </>
  )
}

export default UpdateStep