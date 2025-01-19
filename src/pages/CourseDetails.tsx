import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, Clock, Star, Users, DollarSign, BookOpen, CheckCircle, PlayCircle } from 'lucide-react';
import { useBasket } from '../context/BasketContext';

const mockCourseDetails = {
  id: '1',
  type: 'course',
  name: 'Study Abroad Preparation Masterclass',
  description: 'Comprehensive guide to preparing for international education, covering visa applications, accommodation, and cultural adaptation.',
  fullDescription: `This comprehensive course is designed to prepare students for successful study abroad experiences. From visa applications to cultural adaptation, we cover everything you need to know to make your international education journey smooth and successful.

The course combines practical knowledge with real-world experiences from successful international students and education experts.`,
  price: 199,
  duration: '6 weeks',
  instructor: 'Dr. Sarah Johnson',
  instructorTitle: 'International Education Consultant',
  instructorBio: '15+ years of experience in international education consulting and student mentoring.',
  rating: 4.8,
  enrolled: 1250,
  image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800',
  category: ['Skill-building', 'Preparation'],
  curriculum: [
    {
      title: 'Module 1: Getting Started',
      lessons: [
        'Understanding the Study Abroad Process',
        'Choosing the Right Country and University',
        'Financial Planning and Scholarships'
      ]
    },
    {
      title: 'Module 2: Documentation',
      lessons: [
        'Visa Application Process',
        'Required Documents Checklist',
        'Statement of Purpose Writing'
      ]
    },
    {
      title: 'Module 3: Preparation',
      lessons: [
        'Accommodation Search Strategies',
        'Banking and Insurance',
        'Cultural Adaptation Tips'
      ]
    }
  ],
  features: [
    'Lifetime access to course materials',
    'Interactive assignments and quizzes',
    'Personal feedback on assignments',
    'Certificate of completion',
    'Access to student community',
    'Monthly live Q&A sessions'
  ]
};

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToBasket } = useBasket();
  const course = mockCourseDetails; // In real app, fetch based on id

  const handleEnrollment = () => {
    // Add to basket
    addToBasket({
      id: course.id,
      name: course.name,
      description: course.description,
      price: course.price
    });

    // Navigate to payment
    navigate('/payment', {
      state: {
        paymentDetails: {
          type: 'course',
          amount: course.price,
          currency: 'USD',
          description: `Enrollment for ${course.name}`,
        }
      }
    });
  };

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <Link
          to="/courses"
          className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-500 mb-8"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Courses
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Course Header */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <div className="relative h-64">
                <img
                  src={course.image}
                  alt={course.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">{course.name}</h1>
                <p className="text-gray-600 mb-6">{course.fullDescription}</p>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    {course.duration}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    {course.rating} ({course.enrolled})
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="h-4 w-4 mr-1" />
                    {course.enrolled} students
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <BookOpen className="h-4 w-4 mr-1" />
                    {course.curriculum.reduce((acc, module) => acc + module.lessons.length, 0)} lessons
                  </div>
                </div>
              </div>
            </div>

            {/* Curriculum */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Course Curriculum</h2>
              <div className="space-y-4">
                {course.curriculum.map((module, index) => (
                  <div key={index} className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-4 py-3 border-b">
                      <h3 className="text-sm font-medium text-gray-900">{module.title}</h3>
                    </div>
                    <ul className="divide-y divide-gray-200">
                      {module.lessons.map((lesson, lessonIndex) => (
                        <li key={lessonIndex} className="px-4 py-3 flex items-center text-sm text-gray-600">
                          <PlayCircle className="h-4 w-4 text-indigo-500 mr-2" />
                          {lesson}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">What You'll Get</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {course.features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-sm text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price Card */}
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <DollarSign className="h-6 w-6 text-gray-400" />
                  <span className="text-3xl font-bold text-gray-900">${course.price}</span>
                </div>
              </div>

              <button
                onClick={handleEnrollment}
                className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md font-medium hover:bg-indigo-700 mb-4"
              >
                Enroll Now
              </button>

              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Full lifetime access
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Access on mobile and desktop
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Certificate of completion
                </li>
              </ul>
            </div>

            {/* Instructor */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Instructor</h2>
              <div className="flex items-start">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100"
                  alt={course.instructor}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-900">{course.instructor}</h3>
                  <p className="text-sm text-gray-500">{course.instructorTitle}</p>
                  <p className="text-sm text-gray-600 mt-2">{course.instructorBio}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;