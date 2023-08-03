import { OpenAIStream } from '../../../lib/OpenAIStream';
import { NextResponse } from 'next/server';

if (!process.env.OPENAI_API_KEY) {
    throw new Error('Missing Environment Variable OPENAI_API_KEY');
}

export const runtime = 'edge';

export async function POST(req) {

    const { task } = await req.json();

    console.log('generatedTasks', task);

    const messages = task.tasks.map((t) => {
        return {
            role: 'system',
            content: `Think well, take your time and write me the solution of the problem, do not make the solution too big, it should be small but with the correct answers, if in doubt then write just the solution or the course of the solution, here is the problem: ${t}`,
        };
    });

    const payload = {
        model: 'gpt-3.5-turbo-16k',
        messages: messages,
        temperature: process.env.AI_TEMP ? parseFloat(process.env.AI_TEMP) : 0.7,
        max_tokens: process.env.AI_MAX_TOKENS ? parseInt(process.env.AI_MAX_TOKENS) : 200,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        stream: true,
        n: 1,
    };

    try {
        const stream = await OpenAIStream(payload);
        return new NextResponse(stream);
    } catch (error) {
        return new NextResponse(JSON.stringify({ error: 'Error fetching data from ChatGPT API' })).rewrite({ status: 500 });
    }
}
