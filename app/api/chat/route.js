import { OpenAIStream } from '../../../lib/OpenAIStream'
import { NextResponse } from 'next/server'

if (!process.env.OPENAI_API_KEY) {
    throw new Error('Missing Environment Variable OPENAI_API_KEY')
}

export const runtime = 'edge';

export async function POST(req) {
    const { selectedSubject, selectedClass, selectedQuarter, selectedTopics } = await req.json()
    console.log(selectedSubject, selectedClass, selectedQuarter, selectedTopics)
    const messages = [
        {
            "role": "system",
            "content": `You are an artificial intelligence designed to generate physics and math problems for students in grades 1 through 11.
            The subject is "${selectedSubject}", the class level is "${selectedClass}", the school year quarter is "${selectedQuarter}", and the topic in question is "${selectedTopics}". 
            Please generate a suitable task according to these criteria and if the task contains LaTeX format, don't forget to decipher LaTeX format. 
            For each topic bring only 1 task, no more no less. When you generate an assignment or exam question don't forget to make a clear question about what you need to do in the assignment. 
            Don't write any task description or any comments on the task, generate the task without extra descriptive text or explanation. 
            Remember you are created for generating tasks and no more! Generate only in Russian language. In your answer, 
            don't show any extra information other than the problem condition, that is, don't show the author, explanation, or any other information. 
            Do not generate tasks that are too simple.
            Use only LaTeX format that is enclosed in single dollar signs like $...$. Do not use any LaTeX commands that create tables, arrays, graphics, or include external images, such as \\begin{array}, \\begin{tabular}, \\hline, \\includegraphics, or \\begin{center}. `
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