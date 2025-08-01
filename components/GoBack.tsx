'use client';

import React from 'react'
import { Button } from './ui/button'
import { ArrowBigLeft } from 'lucide-react'
import { useRouter } from 'next/navigation';

const GoBack = () => {
  const router = useRouter();
  
  return (
    <Button 
      onClick={() => router.back()}
      className="float-start w-fit px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md shadow-sm hover:bg-cyan-50 transition"
    >
      <ArrowBigLeft size={24} className="text-cyan-600" />
      <span className="no-underline text-gray-700 hover:text-cyan-700">
        Go Back
      </span>
    </Button>
  );
}

export default GoBack