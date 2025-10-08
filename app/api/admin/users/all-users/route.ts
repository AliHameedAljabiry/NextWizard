
import { auth } from "@/auth";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";


export async function GET(req: Request) {
    try {
        const session = await auth();
        if (!session || session.user?.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        const allUsers = await db
            .select({
                id: users.id,
                email: users.email,
                fullName: users.fullName,
                role: users.role,
                createdAt: users.createdAt,
                lastActivityDate: users.lastActivityDate,
                image: users.image
                
            })
            .from(users)
            .orderBy(desc(users.createdAt))
        
        return NextResponse.json(allUsers)

    } catch (error) {
     
        return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
}