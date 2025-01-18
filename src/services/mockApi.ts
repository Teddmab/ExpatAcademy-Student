// Simulated delay to mimic network request
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock user database
const users = new Map();

export const mockApi = {
  async post(endpoint: string, data: any) {
    // Simulate network delay
    await delay(500);

    switch (endpoint) {
      case '/auth/register': {
        const { email } = data;
        
        // Check if user already exists
        if (users.has(email)) {
          throw new Error('User already exists');
        }

        // Create new user
        const user = {
          id: crypto.randomUUID(),
          ...data,
        };
        delete user.password; // Remove password from response
        
        // Store user
        users.set(email, user);

        // Return successful registration
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

        // Simulate authentication
        if (!user) {
          throw new Error('User not found');
        }

        // In a real app, we would properly hash and compare passwords
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
};