import { fetchStepsByPartSlug } from '@/app/api/docs/steps/route';
import ChatGPTWindow from '@/components/ChatGPT';
import ChatGPTToggle from '@/components/ChatGPTToggle';
import StepCard from '@/components/StepCard';
import { db } from '@/database/drizzle';
import { categories, parts } from '@/database/schema';
import { highlightCode } from '@/lib/highlight';
import { eq } from 'drizzle-orm';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from '@/components/Arrow3D';



export default async function Page({ params }: { params: { partSlug: string } }) {
  const partSlug = (await params).partSlug
  const data = await fetchStepsByPartSlug(partSlug);
  if (!data) return <p>Not found</p>;
   
  const stepsWithHtml = await Promise.all(
    data.steps.map(async step => ({
      ...step,
      codeHtml: step.code ? await highlightCode(step.code, 'ts') : null
    }))
  );
  
  
    
  // get the next part name
  const allParts = await db.select().from(parts).orderBy(parts.order)

  const partIndex = allParts.findIndex(part => part.slug === partSlug)
  const nextPart = allParts[partIndex + 1]
  const previousPart = allParts[partIndex - 1]
  const allCategories = await db.select().from(categories).orderBy(categories.createdAt)
  const currentCategory = await db.select().from(categories).where(eq(categories.id, data.part.categoryId))
  const categoryIndex = allCategories.findIndex(cat => cat.id === data.part.categoryId)

  // get each category's parts
  const catParts = await db
    .select()
    .from(parts)
    .where(eq(parts.categoryId, currentCategory[0].id))
    .orderBy(parts.order);

  const catPartIndex = catParts.findIndex(part => part.slug === partSlug)
  const nextCategory = allCategories[categoryIndex + 1]
  const previousCategory = allCategories[categoryIndex - 1]
  const isPreviousCategory = true ? catPartIndex === 0 : false;
  const isNextCategory = true ? catPartIndex === catParts.length - 1 : false;
  
  return (
    
      <div className='pt-3 flex flex-col 2xl:flex-row  gap-4 w-full'>
        <div className='step-card w-full  max-h-[88vh] overflow-auto hide-scrollbar '>
          <h1 className='text-xl font-bold dark:text-white  '>{data.part.name}</h1>
          <div className='mt-6 space-y-4 '>
            {stepsWithHtml.map(step => (
              <StepCard key={step.id} step={step} />
            ))}
          </div>
          <hr />
          <div className='flex justify-between items-center gap-10 m-4 '>
            {partIndex !== 0 && (
              <Link
                className='w-full mt-4 dark:text-white flex flex-col items-start gap-0 group'
                href={`/docs/${isPreviousCategory ? previousCategory.slug : currentCategory[0].slug}/${previousPart.slug}`}
                title={`${isPreviousCategory ? previousCategory.name : currentCategory[0].name} - ${previousPart.name}`}
              >
                <span className='flex items-center gap-2'>
                  <span className='relative flex items-center'>
                    <ArrowLeft />
                  </span>
                  <span className='text-gray-700 dark:text-gray-400'>Previous</span>
                </span>
                <h2 className=' hidden sm:flex'>{isPreviousCategory ? previousCategory.name : currentCategory[0].name} - {previousPart.name}</h2>
              </Link>
            )}

            {partIndex !== allParts.length - 1 && (
              <Link
                className='w-full mt-4 dark:text-white flex flex-col items-end gap-0 group'
                href={`/docs/${isNextCategory ? nextCategory.slug : currentCategory[0].slug}/${nextPart.slug}`}
                title={`${isNextCategory ? nextCategory.name : currentCategory[0].name} - ${nextPart.name}`}
              >
                <span className='flex items-center gap-2'>
                  <span className='text-gray-700  dark:text-gray-400'>Next</span>
                  <span className='relative flex items-center'>
                    <ArrowRight />
                  </span>
                </span>
                <h2 className=' hidden sm:flex'>{isNextCategory ? nextCategory.name : currentCategory[0].name} - {nextPart.name}</h2>
              </Link>
            )}
            </div>
            <hr/>
          </div>
          <ChatGPTToggle />
        </div>
  );
}

