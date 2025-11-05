import { useState, useEffect } from 'react';
import { codeforcesApi } from '../api/codeforcesApi';

export const useCompareUsers = (user1, user2) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user1 || !user2) return;

    const fetchComparison = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await codeforcesApi.compareUsers(user1, user2);
        setData(response);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to compare users');
      } finally {
        setLoading(false);
      }
    };

    fetchComparison();
  }, [user1, user2]);

  return { data, loading, error };
};
