import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId, role } = await req.json();

    if (!userId || !["USER", "ADMIN"].includes(role)) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    await db.update(users)
      .set({ role })
      .where(eq(users.id, userId));

    return NextResponse.json({ success: true });
  } catch (error) {
   
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
