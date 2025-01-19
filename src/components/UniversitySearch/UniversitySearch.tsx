import React, { useState, useEffect } from 'react';
import { Search, Filter, Heart, Globe2, GraduationCap, DollarSign, ChevronLeft, ChevronRight, AlertCircle, BookOpen, Clock } from 'lucide-react';
import api from '../../services/api';
import type { University, UniversityFilters } from '../../types';

interface PaginationData {
  total: number;
  totalPages: number;
  currentPage: number;
  perPage: number;
}

const UniversitySearch: React.FC = () => {
  const [universities, setUniversities] = useState<University[]>([]);
  const [favorites, setFavorites] = useState<University[]>([]);
  const [selectedUniversities, setSelectedUniversities] = useState<University[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(true);
  const [filters, setFilters] = useState<UniversityFilters>({
    search: '',
    tuitionRange: '',
    degreeType: '',
    location: '',
    language: '',
    duration: '',
    page: 1
  });
  const [pagination, setPagination] = useState<PaginationData>({
    total: 0,
    totalPages: 0,
    currentPage: 1,
    perPage: 10
  });

  useEffect(() => {
    fetchUniversities();
    fetchFavorites();
    // Load selected universities from local storage
    const stored = localStorage.getItem('selectedUniversities');
    if (stored) {
      setSelectedUniversities(JSON.parse(stored));
    }
  }, [filters]);

  const fetchUniversities = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/api/universities', { params: filters });
      setUniversities(response.data.universities);
      setPagination(response.data.pagination);
    } catch (err) {
      setError('Failed to load universities');
      console.error('Error fetching universities:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchFavorites = async () => {
    try {
      const response = await api.get('/api/universities/favorites');
      setFavorites(response.data);
    } catch (err) {
      console.error('Error fetching favorites:', err);
    }
  };

  const toggleFavorite = async (universityId: number) => {
    try {
      await api.post('/api/universities/favorites', { universityId });
      fetchFavorites();
    } catch (err) {
      console.error('Error toggling favorite:', err);
    }
  };

  const toggleUniversitySelection = (university: University) => {
    setSelectedUniversities(prev => {
      let updated;
      if (prev.some(u => u.id === university.id)) {
        updated = prev.filter(u => u.id !== university.id);
      } else {
        if (prev.length >= 3) {
          return prev; // Maximum 3 selections
        }
        updated = [...prev, university];
      }
      // Save to local storage
      localStorage.setItem('selectedUniversities', JSON.stringify(updated));
      return updated;
    });
  };

  const isFavorite = (universityId: number) => {
    return favorites.some(fav => fav.id === universityId);
  };

  const isSelected = (universityId: number) => {
    return selectedUniversities.some(u => u.id === universityId);
  };

  const handlePageChange = (newPage: number) => {
    setFilters(prev => ({ ...prev, page: newPage }));
  };

  const formatTuition = (min: number, max: number, currency: string) => {
    return `${currency} ${min.toLocaleString()} - ${max.toLocaleString()}`;
  };

  if (error) {
    return (
      <div className="p-4 bg-red-50 rounded-md">
        <div className="flex">
          <AlertCircle className="h-5 w-5 text-red-400" />
          <p className="ml-3 text-sm text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Filters Sidebar */}
      <div className={`lg:w-80 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
        <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium text-gray-900">Filters</h2>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <Filter className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Search */}
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700">
                Search
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="search"
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder="Search universities..."
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value, page: 1 }))}
                />
              </div>
            </div>

            {/* Tuition Range */}
            <div>
              <label htmlFor="tuitionRange" className="block text-sm font-medium text-gray-700">
                Tuition Range (Annual)
              </label>
              <select
                id="tuitionRange"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                value={filters.tuitionRange}
                onChange={(e) => setFilters(prev => ({ ...prev, tuitionRange: e.target.value, page: 1 }))}
              >
                <option value="">All ranges</option>
                <option value="0-5000">$0 - $5,000</option>
                <option value="5001-10000">$5,001 - $10,000</option>
                <option value="10001-20000">$10,001 - $20,000</option>
                <option value="20001-30000">$20,001 - $30,000</option>
                <option value="30001-50000">$30,001 - $50,000</option>
                <option value="50001">$50,001+</option>
              </select>
            </div>

            {/* Degree Type */}
            <div>
              <label htmlFor="degreeType" className="block text-sm font-medium text-gray-700">
                Degree Type
              </label>
              <select
                id="degreeType"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                value={filters.degreeType}
                onChange={(e) => setFilters(prev => ({ ...prev, degreeType: e.target.value, page: 1 }))}
              >
                <option value="">All degrees</option>
                <option value="Bachelor">Bachelor's</option>
                <option value="Master">Master's</option>
                <option value="PhD">PhD</option>
                <option value="MBA">MBA</option>
              </select>
            </div>

            {/* Language of Instruction */}
            <div>
              <label htmlFor="language" className="block text-sm font-medium text-gray-700">
                Language of Instruction
              </label>
              <select
                id="language"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                value={filters.language}
                onChange={(e) => setFilters(prev => ({ ...prev, language: e.target.value, page: 1 }))}
              >
                <option value="">All languages</option>
                <option value="English">English</option>
                <option value="French">French</option>
                <option value="German">German</option>
                <option value="Spanish">Spanish</option>
              </select>
            </div>

            {/* Country */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Country
              </label>
              <select
                id="location"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                value={filters.location}
                onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value, page: 1 }))}
              >
                <option value="">All countries</option>
                <option value="United States">United States</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Canada">Canada</option>
                <option value="Australia">Australia</option>
                <option value="Germany">Germany</option>
                <option value="France">France</option>
              </select>
            </div>

            {/* Program Duration */}
            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                Program Duration
              </label>
              <select
                id="duration"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                value={filters.duration}
                onChange={(e) => setFilters(prev => ({ ...prev, duration: e.target.value, page: 1 }))}
              >
                <option value="">All durations</option>
                <option value="1">1 year</option>
                <option value="2">2 years</option>
                <option value="3">3 years</option>
                <option value="4">4 years</option>
                <option value="5+">5+ years</option>
              </select>
            </div>

            {/* Reset Filters */}
            <button
              onClick={() => setFilters({
                search: '',
                tuitionRange: '',
                degreeType: '',
                location: '',
                language: '',
                duration: '',
                page: 1
              })}
              className="w-full px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-md"
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Selected Universities */}
        {selectedUniversities.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Selected Universities ({selectedUniversities.length}/3)</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {selectedUniversities.map(university => (
                <div key={university.id} className="bg-indigo-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img
                        src={university.logo}
                        alt={university.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-gray-900">{university.name}</h3>
                        <p className="text-xs text-gray-500">{university.city}, {university.country}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleUniversitySelection(university)}
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* University Cards */}
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {universities.map((university) => (
              <div key={university.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <img
                        src={university.logo}
                        alt={`${university.name} logo`}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{university.name}</h3>
                        <p className="text-sm text-gray-500">{university.city}, {university.country}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleFavorite(university.id)}
                      className={`p-2 rounded-full ${
                        isFavorite(university.id)
                          ? 'text-red-500 hover:bg-red-50'
                          : 'text-gray-400 hover:bg-gray-50'
                      }`}
                    >
                      <Heart className="h-5 w-5" fill={isFavorite(university.id) ? 'currentColor' : 'none'} />
                    </button>
                  </div>

                  <div className="mt-4 space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <DollarSign className="h-4 w-4 text-gray-400 mr-1" />
                      <span>Tuition: {formatTuition(university.tuition.min, university.tuition.max, university.tuition.currency)}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <GraduationCap className="h-4 w-4 text-gray-400 mr-1" />
                      <span>Programs: {university.degrees.join(', ')}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Globe2 className="h-4 w-4 text-gray-400 mr-1" />
                      <span>Ranking: #{university.ranking}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <BookOpen className="h-4 w-4 text-gray-400 mr-1" />
                      <span>Acceptance Rate: {university.acceptanceRate}</span>
                    </div>
                  </div>

                  <p className="mt-4 text-sm text-gray-600 line-clamp-2">{university.description}</p>

                  <div className="mt-6 flex items-center justify-between">
                    <a
                      href={university.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-indigo-600 hover:text-indigo-500"
                    >
                      Visit Website
                    </a>
                    <button
                      onClick={() => toggleUniversitySelection(university)}
                      disabled={selectedUniversities.length >= 3 && !isSelected(university.id)}
                      className={`px-4 py-2 rounded-md text-sm font-medium ${
                        isSelected(university.id)
                          ? 'bg-green-100 text-green-800 hover:bg-green-200'
                          : selectedUniversities.length >= 3
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-indigo-600 text-white hover:bg-indigo-700'
                      }`}
                    >
                      {isSelected(university.id) ? 'Selected' : 'Select'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="mt-6 flex items-center justify-between bg-white px-4 py-3 sm:px-6 rounded-lg shadow">
            <div className="flex flex-1 justify-between sm:hidden">
              <button
                onClick={() => handlePageChange(pagination.currentPage - 1)}
                disabled={pagination.currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() => handlePageChange(pagination.currentPage + 1)}
                disabled={pagination.currentPage === pagination.totalPages}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing{' '}
                  <span className="font-medium">
                    {(pagination.currentPage - 1) * pagination.perPage + 1}
                  </span>{' '}
                  to{' '}
                  <span className="font-medium">
                    {Math.min(pagination.currentPage * pagination.perPage, pagination.total)}
                  </span>{' '}
                  of{' '}
                  <span className="font-medium">{pagination.total}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                    disabled={pagination.currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  {Array.from({ length: pagination.totalPages }).map((_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => handlePageChange(index + 1)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        pagination.currentPage === index + 1
                          ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => handlePageChange(pagination.currentPage + 1)}
                    disabled={pagination.currentPage === pagination.totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UniversitySearch;