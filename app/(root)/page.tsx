'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

// Dynamically import only the motion.div to avoid SSR issues
const MotionDiv = dynamic(() =>
  import('framer-motion').then((mod) => mod.motion.div),
  { ssr: false }
);

export default function Home() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 dark:bg-[#0d1117] bg-light-300 overflow-hidden">
      {/* Animated Shape (floating orb) */}
      <MotionDiv
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] dark:bg-gradient-to-br from-indigo-500 to-purple-700 rounded-full blur-3xl opacity-30 dark:opacity-40"
      />

      {/* Main Content */}
      <MotionDiv
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="text-center max-w-3xl z-10"
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          The React Framework for the Web
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-gray-700 dark:text-gray-300">
          <strong>NextWizard</strong> is your guide to build high-quality web applications with the power of React components.
          Step by step, for both frontend and backend.
        </p>

        <Link href="/docs">
          <Button className="mt-8 px-6 py-6 text-lg rounded-xl shadow-lg  dark:bg-light-300 bg-black text-white dark:text-gray-800 dark:hover:bg-light-300 hover:bg-black/90 transition duration-300">
            Get Started
          </Button>
        </Link>
      </MotionDiv>

      {/* 3D visual flair (another shape) */}
      <MotionDiv
        initial={{ scale: 0.9, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 1.4 }}
        className="absolute bottom-[-100px] right-[-100px] w-[250px] h-[250px] dark:bg-gradient-to-br from-pink-500 to-yellow-500 rounded-full blur-2xl opacity-20 dark:opacity-40"
      />
    </section>
  );
}
