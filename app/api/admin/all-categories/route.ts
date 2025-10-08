import { auth } from '@/auth';
import { db } from '@/database/drizzle';
import { categories, parts, steps } from '@/database/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const session = await auth();
    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    
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
  } catch (error) {

    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
