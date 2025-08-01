'use client';
import AuthForm from "@/components/AuthForm";
import { signUp } from "@/lib/actions/auth";
import { signUpSchema } from "@/lib/validation";
import React from 'react'

import dynamic from 'next/dynamic';
const MotionDiv = dynamic(() =>
  import('framer-motion').then((mod) => mod.motion.div),
  { ssr: false }
);

const SignUp = () => {
  return (
    <>
     <MotionDiv
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1 }}
        className=""
      >
        <AuthForm
          type="SIGN_UP"
          schema={signUpSchema}
          defaultValues={{fullName: '', email: '', password: '', confirmPassword: '', companyName: '',  terms: false }}
          onSubmit={signUp}
        />

      </MotionDiv>
    </>
  )
}

export default SignUp