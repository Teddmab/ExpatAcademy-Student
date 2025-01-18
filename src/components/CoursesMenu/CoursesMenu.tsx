import React, { useState } from 'react';
import { BookOpen, Search, MapPin, Clock, Award, DollarSign, ExternalLink, GraduationCap } from 'lucide-react';
import TestCenterSearch from './TestCenterSearch';

interface ExamInfo {
  name: string;
  duration: string;
  sections: string[];
  fee: string;
  icon: React.ReactNode;
  description: string;
}

const examInfo: ExamInfo[] = [
  {
    name: 'IELTS Academic',
    duration: '2 hours 45 minutes',
    sections: ['Listening', 'Reading', 'Writing', 'Speaking'],
    fee: '$245',
    icon: <Award className="h-6 w-6" />,
    description: 'The International English Language Testing System (IELTS) measures English language proficiency for higher education and global migration.'
  },
  {
    name: 'TOEFL iBT',
    duration: '3 hours',
    sections: ['Reading', 'Listening', 'Speaking', 'Writing'],
    fee: '$205',
    icon: <GraduationCap className="h-6 w-6" />,
    description: 'The Test of English as a Foreign Language (TOEFL) evaluates the ability to use and understand English at the university level.'
  }
];

const CoursesMenu = () => {
  const [selectedExam, setSelectedExam] = useState<string | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 flex items-center">
          <BookOpen className="h-6 w-6 text-indigo-600 mr-2" />
          Language Proficiency Tests
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Exam Information Cards */}
        <div className="space-y-6">
          {examInfo.map((exam) => (
            <div
              key={exam.name}
              className={`bg-white rounded-lg shadow-md overflow-hidden transition-all ${
                selectedExam === exam.name ? 'ring-2 ring-indigo-500' : ''
              }`}
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 text-indigo-600">
                      {exam.icon}
                    </div>
                    <div className="ml-4">
                      <h2 className="text-xl font-semibold text-gray-900">{exam.name}</h2>
                      <p className="mt-1 text-sm text-gray-500">{exam.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedExam(exam.name)}
                    className="ml-4 inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
                  >
                    View Details
                  </button>
                </div>

                {selectedExam === exam.name && (
                  <div className="mt-6 border-t border-gray-200 pt-4">
                    <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <dt className="flex items-center text-sm font-medium text-gray-500">
                          <Clock className="h-4 w-4 mr-2" />
                          Duration
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">{exam.duration}</dd>
                      </div>
                      <div>
                        <dt className="flex items-center text-sm font-medium text-gray-500">
                          <DollarSign className="h-4 w-4 mr-2" />
                          Registration Fee
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">{exam.fee}</dd>
                      </div>
                    </dl>

                    <div className="mt-4">
                      <h3 className="text-sm font-medium text-gray-500">Test Sections</h3>
                      <ul className="mt-2 grid grid-cols-2 gap-2">
                        {exam.sections.map((section) => (
                          <li
                            key={section}
                            className="flex items-center text-sm text-gray-600"
                          >
                            <BookOpen className="h-4 w-4 text-indigo-500 mr-2" />
                            {section}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-6">
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Preparation Tips</h3>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• Practice with official test materials</li>
                        <li>• Take timed practice tests</li>
                        <li>• Focus on academic vocabulary</li>
                        <li>• Improve note-taking skills</li>
                      </ul>
                    </div>

                    <div className="mt-6">
                      <a
                        href={`/courses/${exam.name.toLowerCase()}-preparation`}
                        className="inline-flex items-center text-indigo-600 hover:text-indigo-500"
                      >
                        View detailed preparation resources
                        <ExternalLink className="h-4 w-4 ml-1" />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Test Center Search */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center mb-6">
              <MapPin className="h-5 w-5 text-indigo-600 mr-2" />
              Find Test Centers
            </h2>
            <TestCenterSearch />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesMenu;