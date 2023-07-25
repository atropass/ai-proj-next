"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import storage from '../../../public/storage.json';
import { Document, Page, PDFDownloadLink, Text, View } from '@react-pdf/renderer';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import { motion } from 'framer-motion';

const translationMapping = {
    "math": "Математика",
    "phys": "Физика",
};

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

const BotInterface = ({ classData }) => {
    const [selectedSubject, setSelectedSubject] = useState('');
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedQuarter, setSelectedQuarter] = useState('');
    const [selectedTopics, setSelectedTopics] = useState([]);
    const [generatedTasks, setGeneratedTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedTasks, setSelectedTasks] = useState({});

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
        <div className="h-screen pt-14 flex bg-gray-100 text-gray-800">

            <motion.div className="w-1/3 h-full p-8 sticky top-0 overflow-auto bg-blue-900 text-white shadow-2xl">
                <h1 className="text-2xl font-bold mb-4">Выбор предмета:</h1>
                {Object.keys(classData).map((subject) => (
                    <motion.button
                        key={subject}
                        onClick={() => changeSubject(subject)}
                        className="w-full py-2 mt-4 font-semibold rounded-lg shadow-md hover:bg-blue-800 text-white bg-blue-500"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                    >
                        {translationMapping[subject] || subject}
                    </motion.button>
                ))}
                {selectedSubject && (
                    <div className="mt-4">
                        <h2 className="text-2xl font-bold mb-4">Выбор класса:</h2>
                        {Object.keys(classData[selectedSubject] || {}).map((classNumber) => (
                            <motion.button
                                key={classNumber}
                                onClick={() => changeClass(classNumber)}
                                className="w-full py-2 mt-4 font-semibold rounded-lg shadow-md hover:bg-blue-800 text-white bg-blue-500"
                                disabled={!selectedSubject}
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.3 }}
                            >
                                {classNumber}
                            </motion.button>
                        ))}
                    </div>
                )}

                {selectedClass && (
                    <div className="mt-4">
                        <h2 className="text-2xl font-bold mb-4">Выбор четверти:</h2>
                        {Object.keys(classData[selectedSubject]?.[selectedClass] || {}).map((quarter) => (
                            <motion.button
                                key={quarter}
                                onClick={() => changeQuarter(quarter)}
                                className="w-full py-2 mt-4 font-semibold rounded-lg shadow-md hover:bg-dark-primary text-white bg-light-primary"
                                disabled={!selectedClass}
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.3 }}
                            >
                                {quarter}
                            </motion.button>
                        ))}
                    </div>
                )}

                {selectedQuarter && (
                    <div className="mt-4">
                        <h2 className="text-2xl font-bold mb-4">Выбор темы:</h2>
                        {classData[selectedSubject][selectedClass][selectedQuarter].map((topic) => (
                            <label key={topic} className="block mt-4">
                                <input
                                    type="checkbox"
                                    className="mr-2 text-primary align-middle form-checkbox text-blue-500 h-5 w-5"
                                    value={topic}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setSelectedTopics([...selectedTopics, e.target.value]);
                                        } else {
                                            setSelectedTopics(selectedTopics.filter((item) => item !== e.target.value));
                                        }
                                    }}
                                />
                                <span className="align-middle">{topic}</span>
                            </label>
                        ))}
                    </div>
                )}

                <div className="mt-6">
                    <motion.button
                        onClick={handleGenerate}
                        disabled={loading || selectedTopics.length === 0}
                        className="w-full py-2 mt-4 font-semibold rounded-lg shadow-md hover:bg-dark-primary text-white bg-light-primary"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                    >
                        {loading ? 'Создание...' : 'Создать'}
                    </motion.button>
                    <motion.button
                        onClick={handleAppend}
                        disabled={loading || selectedTopics.length === 0 || generatedTasks.length === 0}
                        className="w-full py-2 mt-4 font-semibold rounded-lg shadow-md hover:bg-dark-primary text-white bg-light-primary"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                    >
                        {loading ? 'Добавление...' : 'Добавить'}
                    </motion.button>
                    <motion.button
                        onClick={handleReset}
                        className="w-full py-2 mt-4 font-semibold rounded-lg shadow-md hover:bg-dark-primary text-white bg-light-primary"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                    >
                        Главное меню
                    </motion.button>
                </div>
            </motion.div>
            {generatedTasks && generatedTasks.length > 0 && (
                <motion.div className="w-2/3 h-full p-8 overflow-auto bg-gray-200" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                    <div className="bg-white p-8 rounded shadow-lg">
                        <h2 className="text-2xl font-bold mb-4">Сгенерированные задачи:</h2>
                        {generatedTasks.map((topicData, index) => (
                            <div key={index}>
                                <h3 className="text-xl font-bold mb-2">{topicData.topic}</h3>
                                <ul>
                                    {topicData.tasks.map((task, taskIndex) => (
                                        <li key={taskIndex} className="mb-4 border-b border-gray-300">
                                            <input
                                                type="checkbox"
                                                checked={selectedTasks[index]?.has(taskIndex) ?? false}
                                                onChange={() => handleTaskSelect(index, taskIndex)}
                                                className="mr-2 text-primary align-middle form-checkbox text-blue-500 h-5 w-5"
                                            />
                                            <p className="pl-6 align-middle">{parseLaTeX(task)}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                        <PDFDownloadLink
                            document={<MyDocument tasks={handleDownload()} />}
                            fileName="Задачи.pdf"
                            className="py-2 px-4 mt-4 font-semibold text-white rounded-lg shadow-md hover:bg-blue-700 bg-blue-500"
                        >
                            {({ blob, url, loading, error }) => (loading ? 'Загрузка документа...' : 'Скачать PDF')}
                        </PDFDownloadLink>
                    </div>
                </motion.div>
            )}
        </div>
    );

};


export default BotInterface;