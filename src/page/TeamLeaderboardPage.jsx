import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Trophy, Users, Calendar, ExternalLink } from 'lucide-react';
import Leaderboard from '../components/teams/LeaderBoard';
import { getTeamLeaderboard } from '../services/teamService';

const TeamLeaderboardPage = () => {
  const { teamid } = useParams();
  const navigate = useNavigate();
  
  const [teamData, setTeamData] = useState(null);
  const [leaderboard, setLeaderboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadTeamData();
  }, [teamid]);

  const loadTeamData = async () => {
    setLoading(true);
    setError('');

    try {
      // Get team info from localStorage
      // const team = savedTeams.find(t => t._id === teamid);

      // if (!team) {
      //   setError('Team not found in your saved teams');
      //   setLoading(false);
      //   return;
      // }


      // Fetch leaderboard from API
      const data = await getTeamLeaderboard(teamid);
      setLeaderboard(data);
    } catch (err) {
      setError(err.message || 'Failed to load team leaderboard');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[--color-background] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[--color-primary] mx-auto mb-4"></div>
          <p className="text-[--color-text-secondary]">Loading team leaderboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[--color-background] flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="mb-6">
            <Trophy className="mx-auto text-red-500" size={64} />
          </div>
          <h2 className="text-2xl font-bold text-[--color-text] mb-4">Error Loading Team</h2>
          <p className="text-[--color-text-secondary] mb-6">{error}</p>
          <button
            onClick={() => navigate('/teams')}
            className="px-6 py-3 bg-[--color-primary] text-[--color-btn-primary-text] rounded-lg font-medium hover:bg-[--color-primary-hover] transition-colors inline-flex items-center gap-2"
          >
            <ArrowLeft size={20} />
            Back to Teams
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[--color-background] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate('/teams')}
          className="mb-6 px-4 py-2 bg-[--color-secondary] text-[--color-text] rounded-lg font-medium hover:bg-[--color-secondary-hover] transition-colors inline-flex items-center gap-2"
        >
          <ArrowLeft size={20} />
          Back to Teams
        </button>

        {/* Team Header */}
        <div className="bg-[--color-surface] rounded-xl shadow-lg p-6 mb-8 border border-[--color-card-border]">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-[--color-text] mb-2 flex items-center gap-3">
                <Trophy className="text-[--color-primary]" size={36} />
                {teamData?.name}
              </h1>
              <div className="flex flex-wrap gap-4 text-sm text-[--color-text-secondary]">
                <div className="flex items-center gap-2">
                  <Users size={16} />
                  <span><strong>{teamData?.members?.length || 0}</strong> members</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>Created by <strong>{teamData?.createdBy || 'Unknown'}</strong></span>
                </div>
              </div>
            </div>

            {/* Share Button */}
            <button
              onClick={() => {
                const url = window.location.href;
                navigator.clipboard.writeText(url);
                alert('Link copied to clipboard!');
              }}
              className="px-4 py-2 bg-[--color-secondary] text-[--color-text] rounded-lg font-medium hover:bg-[--color-secondary-hover] transition-colors inline-flex items-center gap-2"
            >
              <ExternalLink size={18} />
              Share
            </button>
          </div>

          {/* Team Members List */}
          {teamData?.members && teamData.members.length > 0 && (
            <div className="mt-6 pt-6 border-t border-[--color-card-border-inner]">
              <h3 className="text-sm font-semibold text-[--color-text] mb-3">Team Members:</h3>
              <div className="flex flex-wrap gap-2">
                {teamData.members.map((member, index) => (
                  <a
                    key={index}
                    href={`https://codeforces.com/profile/${member}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-[--color-primary] text-[--color-btn-primary-text] rounded-full text-sm font-medium hover:bg-[--color-primary-hover] transition-colors inline-flex items-center gap-1"
                  >
                    {member}
                    <ExternalLink size={12} />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Leaderboard */}
        <div>
          <h2 className="text-2xl font-bold text-[--color-text] mb-4 flex items-center gap-2">
            <Trophy size={24} className="text-[--color-primary]" />
            Leaderboard
          </h2>
          <Leaderboard
            leaderboard={leaderboard}
            loading={loading}
            selectedTeamId={teamid}
          />
        </div>
      </div>
    </div>
  );
};

export default TeamLeaderboardPage;
