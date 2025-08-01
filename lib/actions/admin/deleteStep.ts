'use server';

import { db } from "@/database/drizzle";
import { steps } from "@/database/schema";
import { eq } from "drizzle-orm";

export const deleteStep = async ({stepId}: {stepId: string}) => {
    try {
        await db
        .delete(steps)
        .where(eq(steps.id, stepId))
        
    }catch (error) {
        console.log(error)
    }
}