'use server';

import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";


export const approveUser = async (id: string) => {
    try {
       
        if (!id) {
            return {
                success: false,
                message: "User ID is required for approving the user", 
            };
        }
        const approvedUser = await db
            .update(users)
            .set({ status: 'APPROVED' }) 
            .where(eq(users.id, id))
            .returning(); 

        return {
            success: true,
            data: JSON.parse(JSON.stringify(approvedUser)),
        };
    } catch (error) {
        return {
            success: false,
            message: "An error occurred while approving the user", 
        };
    }
}