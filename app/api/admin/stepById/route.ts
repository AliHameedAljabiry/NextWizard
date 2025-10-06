import { db } from '@/database/drizzle'
import { categories, parts, steps } from '@/database/schema'

import { eq } from 'drizzle-orm'

export async function getStepById(stepId: string) {
  

  const step: any = await db.query.steps.findFirst({
    where: eq(steps.id, stepId),
  })

  if (!step) return { error: 'Step not found' ,  status: 404 }

  const part: any = await db.query.parts.findFirst({
    where: eq(parts.id, step.partId),
  })

  if (!part) return { error: 'Part not found' ,  status: 404 }

  const category: any = await db.query.categories.findFirst({
    where: eq(categories.id, part.categoryId),
  })

  if (!category) return  {error: 'Category not found' , status: 404} 

  return  {step, part, category} 
}
