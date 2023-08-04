import React from 'react';
import * as MUI from '@mui/material';

export default function Instructions() {
    return (
        <div className="flex flex-col items-center justify-start min-h-screen bg-[#E0F7FA] pt-10">
            <h1 className="text-4xl font-bold text-gray-800 mb-10">Инструкция по использованию приложения</h1>

            <MUI.Paper className="w-3/4 p-8 rounded-md shadow-lg">
                <MUI.Typography variant="h6" className="mb-4 font-semibold">
                    Шаг 1: Выберите предмет и класс
                </MUI.Typography>
                <MUI.Typography variant="body1" className="text-gray-700">
                    Чтобы начать, выберите предмет и класс из списка доступных опций в левой части экрана. Выберите предмет, затем класс и квартал обучения.
                </MUI.Typography>

                <MUI.Typography variant="h6" className="my-4 font-semibold">
                    Шаг 2: Выберите темы
                </MUI.Typography>
                <MUI.Typography variant="body1" className="text-gray-700">
                    После выбора предмета, класса и квартала обучения, выберите темы, для которых вы хотите создать задания. Вы можете выбрать одну или несколько тем.
                </MUI.Typography>

                <MUI.Typography variant="h6" className="my-4 font-semibold">
                    Шаг 3: Создайте задания
                </MUI.Typography>
                <MUI.Typography variant="body1" className="text-gray-700">
                    Нажмите кнопку Создать, чтобы сгенерировать задания для выбранных тем. Задания будут отображены в правой части экрана.
                </MUI.Typography>

                <MUI.Typography variant="h6" className="my-4 font-semibold">
                    Шаг 4: Выберите задания для загрузки в PDF
                </MUI.Typography>
                <MUI.Typography variant="body1" className="text-gray-700">
                    После создания заданий, выберите те задания, которые вы хотите включить в PDF. Вы можете выбрать одно или несколько заданий для каждой темы.
                </MUI.Typography>

                <MUI.Typography variant="h6" className="my-4 font-semibold">
                    Шаг 5: Загрузите PDF
                </MUI.Typography>
                <MUI.Typography variant="body1" className="text-gray-700">
                    После выбора заданий, нажмите кнопку Download PDF, чтобы сгенерировать PDF-файл с выбранными заданиями. PDF будет автоматически сохранен на вашем устройстве.
                </MUI.Typography>
            </MUI.Paper>

            <MUI.Button
                variant="contained"
                color="primary"
                className="mt-8"
                href="/main"
            >
                Вернуться на главную
            </MUI.Button>
        </div>
    );
};

