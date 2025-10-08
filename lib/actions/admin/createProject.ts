'use server';

import { db } from "@/database/drizzle";
import { projects } from "@/database/schema";
import { projectUploadSchema } from "@/lib/validation";
import z from "zod";

type StepFormValues = z.infer<typeof projectUploadSchema>;
export const createProject = async (form: StepFormValues) => {
  try {
    await db.insert(projects).values({
      title: form.title,
      description: form.description,
      imageUrl: form.imageUrl,
      videoUrl: form.videoUrl,
      author: form.author,
      authorImageUrl: form.authorImageUrl,
      isFree: form.isFree,
      publishDate: form.publishDate,
      githubUrl: form.githubUrl,
      
    });
  } catch (error) {
 
    throw new Error("Failed to create project");
  }
};

