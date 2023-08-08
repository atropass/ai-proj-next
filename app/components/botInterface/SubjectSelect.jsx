import React from 'react';
import Select from 'react-select';



const SubjectSelect = ({ classData, selectedSubject, setSelectedSubject, changeSubject }) => {
    const translationMapping = {
        "math": "Математика",
        "phys": "Физика",
        "chem": "Химия",
    };
    const subjectOptions = Object.keys(classData).map((subject) => ({
        value: subject,
        label: translationMapping[subject] || subject,
    }));

    return (
        <div>
            <p className="text-4xl font-bold mb-8 flex justify-center">Дорогой учитель!</p>
            <h1 className="text-2xl font-bold mb-4">Выберите предмет обучения:</h1>
            <Select
                onChange={(e) => {
                    if (e) {
                        setSelectedSubject(e.value);
                        changeSubject(e.value);
                    } else {
                        setSelectedSubject(null);
                        changeSubject(null);
                    }
                }}
                className="w-full mt-4 text-black"
                placeholder="Выберите ваш предмет!"
                options={subjectOptions}
                isClearable
                isSearchable
            />
        </div>
    );
};

export default SubjectSelect;
