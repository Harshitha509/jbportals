import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-purple-500 flex flex-col justify-center items-center py-12">
      

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-8">
          Welcome to Tasky
        </h1>

        <p className="text-xl text-gray-600 text-center mb-12">
          Stay organized and boost your productivity with our simple task management app.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Get Started</h2>
            <p className="text-gray-600 mb-4">
              Create, manage, and complete your tasks with ease.
            </p>
            <Link
              href="/tasks"
              className="inline-block bg-indigo-600 text-white font-semibold py-2 px-4 rounded hover:bg-indigo-700 transition-colors duration-300"
            >
              Start Now
            </Link>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Features</h2>
            <p className="text-gray-600 mb-10">
              Learn more about the features of Task Manager.
            </p>
            <Link
              href="/features"
              className="inline-block bg-indigo-600 text-white font-semibold py-2 px-4 rounded hover:bg-indigo-700 transition-colors duration-300"
            >
              Explore Features
            </Link>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About</h2>
            <p className="text-gray-600 mb-4">
              Find out more about the team behind Task Manager.
            </p>
            <Link
              href="/about"
              className="inline-block bg-indigo-600 text-white font-semibold py-2 px-4 rounded hover:bg-indigo-700 transition-colors duration-300"
            >
              Learn More
            </Link>
          </div>
        </div>
      </main>

      <footer className="mt-16">
        <p className="text-gray-600 text-center">
          &copy; {new Date().getFullYear()} Task Manager. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
