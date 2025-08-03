'use client';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronRight, File, FileCheck2, FolderClosed, FolderDown } from 'lucide-react';
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
        <div key={cat.id} className="mb-4 w-fit">
         
          
        <button
            onClick={() => toggleCategory(cat.id)}
            className={cn(
              "w-full flex flex-row gap-1 text-left font-semibold text-gray-700 dark:text-gray-400 hover:dark:text-white",
              pathname.startsWith(`/docs/${cat.slug}`) && "dark:text-white text-black"
            )}
            >
            {openCats.includes(cat.id) ?<ChevronDown className='w-5'/> : <ChevronRight className='w-5'/>}
            {cat.name}
          </button>
            
          

          {openCats.includes(cat.id) && (
            <ul className="ml-4 ">
              {cat.parts.map((part: any) => (
                <li key={part.id}>
                  <Link
                    href={`/docs/${cat.slug}/${part.slug}`}
                    className={cn(
                      'pl-2 py-1 pr-5 w-fit  flex flex-row gap-1 font-medium rounded-md text-sm text-gray-700 dark:text-gray-400 hover:dark:text-white',
                      pathname === `/docs/${cat.slug}/${part.slug}` && 'dark:text-white text-black'
                    )}
                  >
                    {pathname === `/docs/${cat.slug}/${part.slug}` ? <FileCheck2 className='w-4 -mt-0.5'/> : <File className='w-4 -mt-0.5'/>}
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
