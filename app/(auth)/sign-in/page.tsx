'use client';
import AuthForm from '@/components/AuthForm'
import React from 'react'
import { signInSchema } from "@/lib/validation";
import { signInWithCredentials } from '@/lib/actions/auth';

const SignIn = () => {
  return (
    <>
      <AuthForm
        type="SIGN_IN"
        schema={signInSchema}
        defaultValues={{ email: '', password: '' }}
        onSubmit={signInWithCredentials}
      />
    </>
  )
}

export default SignIn