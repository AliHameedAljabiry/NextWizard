
import { db } from '@/database/drizzle';
import { parts, steps } from '@/database/schema';
import { eq } from 'drizzle-orm';

export async function fetchStepsByPartSlug(slug: string) {
  const part = await db.query.parts.findFirst({ where: eq(parts.slug, slug) });
  if (!part) return null;
  const allSteps = await db
    .select()
    .from(steps)
    .where(eq(steps.partId, part.id))
    .orderBy(steps.order);
  return { part, steps: allSteps };
}
