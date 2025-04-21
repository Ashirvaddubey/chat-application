// Simulated API delay
const ARTIFICIAL_DELAY = 1000;

// Simulate network conditions (success rate 90%)
const simulateNetworkConditions = () => Math.random() > 0.1;

// Mock chat history data
const mockChatHistory = [
  { id: 1, text: "Hello!", sender: "user", timestamp: Date.now() - 50000 },
  { id: 2, text: "Hi there!", sender: "bot", timestamp: Date.now() - 40000 },
];

// Mock user session data
const mockUserSession = {
  id: "user123",
  username: "TestUser",
  isAuthenticated: true,
};

// Mock user preferences
const mockUserPreferences = {
  theme: "light",
  fontSize: "medium",
  notifications: true,
};

export const api = {
  // Chat related API calls
  fetchChatHistory: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (simulateNetworkConditions()) {
          resolve(mockChatHistory);
        } else {
          reject(new Error("Failed to fetch chat history"));
        }
      }, ARTIFICIAL_DELAY);
    });
  },

  sendMessage: (text) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (simulateNetworkConditions()) {
          const newMessage = {
            id: Date.now(),
            text,
            sender: "user",
            timestamp: Date.now(),
          };
          resolve(newMessage);
        } else {
          reject(new Error("Failed to send message"));
        }
      }, ARTIFICIAL_DELAY);
    });
  },

  // User session related API calls
  login: (credentials) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (simulateNetworkConditions()) {
          resolve(mockUserSession);
        } else {
          reject(new Error("Authentication failed"));
        }
      }, ARTIFICIAL_DELAY);
    });
  },

  logout: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, ARTIFICIAL_DELAY);
    });
  },

  // User preferences API calls
  getUserPreferences: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (simulateNetworkConditions()) {
          resolve(mockUserPreferences);
        } else {
          reject(new Error("Failed to fetch user preferences"));
        }
      }, ARTIFICIAL_DELAY);
    });
  },

  updateUserPreferences: (preferences) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (simulateNetworkConditions()) {
          resolve({ ...mockUserPreferences, ...preferences });
        } else {
          reject(new Error("Failed to update preferences"));
        }
      }, ARTIFICIAL_DELAY);
    });
  },
}; 