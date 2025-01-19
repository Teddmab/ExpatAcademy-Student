import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, Award, FileCheck, Building2, User2, AlertCircle, Calendar, CheckCircle, DollarSign, Import as Passport, Plane, Trophy, Star } from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import MilestoneTracker from '../components/MilestoneTracker/MilestoneTracker';
import DocumentChecklist from '../components/DocumentChecklist/DocumentChecklist';

interface TimelineItem {
  id: number;
  title: string;
  deadline: string;
  status: string;
  priority: string;
}

interface Milestone {
  id: string;
  name: string;
  description: string;
  status: 'completed' | 'in_progress' | 'locked' | 'upcoming';
  icon: React.ReactNode;
  progress?: number;
  badge?: {
    name: string;
    icon: React.ReactNode;
  };
  actions?: {
    name: string;
    href: string;
  }[];
}

const Dashboard = () => {
  const { user } = useAuth();
  const [timeline, setTimeline] = useState<TimelineItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalProgress, setTotalProgress] = useState(0);

  const milestones: Milestone[] = [
    {
      id: 'profile',
      name: 'Profile Setup',
      description: 'Complete your student profile',
      status: 'completed',
      icon: <User2 className="h-6 w-6 text-indigo-600" />,
      progress: 100,
      badge: {
        name: 'Profile Master',
        icon: <Star className="h-5 w-5" />
      },
      actions: [
        {
          name: 'View Profile',
          href: '/profile'
        }
      ]
    },
    {
      id: 'university',
      name: 'University Selection',
      description: 'Choose your dream universities',
      status: 'in_progress',
      icon: <Building2 className="h-6 w-6 text-blue-600" />,
      progress: 60,
      actions: [
        {
          name: 'Browse Universities',
          href: '/universities'
        }
      ]
    },
    {
      id: 'documents',
      name: 'Document Submission',
      description: 'Upload required documents',
      status: 'in_progress',
      icon: <FileCheck className="h-6 w-6 text-green-600" />,
      progress: 40,
      actions: [
        {
          name: 'Upload Documents',
          href: '#documents'
        }
      ]
    },
    {
      id: 'payment',
      name: 'Tuition Payment',
      description: 'Process tuition and fees',
      status: 'upcoming',
      icon: <DollarSign className="h-6 w-6 text-yellow-600" />,
      actions: [
        {
          name: 'Make Payment',
          href: '/payment'
        }
      ]
    },
    {
      id: 'visa',
      name: 'Visa Application',
      description: 'Apply for student visa',
      status: 'locked',
      icon: <Passport className="h-6 w-6 text-purple-600" />,
      actions: [
        {
          name: 'Start Application',
          href: '#visa'
        }
      ]
    },
    {
      id: 'travel',
      name: 'Travel Preparation',
      description: 'Plan your journey',
      status: 'locked',
      icon: <Plane className="h-6 w-6 text-red-600" />,
      actions: [
        {
          name: 'View Checklist',
          href: '#travel'
        }
      ]
    }
  ];

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const timelineRes = await api.get('/api/timeline');
        setTimeline(timelineRes.data);
        
        // Calculate total progress
        const completedMilestones = milestones.filter(m => m.status === 'completed').length;
        const inProgressMilestones = milestones.filter(m => m.status === 'in_progress').length;
        const totalProgress = Math.round(
          ((completedMilestones + inProgressMilestones * 0.5) / milestones.length) * 100
        );
        setTotalProgress(totalProgress);
      } catch (err) {
        setError('Failed to load dashboard data');
        console.error('Dashboard data fetch error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">Error Loading Dashboard</h3>
          <p className="mt-2 text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
            <p className="mt-1 text-gray-600">Track your progress and complete the next steps in your journey.</p>
          </div>
          <div className="flex space-x-4">
            <Link
              to="/profile"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <User2 className="h-4 w-4 mr-2" />
              Profile
            </Link>
            <Link
              to="/universities"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <Building2 className="h-4 w-4 mr-2" />
              Universities
            </Link>
          </div>
        </div>

        {/* Milestone Tracker */}
        <div className="mb-8">
          <MilestoneTracker
            milestones={milestones}
            totalProgress={totalProgress}
          />
        </div>

        {/* Document Checklist */}
        <div id="documents">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Document Checklist</h2>
          <DocumentChecklist />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;