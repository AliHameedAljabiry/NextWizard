import { db } from '@/database/drizzle';
import { categories, parts, steps } from '@/database/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET() {
  const cats = await db.select().from(categories);

  const result = await Promise.all(
    cats.map(async (cat) => {
      const catParts = await db
        .select()
        .from(parts)
        .where(eq(parts.categoryId, cat.id))
        .orderBy(parts.order);

      // Fetch steps for each part
      const partsWithSteps = await Promise.all(
        catParts.map(async (part) => {
          const partSteps = await db
            .select()
            .from(steps)
            .where(eq(steps.partId, part.id))
            .orderBy(steps.order);
          return { ...part, steps: partSteps };
        })
      );

      return { ...cat, parts: partsWithSteps };
    })
  );

  return NextResponse.json(result);
}
