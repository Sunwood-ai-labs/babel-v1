import jwtDecode from 'jwt-decode';
import axios from 'axios';

const AUTH_TOKEN_KEY = 'auth_token';
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export const setAuthToken = (token) => {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const getAuthToken = () => {
  return localStorage.getItem(AUTH_TOKEN_KEY);
};

export const removeAuthToken = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  delete axios.defaults.headers.common['Authorization'];
};

export const isAuthenticated = () => {
  const token = getAuthToken();
  return !!token && !isTokenExpired(token);
};

export const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded.exp < Date.now() / 1000;
  } catch (err) {
    return true;
  }
};

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    const { token } = response.data;
    setAuthToken(token);
    return true;
  } catch (error) {
    console.error('Login failed:', error);
    return false;
  }
};

export const logout = () => {
  removeAuthToken();
};

export const register = async (username, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, { username, email, password });
    const { token } = response.data;
    setAuthToken(token);
    return true;
  } catch (error) {
    console.error('Registration failed:', error);
    return false;
  }
};

export const getCurrentUser = () => {
  const token = getAuthToken();
  if (!token) return null;
  try {
    return jwtDecode(token);
  } catch (err) {
    return null;
  }
};

export const updateProfile = async (userData) => {
  try {
    const response = await axios.put(`${API_URL}/users/profile`, userData);
    return response.data;
  } catch (error) {
    console.error('Profile update failed:', error);
    throw error;
  }
};

export const refreshToken = async () => {
  try {
    const response = await axios.post(`${API_URL}/auth/refresh-token`);
    const { token } = response.data;
    setAuthToken(token);
    return true;
  } catch (error) {
    console.error('Token refresh failed:', error);
    return false;
  }
};

export const resetPassword = async (email) => {
  try {
    await axios.post(`${API_URL}/auth/reset-password`, { email });
    return true;
  } catch (error) {
    console.error('Password reset request failed:', error);
    return false;
  }
};

export const changePassword = async (oldPassword, newPassword) => {
  try {
    await axios.post(`${API_URL}/auth/change-password`, { oldPassword, newPassword });
    return true;
  } catch (error) {
    console.error('Password change failed:', error);
    return false;
  }
};