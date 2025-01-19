import React, { useState } from 'react';
import { Building2, Heart, Sparkles } from 'lucide-react';
import UniversitySearch from '../components/UniversitySearch/UniversitySearch';
import UniversitySurvey from '../components/UniversitySurvey/UniversitySurvey';

const Universities = () => {
  const [showFavorites, setShowFavorites] = useState(false);
  const [showSurvey, setShowSurvey] = useState(false);

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-2">
            <Building2 className="h-8 w-8 text-indigo-600" />
            <h1 className="text-2xl font-semibold text-gray-900">Universities</h1>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => setShowSurvey(!showSurvey)}
              className={`inline-flex items-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium ${
                showSurvey
                  ? 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              <Sparkles className="h-5 w-5 mr-2" />
              {showSurvey ? 'Show All Universities' : 'Get Recommendations'}
            </button>
            <button
              onClick={() => setShowFavorites(!showFavorites)}
              className={`inline-flex items-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium ${
                showFavorites
                  ? 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              <Heart className="h-5 w-5 mr-2" fill={showFavorites ? 'currentColor' : 'none'} />
              {showFavorites ? 'Show All' : 'Show Favorites'}
            </button>
          </div>
        </div>

        {showSurvey ? (
          <UniversitySurvey />
        ) : (
          <UniversitySearch />
        )}
      </div>
    </div>
  );
};

export default Universities;