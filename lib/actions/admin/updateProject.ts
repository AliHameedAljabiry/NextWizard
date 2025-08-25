'use server';

import { db } from "@/database/drizzle";
import { projects } from "@/database/schema";
import { projectUploadSchema } from "@/lib/validation";
import { eq } from "drizzle-orm";
import z from "zod";

type ProjectFormValues = z.infer<typeof projectUploadSchema> & { projectId: string };

export const updateProject = async (form: ProjectFormValues) => {
  try {
    // 1. Ensure projectId is provided
    if (!form.projectId) {
      return {
        success: false,
        message: "Project ID is required to update",
      };
    }

    // 2. Update the project
    await db.update(projects)
      .set({
        title: form.title,
        description: form.description,
        imageUrl: form.imageUrl,
        videoUrl: form.videoUrl,
        author: form.author,
        authorImageUrl: form.authorImageUrl,
        isFree: form.isFree,
        publishDate: form.publishDate,
        githubUrl: form.githubUrl,
        
      })
      .where(eq(projects.id, form.projectId));

    return {
        success: true,
        message: "Project updated successfully",
        };
    } catch (error) {
        return {
        success: false,
        message: error instanceof Error ? error.message : "Failed to update project",
        };
    }   
}