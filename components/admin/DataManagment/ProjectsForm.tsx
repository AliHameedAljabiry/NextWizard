'use client'

import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createProject } from "@/lib/actions/admin/createProject";
import { projectUploadSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { updateProject } from "@/lib/actions/admin/updateProject";

const fetcher = (url: string) => fetch(url).then(res => {
    if (!res.ok) throw new Error('Failed to fetch projects')
    return res.json()
});

interface Props extends Partial<Project> {
    type?: 'create' | 'update';
    projectId?: string;
}
 
const ProjectsForm = ({type, projectId}: Props) => {
    const {data, isLoading, error, mutate} = useSWR('/api/admin/projects', fetcher, {
        revalidateOnFocus:true,
        revalidateOnReconnect:true,
        refreshInterval: 3000,    
    });
    const router = useRouter();

    const currentProject = data && projectId ? data.find((project: Project) => project.id === projectId) : undefined;
    

    const form = useForm<z.infer<typeof projectUploadSchema>>({
        resolver: zodResolver(projectUploadSchema),
        defaultValues: {
            title: currentProject?.title || '',
            description: currentProject?.description || '',
            imageUrl: currentProject?.imageUrl || '',
            videoUrl: currentProject?.videoUrl || '',
            author: currentProject?.author || '',
            authorImageUrl: currentProject?.authorImageUrl || '',
            isFree: currentProject?.isFree || 'FREE',
            publishDate: currentProject?.publishDate || new Date(),
            githubUrl: currentProject?.githubUrl || '',
        }
    })
    
    
    const onSubmit = async (values: z.infer<typeof projectUploadSchema>) => {
        if (type === "create") {
            try {
                await createProject(values);
                toast({
                    title: "Success",
                    description: "Project created successfully",
                });
                
                router.push(`/admin/projects`);
            } catch (error) {
                toast({
                    title: "Error",
                    description: error instanceof Error ? error.message : "Failed to create project",
                    variant: "destructive",
                });
            } 
        } else if (type === "update" && projectId) {
            try {

                const response = await updateProject({ ...values, projectId });
                if (response.success) {
                    toast({
                        title: "Success",
                        description: response.message,
                    });
                    mutate(); // Refresh the data
                    router.push(`/admin/projects`);
                } else {
                    throw new Error(response.message);
                }
            } catch (error) {
                toast({
                    title: "Error",
                    description: error instanceof Error ? error.message : "Failed to update project",
                    variant: "destructive",
                });
            }
        }
   }
  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <h1 className='text-xl dark:text-white font-semibold text-center'>{type === "create" ? "Create New" : "Update"} Project</h1>
            <FormField control={form.control} name={"title"} render={({ field }) => (
                <FormItem className='flex flex-col gap-1'>
                    <FormLabel className='text-base font-normal text-dark-500 dark:text-white'>Project Title</FormLabel>
                    <FormControl>
                        <Input required  placeholder="e.g. Library Managment"{...field} className="step-input min-h-14"/>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}
            />

            <FormField control={form.control} name={"description"} render={({ field }) => (
                <FormItem className='flex flex-col gap-1'>
                    <FormLabel className='text-base font-normal text-dark-500 dark:text-white'>Project description</FormLabel>
                    <FormControl>
                        <Textarea required  placeholder="e.g. Build full stack project"{...field} className="min-h-[200px] py-0 step-input"/>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}
            />

            <FormField control={form.control} name={"imageUrl"} render={({ field }) => (
                <FormItem className='flex flex-col gap-1'>
                    <FormLabel className='text-base font-normal text-dark-500 dark:text-white'>Project Cover</FormLabel>
                    <FormControl>
                        <Input required  placeholder="e.g. Image Url for the project cover"{...field} className="step-input min-h-14"/>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}
            />

            <FormField control={form.control} name={"videoUrl"} render={({ field }) => (
                <FormItem className='flex flex-col gap-1'>
                    <FormLabel className='text-base font-normal text-dark-500 dark:text-white'>Project Video</FormLabel>
                    <FormControl>
                        <Input required  placeholder="e.g. video Url for the project video"{...field} className="step-input min-h-14"/>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}
            />

            <FormField control={form.control} name={"author"} render={({ field }) => (
                <FormItem className='flex flex-col gap-1'>
                    <FormLabel className='text-base font-normal text-dark-500 dark:text-white'>Author Name</FormLabel>
                    <FormControl>
                        <Input required  placeholder="e.g. Author Name"{...field} className="step-input min-h-14"/>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}
            />

            <FormField control={form.control} name={"authorImageUrl"} render={({ field }) => (
                <FormItem className='flex flex-col gap-1'>
                    <FormLabel className='text-base font-normal text-dark-500 dark:text-white'>Author Image</FormLabel>
                    <FormControl>
                        <Input required  placeholder="e.g. Image Url for the Author Image"{...field} className="step-input min-h-14"/>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}
            />

            <FormField control={form.control} name={"isFree"} render={({ field }) => (
                <FormItem className='flex flex-col gap-1'>
                    <FormLabel className='text-base font-normal text-dark-500 dark:text-white'>Is Free</FormLabel>
                    <FormControl>
                        <select {...field} className="min-h-14 step-input dark:bg-[#1f1f1f]">
                            <option value="free">Free</option>
                            <option value="paid">Paid</option>
                        </select>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}
            />
            
            <FormField control={form.control} name={"publishDate"} render={({ field }) => (
                <FormItem className='flex flex-col gap-1'>
                    <FormLabel className='text-base font-normal text-dark-500 dark:text-white'>Publish Date</FormLabel>
                    <FormControl>
                        <Input 
                            required type="date" 
                            value={field.value ? new Date(field.value).toISOString().substring(0, 10) : ''} 
                            onChange={(e) => field.onChange(new Date(e.target.value))} 
                            className="step-input min-h-14"
                        />
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}
            />
            
            <FormField control={form.control} name={"githubUrl"} render={({ field }) => (
                <FormItem className='flex flex-col gap-1'>
                    <FormLabel className='text-base font-normal text-dark-500 dark:text-white'>GitHub URL</FormLabel>
                    <FormControl>
                       <Input required  placeholder="e.g. Url for the project's GitHub repository"{...field} className="step-input min-h-14"/>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}
            />

            <div className='flex items-center justify-center '>
                <Button type="submit" className=" step-btn">
                {type === "create" ? "Upload Project" : "Update Project"}
                </Button>
            </div>

        </form>
    </Form>
  )
}

export default ProjectsForm;

//Adrian Hajdin