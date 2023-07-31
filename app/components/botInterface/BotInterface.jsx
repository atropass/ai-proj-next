"use client"
import React, { useState } from 'react';
import axios from 'axios';
import Select from "react-select";
import { motion } from 'framer-motion';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CustomTextField from './CustomTextField';
import html2pdf from 'html2pdf.js';
import MathJax from 'react-mathjax2';

const generateHtmlForPdf = (data) => {
    return `
    <div style="display: flex; justify-content: space-between; margin-top: 0.5in; margin-left: 1in; margin-right: 1in; font-size: 0.8em;">
        <div>Имя________________</div>
        <div>Фамилия________________</div>
        <div>Класс_____</div>
    </div>
    <table style="width: 70%; margin: 0.5in auto; border: 1px solid black; text-align: left; font-size: 0.8em;">
        <tr>
            <th style="border: 1px solid black; padding-bottom: 0.1in;">Тема:</th>
            <td style="border: 1px solid black; padding-bottom: 0.1in;">${data.topic}</td>
        </tr>
        <tr>
            <th style="border: 1px solid black; padding-bottom: 0.1in;">Цель обучения:</th>
            <td style="border: 1px solid black; padding-bottom: 0.1in;">${data.learningObjective}</td>
        </tr>
        <tr>
            <th style="border: 1px solid black; padding-bottom: 0.1in;">Критерий оценивания:</th>
            <td style="border: 1px solid black; padding-bottom: 0.1in;">${data.evaluationCriteria}</td>
        </tr>
        <tr>
            <th style="border: 1px solid black; padding-bottom: 0.1in;">Уровень мыслительных навыков:</th>
            <td style="border: 1px solid black; padding-bottom: 0.1in;">${data.thinkingSkillsLevel}</td>
        </tr>
        <tr>
            <th style="border: 1px solid black; padding-bottom: 0.1in;">Время выполнения:</th>
            <td style="border: 1px solid black; padding-bottom: 0.1in;">${data.completionTime}</td>
        </tr>
    </table>
    <div style="margin-left: 1in; margin-right: 1in;">
        ${data.tasks.map((task, index) => `<p style="margin-bottom: 0.1in;">${index + 1}. ${task}</p>`).join('')}
        <div style="margin-bottom: 0.2in;"></div>
    </div>
    `;
};



const parseLaTeX = (input) => {
    const regex = /\$(.*?)\$/g;
    const parts = input.split(regex);

    return (
        <MathJax.Context input='tex'>
            <>
                {parts.map((part, index) => {
                    if (index % 2 === 0) return part;
                    return <MathJax.Node key={index} inline>{part}</MathJax.Node>;
                })}
            </>
        </MathJax.Context>
    );
};

const translationMapping = {
    "math": "Математика",
    "phys": "Физика",
};

const BotInterface = ({ classData }) => {
    const [selectedSubject, setSelectedSubject] = useState('');
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedQuarter, setSelectedQuarter] = useState('');
    const [selectedTopics, setSelectedTopics] = useState([]);
    const [generatedTasks, setGeneratedTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedTasks, setSelectedTasks] = useState({});
    const [topic, setTopic] = useState('');
    const [learningObjective, setLearningObjective] = useState('');
    const [evaluationCriteria, setEvaluationCriteria] = useState('');
    const [thinkingSkillsLevel, setThinkingSkillsLevel] = useState('');
    const [completionTime, setCompletionTime] = useState('');
    const downloadPdf = () => {
        const data = {
            name: 'Name from form',  // Замените на данные из формы
            secondName: 'Second name from form', // Замените на данные из формы
            topic: topic,
            learningObjective: learningObjective,
            evaluationCriteria: evaluationCriteria,
            thinkingSkillsLevel: thinkingSkillsLevel,
            completionTime: completionTime,
            tasks: handleDownload(), // Массив задач
        };
        const html = generateHtmlForPdf(data);
        const opt = {
            margin: 0,
            filename: 'Задачи.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'A4', orientation: 'portrait' }
        };
        html2pdf().from(html).set(opt).save();
    };
    const handleTaskSelect = async (topicIndex, taskIndex) => {
        let newSelectedTasks = { ...selectedTasks };

        if (!newSelectedTasks[topicIndex]) {
            newSelectedTasks[topicIndex] = new Set([taskIndex]);
        } else if (newSelectedTasks[topicIndex].has(taskIndex)) {
            newSelectedTasks[topicIndex] = new Set(
                Array.from(newSelectedTasks[topicIndex]).filter(index => index !== taskIndex)
            );
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
            <div className="w-1/3 h-full p-8 sticky top-0 overflow-auto bg-[#1D2432] text-[#C3C3C3] shadow-2xl">
                <h1 className="text-2xl font-bold mb-4">Выбор предмета:</h1>
                <Select
                    onChange={(e) => e && changeSubject(e.value)}
                    className="w-full mt-4 text-black"
                    placeholder="Выберите предмет"
                    options={Object.keys(classData).map((subject) => ({
                        value: subject,
                        label: translationMapping[subject] || subject,
                    }))}
                    isClearable
                    isSearchable
                />

                {selectedSubject && (
                    <div className="mt-4">
                        <h2 className="text-2xl font-bold mb-4">Выбор класса:</h2>
                        <Select
                            onChange={(e) => e && changeClass(e.value)}
                            className="w-full mt-4 text-black"
                            placeholder="Выберите класс"
                            options={Object.keys(classData[selectedSubject] || {}).map((classNumber) => ({
                                value: classNumber,
                                label: classNumber,
                            }))}
                            isDisabled={!selectedSubject}
                            isClearable
                            isSearchable
                        />
                    </div>
                )}

                {selectedClass && (
                    <div className="mt-4">
                        <h2 className="text-2xl font-bold mb-4">Выбор четверти:</h2>
                        <Select
                            onChange={(e) => e && changeQuarter(e.value)}
                            className="w-full mt-4 text-black"
                            placeholder="Выберите четверть"
                            options={Object.keys(classData[selectedSubject]?.[selectedClass] || {}).map((quarter) => ({
                                value: quarter,
                                label: quarter,
                            }))}
                            isDisabled={!selectedClass}
                            isClearable
                            isSearchable
                        />
                    </div>
                )}
                {
                    selectedQuarter && (
                        <div className="mt-4">
                            <h2 className="text-2xl font-bold mb-4 text-[#C3C3C3]">Выбор темы:</h2>
                            <Autocomplete
                                multiple
                                freeSolo
                                id="tags-outlined"
                                options={classData[selectedSubject][selectedClass][selectedQuarter]}
                                getOptionLabel={(option) => option}
                                defaultValue={selectedTopics}
                                onChange={(event, newValue) => {
                                    setSelectedTopics(newValue);
                                }}
                                renderInput={(params) => (
                                    <TextField {...params} placeholder="Выберите или ищите темы"
                                        sx={{
                                            width: '100%',
                                            '.MuiOutlinedInput-root': {
                                                backgroundColor: '#ffffff',
                                                '& fieldset': {
                                                    borderColor: 'rgba(195, 195, 195, 0.23)',
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: 'rgba(195, 195, 195, 0.87)',
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: 'rgba(195, 195, 195, 0.87)',
                                                },
                                            },
                                            '.MuiFormLabel-root': {
                                                color: 'rgba(195, 195, 195, 0.87)',
                                            },
                                            '.MuiAutocomplete-tag': {
                                                backgroundColor: '#ffffff',
                                                color: '#1D2432',
                                                border: '1px solid #1D2432',
                                                borderRadius: '5px',
                                                padding: '2px',
                                            }
                                        }}
                                    />
                                )}
                            />
                        </div>
                    )
                }
                <div className="mt-6 flex flex-col space-y-4">
                    <motion.button
                        onClick={handleGenerate}
                        disabled={loading || selectedTopics.length === 0}
                        className="w-full py-2 font-semibold rounded-lg shadow-md text-white bg-[#EE8365] hover:bg-[#CD6A52]"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                    >
                        {loading ? 'Создание...' : 'Создать'}
                    </motion.button>
                    <div className="flex justify-between">
                        <motion.button
                            onClick={handleAppend}
                            disabled={loading || selectedTopics.length === 0 || generatedTasks.length === 0}
                            className="w-1/2 py-2 font-semibold rounded-lg shadow-md text-white bg-[#EE8365] hover:bg-[#CD6A52] mr-2"
                            whileHover={{ scale: 1.09 }}
                            transition={{ duration: 0.2 }}
                        >
                            {loading ? 'Добавление...' : 'Добавить'}
                        </motion.button>
                        <motion.button
                            onClick={handleReset}
                            className="w-1/2 py-2 font-semibold rounded-lg shadow-md text-white bg-[#64748B] hover:bg-[#475A6F] ml-2"
                            whileHover={{ scale: 1.09 }}
                            transition={{ duration: 0.2 }}
                        >
                            Главное меню
                        </motion.button>
                    </div>
                </div>
                <CustomTextField
                    title="Тема"
                    placeholder="Введите тему"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                />
                <CustomTextField
                    title="Цель обучения"
                    placeholder="Введите цель обучения"
                    value={learningObjective}
                    onChange={(e) => setLearningObjective(e.target.value)}
                />
                <CustomTextField
                    title="Критерий оценивания"
                    placeholder="Введите критерий оценивания"
                    value={evaluationCriteria}
                    onChange={(e) => setEvaluationCriteria(e.target.value)}
                />
                <CustomTextField
                    title="Уровень мыслительных навыков"
                    placeholder="Введите уровень мыслительных навыков"
                    value={thinkingSkillsLevel}
                    onChange={(e) => setThinkingSkillsLevel(e.target.value)}
                />
                <CustomTextField
                    title="Время выполнения"
                    placeholder="Введите время выполнения"
                    value={completionTime}
                    onChange={(e) => setCompletionTime(e.target.value)}
                />
            </div>
            {generatedTasks && generatedTasks.length > 0 && (
                <div className="flex-1 h-full p-8 overflow-auto bg-gray-200">
                    <div className="bg-white p-8 rounded shadow-lg">
                        <h2 className="text-2xl font-bold mb-4">Сгенерированные задачи:</h2>
                        <div id="pdfContent">
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
                                                    className="mr-2 text-primary align-middle"
                                                />
                                                <p className="pl-6 align-middle" style={{ fontFamily: '"Times New Roman", Times, serif', fontSize: '20px' }}>{parseLaTeX(task)}</p>

                                            </li>

                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={downloadPdf}
                            className={`py-2 px-4 mt-4 font-semibold text-white rounded-lg shadow-md hover:bg-blue-700 ${learningObjective ? 'bg-blue-500' : 'bg-blue-300 cursor-not-allowed'}`}
                        >
                            Download PDF
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BotInterface;