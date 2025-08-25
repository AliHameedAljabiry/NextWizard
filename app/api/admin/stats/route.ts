import { db } from "@/database/drizzle";
import { users, projects, steps } from "@/database/schema";
import { eq, sql } from "drizzle-orm";

export async function GET() {
  try {
    const [userCount, projectCount, stepCount] = await Promise.all([
        db.select({ count: sql`count(*)` }).from(users).execute(),
        db.select({ count: sql`count(*)` }).from(projects).execute(),
        db.select({ count: sql`count(*)` }).from(steps).execute()
    ]);

    return Response.json({
      totalUsers: userCount[0].count,
      totalProjects: projectCount[0].count,
      totalSteps: stepCount[0].count
    });
  } catch (error) {
    return Response.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}