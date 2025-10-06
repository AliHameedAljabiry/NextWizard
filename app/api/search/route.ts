import { db } from "@/database/drizzle";
import { categories, parts, steps, projects } from "@/database/schema";
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

    // Attach first part slug to each category
    const categoriesWithFirstPart = await Promise.all(
      foundCategories.map(async (cat) => {
        const firstPart = await db
          .select()
          .from(parts)
          .where(eq(parts.categoryId, cat.id))
          .orderBy(parts.order)
          .limit(1);

        return {
          ...cat,
          firstPartSlug: firstPart[0]?.slug ?? null,
        };
      })
    );

    // Search Parts
    const foundParts = await db
      .select()
      .from(parts)
      .where(ilike(parts.name, `%${q}%`));

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

    return NextResponse.json({
      categories: categoriesWithFirstPart,
      parts: foundParts,
      steps: foundSteps,
      projects: foundProjects,
    });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
