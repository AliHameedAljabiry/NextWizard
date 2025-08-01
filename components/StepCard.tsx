'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';
import { highlightCode } from '@/lib/highlight'; // your function
import { useTheme } from './ThemeProvider';

import dynamic from 'next/dynamic';
const MotionDiv = dynamic(() =>
  import('framer-motion').then((mod) => mod.motion.div),
  { ssr: false }
);

export default function StepCard({ step }: { step: any }) {
  const [copied, setCopied] = useState(false);
  const [highlightedCode, setHighlightedCode] = useState('');
  const { mode } = useTheme(); // <-- use your theme here

  const handleCopy = async () => {
    if (step.code) {
      await navigator.clipboard.writeText(step.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  useEffect(() => {
    if (step.code) {
      highlightCode(step.code, step.lang || 'ts', mode).then(setHighlightedCode);
    }
  }, [step.code, step.lang, mode]); // re-run if theme changes

  return (
    <div className='p-4 rounded-lg dark:text-white'>
      <MotionDiv
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1 }}
        className=""
      >
        <h2 className='font-semibold text-lg'>
          Step {step.order}: {step.title}
        </h2>        
      </MotionDiv>

      <MotionDiv
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 1 }}
        className=""
      >
        <p className='text-gray text-[17px] dark:text-gray-200  mt-2'>{step.description}</p>
      </MotionDiv>

      <MotionDiv
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 1 }}
        className=""
      >
        {highlightedCode && (
          <div className='flex flex-col border dark:border-gray-700 bg-[#ffffff] dark:bg-[#222222] mt-2 rounded overflow-auto'>
            <div className='py-3 px-4 flex flex-row items-center justify-between border-b dark:border-gray-700'>
              <p className='dark:text-gray-300'>{step.filePath}</p>
              <Button
                title={copied ? 'Copied' : 'Copy'}
                onClick={handleCopy}
                className='bg-inherit hover:dark:bg-[#1f1f1f] hover:bg-[#e2e2e2]'
              >
                {copied ? <Check className='size-5 text-green-500' /> : <Copy className='size-5' />}
              </Button>
            </div>
            <div
              className="shiki  overflow-auto text-sm"
              dangerouslySetInnerHTML={{ __html: highlightedCode }}
            />
          </div>
        )}
      </MotionDiv>


      <MotionDiv
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 1 }}
        className=""
      >
        {step.resources && (
          <div className='mt-5'>
            <a
              href={step.resources}
              target='_blank'
              rel='noopener noreferrer'
              className='underline text-blue-100 underline-offset-4'
            >
              {`Read More About ${step.title}`}
            </a>
          </div>
        )}
      </MotionDiv>
    </div>
  );
}
