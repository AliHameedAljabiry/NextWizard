import { auth } from "@/auth";
import { db } from "@/database/drizzle";
import { projects } from "@/database/schema";
import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function  GET(req: Request) {
    try {
        const session = await auth()
        if (!session || session.user.role !== 'ADMIN' ) {
            return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
        }

        const allProjects = await db
            .select()
            .from(projects)
            .orderBy(desc(projects.createdAt));
            
        return NextResponse.json(allProjects)

    } catch (error) {
       console.error("API /api/admin/projects error:", error);

        return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
        );
    }
}