import React from 'react';
import MathJax from 'react-mathjax2';
import Latex from 'react-latex';

const GeneratedTasks = ({ generatedTasks, selectedTasks, handleTaskSelect, parseLaTeX }) => {
    return (
        <div>
            {generatedTasks.map((topicData, index) => (
                <div key={index}>
                    <h3 className="text-xl font-bold mb-2 text-black">{topicData.topic}</h3>
                    <ul>
                        {topicData.tasks.map((task, taskIndex) => (
                            <li key={taskIndex} className="mb-4 border-b border-gray-300">
                                <label htmlFor={`task-${index}-${taskIndex}`} className="cursor-pointer block">
                                    <div className="relative">
                                        <input
                                            type="checkbox"
                                            id={`task-${index}-${taskIndex}`}
                                            checked={selectedTasks[index]?.has(taskIndex) ?? false}
                                            onChange={() => handleTaskSelect(index, taskIndex)}
                                            className="hidden"
                                        />
                                        <span className="absolute top-0 left-0 h-5 w-5 border-2 border-gray-300 rounded-md mr-2"></span>
                                        <span className={`${selectedTasks[index]?.has(taskIndex) ? 'bg-blue-500' : ''} absolute top-0 left-0 h-5 w-5 rounded-md checked:bg-blue-500 checked:border-transparent`}></span>
                                    </div>
                                    <p className="pl-6 align-middle text-black" style={{ fontFamily: '"Times New Roman", Times, serif', fontSize: '20px' }}>
                                        {parseLaTeX(task)}
                                    </p>
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};


export default GeneratedTasks;
