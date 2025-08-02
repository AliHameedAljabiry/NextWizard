'use server';

import { db } from "@/database/drizzle";
import { parts, steps } from "@/database/schema";
import { eq,} from "drizzle-orm";

export const deletePart = async ({ partId }: { partId: string }) => {
  try {
    
    if (partId.length > 0) {
      // 1. Delete steps related to those parts
      await db
        .delete(steps)
        .where(eq(steps.partId, partId));
    }

    // 2. Delete the part
    await db
      .delete(parts)
      .where(eq(parts.id, partId));

  } catch (error) {
    console.error('Error deleting part and its children:', error);
  }
};
