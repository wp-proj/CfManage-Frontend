// services/teamService.js
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const createTeam = async (teamData) => {
  const response = await fetch(`${API_URL}/teams`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(teamData)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to create team');
  }

  return data.data;
};

export const getTeamById = async (teamId) => {
  const response = await fetch(`${API_URL}/teams/${teamId}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch team');
  }

  return data.data;
};

export const getTeamLeaderboard = async (teamId) => {
  const response = await fetch(`${API_URL}/teams/${teamId}/leaderboard`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch leaderboard');
  }

  return data.data.leaderboard;
};
