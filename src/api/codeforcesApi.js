import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
});

export const codeforcesApi = {
  getUserProfile: async (username) => {
    const response = await api.get(`/user/${username}`);
    return response.data;
  },

  getUserInfo: async (username) => {
    const response = await api.get(`/user/${username}/info`);
    return response.data;
  },

  getSolvedProblems: async (username, limit = 100, offset = 0) => {
    const response = await api.get(`/user/${username}/solved`, {
      params: { limit, offset }
    });
    return response.data;
  },
};

export default api;
