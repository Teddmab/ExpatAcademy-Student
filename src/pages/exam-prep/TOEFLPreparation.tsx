import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, GraduationCap, ChevronLeft, ExternalLink, Download, PlayCircle, CheckCircle } from 'lucide-react';

const TOEFLPreparation = () => {
  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/courses"
            className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-500 mb-4"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Courses
          </Link>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <GraduationCap className="h-8 w-8 text-indigo-600 mr-3" />
              TOEFL iBT Preparation Guide
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Exam Overview */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Exam Overview</h2>
              <div className="prose max-w-none">
                <p className="text-gray-600">
                  The Test of English as a Foreign Language (TOEFL) iBT measures your ability to use and understand English at the university level and evaluates how well you combine your listening, reading, speaking, and writing skills.
                </p>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-indigo-600 mr-2" />
                    <span className="text-sm text-gray-600">Duration: 3 hours</span>
                  </div>
                  <div className="flex items-center">
                    <GraduationCap className="h-5 w-5 text-indigo-600 mr-2" />
                    <span className="text-sm text-gray-600">Score Range: 0-120 points</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Test Sections */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Test Sections</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Reading (54-72 minutes)</h3>
                  <p className="text-gray-600 mb-2">
                    Read 3-4 passages from academic texts and answer questions.
                  </p>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    <li>Academic reading passages</li>
                    <li>10 questions per passage</li>
                    <li>Tests comprehension, inference, and vocabulary</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Listening (41-57 minutes)</h3>
                  <p className="text-gray-600 mb-2">
                    Listen to lectures, classroom discussions, and conversations.
                  </p>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    <li>4-6 lectures, 6 questions each</li>
                    <li>2-3 conversations, 5 questions each</li>
                    <li>Note-taking is allowed</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Speaking (17 minutes)</h3>
                  <p className="text-gray-600 mb-2">
                    Express your opinion on familiar topics and academic course content.
                  </p>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    <li>4 tasks: 1 independent and 3 integrated</li>
                    <li>Responses are recorded</li>
                    <li>Tests pronunciation, fluency, and coherence</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Writing (50 minutes)</h3>
                  <p className="text-gray-600 mb-2">
                    Write essay responses based on reading and listening tasks.
                  </p>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    <li>Integrated task: Write based on reading and listening passages</li>
                    <li>Independent task: Express and support an opinion</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Study Tips */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Study Tips & Strategies</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Speaking & Listening</h3>
                  <ul className="space-y-2">
                    {[
                      'Practice with academic lectures',
                      'Record yourself speaking',
                      'Listen to various English accents',
                      'Take detailed notes',
                    ].map((tip, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-600">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Reading & Writing</h3>
                  <ul className="space-y-2">
                    {[
                      'Read academic articles daily',
                      'Practice timed writing',
                      'Learn to outline quickly',
                      'Build academic vocabulary',
                    ].map((tip, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-600">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Practice Resources */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Practice Resources</h2>
              <ul className="space-y-4">
                <li>
                  <a
                    href="https://www.ets.org/toefl/test-takers/ibt/prepare/tests.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-indigo-600 hover:text-indigo-500"
                  >
                    <PlayCircle className="h-5 w-5 mr-2" />
                    <span className="text-sm">Official Practice Tests</span>
                    <ExternalLink className="h-4 w-4 ml-1" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.ets.org/toefl/test-takers/ibt/prepare/materials.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-indigo-600 hover:text-indigo-500"
                  >
                    <Download className="h-5 w-5 mr-2" />
                    <span className="text-sm">Study Materials</span>
                    <ExternalLink className="h-4 w-4 ml-1" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.ets.org/toefl/test-takers/ibt/prepare/free-practice-test.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-indigo-600 hover:text-indigo-500"
                  >
                    <BookOpen className="h-5 w-5 mr-2" />
                    <span className="text-sm">Free Practice Test</span>
                    <ExternalLink className="h-4 w-4 ml-1" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Score Guide */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Score Guide</h2>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-600">Reading</span>
                    <span className="text-sm text-gray-500">0-30 points</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-600">Listening</span>
                    <span className="text-sm text-gray-500">0-30 points</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-600">Speaking</span>
                    <span className="text-sm text-gray-500">0-30 points</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-600">Writing</span>
                    <span className="text-sm text-gray-500">0-30 points</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TOEFLPreparation;