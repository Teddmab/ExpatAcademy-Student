import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Globe } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div 
        className="bg-cover bg-center h-[500px] flex items-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80")',
          backgroundBlendMode: 'overlay',
          backgroundColor: 'rgba(0, 0, 0, 0.5)'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Welcome to ExpatAcademy
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Your gateway to global education and opportunities
          </p>
          <Link
            to="/courses"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold text-lg transition-colors"
          >
            Explore Courses
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose ExpatAcademy?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <BookOpen className="h-12 w-12 mx-auto text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Quality Courses</h3>
              <p className="text-gray-600">
                Access high-quality courses designed specifically for international students
              </p>
            </div>
            <div className="text-center p-6">
              <Users className="h-12 w-12 mx-auto text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Expert Instructors</h3>
              <p className="text-gray-600">
                Learn from experienced educators with global teaching experience
              </p>
            </div>
            <div className="text-center p-6">
              <Globe className="h-12 w-12 mx-auto text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Global Community</h3>
              <p className="text-gray-600">
                Connect with students and educators from around the world
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;