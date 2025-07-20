'use client';
import AuthForm from "@/components/AuthForm";
import { signUp } from "@/lib/actions/auth";
import { signUpSchema } from "@/lib/validation";
import React from 'react'

const SignUp = () => {
  return (
    <>
      <AuthForm
        type="SIGN_UP"
        schema={signUpSchema}
        defaultValues={{fullName: '', email: '', password: '', confirmPassword: '', companyName: '',  terms: false }}
        onSubmit={signUp}
      />
    </>
  )
}

export default SignUp