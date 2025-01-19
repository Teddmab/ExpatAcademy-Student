import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, BookOpen, GraduationCap, DollarSign, Clock, Star, Award, Sliders } from 'lucide-react';

interface Course {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  instructor: string;
  rating: number;
  enrolled: number;
  image: string;
  category: string[];
  level: string;
  topics: string[];
}

const mockCourses: Course[] = [
  {
    id: '1',
    name: 'Study Abroad Preparation Masterclass',
    description: 'Comprehensive guide to preparing for international education, covering visa applications, accommodation, and cultural adaptation.',
    price: 199,
    duration: '6 weeks',
    instructor: 'Dr. Sarah Johnson',
    rating: 4.8,
    enrolled: 1250,
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800',
    category: ['Preparation'],
    level: 'Beginner',
    topics: ['Visa Application', 'Accommodation', 'Cultural Adaptation']
  },
  {
    id: '2',
    name: 'Academic Writing for International Students',
    description: 'Master academic writing skills required for university success in English-speaking countries.',
    price: 129,
    duration: '8 weeks',
    instructor: 'Dr. Emma Wilson',
    rating: 4.7,
    enrolled: 1800,
    image: 'https://images.unsplash.com/photo-1455849318743-b2233052fcff?auto=format&fit=crop&q=80&w=800',
    category: ['Academic Skills'],
    level: 'Intermediate',
    topics: ['Essay Writing', 'Research Papers', 'Academic Style']
  },
  {
    id: '3',
    name: 'University Interview Preparation',
    description: 'Learn how to ace your university admission interviews with confidence.',
    price: 149,
    duration: '4 weeks',
    instructor: 'Prof. Michael Brown',
    rating: 4.9,
    enrolled: 950,
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800',
    category: ['Preparation'],
    level: 'All Levels',
    topics: ['Interview Skills', 'Personal Statement', 'Q&A Practice']
  }
];

const categories = ['All', 'Preparation', 'Academic Skills', 'Cultural Integration', 'Language Skills'];
const levels = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];
const priceRanges = [
  { label: 'All Prices', value: 'all' },
  { label: 'Under $100', value: '0-100' },
  { label: '$100 - $200', value: '100-200' },
  { label: 'Over $200', value: '200+' }
];
const durations = [
  { label: 'Any Duration', value: 'all' },
  { label: '1-4 weeks', value: 'short' },
  { label: '5-8 weeks', value: 'medium' },
  { label: '8+ weeks', value: 'long' }
];

const CoursesAndTests = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: 'All',
    level: 'All Levels',
    priceRange: 'all',
    duration: 'all'
  });

  const filterCourses = () => {
    return mockCourses.filter(course => {
      const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = filters.category === 'All' || course.category.includes(filters.category);
      const matchesLevel = filters.level === 'All Levels' || course.level === filters.level;
      
      const matchesPriceRange = (() => {
        if (filters.priceRange === 'all') return true;
        const [min, max] = filters.priceRange.split('-').map(Number);
        if (filters.priceRange === '200+') return course.price >= 200;
        return course.price >= min && course.price <= (max || Infinity);
      })();

      const matchesDuration = (() => {
        const weeks = parseInt(course.duration);
        if (filters.duration === 'all') return true;
        if (filters.duration === 'short') return weeks <= 4;
        if (filters.duration === 'medium') return weeks > 4 && weeks <= 8;
        if (filters.duration === 'long') return weeks > 8;
        return true;
      })();

      return matchesSearch && matchesCategory && matchesLevel && matchesPriceRange && matchesDuration;
    });
  };

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-900">Study Abroad Preparation Courses</h1>
          </div>
          <Link
            to="/courses/menu"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Award className="h-4 w-4 mr-2" />
            Language Tests
          </Link>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-8">
          <div className="flex flex-col space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            {/* Filter Toggle */}
            <div className="flex justify-between items-center">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
              >
                <Sliders className="h-4 w-4 mr-2" />
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </button>
              {showFilters && (
                <button
                  onClick={() => {
                    setFilters({
                      category: 'All',
                      level: 'All Levels',
                      priceRange: 'all',
                      duration: 'all'
                    });
                    setSearchTerm('');
                  }}
                  className="text-sm text-indigo-600 hover:text-indigo-500"
                >
                  Reset Filters
                </button>
              )}
            </div>

            {/* Filter Options */}
            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={filters.category}
                    onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                {/* Level Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
                  <select
                    value={filters.level}
                    onChange={(e) => setFilters({ ...filters, level: e.target.value })}
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    {levels.map((level) => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>

                {/* Price Range Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
                  <select
                    value={filters.priceRange}
                    onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    {priceRanges.map((range) => (
                      <option key={range.value} value={range.value}>{range.label}</option>
                    ))}
                  </select>
                </div>

                {/* Duration Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                  <select
                    value={filters.duration}
                    onChange={(e) => setFilters({ ...filters, duration: e.target.value })}
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    {durations.map((duration) => (
                      <option key={duration.value} value={duration.value}>{duration.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filterCourses().map((course) => (
            <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <img
                  src={course.image}
                  alt={course.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                    {course.level}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{course.name}</h3>
                </div>
                
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{course.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    {course.duration}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    {course.rating} ({course.enrolled})
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {course.topics.map((topic, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                    >
                      {topic}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <DollarSign className="h-5 w-5 text-gray-400" />
                    <span className="text-lg font-bold text-gray-900">${course.price}</span>
                  </div>
                  <Link
                    to={`/courses/${course.id}`}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Enroll Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoursesAndTests;