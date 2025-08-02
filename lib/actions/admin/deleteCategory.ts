'use server';

import { db } from "@/database/drizzle";
import { categories, parts, steps } from "@/database/schema";
import { eq, inArray } from "drizzle-orm";

export const deleteCategory = async ({ catId }: { catId: string }) => {
  try {
    // 1. Get all parts under the category
    const categoryParts = await db
      .select({ id: parts.id })
      .from(parts)
      .where(eq(parts.categoryId, catId));

    const partIds = categoryParts.map(p => p.id);

    if (partIds.length > 0) {
      // 2. Delete steps related to those parts
      await db
        .delete(steps)
        .where(inArray(steps.partId, partIds));

      // 3. Delete parts under the category
      await db
        .delete(parts)
        .where(inArray(parts.id, partIds));
    }

    // 4. Delete the category
    await db
      .delete(categories)
      .where(eq(categories.id, catId));

  } catch (error) {
    console.error('Error deleting category and its children:', error);
  }
};
