import React from 'react';
import Select from 'react-select';



const ClassSelect = ({ classData, selectedSubject, selectedClass, setSelectedClass, changeClass }) => {
    const classOptions = Object.keys(classData[selectedSubject] || {}).map((classNumber) => ({
        value: classNumber,
        label: classNumber,
    }));


    return (
        <div className="mt-4">
            <h2 className="text-2xl font-bold mb-4">Выбор класса:</h2>
            <Select
                onChange={(e) => {
                    if (e) {
                        setSelectedClass(e.value);
                        changeClass(e.value);
                    } else {
                        setSelectedClass(null);
                        changeClass(null);
                    }
                }}
                className="w-full mt-4 text-black"
                placeholder="Выберите класс"
                options={classOptions}
                isDisabled={!selectedSubject}
                isClearable
                isSearchable
            />
        </div>
    );
};

export default ClassSelect;

