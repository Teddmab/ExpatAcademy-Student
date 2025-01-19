import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, Award, ChevronLeft, ExternalLink, Download, PlayCircle, CheckCircle } from 'lucide-react';

const IELTSPreparation = () => {
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
              <Award className="h-8 w-8 text-indigo-600 mr-3" />
              IELTS Preparation Guide
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
                  The International English Language Testing System (IELTS) Academic is designed to assess the language ability of candidates who need to study or work where English is used as the language of communication.
                </p>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-indigo-600 mr-2" />
                    <span className="text-sm text-gray-600">Duration: 2 hours 45 minutes</span>
                  </div>
                  <div className="flex items-center">
                    <Award className="h-5 w-5 text-indigo-600 mr-2" />
                    <span className="text-sm text-gray-600">Score Range: 0-9 bands</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Test Sections */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Test Sections</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Listening (30 minutes)</h3>
                  <p className="text-gray-600 mb-2">
                    Four recorded monologues and conversations with 40 questions to test your listening comprehension.
                  </p>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    <li>Section 1: Social context dialogue</li>
                    <li>Section 2: Social context monologue</li>
                    <li>Section 3: Educational context dialogue</li>
                    <li>Section 4: Academic context monologue</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Reading (60 minutes)</h3>
                  <p className="text-gray-600 mb-2">
                    Three long texts with 40 questions to assess your reading comprehension abilities.
                  </p>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    <li>Academic texts from books, journals, and newspapers</li>
                    <li>Various question types including multiple choice, matching, and completion</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Writing (60 minutes)</h3>
                  <p className="text-gray-600 mb-2">
                    Two writing tasks to demonstrate your written English abilities.
                  </p>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    <li>Task 1: Describe visual information (graph, table, chart, or diagram)</li>
                    <li>Task 2: Write an essay in response to an argument or problem</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Speaking (11-14 minutes)</h3>
                  <p className="text-gray-600 mb-2">
                    Face-to-face interview to assess your spoken English abilities.
                  </p>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    <li>Part 1: Introduction and general questions</li>
                    <li>Part 2: Individual long turn on a given topic</li>
                    <li>Part 3: Two-way discussion on abstract topics</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Study Tips */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Study Tips & Strategies</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Listening</h3>
                  <ul className="space-y-2">
                    {[
                      'Practice with different accents',
                      'Take detailed notes during the recording',
                      'Read questions before listening',
                      'Focus on predicting possible answers',
                    ].map((tip, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-600">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Reading</h3>
                  <ul className="space-y-2">
                    {[
                      'Practice skimming and scanning',
                      'Improve reading speed',
                      'Learn to identify key information',
                      'Practice time management',
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
                    href="https://www.ielts.org/for-test-takers/sample-test-questions"
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
                    href="https://www.britishcouncil.org/exam/ielts/prepare"
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
                    href="https://takeielts.britishcouncil.org/take-ielts/prepare/free-ielts-practice-tests"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-indigo-600 hover:text-indigo-500"
                  >
                    <BookOpen className="h-5 w-5 mr-2" />
                    <span className="text-sm">Free Practice Tests</span>
                    <ExternalLink className="h-4 w-4 ml-1" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Score Guide */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Band Score Guide</h2>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-600">Band 9</span>
                    <span className="text-sm text-gray-500">Expert</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-600">Band 7-8</span>
                    <span className="text-sm text-gray-500">Very Good</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-600">Band 6-6.5</span>
                    <span className="text-sm text-gray-500">Competent</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '60%' }}></div>
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

export default IELTSPreparation;