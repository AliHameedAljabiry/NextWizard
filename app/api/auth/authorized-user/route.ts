import { auth } from "@/auth";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";


export async function GET() {
    const session = await auth()
    const userId = session?.user?.id;
    if (!userId) {
        // Handle unauthorized or missing user id
        return new Response("Unauthorized", { status: 401 });
    }
    
    const authorizedUser = await db
        .select({
            id: users.id,
            email: users.email,
            fullName: users.fullName,
            companyName: users.companyName,
            image: users.image,
            role: users.role,
            createdAt: users.createdAt,
            status: users.status,
            username: users.username,
            
        })
        .from(users)
        .where(eq(users.id, userId))
        .limit(1)

    return NextResponse.json(authorizedUser[0], {
        headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    })
}



