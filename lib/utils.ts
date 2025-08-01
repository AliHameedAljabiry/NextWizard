import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export const gitInitials = (name?: string): string => {
  if (!name || typeof name !== "string") return "?";
  
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 1); // You can use 1 or 2 depending on how many letters you want
};

