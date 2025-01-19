import React from 'react';
import { Trophy, Star, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

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

interface MilestoneTrackerProps {
  milestones: Milestone[];
  totalProgress: number;
}

const MilestoneTracker: React.FC<MilestoneTrackerProps> = ({ milestones, totalProgress }) => {
  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const getStatusColor = (status: Milestone['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'in_progress':
        return 'bg-blue-500';
      case 'upcoming':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-300';
    }
  };

  const getStatusIcon = (status: Milestone['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case 'in_progress':
        return <Clock className="h-6 w-6 text-blue-500" />;
      case 'upcoming':
        return <AlertCircle className="h-6 w-6 text-yellow-500" />;
      default:
        return <AlertCircle className="h-6 w-6 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Overall Progress */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Your Journey</h2>
            <p className="text-gray-600">Track your progress towards studying abroad</p>
          </div>
          <div className="flex items-center space-x-2">
            <Trophy className="h-8 w-8 text-yellow-500" />
            <div>
              <p className="text-sm text-gray-600">Total Progress</p>
              <p className="text-2xl font-bold text-indigo-600">{totalProgress}%</p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-200">
                Progress
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block text-indigo-600">
                {totalProgress}%
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
            <div
              style={{ width: `${totalProgress}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500 transition-all duration-500"
            ></div>
          </div>
        </div>
      </div>

      {/* Milestones */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {milestones.map((milestone, index) => (
          <div
            key={milestone.id}
            className={`bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 ${
              milestone.status === 'locked' ? 'opacity-50' : ''
            }`}
          >
            {/* Milestone Header */}
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${getStatusColor(milestone.status)} bg-opacity-10`}>
                    {milestone.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{milestone.name}</h3>
                    <p className="text-sm text-gray-500">{milestone.description}</p>
                  </div>
                </div>
                {getStatusIcon(milestone.status)}
              </div>

              {/* Progress Bar (if applicable) */}
              {milestone.progress !== undefined && (
                <div className="mt-4">
                  <div className="relative pt-1">
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                      <div
                        style={{ width: `${milestone.progress}%` }}
                        className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${getStatusColor(
                          milestone.status
                        )}`}
                      ></div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 text-right">{milestone.progress}% Complete</p>
                </div>
              )}

              {/* Badge (if earned) */}
              {milestone.badge && milestone.status === 'completed' && (
                <div className="mt-4 flex items-center space-x-2 text-yellow-500">
                  {milestone.badge.icon}
                  <span className="text-sm font-medium">{milestone.badge.name}</span>
                </div>
              )}

              {/* Actions */}
              {milestone.actions && milestone.actions.length > 0 && (
                <div className="mt-4 space-y-2">
                  {milestone.actions.map((action, actionIndex) => (
                    <a
                      key={actionIndex}
                      href={action.href}
                      className="block text-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                      {action.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MilestoneTracker;