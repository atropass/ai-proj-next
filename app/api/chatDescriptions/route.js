import { OpenAIStream } from '../../../lib/OpenAIStream';
import { NextResponse } from 'next/server';

if (!process.env.OPENAI_API_KEY) {
    throw new Error('Missing Environment Variable OPENAI_API_KEY');
}

export const runtime = 'edge';

export async function POST(req) {
    const { generatedTasks } = await req.json();

    const messages = generatedTasks.map((task) => {
        return {
            role: 'system',
            content: `Хорошо подумай, не спеши и распиши мне полное решение задач с правильными ответами, если сомневаешься то напиши просто решение или ход решения, вот задача: ${task}`,
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
