import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Search, MapPin, Clock, Award, DollarSign, ExternalLink, GraduationCap } from 'lucide-react';
import TestCenterSearch from './TestCenterSearch';

interface ExamInfo {
  id: string;
  name: string;
  description: string;
  duration: string;
  fee: string;
  sections: string[];
  tips: string[];
}

const examInfo: ExamInfo[] = [
  {
    id: 'ielts-academic',
    name: 'IELTS Academic',
    description: 'The International English Language Testing System (IELTS) measures English language proficiency for higher education and global migration.',
    duration: '2 hours 45 minutes',
    fee: '$245',
    sections: ['Listening', 'Reading', 'Writing', 'Speaking'],
    tips: [
      'Practice with official test materials',
      'Take timed practice tests',
      'Focus on academic vocabulary',
      'Improve note-taking skills'
    ]
  },
  {
    id: 'toefl-ibt',
    name: 'TOEFL iBT',
    description: 'The Test of English as a Foreign Language (TOEFL) evaluates the ability to use and understand English at the university level.',
    duration: '3 hours',
    fee: '$205',
    sections: ['Reading', 'Listening', 'Speaking', 'Writing'],
    tips: [
      'Practice with academic lectures',
      'Read academic articles daily',
      'Record speaking responses',
      'Take detailed notes'
    ]
  }
];

const CoursesMenu = () => {
  const [showTestCenters, setShowTestCenters] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-2">
          <BookOpen className="h-6 w-6 text-indigo-600" />
          <h1 className="text-2xl font-semibold text-gray-900">Language Proficiency Tests</h1>
        </div>
        <button
          onClick={() => setShowTestCenters(!showTestCenters)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <MapPin className="h-4 w-4 mr-2" />
          Find Test Centers
        </button>
      </div>

      {showTestCenters && (
        <div className="mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Find Test Centers Near You</h2>
          <TestCenterSearch />
        </div>
      )}

      <div className="space-y-6">
        {examInfo.map((exam) => (
          <div key={exam.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <Award className="h-8 w-8 text-indigo-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-medium text-gray-900">{exam.name}</h2>
                    <p className="text-sm text-gray-500">{exam.description}</p>
                  </div>
                </div>
                <Link
                  to={`/courses/${exam.id}-preparation`}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  View Details
                </Link>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center mb-4">
                    <Clock className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">Duration: {exam.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">Registration Fee: {exam.fee}</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Test Sections</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {exam.sections.map((section) => (
                      <div key={section} className="flex items-center text-sm text-gray-600">
                        <BookOpen className="h-4 w-4 text-indigo-500 mr-2" />
                        {section}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesMenu;