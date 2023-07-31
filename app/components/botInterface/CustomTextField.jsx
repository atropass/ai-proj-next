import React from 'react';
import TextField from '@mui/material/TextField';

const CustomTextField = ({ title, placeholder, value, onChange }) => {
    return (
        <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4 text-[#C3C3C3]">{title}:</h2>
            <TextField
                placeholder={placeholder}
                multiline
                rows={4}
                variant="outlined"
                value={value}
                onChange={onChange}
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
                }}
            />
        </div>
    );
};

export default CustomTextField;