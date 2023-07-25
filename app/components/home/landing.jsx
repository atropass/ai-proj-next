"use client";
import React, { useState } from 'react';
import './Landing.css';
import Modal from './Modal';

export default function Landing() {
  const [modalShow, setModalShow] = useState(false);
  const [modalType, setModalType] = useState(null);

  const handleShowModal = (type) => {
    setModalType(type);
    setModalShow(true);
  };

  const handleCloseModal = () => {
    setModalShow(false);
    setModalType(null);
  };

  return (
    <div className="main-container">
      {/* Content */}
      <div className="content-container">
        <div className="text-center">
          <img className="mb-4 mx-auto" src="home-hero-icon.png" alt="Best AI Content Writer" width="250" />
          <h1 className="text-5xl font-bold text-white">Генератор Экзаменов</h1>
          <p className="mt-4 text-2xl text-white">Создавайте уникальные экзаменационные вопросы, СОРы, СОЧи для ваших учеников!</p>
          <ul className="mt-8 space-x-4">
            <li className="inline-block">
              <button
                className="px-6 py-3 text-lg font-medium bg-purple-500 rounded-md shadow-md
                hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
                onClick={() => handleShowModal('register')}>
                Регистрация
              </button>
            </li>
            <li className="inline-block">
              <button
                className="px-6 py-3 text-lg font-medium bg-purple-500 rounded-md shadow-md
                hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
                onClick={() => handleShowModal('login')}>
                Уже есть аккаунт?
              </button>
            </li>
          </ul>
        </div>
      </div>
      {/* Shapes */}
      <div className="shapes-container">
        <img src="https://quizbot.ai/templates/classic-theme/images/dotted-shape.svg" alt="shape" className="shape shape-1" />
        <img src="https://quizbot.ai/templates/classic-theme/images/dotted-shape.svg" alt="shape" className="shape shape-2" />
      </div>
      <Modal show={modalShow} onClose={handleCloseModal} type={modalType} />
    </div>
  );
}
