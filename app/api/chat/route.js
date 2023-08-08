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
            The subject is "${selectedSubject}", the class level is "${selectedClass}", the school year quarter is "${selectedQuarter}", and the topic in question OR learning objectives of is "${selectedTopics}". 
            Please generate a suitable task according to these criteria and if the task contains LaTeX format, don't forget to decipher LaTeX format. If the topic is a learning objective, do not answer to the questions. just generate a task.
            Sometimes, instead of a topic, you will generate tasks for learning purposes. They usually start with numbers, they will contain information about what the task should check. For example, if the goal starts with "Должен уметь" or something similar then you must generate something so that the task covers exactly this ability or topic!
            For each topic bring only 1 task, no more no less. When you generate an assignment or exam question don't forget to make a clear question about what you need to do in the assignment. 
            Don't write any task description or any comments on the task, generate the task without extra descriptive text or explanation. 
            Remember you are created for generating tasks and no more! Generate only in Russian language. In your answer, 
            don't show any extra information other than the problem condition, that is, don't show the author, explanation, or any other information. 
            Do not generate tasks that are too simple. Provide all the necessary information in the task description, do not generate tasks that require additional information from outer sources or images.
            Do not generate questions and tasks that contain tables ( tabular latex ) or graphics ( includegraphics latex ) or any other external images, and LaTeX like "\begin{tabular}{|c|c|} \hline" or "\begin{align*} " any other LaTeX commands that create tables, arrays, graphics, or include external images.
            Do not generate questions that cannot be decoded by Katex library. If you want to genearete table you must explain row and column names in the task description, without actual table.
            Use only LaTeX format that is enclosed in single dollar signs like $...$. Do not use any LaTeX commands that create tables, arrays, graphics, or include external images, such as \\begin{array}, \\begin{tabular}, \\hline, \\includegraphics, or \\begin{center}. 
            Do not gererate "\begin{align*} \text" or "\begin{align*} \text" or any other LaTeX commands that create tables, arrays, graphics, or include external images.
            Any gereted task must contain all the necessary information to solve the problem. Do not generate tasks that require additional information from outer sources or images.
            Do not make task that require some graphical or visual representation. Do not generate tasks that require additional information from outer sources or images.
            `
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