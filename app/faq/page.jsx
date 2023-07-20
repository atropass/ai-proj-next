"use client"
export default function FaqPage() {
    const faqList = [
        {
            question: "Как создать новую задачу?",
            answer: "Чтобы создать новую задачу, нажмите на кнопку 'Создать новую задачу' на главной странице и следуйте инструкциям.",
        },
        {
            question: "Можно ли редактировать уже созданные задачи?",
            answer: "Да, можно редактировать уже созданные задачи. Для этого перейдите на страницу задачи и нажмите на кнопку 'Редактировать'.",
        },
        {
            question: "Как удалить задачу?",
            answer: "Чтобы удалить задачу, перейдите на страницу этой задачи и нажмите на кнопку 'Удалить'. Подтвердите своё действие в появившемся окне.",
        },
        {
            question: "Как добавить задачу в избранное?",
            answer: "Чтобы добавить задачу в избранное, перейдите на страницу задачи и нажмите на звёздочку рядом с названием задачи.",
        },
        // Добавьте больше вопросов сюда
    ];

    return (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <h2 className="text-2xl font-bold mb-6">Часто задаваемые вопросы</h2>
                    {faqList.map((faq, index) => (
                        <details key={index} className="mb-4">
                            <summary className="font-semibold bg-gray-200 rounded-md py-2 px-4">
                                {faq.question}
                            </summary>
                            <span className="px-4 py-2">{faq.answer}</span>
                        </details>
                    ))}
                    <button
                        onClick={() => window.history.back()}
                        className="mt-5 py-2 px-4 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white transition-all duration-200 ease-in-out"
                    >
                        Назад
                    </button>
                </div>
            </div>
        </div>
    );
}
