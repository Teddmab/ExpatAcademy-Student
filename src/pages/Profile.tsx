import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, GraduationCap, Wallet, Globe, AlertCircle } from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import Basket from '../components/Basket/Basket';

interface ProfileData {
  name: string;
  email: string;
  nationality: string;
  fieldOfInterest: string;
  budget: string;
  preferredDestinations: string[];
  phone: string;
  bio: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  nationality?: string;
  fieldOfInterest?: string;
  budget?: string;
  preferredDestinations?: string;
  phone?: string;
  general?: string;
}

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<ProfileData>({
    name: '',
    email: '',
    nationality: '',
    fieldOfInterest: '',
    budget: '',
    preferredDestinations: [],
    phone: '',
    bio: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/api/user/profile');
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setErrors({ general: 'Failed to load profile data' });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!profile.name) {
      newErrors.name = 'Name is required';
    }
    
    if (!profile.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(profile.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!profile.nationality) {
      newErrors.nationality = 'Nationality is required';
    }
    
    if (!profile.fieldOfInterest) {
      newErrors.fieldOfInterest = 'Field of interest is required';
    }
    
    if (profile.phone && !/^\+?[\d\s-]+$/.test(profile.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSaving(true);
    setSuccessMessage('');
    
    try {
      await api.put('/api/user/profile', profile);
      setSuccessMessage('Profile updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
      setErrors({
        general: 'Failed to update profile. Please try again.',
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Form */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow rounded-lg">
              {/* Profile Header */}
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Profile Settings</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Update your profile information and preferences
                </p>
              </div>

              {/* Profile Form */}
              <form onSubmit={handleSubmit} className="px-4 py-5 sm:p-6">
                {(errors.general || successMessage) && (
                  <div className={`mb-4 p-4 rounded-md ${errors.general ? 'bg-red-50' : 'bg-green-50'}`}>
                    <div className="flex">
                      <div className="flex-shrink-0">
                        {errors.general ? (
                          <AlertCircle className="h-5 w-5 text-red-400" />
                        ) : (
                          <div className="h-5 w-5 text-green-400" />
                        )}
                      </div>
                      <div className="ml-3">
                        <p className={`text-sm ${errors.general ? 'text-red-700' : 'text-green-700'}`}>
                          {errors.general || successMessage}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 gap-6">
                  {/* Basic Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Full Name
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="name"
                          value={profile.name}
                          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                          className={`focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md ${
                            errors.name ? 'border-red-300' : ''
                          }`}
                        />
                      </div>
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="email"
                          id="email"
                          value={profile.email}
                          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                          className={`focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md ${
                            errors.email ? 'border-red-300' : ''
                          }`}
                        />
                      </div>
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Academic Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="nationality" className="block text-sm font-medium text-gray-700">
                        Nationality
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Globe className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="nationality"
                          value={profile.nationality}
                          onChange={(e) => setProfile({ ...profile, nationality: e.target.value })}
                          className={`focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md ${
                            errors.nationality ? 'border-red-300' : ''
                          }`}
                        />
                      </div>
                      {errors.nationality && (
                        <p className="mt-1 text-sm text-red-600">{errors.nationality}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="fieldOfInterest" className="block text-sm font-medium text-gray-700">
                        Field of Interest
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <GraduationCap className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="fieldOfInterest"
                          value={profile.fieldOfInterest}
                          onChange={(e) => setProfile({ ...profile, fieldOfInterest: e.target.value })}
                          className={`focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md ${
                            errors.fieldOfInterest ? 'border-red-300' : ''
                          }`}
                        />
                      </div>
                      {errors.fieldOfInterest && (
                        <p className="mt-1 text-sm text-red-600">{errors.fieldOfInterest}</p>
                      )}
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Phone Number
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="tel"
                          id="phone"
                          value={profile.phone}
                          onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                          className={`focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md ${
                            errors.phone ? 'border-red-300' : ''
                          }`}
                          placeholder="+1 234 567 890"
                        />
                      </div>
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="budget" className="block text-sm font-medium text-gray-700">
                        Budget Range
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Wallet className="h-5 w-5 text-gray-400" />
                        </div>
                        <select
                          id="budget"
                          value={profile.budget}
                          onChange={(e) => setProfile({ ...profile, budget: e.target.value })}
                          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                        >
                          <option value="">Select budget range</option>
                          <option value="0-10000">$0 - $10,000</option>
                          <option value="10000-20000">$10,000 - $20,000</option>
                          <option value="20000-30000">$20,000 - $30,000</option>
                          <option value="30000+">$30,000+</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Bio */}
                  <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                      Bio
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="bio"
                        rows={4}
                        value={profile.bio}
                        onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Tell us about yourself..."
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Basket Section */}
          <div className="lg:col-span-1">
            <Basket />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;