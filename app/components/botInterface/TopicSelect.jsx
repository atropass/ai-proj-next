import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const TopicSelect = ({ classData, selectedSubject, selectedClass, selectedQuarter, selectedTopics, setSelectedTopics }) => {
    const topicOptions = classData[selectedSubject][selectedClass][selectedQuarter];

    return (
        <div className="mt-4">
            <h2 className="text-2xl font-bold mb-4 text-[#020817]">Выбор темы:</h2>
            <Autocomplete
                multiple
                freeSolo
                id="tags-outlined"
                options={topicOptions}
                getOptionLabel={(option) => option}
                defaultValue={selectedTopics}
                onChange={(event, newValue) => {
                    setSelectedTopics(newValue);
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        placeholder="Выберите или ищите темы"
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
                            },
                        }}
                    />
                )}
            />
        </div>
    );
};

export default TopicSelect;
