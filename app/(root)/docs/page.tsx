'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Link as LinkIcon, Sparkles } from 'lucide-react'
import Link from 'next/link'

const floatingShapes = [
  { color: 'from-purple-500/30 to-pink-500/30', size: 'w-64 h-64', x: '-20%', y: '-10%', delay: 0 },
  { color: 'from-cyan-400/30 to-blue-500/30', size: 'w-72 h-72', x: '60%', y: '10%', delay: 2 },
  { color: 'from-indigo-400/30 to-purple-600/30', size: 'w-56 h-56', x: '10%', y: '70%', delay: 4 },
]

const Card = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    whileHover={{ y: -5, scale: 1.02 }}
    transition={{ type: 'spring', stiffness: 200 }}
    className="relative p-6 rounded-2xl backdrop-blur-xl border border-white/10
               dark:bg-[#111827]/60 bg-white/70 shadow-[0_0_25px_rgba(255,255,255,0.05)] 
               hover:shadow-[0_0_30px_rgba(168,85,247,0.25)]"
  >
    {children}
  </motion.div>
)

const MainContent = () => {
  return (
    <div className="relative overflow-hidden min-h-screen flex items-center justify-center sm:px-6 py-20 dark:bg-[#0d1117] bg-light-300 transition-all duration-500">
      {/* Floating 3D gradient shapes */}
      {floatingShapes.map((shape, i) => (
        <motion.div
          key={i}
          initial={{ x: shape.x, y: shape.y, scale: 0.8 }}
          animate={{ y: ['0%', '5%', '0%'], rotate: [0, 15, -15, 0] }}
          transition={{ duration: 10, repeat: Infinity, delay: shape.delay }}
          className={`absolute bg-gradient-to-br ${shape.color} ${shape.size} rounded-full blur-3xl opacity-40`}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 w-full max-w-5xl space-y-8"
      >
        <Card>
          <h1 className="sm:text-4xl font-bold mb-4 flex items-center gap-2 dark:text-white">
            <Sparkles className="text-purple-400 animate-pulse min-w-8 " />
            Welcome to NextWizard
          </h1>
          <p className="text-lg leading-7 mb-6 text-gray-900 dark:text-gray-400">
            <strong>Next.js</strong> is the most powerful full-stack framework for building web applications with React.
            It supports SSR, SSG, API routes, and edge functions—all out of the box.
          </p>
          <p className="text-lg leading-7 mb-6 text-gray-900 dark:text-gray-400">
            <strong>NextWizard</strong> is your interactive guide to building modern full-stack apps with Next.js.
            We integrate cutting-edge tools and services into simple, step-by-step recipes.
          </p>
        </Card>

        <Card>
          <h2 className="text-2xl font-semibold dark:text-white mb-4">Build Smarter, Not Harder ⚡</h2>
          <p className="text-lg leading-7 mb-6 text-gray-900 dark:text-gray-400">
            We use a modern, serverless architecture with tools like:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-900 dark:text-gray-400">
            <li><strong>Drizzle ORM</strong> – Type-safe, intuitive database access.</li>
            <li><strong>Neon</strong> – Scalable PostgreSQL with branching and edge-ready infrastructure.</li>
            <li><strong>Upstash & QStash</strong> – Serverless Redis and background queues.</li>
            <li><strong>Resend</strong> – Modern email sending with React components.</li>
            <li><strong>ImageKit</strong> – Fast, real-time image optimization and CDN delivery.</li>
            <li><strong>Netlify</strong> – Seamless deployment with edge functions and CI/CD.</li>
          </ul>
        </Card>

        <Card>
          <h2 className="text-2xl font-semibold mb-4 dark:text-white">Why Choose NextWizard?</h2>
          <p className="text-lg leading-7 mb-6 text-gray-900 dark:text-gray-400">
            NextWizard makes modern web development accessible. We combine:
          </p>
          <div className="grid md:grid-cols-2 gap-4 text-gray-900 dark:text-gray-400">
            {[
              ['🎯', 'Step-by-step walkthroughs', 'From authentication to deployment, we guide you through building real features.'],
              ['🧙‍♂️', 'Wizard-like automation', 'Automatically scaffold pages, APIs, DB schemas, and configs with smart tools.'],
              ['🌍', 'Edge-first architecture', 'Build apps ready for global users using edge deployments and serverless databases.'],
              ['💡', 'Visual, animated learning', 'Use code previews, animations, and 3D visuals to learn interactively.'],
            ].map(([icon, title, desc]) => (
              <Card key={title}>
                <div className="text-lg">
                  {icon} <strong>{title}</strong>
                  <br />
                  <span className="text-sm opacity-80">{desc}</span>
                </div>
              </Card>
            ))}
          </div>
        </Card>

        <Card>
          <p className="mt-2 text-center text-lg font-semibold text-purple-400 dark:text-purple-300 animate-bounce">
            ✨ Ready to build your first full-stack app? Start your journey with NextWizard!
          </p>
          <div className="flex justify-center">
            <Link
              href="/docs/installation/automatic-installation"
              className="flex group items-center justify-center mt-5 font-medium text-lg
                         dark:bg-white/90 bg-purple-600 dark:text-black text-white
                         px-6 py-3 rounded-xl shadow-lg hover:scale-105 transition-transform"
            >
              Take Your First Step <LinkIcon className="w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}

export default MainContent
