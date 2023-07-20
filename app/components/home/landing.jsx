export default function Landing() {
  return (
    <main>
      <div className="flex flex-col items-center justify-center min-h-screen bg-blue-500 text-white">
        {/* Background video */}
        <video className="absolute top-0 left-0 w-full h-full object-cover object-center" autoPlay loop muted>
          <source src="/videobg.mp4" type="video/mp4" />
        </video>

        {/* Content */}
        <div className="relative z-10">
          <h1 className="text-5xl font-bold text-center">Welcome to Exam Question Generator</h1>
          <p className="mt-4 text-2xl text-center">Create unique exam questions for your students</p>
        </div>

        {/* Buttons */}
        <div className="flex justify-center mt-8 space-x-4">
          <button className="registration-button z-10 px-6 py-3 text-lg font-medium text-white bg-purple-500 rounded-md shadow-md
             hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400">
            Регистрация
          </button>

          <button className="login-button z-10 px-6 py-3 text-lg font-medium text-white bg-green-500 rounded-md shadow-md
             hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400">
            Вход
          </button>

        </div>
      </div>
    </main>
  );
}
