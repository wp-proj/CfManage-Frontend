import React, { useState, useEffect } from 'react';
import TeamsList from '../components/teams/TeamsList';
import CreateTeamForm from '../components/teams/CreateTeamForm';
import Leaderboard from '../components/teams/Leaderboard';
import { createTeam, getTeamLeaderboard } from '../services/teamService';

const Teams = () => {
  const [teamIds, setTeamIds] = useState([]); // Changed from teams to teamIds
  const [selectedTeamId, setSelectedTeamId] = useState(null);
  const [leaderboard, setLeaderboard] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Load team IDs from localStorage on mount
  useEffect(() => {
    const savedTeamIds = JSON.parse(localStorage.getItem('myTeamIds') || '[]');
    setTeamIds(savedTeamIds);
  }, []);

  // Save team IDs to localStorage whenever they change
  useEffect(() => {
    if (teamIds.length>0){
    localStorage.setItem('myTeamIds', JSON.stringify(teamIds));
    }
  }, [teamIds]);

  const handleCreateTeam = async (teamData) => {
    setError('');
    setLoading(true);

    try {
      const newTeam = await createTeam(teamData);
      
      // Add only the team ID to state
      setTeamIds(prevIds => [...prevIds, newTeam._id]);
      
      setShowCreateForm(false);
      
      return { success: true, teamId: newTeam._id };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const handleViewLeaderboard = async (teamId) => {
    setError('');
    setLoading(true);
    setSelectedTeamId(teamId);
    setLeaderboard(null);

    try {
      const data = await getTeamLeaderboard(teamId);
      setLeaderboard(data);
    } catch (err) {
      setError(err.message);
      setLeaderboard(null);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTeam = (teamId) => {
    if (window.confirm('Are you sure you want to delete this team?')) {
      // Remove only the team ID from state
      setTeamIds(prevIds => prevIds.filter(id => id !== teamId));
      
      if (selectedTeamId === teamId) {
        setSelectedTeamId(null);
        setLeaderboard(null);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[--color-background] py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-[--color-text]">
            Teams
          </h1>
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="w-full sm:w-auto px-6 py-2.5 bg-[--color-primary] text-[--color-btn-primary-text] rounded-lg font-medium hover:bg-[--color-primary-hover] transition-colors duration-200"
          >
            {showCreateForm ? 'Cancel' : '+ Create Team'}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/25 rounded-lg text-red-500">
            ⚠️ {error}
          </div>
        )}

        {/* Create Team Form */}
        {showCreateForm && (
          <CreateTeamForm
            onSubmit={handleCreateTeam}
            loading={loading}
            onCancel={() => setShowCreateForm(false)}
          />
        )}

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Teams List (Left Side) - now receives teamIds */}
          <div className="lg:col-span-1">
            <TeamsList
              teams={teamIds}
              selectedTeamId={selectedTeamId}
              onViewLeaderboard={handleViewLeaderboard}
              onDeleteTeam={handleDeleteTeam}
              loading={loading}
            />
          </div>

          {/* Leaderboard (Right Side) */}
          <div className="lg:col-span-2">
            <Leaderboard
              leaderboard={leaderboard}
              loading={loading}
              selectedTeamId={selectedTeamId}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teams;
