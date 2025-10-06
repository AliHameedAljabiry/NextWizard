'use server';

import { db } from "@/database/drizzle";
import { projects } from "@/database/schema";
import { eq } from "drizzle-orm";

export const deleteProject = async ({projectId}: {projectId: string}) => {
    try {
        await db
        .delete(projects)
        .where(eq(projects.id, projectId))
        
    }catch (error) {
        console.log(error)
    }
}