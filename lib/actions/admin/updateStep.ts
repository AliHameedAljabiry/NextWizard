'use server';

import { db } from "@/database/drizzle";
import { categories, parts, steps } from "@/database/schema";
import { contentUploadSchema } from "@/lib/validation";
import { eq, and } from "drizzle-orm";
import { z } from "zod";

type StepFormValues = z.infer<typeof contentUploadSchema> & { stepId: string };

export const updateStep = async (form: StepFormValues) => {
  try {
    // 1. Ensure stepId is provided
    if (!form.stepId) {
      return {
        success: false,
        message: "Step ID is required to update",
      };
    }

    // 2. Check or insert category
    const existingCategory = await db.query.categories.findFirst({
      where: (c, { eq }) => eq(c.name, form.category),
    });

    let categoryId = existingCategory?.id;

    if (!categoryId) {
      const newCategory = await db.insert(categories).values({
        name: form.category,
        description: form.categoryDescription || '',
        slug: form.categorySlug
      }).returning();
      categoryId = newCategory[0].id;
    }

    // 3. Check or insert part
    const existingPart = await db.query.parts.findFirst({
      where: (p, { eq, and }) => and(
        eq(p.name, form.part),
        eq(p.categoryId, categoryId)
      )
    });

    let partId = existingPart?.id;

    if (!partId) {
      const newPart = await db.insert(parts).values({
        name: form.part,
        slug: form.slug,
        categoryId,
      }).returning();
      partId = newPart[0].id;
    }

    // 4. Update the step
    await db.update(steps)
      .set({
        partId,
        title: form.title,
        description: form.description,
        filePath: form.filePath,
        icon: form.icon || '',
        order: form.order,
        code: form.code || '',
        resources: form.resources || '',
      })
      .where(eq(steps.id, form.stepId));

    return {
      success: true,
      message: "Step updated successfully",
    };
  } catch (error) {
    console.error("Error in updateStep:", error);
    return {
      success: false,
      message: "An error occurred while updating the step",
    };
  }
};
