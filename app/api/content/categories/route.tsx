
import { db } from '@/database/drizzle';
import { categories, parts } from '@/database/schema';
import { eq } from 'drizzle-orm';

export async function fetchSidebarData() {
  const cats = await db.select().from(categories);
  const result = await Promise.all(cats.map(async (cat) => {
    const catParts = await db
      .select()
      .from(parts)
      .where(eq(parts.categoryId, cat.id))
      .orderBy(parts.order);
    return { ...cat, parts: catParts };
  }));
  return result;
}
