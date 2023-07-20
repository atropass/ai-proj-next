"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import storage from '../../../public/storage.json';
import { Document, Page, PDFDownloadLink, Text, View } from '@react-pdf/renderer';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';



const classData = storage;

const MyDocument = ({ tasks }) => (
    <Document>
        <Page size="A4">
            <View>
                {tasks.map((task, index) => (
                    <Text key={index}>{task}</Text>
                ))}
            </View>
        </Page>
    </Document>
);

const parseLaTeX = (input) => {
    const regex = /\$(.*?)\$/g;
    const parts = input.split(regex);

    return parts.map((part, index) => {
        if (index % 2 === 0) return part;
        return <InlineMath key={index} math={part} />;
    });
};

const BotInterface = () => {
    const [selectedSubject, setSelectedSubject] = useState('');
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedQuarter, setSelectedQuarter] = useState('');
    const [selectedTopics, setSelectedTopics] = useState([]);
    const [generatedTasks, setGeneratedTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedTasks, setSelectedTasks] = useState({});

    const [favoriteTasks, setFavoriteTasks] = useState([]);

    const addToFavorites = async (task) => {
        try {
            const res = await axios.post('/api/favorites', { taskId: task.id });
            if (res.status === 200) {
                setFavoriteTasks(prevTasks => [...prevTasks, task]);
            }
        } catch (error) {
            console.error("Error adding task to favorites:", error);
        }
    };



    const handleTaskSelect = async (topicIndex, taskIndex) => {
        let newSelectedTasks = { ...selectedTasks };

        if (!newSelectedTasks[topicIndex]) {
            newSelectedTasks[topicIndex] = new Set([taskIndex]);
        } else if (newSelectedTasks[topicIndex].has(taskIndex)) {
            newSelectedTasks[topicIndex] = new Set(
                Array.from(newSelectedTasks[topicIndex]).filter(index => index !== taskIndex)
            );
            try {
                await axios.delete('/api/favorites', { data: { taskId: generatedTasks[topicIndex].tasks[taskIndex].id } });
            } catch (error) {
                console.error("Error removing task from favorites:", error);
            }
        } else {
            newSelectedTasks[topicIndex].add(taskIndex);
        }

        setSelectedTasks(newSelectedTasks);
    };


    const handleDownload = () => {
        let tasksForDownload = [];
        for (const topicIndex in selectedTasks) {
            if (selectedTasks[topicIndex]?.size > 0) {
                for (const taskIndex of selectedTasks[topicIndex]) {
                    let task = generatedTasks[topicIndex].tasks[taskIndex];
                    task = task.replace(/<\/?br\/?>/g, '\n'); // Заменяем HTML-теги на символ новой строки
                    tasksForDownload.push(task);
                }
            }
        }
        return tasksForDownload;
    };


    const handleGenerate = async () => {
        setLoading(true);
        try {
            const allTasks = [];
            for (let topic of selectedTopics) {
                const response = await axios.post('/api/chat', {
                    selectedSubject,
                    selectedClass,
                    selectedQuarter,
                    selectedTopic: topic,
                });
                console.log(response.data);
                allTasks.push({ topic, tasks: [response.data] });
            }
            setGeneratedTasks(allTasks);
        } catch (error) {
            console.error("Error fetching data from ChatGPT API:", error);
        }
        setLoading(false);
    };

    const handleAppend = async () => {
        setLoading(true);
        try {
            const allTasks = [];
            for (let topic of selectedTopics) {
                const response = await axios.post('/api/chat', {
                    selectedSubject,
                    selectedClass,
                    selectedQuarter,
                    topic,
                });
                allTasks.push({ topic, tasks: [response.data] });
            }
            setGeneratedTasks([...generatedTasks, ...allTasks]);
        } catch (error) {
            console.error("Error fetching data from ChatGPT API:", error);
        }
        setLoading(false);
    };
    <button
        onClick={handleDownload}
        disabled={!Object.values(selectedTasks).some(set => set.size > 0)}
        className={`px-6 py-3 rounded border border-transparent flex-grow ${!Object.values(selectedTasks).some(set => set.size > 0) ? 'bg-gray-500 text-white cursor-not-allowed' : 'bg-gray-700 text-white hover:bg-gray-600 cursor-pointer'}`}
    >
        Скачать
    </button>


    const handleReset = () => {
        setSelectedSubject('');
        setSelectedClass('');
        setSelectedQuarter('');
        setSelectedTopics([]);
        setGeneratedTasks([]);
    };

    const changeSubject = (subject) => {
        setSelectedSubject(subject);
        setSelectedClass('');
        setSelectedQuarter('');
        setSelectedTopics([]);
    };

    const changeClass = (classNumber) => {
        setSelectedClass(classNumber);
        setSelectedQuarter('');
        setSelectedTopics([]);
    };

    const changeQuarter = (quarter) => {
        setSelectedQuarter(quarter);
        setSelectedTopics([]);
    };

    return (
        <div className="m-4 flex flex-col md:flex-row w-full p-10 bg-gray-200 text-gray-800">
            <div className="flex flex-col w-full md:w-1/3 mb-4 md:mb-0 md:mr-4 bg-white p-5 rounded-lg shadow-lg overflow-auto">
                <h1 className="text-xl font-sans">Выберите предмет:</h1>
                {Object.keys(classData).map((subject) => (
                    <button
                        key={subject}
                        onClick={() => changeSubject(subject)}
                        className={`mt-6 w-full px-6 py-3 bg-gray-500 text-white rounded bor der border-transparent hover:bg-gray-700 ${selectedSubject === subject ? 'bg-gray-700' : 'bg-gray-500 hover:bg-gray-700'}`}
                    >
                        {subject}
                    </button>
                ))}
                {selectedSubject && (
                    <div className="mb-4">
                        <h1 className="text-xl mb-4 font-sans">Выберите класс:</h1>
                        {Object.keys(classData[selectedSubject] || {}).map((classNumber) => (
                            <button
                                key={classNumber}
                                onClick={() => changeClass(classNumber)}
                                className={`mr-2 mb-2 px-4 py-2 rounded border border-transparent text-xl font-sans ${selectedClass === classNumber ? 'bg-gray-700 text-white' : 'bg-gray-500 text-white hover:bg-gray-700'} ${!selectedSubject && 'opacity-50 cursor-not-allowed'}`}
                                disabled={!selectedSubject}
                            >
                                {classNumber}
                            </button>
                        ))}
                    </div>
                )}

                {selectedClass && (
                    <div className="mb-2 ">
                        <h1 className="text-xl mb-4 font-sans">Выберите четверть:</h1>
                        <div className="flex justify-between">
                            {Object.keys(classData[selectedSubject]?.[selectedClass] || {}).map((quarter) => (
                                <button
                                    key={quarter}
                                    onClick={() => changeQuarter(quarter)}
                                    className={` mb-2 px-2 py-2 rounded border border-transparent text-xl font-sans ${selectedQuarter === quarter ? 'bg-gray-700 text-white' : 'bg-gray-500 text-white hover:bg-gray-700'} ${!selectedClass && 'opacity-50 cursor-not-allowed'}`}
                                    disabled={!selectedClass}
                                >
                                    {quarter}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
                {selectedQuarter && (
                    <div className="mb-4">
                        <h1 className="text-2xl">Выберите темы:</h1>
                        {classData[selectedSubject][selectedClass][selectedQuarter].map((topic) => (
                            <label key={topic} className="inline-flex items-center mr-3">
                                <input
                                    type="checkbox"
                                    className="form-checkbox h-5 w-5 text-blue-600"
                                    value={topic}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setSelectedTopics([...selectedTopics, e.target.value]);
                                        } else {
                                            setSelectedTopics(selectedTopics.filter((item) => item !== e.target.value));
                                        }
                                    }}
                                />
                                <span className="ml-2 text-dark-brown">{topic}</span>
                            </label>
                        ))}
                    </div>
                )}

                <div className="mb-4 mt-6"  >
                    <div className="flex justify-between gap-5">
                        <button
                            onClick={handleGenerate}
                            disabled={loading || selectedTopics.length === 0}
                            className={`mr-2 px-6 py-3 rounded border border-transparent flex-grow ${loading || selectedTopics.length === 0 ? 'bg-gray-500 text-white cursor-not-allowed' : 'bg-gray-700 text-white hover:bg-gray-600 cursor-pointer'}`}
                        >
                            {loading ? 'Генерация...' : 'Сгенерировать'}
                        </button>
                        <button
                            onClick={handleAppend}
                            disabled={loading || selectedTopics.length === 0 || generatedTasks.length === 0}
                            className={`px-6 py-3 rounded border border-transparent flex-grow  ${loading || selectedTopics.length === 0 || generatedTasks.length === 0 ? 'bg-gray-500 text-white cursor-not-allowed' : 'bg-gray-700 text-white hover:bg-gray-600 cursor-pointer'}`}
                        >
                            {loading ? 'Добавление...' : 'Дополнить'}
                        </button>
                    </div>
                    <button
                        onClick={handleReset}
                        className="mt-6 w-full px-6 py-3 bg-gray-500 text-white rounded bor der border-transparent hover:bg-gray-700"
                    >
                        В главное меню
                    </button>
                </div>
            </div>
            {generatedTasks && generatedTasks.length > 0 && (
                <div className="flex flex-col w-full md:w-2/3 p-5 bg-white rounded-lg shadow-lg overflow-auto">
                    <h2 className="text-2xl mb-4">Сгенерированные задачи:</h2>
                    {generatedTasks.map((topicData, index) => (
                        <div key={index}>
                            <h3 className="text-xl mb-2">{topicData.topic}</h3>
                            <ul>
                                {topicData.tasks.map((task, taskIndex) => (
                                    <li key={taskIndex} className="mb-4 border border-gray-400 p-2 rounded hover:border-dark-brown">
                                        <input
                                            type="checkbox"
                                            checked={selectedTasks[index]?.has(taskIndex) ?? false}
                                            onChange={() => handleTaskSelect(index, taskIndex)}
                                        />
                                        <button onClick={() => addToFavorites(task)}>Добавить в избранное</button>
                                        <p className="text-dark-brown">{parseLaTeX(task)}</p>
                                    </li>
                                ))}

                            </ul>
                        </div>
                    ))}
                    <PDFDownloadLink document={<MyDocument tasks={handleDownload()} />} fileName="Задачи.pdf">
                        {({ blob, url, loading, error }) => (loading ? 'Загрузка документа...' : 'Скачать PDF')}
                    </PDFDownloadLink>
                </div>
            )}
        </div>
    );
};

export default BotInterface;