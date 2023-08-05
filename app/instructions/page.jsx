"use client"
import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import 'react-step-progress-bar/styles.css';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50vh;
  padding: 0 10%;
  background-color: #F3F4F6;
  margin-top: -3.5rem;

  @media (max-width: 768px) {
    height: auto;
    padding: 2rem 1rem;
  }
`;

const Title = styled.h1`
  font-size: 2.25rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 1.25rem;
  margin-top: -2rem;
  text-align: center;
  position: relative;
  bottom: 0rem;
  @media (max-width: 768px) {
    font-size: 1.5rem;
    bottom: 1rem;
  }
`;


const StyledButton = styled(Button)`
  font-size: 1.2rem;
  margin: 10px;
  background: linear-gradient(to bottom right, #3f51b5, #2196f3);
  color: white;
  border-radius: 8px;
  padding: 10px 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
  transition: color 0.3s;
  &:hover {
    background: linear-gradient(to bottom right, #002984, #0059b3);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
  &:after {
    content: "";
    background: rgba(255,255,255,0.2);
    display: block;
    position: absolute;
    padding-top: 300%;
    padding-left: 350%;
    margin-left: -20px!important;
    margin-top: -120%;
    opacity: 0;
    transition: all 0.8s
  }
  &:active:after {
    padding: 0;
    margin: 0;
    opacity: 1;
    transition: 0s
  }
`;

const StepTitle = styled.h2`
  font-size: 1.4rem;
  margin-bottom: 10px;
  text-align: center;
`;

const StepContent = styled.p`
  font-size: 1.2rem;
  margin-bottom: 20px;
  transition: opacity 0.3s;
  text-align: center;
`;
const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
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
        <>
            <Title>Инструкция</Title>
            <Container>
                {steps.map((step, index) => (
                    <Collapse key={step.title} in={activeStep === index}>
                        <div>
                            <StepTitle>{step.title}</StepTitle>
                            <StepContent>{step.content}</StepContent>
                            <ButtonsContainer>
                                <StyledButton disabled={activeStep === 0} onClick={handlePrevStep}>
                                    Назад
                                </StyledButton>
                                <StyledButton variant="contained" color="primary" onClick={handleNextStep}>
                                    {activeStep === steps.length - 1 ? 'Завершить' : 'Далее'}
                                </StyledButton>
                            </ButtonsContainer>
                        </div>
                    </Collapse>
                ))}
                {activeStep === steps.length && (
                    <div>
                        <StepTitle>Инструкция завершена</StepTitle>
                        <ButtonsContainer>
                            <StyledButton variant="contained" color="primary" onClick={handleResetSteps}>
                                Начать заново
                            </StyledButton>
                        </ButtonsContainer>
                    </div>
                )}
            </Container>
        </>
    );
};

export default Instructions;