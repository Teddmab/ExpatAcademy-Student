import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';

interface TestCenter {
  id: number;
  name: string;
  address: string;
  distance: string;
  tests: string[];
  nextAvailable: string;
}

const mockTestCenters: TestCenter[] = [
  {
    id: 1,
    name: 'International Testing Center',
    address: '123 Education St, New York, NY 10001',
    distance: '2.5 miles',
    tests: ['IELTS', 'TOEFL'],
    nextAvailable: '2024-04-15'
  },
  {
    id: 2,
    name: 'Global Language Assessment Center',
    address: '456 Academic Ave, New York, NY 10002',
    distance: '3.8 miles',
    tests: ['IELTS'],
    nextAvailable: '2024-04-10'
  },
  {
    id: 3,
    name: 'University Testing Facility',
    address: '789 Campus Rd, New York, NY 10003',
    distance: '4.2 miles',
    tests: ['TOEFL'],
    nextAvailable: '2024-04-12'
  }
];

const TestCenterSearch = () => {
  const [location, setLocation] = useState('');
  const [searchResults, setSearchResults] = useState<TestCenter[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);

    // Simulate API call
    setTimeout(() => {
      setSearchResults(mockTestCenters);
      setIsSearching(false);
    }, 1000);
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MapPin className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter your location"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <button
            type="submit"
            disabled={!location || isSearching}
            className="absolute inset-y-0 right-0 px-4 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 rounded-r-md flex items-center"
          >
            {isSearching ? (
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
            ) : (
              <Search className="h-4 w-4" />
            )}
          </button>
        </div>
      </form>

      {searchResults.length > 0 && (
        <div className="space-y-4">
          {searchResults.map((center) => (
            <div
              key={center.id}
              className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">{center.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{center.address}</p>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                    {center.distance} away
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500">Available Tests:</div>
                  <div className="mt-1 space-x-2">
                    {center.tests.map((test) => (
                      <span
                        key={test}
                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800"
                      >
                        {test}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-3 text-sm">
                <span className="text-gray-500">Next available date: </span>
                <span className="font-medium text-gray-900">
                  {new Date(center.nextAvailable).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TestCenterSearch;