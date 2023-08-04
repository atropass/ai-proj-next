import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Button, Card, CardContent, Container } from '@mui/material';
import 'tailwindcss/tailwind.css';

const Instructions = () => {
    return (
        <Container maxWidth="md" className="min-h-screen bg-[#E0F7FA] py-10">
            <Typography variant="h4" className="text-gray-800 mb-8 font-bold text-center">
                Инструкция по использованию приложения
            </Typography>

            <Accordion>
                <AccordionSummary>
                    <Typography variant="h6" className="font-semibold">
                        Шаг 1: Выберите предмет и класс
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography variant="body1" className="text-gray-700">
                        Добро пожаловать в приложение для учителей физики и математики! Выберите предмет и класс из списка доступных опций на левой части экрана.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary>
                    <Typography variant="h6" className="font-semibold">
                        Шаг 2: Выберите темы
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography variant="body1" className="text-gray-700">
                        Перейдите к следующему шагу - выбору тем. Здесь у вас есть возможность выбрать темы, для которых вы хотите создать задания.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary>
                    <Typography variant="h6" className="font-semibold">
                        Шаг 3: Создайте задания
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography variant="body1" className="text-gray-700">
                        Теперь пришло время создать сами задания. Для этого нажмите кнопку Создать на правой панели.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary>
                    <Typography variant="h6" className="font-semibold">
                        Шаг 4: Выберите задания для загрузки в PDF
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography variant="body1" className="text-gray-700">
                        Выберите задания для включения в PDF-файл для использования в учебном процессе.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary>
                    <Typography variant="h6" className="font-semibold">
                        Шаг 5: Загрузите PDF
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography variant="body1" className="text-gray-700">
                        Ваш PDF с заданиями готов! Чтобы загрузить его, нажмите кнопку Download PDF на правой панели.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Card variant="outlined" className="mt-8">
                <CardContent>
                    <Button variant="contained" color="primary" href="/main">
                        Вернуться на главную
                    </Button>
                </CardContent>
            </Card>
        </Container>
    );
};

export default Instructions;
