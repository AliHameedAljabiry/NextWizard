'use client';

import React from 'react';
import { Link as LinkIcon, Sparkles } from 'lucide-react'; // Optional: for icon animation
import Link from 'next/link';

const MainContent = () => {
  return (
    <div className="main-content-container dark:bg-[#0d1117] bg-light-300 dark:text-white text-black p-6 rounded-xl shadow-lg">
      <div className="animate-fade-in">
        <h1 className="text-4xl font-bold mb-4 flex items-center gap-2">
          <Sparkles className="text-purple-400 animate-pulse" />
          Welcome to NextWizard
        </h1>

        <p className="text-lg leading-7 mb-6 text-gray-900 dark:text-gray-400">
          <strong className="text-gray-900 dark:text-white">Next.js</strong> is the most powerful full-stack framework for building web applications with React. It supports server-side rendering (SSR), static site generation (SSG), API routes, and edge functions—all out of the box.
        </p>

        <p className="text-lg leading-7 mb-6 text-gray-900 dark:text-gray-400">
          <strong className="text-gray-900 dark:text-white">NextWizard</strong> is your interactive guide to building modern full-stack apps with Next.js. We help developers go from zero to production by integrating cutting-edge tools and services into simple, step-by-step recipes.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Build Smarter, Not Harder ⚡</h2>
        <p className="text-lg leading-7 mb-6 text-gray-900 dark:text-gray-400">
          We use a modern, **serverless architecture** with tools like:
        </p>

        <ul className="list-disc list-inside space-y-2 text-gray-900 dark:text-gray-400">
          <li><strong>Drizzle ORM</strong> – Type-safe, intuitive database access.</li>
          <li><strong>Neon</strong> – Scalable PostgreSQL with branching and edge-ready infrastructure.</li>
          <li><strong>Upstash & QStash</strong> – Serverless Redis and task queues for background jobs.</li>
          <li><strong>Resend</strong> – Modern email sending with React components.</li>
          <li><strong>ImageKit</strong> – Fast, real-time image transformation and CDN delivery.</li>
          <li><strong>Vercel</strong> – Seamless deployment with edge functions, CI/CD, and analytics.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Why Choose NextWizard?</h2>
        <p className="text-lg leading-7 text-gray-900 dark:text-gray-400 mb-6">
          NextWizard makes modern web development accessible. We combine:
        </p>

        <div className="grid md:grid-cols-2 gap-4 text-gray-900 dark:text-gray-400">
          <div className="p-4 bg-black/20 dark:bg-white/5 rounded-xl">
            🎯 <strong>Step-by-step walkthroughs</strong><br />
            From authentication to deployment, we guide you through building real features.
          </div>
          <div className="p-4 bg-black/20 dark:bg-white/5 rounded-xl">
            🧙‍♂️ <strong>Wizard-like automation</strong><br />
            Automatically scaffold pages, APIs, DB schemas, and configs with smart tools.
          </div>
          <div className="p-4 bg-black/20 dark:bg-white/5 rounded-xl">
            🌍 <strong>Edge-first architecture</strong><br />
            Build apps ready for global users using edge deployments and serverless databases.
          </div>
          <div className="p-4 bg-black/20 dark:bg-white/5 rounded-xl">
            💡 <strong>Visual, animated learning</strong><br />
            Use code previews, animations, and 3D visuals to learn interactively.
          </div>
        </div>

        <p className="mt-8 text-center text-lg font-semibold text-purple-400 dark:text-purple-300 animate-bounce">
          ✨ Ready to build your first full-stack app? Start your journey with NextWizard!
        </p>

      
        <Link 
          href="/docs/installation/automatic-installation" 
          className='flex group animate-pulse items-center justify-center mt-3 w-fit m-auto font-medium text-lg first-btn  dark:text-black text-white p-3 rounded-lg'>
            Take Your First Step <LinkIcon className='w-5 ml-1 hidden group-hover:block '/>
        </Link>
        
      </div>
      
    </div>
  );
};

export default MainContent;
