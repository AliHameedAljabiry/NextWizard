'use client';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Sidebar({ data }) {
  const [openCats, setOpenCats] = useState<string[]>([]); // Now an array of open category IDs
  const pathname = usePathname();

  const toggleCategory = (catId: string) => {
    setOpenCats(prev =>
      prev.includes(catId) ? prev.filter(id => id !== catId) : [...prev, catId]
    );
  };

  return (
    <div>
      {data.map((cat: any) => (
        <div key={cat.id} className="mb-4 w-72">
          <button
            onClick={() => toggleCategory(cat.id)}
            className="w-full text-left font-semibold dark:text-white"
          >
            {cat.name}
          </button>

          {openCats.includes(cat.id) && (
            <ul className="ml-4 mt-2 space-y-1 w-full">
              {cat.parts.map((part: any) => (
                <li key={part.id}>
                  <Link
                    href={`/docs/${cat.slug}/${part.slug}`}
                    className={cn(
                      'pl-2 py-1 pr-16 w-fit rounded-md text-sm text-gray-700 dark:text-gray-300',
                      pathname === `/docs/${cat.slug}/${part.slug}` && 'dark:bg-gray-600'
                    )}
                  >
                    {part.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
