
import DataForm from '@/components/admin/DataManagment/DataForm'
import GoBack from '@/components/GoBack'
import React from 'react'

const NewContent = () => {
  return (
    <>
        <GoBack/>

        <section className='w-full max-w-4xl auth-form data-form mt-7 max-h-[730px] overflow-auto hide-scrollbar'>
            <DataForm type="create"/>
        </section>
    </>
  )
}

export default NewContent

