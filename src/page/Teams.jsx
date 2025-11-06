import React, { useState, useEffect } from 'react';
import TeamsList from '../components/teams/TeamsList';
import CreateTeamForm from '../components/teams/CreateTeamForm';
import Leaderboard from '../components/teams/Leaderboard';
import { createTeam, getTeamLeaderboard } from '../services/teamService';
import { Trophy, Trash2, Users, ExternalLink, Loader2 } from 'lucide-react';

const Teams = () => {
  const [teamIds, setTeamIds] = useState([]);
  const [selectedTeamId, setSelectedTeamId] = useState(null);
  const [leaderboard, setLeaderboard] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Load team IDs from localStorage
  useEffect(() => {
    const savedTeamIds = JSON.parse(localStorage.getItem('myTeamIds') || '[]');
    setTeamIds(savedTeamIds);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (teamIds.length > 0) {
      localStorage.setItem('myTeamIds', JSON.stringify(teamIds));
    }
  }, [teamIds]);

  const handleCreateTeam = async (teamData) => {
    setError('');
    setLoading(true);
    try {
      const newTeam = await createTeam(teamData);
      setTeamIds(prev => [...prev, newTeam._id]);
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
      setTeamIds(prev => prev.filter(id => id !== teamId));
      if (selectedTeamId === teamId) {
        setSelectedTeamId(null);
        setLeaderboard(null);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[--color-background] py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto">
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
          {/* Left Column — My Teams + Create Team */}
          <div className="lg:col-span-1">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              </h2>
              <h2 className="text-2xl font-bold text-[--color-text] mb-4 flex items-center gap-2">
                <Users size={24} />
                My Teams
              </h2>
              <button
                onClick={() => setShowCreateForm(!showCreateForm)}
                className="px-3 py-1.5 bg-[--color-primary] text-[--color-btn-primary-text] rounded-md text-sm font-medium hover:bg-[--color-primary-hover] transition-colors"
              >
                {showCreateForm ? 'Cancel' : '+ Create Team'}
              </button>

            </div>
            <TeamsList
              teams={teamIds}
              selectedTeamId={selectedTeamId}
              onViewLeaderboard={handleViewLeaderboard}
              onDeleteTeam={handleDeleteTeam}
              loading={loading}
            />
          </div>

          {/* Right Column — Leaderboard */}
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
