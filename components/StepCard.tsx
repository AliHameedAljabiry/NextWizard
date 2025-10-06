'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Check, Link } from 'lucide-react';
import { highlightCode } from '@/lib/highlight'; // your function
import { useTheme } from './ThemeProvider';

import dynamic from 'next/dynamic';
import Image from 'next/image';
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
  
  const getFileIcon = (iconType: string) => {
    switch (iconType) {
      case 'tsx': return <Image src="/icons/tsx.svg" alt='tsx' className="" width={20} height={10}/>;
      case 'ts': return <span className="text-[#2b8cb3] font-bold">TS</span>;
      case 'js': return <span className="text-[#b3b12b] font-bold">JS</span>;
      case 'css': return <span className="text-[#2b8cb3] font-bold">#</span>;
      case 'json': return <span className="text-[#b3b12b] font-bold">{'{}'}</span>;
      case 'env': return <span className="text-green-600 font-bold">$</span>;
      default: return <span className="text-gray-400">📄</span>;
    }
  }

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
        <pre className="whitespace-pre-wrap text-gray text-[17px] dark:text-gray-200 mt-2">
          {step.description}
        </pre>
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
              <div className='flex flex-row items-center gap-2'>
                {getFileIcon(step.icon)}
                <p className='dark:text-gray-300'>{step.filePath}</p>
              </div>
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
          <div className='mt-5 flex gap-1 group'> {/* Add 'group' here */}
            <a
              href={step.resources}
              target='_blank'
              rel='noopener noreferrer'
              className='text-[18px]'
            >
              {`Read More About ${step.title}`}
            </a>
            <Link className='w-5 hidden group-hover:block' /> {/* Use group-hover */}
          </div>
        )}
      </MotionDiv>
    </div>
  );
}
