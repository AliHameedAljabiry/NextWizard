import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import React from 'react'

const About = async () => {
  const session = await auth()
  if (!session) redirect("/sign-in");
  return (
    <div>About</div>
  )
}

export default About