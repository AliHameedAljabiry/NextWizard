'use server';

import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";

export const deleteUser = async ({userId}: {userId: string}) => {
    try {
        await db
        .delete(users)
        .where(eq(users.id, userId))
        
    }catch (error) {
        console.log(error)
    }
}