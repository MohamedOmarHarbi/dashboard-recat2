import { handleRequest } from './requestHandler';

const MOCK_USER = {
  id: "admin-001",
  name: "Admin User",
  role: "admin",
  token: "mock-jwt-token"
};

export const login = async (credentials) => 
  handleRequest(async () => {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
    
    // In a real app, we would validate credentials with the backend
    if (credentials.email && credentials.password) {
      localStorage.setItem('auth_token', MOCK_USER.token);
      localStorage.setItem('user', JSON.stringify(MOCK_USER));
      return MOCK_USER;
    }
    throw new Error("Invalid credentials");
  });

export const logout = () => {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('auth_token');
};
