
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";


export async function GET() {
    const allUsers = await db
        .select({
            id: users.id,
            email: users.email,
            fullName: users.fullName,
            role: users.role,
            createdAt: users.createdAt,
            lastActivityDate: users.lastActivityDate
            
        })
        .from(users)
        .orderBy(desc(users.createdAt))
    return NextResponse.json(allUsers)
}