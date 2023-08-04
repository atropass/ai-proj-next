import React from 'react';
import MathJax from 'react-mathjax2';

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

const GeneratedTasks = ({ generatedTasks, selectedTasks, handleTaskSelect, parseLaTeX }) => {
    return (
        <div>
            {generatedTasks.map((topicData, index) => (
                <div key={index}>
                    <h3 className="text-xl font-bold mb-2 text-black">{topicData.topic}</h3>
                    <ul>
                        {topicData.tasks.map((task, taskIndex) => (
                            <li key={taskIndex} className="mb-4 border-b border-gray-300">
                                <input
                                    type="checkbox"
                                    checked={selectedTasks[index]?.has(taskIndex) ?? false}
                                    onChange={() => handleTaskSelect(index, taskIndex)}
                                    className="mr-2 text-primary align-middle"
                                />
                                <p className="pl-6 align-middle text-black" style={{ fontFamily: '"Times New Roman", Times, serif', fontSize: '20px' }}>
                                    {parseLaTeX(task)}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default GeneratedTasks;
