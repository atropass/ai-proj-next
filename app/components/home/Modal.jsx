import React from 'react';
import './Modal.css';

export default function Modal({ show, onClose, type }) {
    return (
        <div className={`modal ${show ? 'modal-open' : ''}`} onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                {type === 'register' && (
                    <>
                        <h2 className="text-2xl font-bold mb-4">Регистрация</h2>
                        <form className="space-y-4">
                            <div>
                                <input
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                                    type="email"
                                    placeholder="Email"
                                    required
                                />
                            </div>
                            <div>
                                <input
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
                                    type="password"
                                    placeholder="Password"
                                    required
                                />
                            </div>
                            <button className="w-full py-2 px-4 bg-purple-500 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75">
                                Регистрация
                            </button>
                        </form>
                    </>
                )}
                {type === 'login' && (
                    <>
                        <h2 className="text-2xl font-bold mb-4">Вход</h2>
                        <form className="space-y-4">
                            <div>
                                <input
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                                    type="text"
                                    placeholder="Username"
                                    required
                                />
                            </div>
                            <div>
                                <input
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
                                    type="password"
                                    placeholder="Password"
                                    required
                                />
                            </div>
                            <button className="w-full py-2 px-4 bg-purple-500 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75">
                                Войти
                            </button>
                        </form>
                    </>
                )}
                <button className="absolute top-0 right-0 p-4" onClick={onClose}>
                    &times;
                </button>
            </div>
        </div>
    );
}
