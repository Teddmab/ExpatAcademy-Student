import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, User, BookOpen, Home, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-indigo-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8" />
              <span className="font-bold text-xl">ExpatAcademy</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-1 hover:text-indigo-200">
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Link>
            <Link to="/courses" className="flex items-center space-x-1 hover:text-indigo-200">
              <BookOpen className="h-5 w-5" />
              <span>Courses</span>
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="flex items-center space-x-1 hover:text-indigo-200">
                  <User className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 hover:text-indigo-200"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-1 bg-white text-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-50"
              >
                <User className="h-5 w-5" />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;