"use client"
import React, { useState } from 'react';
import styled from 'styled-components';
import { ProgressBar, Step } from 'react-step-progress-bar';
import 'react-step-progress-bar/styles.css';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 0 10%;
`;

const StyledButton = styled(Button)`
  font-size: 1.2rem;
  margin: 10px;
  background: #3f51b5;
  color: white;
  &:hover {
    background: #002984;
  }
`;

const StepTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 10px;
`;

const StepContent = styled.p`
  font-size: 1.2rem;
  margin-bottom: 20px;
  transition: opacity 0.3s;
`;

const StepMarker = styled.div`
  background-color: ${(props) => (props.accomplished ? '#3f51b5' : '#757de8')};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin: 20px;
`;

const Instructions = () => {
    const steps = [
        {
            title: 'Начало работы',
            content: 'Откройте приложение "Генератор задач". Вы увидите интерфейс приложения, разделенный на три колонки.',
        },
        {
            title: 'Выбор предмета',
            content: 'В левой колонке выберите предмет, для которого хотите сгенерировать задачи. Для этого нажмите на кнопку "Выбрать предмет" и из списка доступных предметов выберите нужный. После выбора предмета появится вторая колонка с доступными классами для выбранного предмета.',
        },
        {
            title: 'Выбор класса',
            content: 'Во второй колонке выберите класс, для которого хотите сгенерировать задачи. Нажмите на кнопку "Выбрать класс" и из списка доступных классов выберите нужный. После выбора класса появится третья колонка, в которой предлагается выбрать квартал (тему) для генерации задач.',
        },
        {
            title: 'Выбор квартала (темы)',
            content: 'В третьей колонке выберите квартал (тему), для которого хотите сгенерировать задачи. Нажмите на кнопку "Выбрать тему" и из списка доступных кварталов выберите нужный. После выбора квартала появится область сгенерированных задач, а также кнопки для управления задачами.',
        },
        {
            title: 'Генерация задач',
            content: 'Когда вы выбрали предмет, класс и тему, нажмите на кнопку "Создать". Приложение отправит запрос на сервер для генерации задач по выбранной теме. Пока идет процесс генерации, кнопка будет отображать "Создание...". Пожалуйста, подождите завершения процесса.',
        },
        {
            title: 'Отображение сгенерированных задач',
            content: 'После успешной генерации задач, вы увидите список сгенерированных задач по выбранной теме. Каждая задача будет отображаться с номером и описанием. Если у задачи используется формат LaTeX (математические формулы), они будут отображены в правильном формате.',
        },
        {
            title: 'Выбор задач для скачивания',
            content: 'Чтобы выбрать задачи для скачивания, просто кликните на задачу. Выбранные задачи будут выделены. Вы можете выбрать несколько задач для скачивания в разных темах, просто кликните на нужные задачи для каждой темы.',
        },
        {
            title: 'Добавление задач',
            content: 'Если вы хотите добавить новые задачи по той же теме, нажмите на кнопку "Добавить". Приложение отправит запрос на сервер для дополнительной генерации задач. После успешного добавления задач, они появятся в списке задач по выбранной теме.',
        },
        {
            title: 'Сброс выбранных тем и задач',
            content: 'Если вы хотите начать заново или выбрать другую тему, нажмите на кнопку "Главное меню". Это сбросит выбранный предмет, класс, квартал и сгенерированные задачи.',
        },
        {
            title: 'Кастомизация теста',
            content: 'В верхней части средней колонки есть поле "Тип проверки знаний". Введите здесь информацию о типе проверки знаний, например, "Суммативное оценивание". После этого появятся дополнительные поля для заполнения: "Тема": Введите тему для создаваемых задач. "Цель обучения": Введите цель обучения для создаваемых задач. "Критерий оценивания": Введите критерий оценивания для создаваемых задач. "Уровень мыслительных навыков": Введите уровень мыслительных навыков для создаваемых задач. "Время выполнения": Введите время выполнения теста.',
        },
        {
            title: 'Скачивание PDF',
            content: 'Когда вы выбрали нужные задачи и заполнили все необходимые поля, вы можете скачать задачи в виде PDF-файла. Нажмите на кнопку "Download PDF" для скачивания задач в PDF-формате. PDF будет содержать информацию о кастомизации теста, выбранных задачах и их описании.',
        },
        {
            title: 'Дескрипторы',
            content: 'После скачивания PDF вы можете увидеть дескрипторы к задачам. Дескрипторы - это краткие описания задач на основе сгенерированных данных. Они помогают лучше понять содержание задачи. Дескрипторы будут отображены после скачивания PDF под списком задач.',
        },
        {
            title: 'Замечание',
            content: 'Если вы хотите скачать PDF или добавить задачи, убедитесь, что вы выбрали предмет, класс и квартал. Приложение автоматически подгружает дополнительные темы при добавлении задач. Если у вас возникли проблемы или ошибки при работе с приложением, обратитесь к администратору или технической поддержке.',
        },
    ];

    const [activeStep, setActiveStep] = useState(0);

    const handleNextStep = () => {
        setActiveStep((prevStep) => Math.min(prevStep + 1, steps.length));
    };

    const handlePrevStep = () => {
        setActiveStep((prevStep) => Math.max(prevStep - 1, 0));
    };

    const handleResetSteps = () => {
        setActiveStep(0);
    };

    return (
        <Container>
            <ProgressBar
                percent={(activeStep / (steps.length - 1)) * 100}
                filledBackground="transparent"
            >
                {steps.map((step, index) => (
                    <Step key={step.title} transition="scale">
                        {({ accomplished }) => (
                            <StepMarker accomplished={accomplished} />
                        )}
                    </Step>
                ))}
            </ProgressBar>
            <div>
                {steps.map((step, index) => (
                    <Collapse key={step.title} in={activeStep === index}>
                        <div>
                            <StepTitle>{step.title}</StepTitle>
                            <StepContent>{step.content}</StepContent>
                            <StyledButton disabled={activeStep === 0} onClick={handlePrevStep}>
                                Назад
                            </StyledButton>
                            <StyledButton variant="contained" color="primary" onClick={handleNextStep}>
                                {activeStep === steps.length - 1 ? 'Завершить' : 'Далее'}
                            </StyledButton>
                        </div>
                    </Collapse>
                ))}
                {activeStep === steps.length && (
                    <div>
                        <StepTitle>Инструкция завершена</StepTitle>
                        <StyledButton variant="contained" color="primary" onClick={handleResetSteps}>
                            Начать заново
                        </StyledButton>
                    </div>
                )}
            </div>
        </Container>
    );
};

export default Instructions;

