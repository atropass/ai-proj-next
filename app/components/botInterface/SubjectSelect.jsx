import React from 'react';
import Select from 'react-select';



const SubjectSelect = ({ classData, selectedSubject, setSelectedSubject, changeSubject }) => {
    const translationMapping = {
        "math": "Математика",
        "phys": "Физика",
    };
    const subjectOptions = Object.keys(classData).map((subject) => ({
        value: subject,
        label: translationMapping[subject] || subject,
    }));

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Выбор предмета:</h1>
            <Select
                onChange={(e) => {
                    setSelectedSubject(e.value);
                    changeSubject(e.value); // Call the changeSubject function here
                }}
                className="w-full mt-4 text-black"
                placeholder="Выберите предмет"
                options={subjectOptions}
                isClearable
                isSearchable
            />
        </div>
    );
};

export default SubjectSelect;
