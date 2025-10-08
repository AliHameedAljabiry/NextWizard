'use server';

import { db } from "@/database/drizzle";
import { categories, parts, steps } from "@/database/schema";
import { contentUploadSchema } from "@/lib/validation";
import { z } from "zod";

type StepFormValues = z.infer<typeof contentUploadSchema>;

export const createStep = async (form: StepFormValues) => {
  try {
    // 1. Check if category exists
    const existingCategory = await db.query.categories.findFirst({
      where: (c, { eq }) => eq(c.name, form.category),
    });

    let categoryId = existingCategory?.id;

    // 2. Insert category if not exists
    if (!categoryId) {
      const newCategory = await db.insert(categories).values({
        name: form.category,
        description: form.categoryDescription || '',
        slug: form.categorySlug
      }).returning();
      categoryId = newCategory[0].id;
    }

    // 3. Check if part exists (optional — depending on logic)
    const existingPart = await db.query.parts.findFirst({
      where: (p, { eq, and }) => and(
        eq(p.name, form.part),
        eq(p.categoryId, categoryId)
      )
    });

    let partId = existingPart?.id;

    // 4. Insert part if not exists
    if (!partId) {
      // Find the highest order for parts in this category
      const lastPart = await db.query.parts.findFirst({
        where: (p, { eq }) => eq(p.categoryId, categoryId),
        orderBy: (p, { desc }) => desc(p.order),
      });

      const nextOrder = lastPart?.order ? lastPart.order + 1 : 1;

      const newPart = await db.insert(parts).values({
        name: form.part,
        slug: form.slug,
        categoryId,
        order: nextOrder, // <-- auto-increment order
      }).returning();
      partId = newPart[0].id;
    }

    // 5. Insert the step
    await db.insert(steps).values({
      partId,
      title: form.title,
      description: form.description,
      filePath: form.filePath,   
      icon: form.icon || '',
      order: form.order,
      code: form.code || '',
      resources: form.resources || '',

    });

    return {
      success: true,
      message: "Step created successfully",
    };
  } catch (error) {
 
    return {
      success: false,
      message: "An error occurred while creating the step",
    };
  }
};
