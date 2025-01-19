import React, { useState } from 'react';
import { BookOpen, GraduationCap, BrainCircuit, DollarSign, Award, ChevronRight, ChevronLeft, CheckCircle } from 'lucide-react';
import api from '../../services/api';
import type { University } from '../../types';

interface SurveyStep {
  id: string;
  title: string;
  question: string;
  icon: React.ReactNode;
  options: {
    value: string;
    label: string;
    description?: string;
  }[];
}

const UniversitySurvey: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [recommendations, setRecommendations] = useState<University[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const steps: SurveyStep[] = [
    {
      id: 'field',
      title: 'Field of Study',
      question: 'What do you want to study?',
      icon: <BookOpen className="h-6 w-6 text-indigo-600" />,
      options: [
        { value: 'engineering', label: 'Engineering' },
        { value: 'medicine', label: 'Medicine' },
        { value: 'business', label: 'Business' },
        { value: 'arts', label: 'Arts & Humanities' },
        { value: 'science', label: 'Natural Sciences' },
        { value: 'social_science', label: 'Social Sciences' }
      ]
    },
    {
      id: 'career',
      title: 'Career Goals',
      question: 'Where do you see yourself in the future?',
      icon: <BrainCircuit className="h-6 w-6 text-indigo-600" />,
      options: [
        { value: 'academia', label: 'Academia' },
        { value: 'corporate', label: 'Corporate World' },
        { value: 'entrepreneurship', label: 'Entrepreneurship' },
        { value: 'research', label: 'Research & Development' }
      ]
    },
    {
      id: 'education',
      title: 'Current Education',
      question: 'What is your current education level?',
      icon: <GraduationCap className="h-6 w-6 text-indigo-600" />,
      options: [
        { value: 'high_school', label: 'High School Graduate' },
        { value: 'bachelors', label: 'Bachelor\'s Degree' },
        { value: 'masters', label: 'Master\'s Degree' },
        { value: 'phd', label: 'PhD' }
      ]
    },
    {
      id: 'budget',
      title: 'Budget Range',
      question: 'What is your budget for tuition fees?',
      icon: <DollarSign className="h-6 w-6 text-indigo-600" />,
      options: [
        { value: '0-5000', label: '$0 - $5,000' },
        { value: '5001-10000', label: '$5,001 - $10,000' },
        { value: '10001-20000', label: '$10,001 - $20,000' },
        { value: '20001-30000', label: '$20,001 - $30,000' },
        { value: '30001-50000', label: '$30,001 - $50,000' },
        { value: '50001', label: '$50,001+' }
      ]
    },
    {
      id: 'grades',
      title: 'Academic Performance',
      question: 'What are your grades?',
      icon: <Award className="h-6 w-6 text-indigo-600" />,
      options: [
        { value: 'A', label: 'A (Excellent)', description: '90-100% or 4.0 GPA' },
        { value: 'B', label: 'B (Good)', description: '80-89% or 3.0-3.9 GPA' },
        { value: 'C', label: 'C (Average)', description: '70-79% or 2.0-2.9 GPA' },
        { value: 'D', label: 'D (Below Average)', description: '60-69% or 1.0-1.9 GPA' }
      ]
    }
  ];

  const handleOptionSelect = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [steps[currentStep].id]: value
    }));
  };

  const handleNext = async () => {
    if (currentStep === steps.length - 1) {
      // Get recommendations
      setIsLoading(true);
      try {
        const response = await api.post('/api/universities/recommend', { answers });
        setRecommendations(response.data);
      } catch (error) {
        console.error('Error getting recommendations:', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSaveRecommendations = async () => {
    try {
      await api.post('/api/universities/save-recommendations', { universities: recommendations });
      // Show success message or redirect
    } catch (error) {
      console.error('Error saving recommendations:', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="bg-indigo-100 rounded-full">
          <div
            className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-sm text-indigo-600">PROGRESS</span>
          <span className="text-sm text-indigo-600">Step {currentStep + 1} of {steps.length}</span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8">
        {!recommendations.length ? (
          <>
            {/* Question */}
            <div className="flex items-center space-x-3 mb-8">
              {steps[currentStep].icon}
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{steps[currentStep].title}</h2>
                <p className="text-gray-600">{steps[currentStep].question}</p>
              </div>
            </div>

            {/* Options */}
            <div className="space-y-4 mb-8">
              {steps[currentStep].options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleOptionSelect(option.value)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${
                    answers[steps[currentStep].id] === option.value
                      ? 'border-indigo-600 bg-indigo-50'
                      : 'border-gray-200 hover:border-indigo-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">{option.label}</h3>
                      {option.description && (
                        <p className="text-sm text-gray-500 mt-1">{option.description}</p>
                      )}
                    </div>
                    {answers[steps[currentStep].id] === option.value && (
                      <CheckCircle className="h-5 w-5 text-indigo-600" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex justify-between">
              <button
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </button>
              <button
                onClick={handleNext}
                disabled={!answers[steps[currentStep].id]}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {currentStep === steps.length - 1 ? 'Get Recommendations' : 'Next'}
                <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Recommendations */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Recommended Universities</h2>
              <div className="space-y-6">
                {recommendations.map((university) => (
                  <div key={university.id} className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <img
                          src={university.logo}
                          alt={university.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{university.name}</h3>
                          <p className="text-sm text-gray-500">{university.city}, {university.country}</p>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        #{university.ranking} in World Rankings
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={handleSaveRecommendations}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save Recommendations
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UniversitySurvey;