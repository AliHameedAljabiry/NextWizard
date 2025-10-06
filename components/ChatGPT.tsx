'use client';

import { useState } from 'react';
import { SendHorizonal, Loader2 } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function ChatGPTWindow() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I’m ChatGPT, how can I help you today?' }
  ]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages })
      });

      const data = await res.json();
      
      setMessages([
       ...newMessages,
       { role: 'assistant', content: data.reply || 'Sorry, something went wrong.' }
      ]);

    } catch (err) {
      setMessages([...newMessages, { role: 'assistant', content: 'Error getting response.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-w-[500px] max-h-[86vh] min-h-[86vh] flex flex-col border rounded-lg dark:border-gray-700 bg-white dark:bg-[#0d1117]">
      <div className="p-3 border-b dark:border-gray-700 font-semibold text-center dark:text-white">Ask ChatGPT</div>
      <div className="flex-1 overflow-y-auto p-3 space-y-2 text-sm">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`p-2 rounded-md whitespace-pre-wrap ${
              m.role === 'user' ? 'bg-gray-200 dark:bg-[#1b222e] dark:text-gray-300 self-end' : 'bg-inherit dark:bg-[#05080f] dark:text-gray-300'
            }`}
          >
            {m.content}
          </div>
        ))}
        {loading && (
          <div className="text-xs italic text-gray-500 dark:text-gray-400">Thinking...</div>
        )}
      </div>
      <div className="p-2 border-t dark:border-gray-700 flex gap-2">
        <Textarea
          rows={1}
          className="flex-1 resize-none text-sm dark:text-gray-300"
          placeholder="Ask a question..."
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <Button
          size="icon"
          className="h-auto px-2"
          onClick={sendMessage}
          disabled={loading}
        >
          {loading ? <Loader2 className="animate-spin" /> : <SendHorizonal size={18} />}
        </Button>
      </div>
    </div>
  );
}
