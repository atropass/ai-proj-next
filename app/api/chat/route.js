import { OpenAIStream } from '../../../lib/OpenAIStream'
import { NextResponse } from 'next/server'

// break the app if the API key is missing
if (!process.env.OPENAI_API_KEY) {
    throw new Error('Missing Environment Variable OPENAI_API_KEY')
}

export const runtime = 'edge';

export async function POST(req) {
    const { selectedSubject, selectedClass, selectedQuarter, selectedTopic } = await req.json()
    const messages = [
        {
            role: 'system',
            content: `You are an artificial intelligence designed to generate physics and math problems for students in grades 1 through 11.
      The subject is "${selectedSubject}", the class level is "${selectedClass}", the school year quarter is "${selectedQuarter}", and the topic in question is "${selectedTopic}". 
      Please generate a suitable task according to these criteria and if the task contains LaTeX format, 
      don't forget to decipher LaTeX format because without it the task is not understandable for a human. 
      For each topic bring only 1 task, no more no less, do not make too long tasks and not too short. 
      Also after the generated task create descriptors for this task and also output them. Be sure to decode the latex.
      Don't write any task description or any comments on the task, generate the task and descriptors without extra descriptive text or explanation. 
      Remember you are created for generating tasks and no more! Make 2 newlines and after that generate descriptors for the task.`
        }
    ];
    const payload = {
        model: 'gpt-3.5-turbo-16k',
        messages: messages,
        temperature: process.env.AI_TEMP ? parseFloat(process.env.AI_TEMP) : 0.7,
        max_tokens: process.env.AI_MAX_TOKENS
            ? parseInt(process.env.AI_MAX_TOKENS)
            : 200,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        stream: true,
        n: 1,
    }


    try {
        const stream = await OpenAIStream(payload)
        return new NextResponse(stream)
    } catch (error) {
        return new NextResponse(JSON.stringify({ error: 'Error fetching data from ChatGPT API' })).rewrite({ status: 500 });
    }

}