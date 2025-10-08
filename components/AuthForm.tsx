'use client';

import { DefaultValues, FieldValues, Path, SubmitHandler, useForm, UseFormReturn } from "react-hook-form";
import { ZodType } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { FIELD_NAMES, FIELD_TYPES } from "@/constants";
import { Input } from "./ui/input";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
  
import { signIn } from "next-auth/react";
import Image from "next/image";
import { cn } from "@/lib/utils";


interface Props<T extends FieldValues> {
    type: 'SIGN_IN' | 'SIGN_UP';
    schema: ZodType;
    defaultValues: T
    onSubmit: (data: T) => Promise<{ success: boolean; message?: string }>;
}

const AuthForm = <T extends FieldValues> ({type, schema, defaultValues, onSubmit}: Props<T>) => {

    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);

    const isSignIn = type === 'SIGN_IN';

    

    const form: UseFormReturn<T> = useForm({
        resolver: zodResolver(schema),
        defaultValues: defaultValues as DefaultValues<T>,
    })

    const handleSubmit: SubmitHandler<T> = async (data) => {
        const result = await onSubmit(data);

        if (result.success) {
            toast({
                title: "Success",
                description: isSignIn
                ? "You have successfully signed in."
                : "You have successfully signed up.",
            });
            router.push('/docs');
        } else {
            toast({
                title: `Error ${isSignIn ? 'Signing In' : 'Signing Up'}`,
                description: result.message || "An error occurred. Please try again.",
                variant: 'destructive',
            })
        }
    }

    const signInWithGoogle = async () => {
        try {
            await signIn("google");
            router.push('/docs'); 
        } catch (error) {
            
            toast({
                title: "Error Signing In with Google",
                description: "An unexpected error occurred. Please try again.",
                variant: "destructive",
            });
        }
    };

    const signInWithGitHub = async () => {
        try {
            await signIn("github");
            router.push('/docs');
        } catch (error) {
          
            toast({
                title: "Error Signing In with GitHub",
                description: "An unexpected error occurred. Please try again.",
                variant: "destructive",
            });
        }
    };



    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-semibold text-gray-700 dark:text-white text-center">
                {isSignIn ? "Welcome back to NextWizard" : "Create your account"}
            </h1>

            <Form {... form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full space-y-6">
                    {Object.keys(defaultValues).map((field) => (
                        <FormField key={field} control={form.control} name={field as Path<T>} render={({ field }) => {
                            
                                return (
                                <FormItem>
                                    {field.name === "terms" ? (
                                        <div className="flex items-center gap-2">
                                            <Input id="terms" type="checkbox" checked={field.value} onChange={field.onChange} className="form-checkbox accent-primary w-5 h-5" />
                                            <FormLabel htmlFor="terms" className="text-sm text-gray-700 dark:text-gray-300">
                                                I accept the&nbsp;
                                                <Link href="/terms" target="_blank" className="underline text-blue-100 dark:text-primary"> terms and conditions </Link>
                                            </FormLabel>
                                        </div>
                                    ) : (
                                        <>
                                        <FormLabel className="capitalize">
                                            {FIELD_NAMES[field.name as keyof typeof FIELD_TYPES] || field.name}
                                        </FormLabel>
                                        <FormControl>
                                            {field.name === "password" || field.name === "confirmPassword" ? (
                                            <div className="relative">
                                                <Input required type={showPassword ? "text" : "password"} {...field} className="form-input" />
                                                <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-800" tabIndex={-1} onClick={() => setShowPassword((prev) => !prev)} >
                                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                                </button>
                                            </div>
                                            ) : (
                                                <Input required type={FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]} {...field} className="form-input" />
                                                )}
                                            </FormControl>
                                        </>
                                    )}
                                    <FormMessage />
                                </FormItem>
                            );
                         
                            }}
                        />
                    ))}
                    <Button type="submit" className="form-btn">
                        {isSignIn ? "Sign In" : "Sign Up"}
                    </Button>
            
                </form>
            </Form>

            <p className={cn("text-center text-base font-medium flex flex-row items-center  gap-2 ",isSignIn ?"justify-between" : "justify-center")}>
                <span>{isSignIn ? <Link href="/forgot-password" className={cn(isSignIn ? "underline text-gray-700 dark:text-primary" : "dark:text-gray-300")}>Forgot your password?</Link>: "Already have an account? "}</span>

                <Link
                    href={isSignIn ? "/sign-up" : "/sign-in"}
                    className="font-bold dark:text-primary text-blue-100 underline"
                    >
                    {isSignIn ? "Create an account" : "Sign in"}
                </Link>
            </p>

            {isSignIn && (<div className="flex flex-col items-center justify-center gap-2 w-full  space-y-4 mt-7">
                    
                <Button 
                    variant="outline" 
                    title="Sign In with your Google account" 
                    className=" text-gray-700  h-[55px] text-lg bg-light-300  flex flex-row gap-2 items-center justify-center w-full  p-2 rounded-md" 
                    onClick={() => signInWithGoogle()}>
                    <Image src="/icons/google-icon.svg" alt="Google Icon" width={24} height={24} 
                    />
                    Continue with Google
                </Button>
                <Button 
                    variant="outline" 
                    title="Sign In with your GitHub account" 
                    className=" text-gray-700  h-[55px] text-lg   flex flex-row gap-2 items-center justify-center w-full bg-light-300 p-2 rounded-md" 
                    onClick={() => signInWithGitHub()}
                    >
                    <Image src="/icons/github-icon.svg"  alt="Google Icon" width={26} height={26} />
                    Continue with GitHub
                </Button>
                   
            </div>)}
        </div>
    )
}

export default AuthForm;