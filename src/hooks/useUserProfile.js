import { useState, useEffect } from 'react';
import { codeforcesApi } from '../api/codeforcesApi';

export const useUserProfile = (username) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!username) return;

    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await codeforcesApi.getUserProfile(username);
        setData(response.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch user profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [username]);

  return { data, loading, error };
};
