import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Globe, ArrowRight, GraduationCap, Clock, Award, MapPin, Mail, Star, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div 
        className="relative bg-cover bg-center h-[600px] flex items-center"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url("https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80")',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Your Gateway to Global Education
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Join thousands of African students achieving their dreams of studying abroad. Start your journey today.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to={isAuthenticated ? "/dashboard" : "/register"}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
              >
                Get Started
              </Link>
              <Link
                to="/courses"
                className="bg-white hover:bg-gray-100 text-indigo-600 px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
              >
                View Courses
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Journey to Success */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Journey to Success</h2>
            <p className="text-lg text-gray-600">A seamless 4-month process from registration to departure</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                title: 'Registration & Assessment',
                description: 'Complete registration and get a personalized study plan',
                duration: 'Week 1',
                icon: <Users className="h-6 w-6 text-indigo-600" />,
                image: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&q=80&w=400'
              },
              {
                title: 'University Selection',
                description: 'Choose from our network of partner universities',
                duration: 'Week 2-4',
                icon: <GraduationCap className="h-6 w-6 text-indigo-600" />,
                image: 'https://images.unsplash.com/photo-1522661067900-ab829854a57f?auto=format&fit=crop&q=80&w=400'
              },
              {
                title: 'Application Process',
                description: 'We handle your university and visa applications',
                duration: 'Week 5-12',
                icon: <BookOpen className="h-6 w-6 text-indigo-600" />,
                image: 'https://images.unsplash.com/photo-1559098517-fb7f50ca8bf3?auto=format&fit=crop&q=80&w=400'
              },
              {
                title: 'Pre-departure Prep',
                description: 'Get ready for your journey with our guidance',
                duration: 'Week 13-16',
                icon: <Globe className="h-6 w-6 text-indigo-600" />,
                image: 'https://images.unsplash.com/photo-1517868674985-0525518ae392?auto=format&fit=crop&q=80&w=400'
              }
            ].map((step, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="h-40 relative overflow-hidden">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black opacity-60"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <span className="text-sm font-medium bg-indigo-600 px-2 py-1 rounded">
                      {step.duration}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center mb-2">
                    <div className="p-2 bg-indigo-100 rounded-full">
                      {step.icon}
                    </div>
                    <h3 className="ml-2 font-semibold text-gray-900">{step.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Universities */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Top Partner Universities</h2>
            <p className="text-lg text-gray-600">Join prestigious institutions worldwide</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {[
              {
                name: 'University of Toronto',
                location: 'Toronto, Canada',
                image: 'https://images.unsplash.com/photo-1569447891824-7a1758aa73a2?auto=format&fit=crop&q=80&w=400',
                rating: 4.8,
                programs: 150
              },
              {
                name: 'University of Manchester',
                location: 'Manchester, UK',
                image: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&q=80&w=400',
                rating: 4.7,
                programs: 200
              },
              {
                name: 'University of Melbourne',
                location: 'Melbourne, Australia',
                image: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&q=80&w=400',
                rating: 4.9,
                programs: 180
              }
            ].map((university, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <img
                    src={university.image}
                    alt={university.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{university.name}</h3>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <MapPin className="h-4 w-4 mr-1" />
                    {university.location}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span className="text-sm text-gray-600">{university.rating}</span>
                    </div>
                    <span className="text-sm text-gray-600">{university.programs}+ Programs</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/universities"
              className="inline-flex items-center text-indigo-600 hover:text-indigo-500 font-medium"
            >
              View All Universities
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Success Stories</h2>
            <p className="text-lg text-gray-600">Hear from our alumni who are living their dreams</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Chioma Okonkwo',
                country: 'Nigeria',
                university: 'University of Toronto',
                image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=200',
                quote: 'ExpatAcademy made my dream of studying abroad a reality. Their guidance was invaluable throughout the process.'
              },
              {
                name: 'David Mensah',
                country: 'Ghana',
                university: 'University of Manchester',
                image: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?auto=format&fit=crop&q=80&w=200',
                quote: 'The support I received was exceptional. From application to arrival, they were with me every step of the way.'
              },
              {
                name: 'Sarah Kamau',
                country: 'Kenya',
                university: 'University of Melbourne',
                image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
                quote: 'Thanks to ExpatAcademy, I\'m now pursuing my Master\'s degree at my dream university.'
              }
            ].map((story, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <img
                    src={story.image}
                    alt={story.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">{story.name}</h3>
                    <p className="text-sm text-gray-500">{story.country}</p>
                    <p className="text-sm text-indigo-600">{story.university}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{story.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Courses</h2>
            <p className="text-lg text-gray-600">Prepare for your international education journey</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {[
              {
                title: 'Study Abroad Preparation',
                description: 'Comprehensive guide to preparing for international education',
                duration: '6 weeks',
                price: '$199'
              },
              {
                title: 'IELTS Mastery Course',
                description: 'Expert-led preparation for IELTS success',
                duration: '8 weeks',
                price: '$249'
              },
              {
                title: 'University Interview Prep',
                description: 'Master university admission interviews',
                duration: '4 weeks',
                price: '$149'
              }
            ].map((course, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <div className="flex items-center mb-4">
                  <BookOpen className="h-6 w-6 text-indigo-600" />
                  <h3 className="ml-2 text-lg font-semibold text-gray-900">{course.title}</h3>
                </div>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {course.duration}
                  </div>
                  <div>{course.price}</div>
                </div>
                <Link
                  to="/courses"
                  className="block text-center bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                >
                  Learn More
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose ExpatAcademy</h2>
            <p className="text-lg text-gray-600">Your trusted partner in international education</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Award className="h-8 w-8 text-indigo-600" />,
                title: 'Expert Guidance',
                description: 'Get personalized support from experienced education consultants'
              },
              {
                icon: <Clock className="h-8 w-8 text-indigo-600" />,
                title: 'Fast Processing',
                description: 'Complete your journey from application to admission in just 4 months'
              },
              {
                icon: <Users className="h-8 w-8 text-indigo-600" />,
                title: 'Global Network',
                description: 'Access our network of top universities and education partners'
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
            <p className="text-lg text-indigo-100 mb-8">
              Get the latest updates on scholarships, university admissions, and study abroad opportunities
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="block w-full pl-10 pr-3 py-3 border border-transparent rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="inline-flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-indigo-600 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;