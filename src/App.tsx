import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Universities from './pages/Universities';
import CoursesMenu from './components/CoursesMenu/CoursesMenu';
import CoursesAndTests from './components/CoursesAndTests/CoursesAndTests';
import CourseDetails from './pages/CourseDetails';
import IELTSPreparation from './pages/exam-prep/IELTSPreparation';
import TOEFLPreparation from './pages/exam-prep/TOEFLPreparation';
import RequireAuth from './components/Auth/RequireAuth';
import { AuthProvider } from './context/AuthContext';
import { BasketProvider } from './context/BasketContext';
import PaymentPage from './pages/PaymentPage';

function App() {
  return (
    <AuthProvider>
      <BasketProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow bg-gray-50">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/courses" element={<CoursesAndTests />} />
                <Route path="/courses/:id" element={<CourseDetails />} />
                <Route path="/courses/menu" element={<CoursesMenu />} />
                <Route path="/courses/ielts-academic-preparation" element={<IELTSPreparation />} />
                <Route path="/courses/toefl-ibt-preparation" element={<TOEFLPreparation />} />
                <Route path="/payment" element={<PaymentPage />} />
                <Route
                  path="/dashboard"
                  element={
                    <RequireAuth>
                      <Dashboard />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <RequireAuth>
                      <Profile />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/universities"
                  element={
                    <RequireAuth>
                      <Universities />
                    </RequireAuth>
                  }
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </BasketProvider>
    </AuthProvider>
  );
}

export default App;