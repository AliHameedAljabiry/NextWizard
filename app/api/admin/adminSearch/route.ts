import { db } from "@/database/drizzle";
import { categories, parts, steps, projects, users } from "@/database/schema";
import { ilike, or, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");

  if (!q) {
    return NextResponse.json([]);
  }

  try {
    // Search Categories
    const foundCategories = await db
      .select()
      .from(categories)
      .where(ilike(categories.name, `%${q}%`));

     
    // Search Parts
    const foundParts = await db
      .select()
      .from(parts)
      .where(ilike(parts.name, `%${q}%`));

    // Get the category of this part
    const getCategoryOfPart = await Promise.all(
      foundParts.map( async (part) => {
        const categoryOfPart = await db
          .select()
          .from(categories)
          .where(eq(categories.id, part.categoryId));
        
        return {
          ...part,
          partCategory: categoryOfPart[0]?.id || null,
        }
      })
    )

    // Search Steps
    const foundSteps = await db
      .select()
      .from(steps)
      .where(ilike(steps.title, `%${q}%`));

    // Search Projects
    const foundProjects = await db
      .select()
      .from(projects)
      .where(
        or(
          ilike(projects.title, `%${q}%`),
          ilike(projects.description, `%${q}%`),
          ilike(projects.author, `%${q}%`)
        )
      );

    // Search Users
    const foundUsers = await db
       .select()
       .from(users)
       .where(
         or(
            ilike(users.fullName, `%${q}%`),
            ilike(users.email, `%${q}%`),
            ilike(users.username, `%${q}%`),
         )
       );

    return NextResponse.json({
      categories: foundCategories,
      parts: getCategoryOfPart,
      steps: foundSteps,
      projects: foundProjects,
      users: foundUsers,
    });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
