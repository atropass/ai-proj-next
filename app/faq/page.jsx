"use client"
import { useState } from 'react';
import { Transition } from '@headlessui/react';

const FAQs = [
    { question: "Что такое создатель онлайн-тестов?", answer: "Создатель онлайн-тестов - это мощный инструмент, который позволяет вам создавать и управлять онлайн-тестами. Этот инструмент обычно имеет множество функций, таких как вопросы различных типов, таймеры, шкалы оценок и многое другое." },
    { question: "Для чего используется создатель тестов?", answer: "Создатели тестов используются во многих областях, таких как образование, тренинги, HR и маркетинг. Они позволяют создавать кастомизированные тесты для различных целей, от оценки знаний студентов до проведения опросов среди клиентов." },
    { question: "Кто может использовать создателя тестов?", answer: "Практически любой может использовать создателя тестов, от учителей и преподавателей до тренеров и специалистов по HR. Этот инструмент особенно полезен для людей, которым нужно быстро и эффективно оценить знания или навыки группы людей." },
    { question: "Какие преимущества использования онлайн-создателя тестов?", answer: "Онлайн-создатели тестов облегчают создание, распространение и оценку тестов." },
    { question: "Как создаются тесты с помощью создателя тестов?", answer: "Вы выбираете тип вопроса, вводите вопрос и возможные ответы, а затем указываете правильный ответ." },
    { question: "Можно ли установить временные ограничения для прохождения теста?", answer: "Да, можно установить временное ограничение для всего теста или для отдельных вопросов." },
    { question: "Можно ли случайным образом изменять порядок вопросов в тесте?", answer: "Да, многие создатели тестов позволяют случайно менять порядок вопросов." },
    { question: "Можно ли создавать вопросы с выбором ответа, верно/неверно или коротким ответом?", answer: "Да, большинство создателей тестов поддерживают различные типы вопросов." },
    { question: "Можно ли добавить изображения или видео к вопросам моего теста?", answer: "Да, многие создатели тестов позволяют добавлять мультимедиа к вопросам." },
    { question: "Можно ли настроить тест так, чтобы студенты могли сохранять и продолжать свой прогресс позже?", answer: "Да, некоторые создатели тестов предлагают такую функцию." },
];

export default function FAQ() {
    const [activeQuestion, setActiveQuestion] = useState(null);

    const handleQuestionClick = (index) => {
        if (activeQuestion === index) {
            setActiveQuestion(null);
        } else {
            setActiveQuestion(index);
        }
    }

    return (
        <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 pt-10" id='faq'>
            <h1 className="text-4xl font-bold text-gray-800 mb-10">Узнайте больше про нашего бота</h1>
            <div className="w-1/2">
                {FAQs.map((faq, index) => (
                    <div key={index} className="mb-4">
                        <div
                            onClick={() => handleQuestionClick(index)}
                            className="w-full border-b border-gray-800 flex justify-between items-center cursor-pointer p-4 transition-colors duration-200 text-xl"
                        >
                            <p className="font-bold text-gray-900">{faq.question}</p>
                            <span className="text-2xl">{activeQuestion === index ? '-' : '+'}</span>
                        </div>
                        <Transition
                            show={activeQuestion === index}
                            enter="transition-opacity duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="mt-2 pl-4 text-lg">
                                <p className="text-gray-700">{faq.answer}</p>
                            </div>
                        </Transition>
                    </div>
                ))}
            </div>
        </div>
    )
}