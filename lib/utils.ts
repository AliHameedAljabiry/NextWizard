
import { db } from '@/database/drizzle';
import { categories, parts } from '@/database/schema';
import { clsx, type ClassValue } from 'clsx';
import { eq } from 'drizzle-orm';
import { twMerge } from 'tailwind-merge';
import { string } from 'zod';

export  function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export const gitInitials =  (name?: string): string => {
  if (!name || typeof name !== "string") return "?";
  
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 1); // You can use 1 or 2 depending on how many letters you want
};



