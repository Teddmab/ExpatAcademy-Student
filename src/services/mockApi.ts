// Simulated delay to mimic network request
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock user database
const users = new Map();

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

export const mockApi = {
  async post(endpoint: string, data: any) {
    // Simulate network delay
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

        return {
          data: {
            token: `mock-token-${user.id}`,
            user,
          },
        };
      }

      case '/auth/login': {
        const { email, password } = data;
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

      default:
        throw new Error(`Unhandled endpoint: ${endpoint}`);
    }
  }
};