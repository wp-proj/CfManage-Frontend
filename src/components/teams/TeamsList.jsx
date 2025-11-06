import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, Trash2, Users, ExternalLink, Loader2 } from 'lucide-react';

const TeamsList = ({ teams, selectedTeamId, onViewLeaderboard, onDeleteTeam, loading }) => {
  const navigate = useNavigate();
  const [teamsData, setTeamsData] = useState([]);
  const [loadingTeams, setLoadingTeams] = useState(true);
  const [error, setError] = useState('');

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  // Fetch team details for all team IDs
  useEffect(() => {
    const fetchTeamsData = async () => {
      if (!teams || teams.length === 0) {
        setTeamsData([]);
        setLoadingTeams(false);
        return;
      }

      setLoadingTeams(true);
      setError('');

      try {
        // Fetch all teams in parallel
        const teamPromises = teams.map(async (teamId) => {
          try {
            const response = await fetch(`${API_URL}/teams/${teamId}`);
            const data = await response.json();
            
            if (response.ok && data.success) {
              return data.data;
            } else {
              console.error(`Failed to fetch team ${teamId}:`, data.message);
              return null;
            }
          } catch (err) {
            console.error(`Error fetching team ${teamId}:`, err);
            return null;
          }
        });

        const results = await Promise.all(teamPromises);
        
        // Filter out null results (failed fetches)
        const validTeams = results.filter(team => team !== null);
        setTeamsData(validTeams);
      } catch (err) {
        setError('Failed to load teams');
        console.error('Error loading teams:', err);
      } finally {
        setLoadingTeams(false);
      }
    };

    fetchTeamsData();
  }, [teams, API_URL]);

  // Loading state
  if (loadingTeams) {
    return (
      <div className="bg-[--color-surface] rounded-xl shadow-lg p-8 text-center border border-[--color-card-border]">
        <Loader2 className="mx-auto text-[--color-primary] mb-4 animate-spin" size={48} />
        <p className="text-[--color-text-secondary]">Loading teams...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-[--color-surface] rounded-xl shadow-lg p-8 text-center border border-red-500/30">
        <p className="text-red-500 mb-4">⚠️ {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-[--color-primary] text-[--color-btn-primary-text] rounded-lg font-medium hover:bg-[--color-primary-hover] transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  // Empty state
  if (teamsData.length === 0) {
    return (
      <div className="bg-[--color-surface] rounded-xl shadow-lg p-8 text-center border border-[--color-card-border]">
        <Users className="mx-auto text-[--color-text-secondary] mb-4" size={48} />
        <p className="text-[--color-text-secondary]">
          No teams created yet.<br />Create your first team!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      
      
      {teamsData.map((team) => (
        <div
          key={team._id}
          className={`bg-[--color-surface] rounded-xl shadow-lg p-6 border-2 transition-all ${
            selectedTeamId === team._id
              ? 'border-[--color-primary] ring-2 ring-[--color-focus-ring]'
              : 'border-[--color-card-border] hover:border-[--color-primary]'
          }`}
        >
          <h3 className="text-xl font-bold text-[--color-text] mb-2">{team.name}</h3>
          
          <div className="flex items-center gap-2 text-sm text-[--color-text-secondary] mb-1">
            <Users size={16} />
            <span className="font-semibold">{team.members?.length || 0}</span> members
          </div>
          
          <p className="text-sm text-[--color-text-secondary] mb-4">
            Created by: {team.createdBy || 'Unknown'}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={() => onViewLeaderboard(team._id)}
              disabled={loading && selectedTeamId === team._id}
              className="flex-1 px-4 py-2 bg-[--color-primary] hover:bg-[--color-primary-hover] disabled:bg-gray-400 disabled:cursor-not-allowed text-[--color-btn-primary-text] rounded-lg font-medium text-sm transition-colors flex items-center justify-center gap-2"
            >
              {loading && selectedTeamId === team._id ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <>
                  <Trophy size={16} />
                  Quick View
                </>
              )}
            </button>
            
            {/* Navigate to dedicated page */}
            <button
              onClick={() => navigate(`/teams/${team._id}`)}
              className="flex-1 px-4 py-2 bg-[--color-secondary] hover:bg-[--color-secondary-hover] text-[--color-text] rounded-lg font-medium text-sm transition-colors flex items-center justify-center gap-2"
            >
              <ExternalLink size={16} />
              Full Page
            </button>
            
            <button
              onClick={() => onDeleteTeam(team._id)}
              className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg font-medium text-sm transition-colors flex items-center justify-center gap-2"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeamsList;
