'use client';

import useSWR from 'swr'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contentUploadSchema } from '@/lib/validation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { createStep } from '@/lib/actions/admin/createStep';
import { toast } from "@/hooks/use-toast";
import { useEffect } from 'react';
import { updateStep } from '@/lib/actions/admin/updateStep';


const fetcher = (url: string) => fetch(url).then(res => res.json())

interface Props extends Partial<Step> {
  type?: "create" | "update";
  stepId?: string;
}

 const DataForm = ({ type, stepId }: Props) => {
    const router = useRouter();
  
    const {data: allCategories, isLoading, error, mutate} = useSWR('/api/admin/all-categories', fetcher, {
    refreshInterval: 3000, 
  })

  
  
  const form = useForm<z.infer<typeof contentUploadSchema>>({
    resolver: zodResolver(contentUploadSchema),
    defaultValues: {
      category: "",
      categoryDescription:  "",
      categorySlug: "",
      part:  "",
      slug: "",
      title:  "",
      description: "",
      icon: 'tsx',
      filePath: "",
      order: 0,
      code:  "",
      resources:  "",
    },
  });

  useEffect(() => {
  if (type === "update" && stepId && allCategories) {
    for (const category of allCategories) {
      for (const part of category.parts) {
        const step = part.steps.find((s: any) => s.id === stepId);
        if (step) {
          form.reset({
            category: category.name,
            categoryDescription: category.description || "",
            categorySlug: category.slug,
            part: part.name,
            slug: part.slug,
            title: step.title,
            description: step.description,
            icon: step.icon,
            filePath: step.filePath || "",
            order: step.order,
            code: step.code || "",
            resources: step.resources || "",
          });
          return; // done
        }
      }
    }
  }
}, [type, stepId, allCategories, form]);

  const onSubmit = async (values: z.infer<typeof contentUploadSchema>) => {
    
      if(type === "create") {
        const result = await createStep(values)
      
        if (result.success) {
          toast({
            title: "Success",
            description: "Step created successfully",
          });
    
          router.push(`/admin/docs`);
        } else {
          toast({
            title: "Error",
            description: result.message,
            variant: "destructive",
          });
        }

    }else if (type === "update" && stepId) {
      const result = await updateStep({ ...values, stepId });

      if (result.success) {
        toast({
          title: "Success",
          description: "Step updated successfully",
        });

        router.push(`/admin/docs`);
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        });
      }
    }
  };



  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <h1 className='text-xl dark:text-white font-semibold text-center'>{type === "create" ? "Create New" : "Update"} Step</h1>
        <FormField control={form.control} name={"category"} render={({ field }) => (
          <FormItem className='flex flex-col gap-1'>
            <FormLabel className='text-base font-normal text-dark-500 dark:text-white'>Category</FormLabel>
            <FormControl>
              <Input required  placeholder="e.g. Authentication"{...field} className="step-input min-h-14"/>
            </FormControl>
            <FormMessage/>
          </FormItem>
        )}
        />

        <FormField control={form.control} name={"categoryDescription"} render={({ field }) => (
          <FormItem className='flex flex-col gap-1'>
            <FormLabel className='text-base font-normal text-dark-500 dark:text-white'>Category Description</FormLabel>
            <FormControl>
              <Textarea   placeholder="Optional" {...field} className=" min-h-[200px] py-0 step-input "/>
            </FormControl>
            <FormMessage/>
          </FormItem>
        )}
        />

        <FormField control={form.control} name={"categorySlug"} render={({ field }) => (
          <FormItem className='flex flex-col gap-1'>
            <FormLabel className='text-base font-normal text-dark-500 dark:text-white'>Category Slug</FormLabel>
            <FormControl>
              <Input   required placeholder="e.g. Authentication" {...field} className=" min-h-14  step-input "/>
            </FormControl>
            <FormMessage/>
          </FormItem>
        )}
        />

        <FormField control={form.control} name={"part"} render={({ field }) => (
          <FormItem className='flex flex-col gap-1'>
            <FormLabel className='text-base font-normal text-dark-500 dark:text-white'>Part</FormLabel>
            <FormControl>
              <Input required  placeholder="e.g. Google Auth" {...field} className="step-input min-h-14"/>
            </FormControl>
            <FormMessage/>
          </FormItem>
        )}
        />

        <FormField control={form.control} name={"slug"} render={({ field }) => (
          <FormItem className='flex flex-col gap-1'>
            <FormLabel className='text-base font-normal text-dark-500 dark:text-white'>Slug</FormLabel>
            <FormControl>
              <Input required  placeholder="e.g. Google Auth" {...field} className="step-input min-h-14"/>
            </FormControl>
            <FormMessage/>
          </FormItem>
        )}
        />
     
        <FormField control={form.control} name={"title"} render={({ field }) => (
          <FormItem className='flex flex-col gap-1'>
            <FormLabel className='text-base font-normal text-dark-500 dark:text-white'>Step Title</FormLabel>
            <FormControl>
              <Input required  placeholder="e.g. Set up Google OAuth" {...field} className="step-input min-h-14"/>
            </FormControl>
            <FormMessage/>
          </FormItem>
        )}
        />
     
        <FormField control={form.control} name={"description"} render={({ field }) => (
          <FormItem className='flex flex-col gap-1'>
            <FormLabel className='text-base font-normal text-dark-500 dark:text-white'>Description</FormLabel>
            <FormControl>
              <Textarea required  placeholder="Description" {...field} className="min-h-[300px]  step-input"/>
            </FormControl>
            <FormMessage/>
          </FormItem>
        )}
        />

        <FormField
          control={form.control}
          name={"icon"}
          render={({ field }) => (
            <FormItem className='flex flex-col gap-1'>
              <FormLabel className='text-base font-normal text-dark-500 dark:text-white'>File Icon</FormLabel>
              <FormControl>
                <select {...field} className="min-h-14 step-input dark:bg-[#1f1f1f]">
                  <option value="">Select icon</option>
                  <option value="tsx">React (tsx)</option>
                  <option value="ts">TypeScript</option>
                  <option value="js">JavaScript</option>
                  <option value="css">CSS</option>
                  <option value="json">JSON</option>
                  <option value="env">.env.local</option>
                  <option value="other">Other</option>
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField control={form.control} name={"filePath"} render={({ field }) => (
          <FormItem className='flex flex-col gap-1'>
            <FormLabel className='text-base font-normal text-dark-500 dark:text-white'>File Path</FormLabel>
            <FormControl>
              <Input   placeholder="Optional" {...field} className="min-h-14 step-input"/>
            </FormControl>
            <FormMessage/>
          </FormItem>
        )}
        />

        <FormField control={form.control} name={"order"} render={({ field }) => (
          <FormItem className='flex flex-col gap-1'>
            <FormLabel className='text-base font-normal text-dark-500 dark:text-white'>Step Sequence</FormLabel>
            <FormControl>
              <Input required type="number" min={1} max={10000} placeholder="Step Sequence" {...field} className="step-input min-h-14" onWheel={e => (e.target as HTMLInputElement).blur()}/>
            </FormControl>
            <FormMessage/>
          </FormItem>
        )}
        />

        <FormField control={form.control} name={"code"} render={({ field }) => (
          <FormItem className='flex flex-col gap-1'>
            <FormLabel className='text-base font-normal text-dark-500 dark:text-white'>Code</FormLabel>
            <FormControl>
              <Textarea   placeholder="Code block (optional)" {...field} className="min-h-[450px]  step-input"/>
            </FormControl>
            <FormMessage/>
          </FormItem>
        )}
        />

        <FormField control={form.control} name={"resources"} render={({ field }) => (
          <FormItem className='flex flex-col gap-1'>
            <FormLabel className='text-base font-normal text-dark-500 dark:text-white'>Resources</FormLabel>
            <FormControl>
              <Textarea   placeholder='Optional links in JSON (e.g. ["https://..."])' {...field} className="step-input"/>
            </FormControl>
            <FormMessage/>
          </FormItem>
        )}
        />
    
       <div className='flex items-center justify-center '>
          <Button type="submit" className=" step-btn">
            {type === "create" ? "Add Step to the Content" : "Update Step"}
          </Button>
       </div>
      </form>
    </Form>
  );
}

export default DataForm
