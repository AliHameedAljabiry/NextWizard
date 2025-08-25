import { db } from "@/database/drizzle"
import { categories, parts, steps } from "@/database/schema"
import { eq } from "drizzle-orm"
import Content from "@/components/admin/Docs";

const Page = async () => {
  // Fetch all categories
  const cats = await db.select().from(categories);

  // For each category, fetch its parts and each part's steps
  const allCategories = await Promise.all(
    cats.map(async (cat) => {
      const catParts = await db
        .select()
        .from(parts)
        .where(eq(parts.categoryId, cat.id))
        .orderBy(parts.order);

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

  return (
    <>
      <Content initialData={allCategories} />
    </>
  );
};

export default Page;