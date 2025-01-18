// Simulated delay to mimic network request
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock user database
const users = new Map();

// Mock user profile data
const mockProfiles = new Map();

// Mock timeline data
const mockTimeline = [
  {
    id: 1,
    title: 'Complete Profile',
    deadline: '2024-03-25',
    status: 'pending',
    priority: 'high'
  },
  {
    id: 2,
    title: 'Submit Academic Transcripts',
    deadline: '2024-04-01',
    status: 'completed',
    priority: 'medium'
  },
  {
    id: 3,
    title: 'Language Test Submission',
    deadline: '2024-04-15',
    status: 'pending',
    priority: 'high'
  }
];

// Mock documents checklist
const mockDocuments = [
  {
    id: 1,
    name: 'Passport',
    status: 'completed',
    required: true
  },
  {
    id: 2,
    name: 'Academic Transcripts',
    status: 'pending',
    required: true
  },
  {
    id: 3,
    name: 'Language Test Results',
    status: 'pending',
    required: true
  },
  {
    id: 4,
    name: 'Statement of Purpose',
    status: 'in_progress',
    required: true
  },
  {
    id: 5,
    name: 'Letters of Recommendation',
    status: 'not_started',
    required: true
  }
];

// Mock uploaded documents storage
const uploadedDocuments = new Map();

// Mock default profile
const createDefaultProfile = (user: any) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  nationality: 'United States',
  fieldOfInterest: 'Computer Science',
  budget: '20000-30000',
  preferredDestinations: ['United States', 'Canada', 'United Kingdom'],
  phone: '+1 234 567 890',
  bio: 'A passionate student looking to expand my horizons through international education.'
});

// Extract user ID from Bearer token
const getUserIdFromToken = (authHeader: string) => {
  if (!authHeader?.startsWith('Bearer ')) {
    throw new Error('Unauthorized');
  }
  const token = authHeader.split(' ')[1];
  return token.split('-')[1];
};

export const mockApi = {
  defaults: {
    headers: {
      common: {} as Record<string, string>
    }
  },

  async post(endpoint: string, data: any, config?: any) {
    await delay(500);

    switch (endpoint) {
      case '/auth/register': {
        const { email } = data;
        
        if (users.has(email)) {
          throw new Error('User already exists');
        }

        const user = {
          id: crypto.randomUUID(),
          ...data,
        };
        delete user.password;
        
        users.set(email, user);
        mockProfiles.set(user.id, createDefaultProfile(user));

        return {
          data: {
            token: `mock-token-${user.id}`,
            user,
          },
        };
      }

      case '/auth/login': {
        const { email } = data;
        const user = users.get(email);

        if (!user) {
          throw new Error('User not found');
        }

        return {
          data: {
            token: `mock-token-${user.id}`,
            user,
          },
        };
      }

      case '/api/documents/upload': {
        const userId = getUserIdFromToken(this.defaults.headers.common['Authorization']);
        const documentId = data.get('documentId');
        const file = data.get('file');

        if (!documentId || !file) {
          throw new Error('Missing required upload data');
        }

        // Simulate upload progress
        if (config?.onUploadProgress) {
          for (let progress = 0; progress <= 100; progress += 20) {
            config.onUploadProgress({ loaded: progress, total: 100 });
            await delay(500);
          }
        }

        // Store uploaded document
        if (!uploadedDocuments.has(userId)) {
          uploadedDocuments.set(userId, new Map());
        }
        uploadedDocuments.get(userId).set(parseInt(documentId), file);

        // Update document status
        const docIndex = mockDocuments.findIndex(doc => doc.id === parseInt(documentId));
        if (docIndex !== -1) {
          mockDocuments[docIndex].status = 'completed';
        }

        return {
          data: { message: 'Document uploaded successfully' }
        };
      }

      default:
        throw new Error(`Unhandled endpoint: ${endpoint}`);
    }
  },

  async get(endpoint: string) {
    await delay(500);

    switch (endpoint) {
      case '/api/timeline':
        return { data: mockTimeline };

      case '/api/documents':
        return { data: mockDocuments };

      case '/api/user/profile': {
        try {
          const userId = getUserIdFromToken(this.defaults.headers.common['Authorization']);
          let profile = mockProfiles.get(userId);
          
          if (!profile) {
            const user = Array.from(users.values()).find(u => u.id === userId);
            if (!user) {
              throw new Error('User not found');
            }
            profile = createDefaultProfile(user);
            mockProfiles.set(userId, profile);
          }
          
          return { data: profile };
        } catch (error) {
          console.error('Error fetching profile:', error);
          throw error;
        }
      }

      default:
        throw new Error(`Unhandled endpoint: ${endpoint}`);
    }
  },

  async put(endpoint: string, data: any) {
    await delay(500);

    switch (endpoint) {
      case '/api/user/profile': {
        const userId = getUserIdFromToken(this.defaults.headers.common['Authorization']);
        const existingProfile = mockProfiles.get(userId);
        
        if (!existingProfile) {
          throw new Error('Profile not found');
        }
        
        const updatedProfile = {
          ...existingProfile,
          ...data,
          id: userId // Ensure ID doesn't change
        };
        
        mockProfiles.set(userId, updatedProfile);
        return { data: updatedProfile };
      }

      default:
        throw new Error(`Unhandled endpoint: ${endpoint}`);
    }
  }
};