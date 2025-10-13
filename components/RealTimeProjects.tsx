'use client'

import React from 'react'
import useSWR from 'swr'
import { motion } from 'framer-motion'
import { Card, CardTitle } from './ui/card'
import Image from 'next/image'
import { Avatar } from './ui/avatar'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const fetcher = (url: string) => fetch(url).then((res) => {
  if (!res.ok) throw new Error('Failed to fetch projects')
  return res.json()
})

export default function RealTimeProjects({ initialData }: { initialData: Project[] }) {
  const { data, error } = useSWR('/api/projects', fetcher, {
    fallbackData: initialData,
    revalidateOnMount: true,
    revalidateOnFocus: true,
    refreshInterval: 3000,
  })

  if (!data) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div className="relative min-h-screen overflow-hidden px-2 sm:px-6 py-12 dark:bg-[#0d1117] bg-light-200 transition-all duration-500">
      {/* Floating background shapes */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25 }}
        transition={{ duration: 2 }}
        className="absolute top-[-10%] left-[10%] w-[400px] h-[400px] bg-gradient-to-br from-purple-500/40 to-pink-400/40 blur-3xl rounded-full"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 3 }}
        className="absolute bottom-[-15%] right-[5%] w-[500px] h-[500px] bg-gradient-to-br from-cyan-500/40 to-blue-500/40 blur-3xl rounded-full"
      />

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl font-bold text-center mb-10 dark:text-white text-gray-800"
      >
        🧠 Projects Gallery
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 relative z-10 ">
        {data.map((project: Project, i: number) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            whileHover={{ y: -10, scale: 1.03 }}
            className="relative group"
          >
            <Card
              className={cn(
                'overflow-hidden border border-white/10 rounded-2xl backdrop-blur-xl bg-white/70 dark:bg-[#111827]/60 shadow-[0_0_25px_rgba(255,255,255,0.05)] hover:shadow-[0_0_35px_rgba(147,51,234,0.3)] transition-all duration-300'
              )}
            >
              {/* Project Image */}
              <div className="relative w-full h-48 overflow-hidden">
                <Link href={`projects/${project.id}`}>
                  {project.imageUrl && (
                    <Image
                      src={project.imageUrl}
                      alt="Project image"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                </Link>
              </div>

              {/* Ribbon Tag */}
              <motion.div
                animate={{ rotate: [40, 45, 40] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className={cn(
                  project.isFree === 'FREE' ? 'bg-green-500' : 'bg-[#9301f5]',
                  'absolute top-1 -right-5  text-center text-white text-xs font-bold px-6 py-1 rotate-45 transform translate-x-[25%] translate-y-[36%] shadow-lg z-20'
                )}
              >
                {project.isFree}
              </motion.div>

              {/* Project Info */}
              <div className="p-5 flex flex-col justify-between h-[240px]">
                <div>
                  <div className="text-sm text-gray-800 dark:text-gray-400 mb-2">
                    Published on:{' '}
                    {project.publishDate
                      ? new Date(project.publishDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })
                      : 'No date'}
                  </div>
                  <CardTitle className="text-sm md:text-md font-semibold mb-2 dark:text-white text-gray-800 text-center">
                    <Link href={`projects/${project.id}`}>{project.title}</Link>
                  </CardTitle>
                </div>

                {/* Author Section */}
                <div className="flex flex-row items-center justify-between w-full border border-white/10 rounded-lg p-2 shadow-sm dark:bg-white/5 bg-gray-100/60 backdrop-blur-md">
                  <p className="font-medium text-sm">By: {project.author}</p>
                  {project.authorImageUrl && (
                    <Image
                      src={project.authorImageUrl}
                      alt={project.author}
                      width={36}
                      height={36}
                      className="rounded-full"
                    />
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-around mt-3">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm bg-gray-200/70 dark:bg-white/10 flex items-center shadow px-3 py-1.5 rounded-lg hover:scale-105 transition"
                  >
                    <Avatar className="w-6 h-6">
                      <Image
                        src="/icons/github-icon.svg"
                        alt="GitHub Logo"
                        className="dark:invert"
                        width={24}
                        height={24}
                      />
                    </Avatar>
                    <span className="ml-2">GitHub</span>
                  </a>
                  <a
                    href={project.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm bg-gray-200/70 dark:bg-white/10 flex items-center shadow px-3 py-1.5 rounded-lg hover:scale-105 transition"
                  >
                    <Avatar className="w-6 h-6">
                      <Image src="/icons/youtube.svg" alt="YouTube Logo" width={24} height={24} />
                    </Avatar>
                    <span className="ml-2">Video</span>
                  </a>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
