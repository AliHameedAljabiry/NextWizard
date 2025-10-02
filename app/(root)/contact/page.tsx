import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import React from 'react'

const Contact = async () => {
  const session = await auth()
  if (!session) redirect("/sign-in");
  return (
    <div>Contact</div>
  )
}

export default Contact