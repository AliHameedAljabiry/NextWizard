'use client';

import { useState } from 'react';
import ChatGPTWindow from '@/components/ChatGPT';
import { MessageCircleCode, X } from 'lucide-react';

export default function ChatGPTToggle() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(prev => !prev)}
        title={isOpen ? 'Close ChatGPT Window' : 'Ask ChatGPT'}
        aria-label='Toggle ChatGPT Window'
        className="absolute top-6 -right-4 -translate-x-1/2 -translate-y-1/2 mb-3 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {isOpen ? <X/> : <MessageCircleCode/>}
      </button>

      {/* ChatGPT Window */}
      {isOpen && (
        <div>
          <ChatGPTWindow />
        </div>
      )}
    </div>
  );
}
