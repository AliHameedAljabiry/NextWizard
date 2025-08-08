import { fetchStepsByPartSlug } from '@/app/api/content/steps/route';
import ChatGPTWindow from '@/components/ChatGPT';
import ChatGPTToggle from '@/components/ChatGPTToggle';
import StepCard from '@/components/StepCard';
import { highlightCode } from '@/lib/highlight';


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

  return (
    <div className='pt-3 flex   gap-4 '>
      <div className='step-card w-full  max-h-[88vh] overflow-auto hide-scrollbar '>
        <h1 className='text-xl font-bold dark:text-white  '>{data.part.name}</h1>
        <div className='mt-6 space-y-4 '>
          {stepsWithHtml.map(step => (
            
            <StepCard key={step.id} step={step} />
          ))}
        </div>
      </div>
     
      <ChatGPTToggle />
     

   
 
      
    </div>
  );
}
