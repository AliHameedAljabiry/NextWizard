
import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';
import config from '@/lib/config';

const openai = new OpenAI({
  apiKey: config.env.openAiApiKey
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid messages' }, { status: 400 });
    }

    const chatResponse = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // 
      messages,
      temperature: 0.7,
      store: true,
    });

    const reply = chatResponse.choices[0].message.content;
    return NextResponse.json({ reply });
  } catch (error: any) {
    
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

