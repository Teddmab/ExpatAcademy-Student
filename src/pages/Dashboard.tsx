import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, Award, FileCheck, Building2, User2, AlertCircle } from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import DocumentChecklist from '../components/DocumentChecklist/DocumentChecklist';

interface TimelineItem {
  id: number;
  title: string;
  deadline: string;
  status: string;
  priority: string;
}

const Dashboard = () => {
  const { user } = useAuth();
  const [timeline, setTimeline] = useState<TimelineItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const timelineRes = await api.get('/api/timeline');
        setTimeline(timelineRes.data);
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
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Welcome back, {user?.name}</h1>
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Timeline */}
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Upcoming Deadlines</h2>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <ul className="divide-y divide-gray-200">
                {timeline.map((item) => (
                  <li key={item.id} className="p-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 text-gray-400" />
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">{item.title}</p>
                          <p className="text-sm text-gray-500">Due: {new Date(item.deadline).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          item.priority === 'high'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {item.priority}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Document Checklist */}
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Document Checklist</h2>
            <DocumentChecklist />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;