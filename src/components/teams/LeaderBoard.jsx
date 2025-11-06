import React from 'react';

const Leaderboard = ({ leaderboard, loading, selectedTeamId }) => {
  const getRankColor = (rank) => {
    const rankColors = {
      newbie: '#808080',
      pupil: '#22c55e',
      specialist: '#06b6d4',
      expert: '#3b82f6',
      'candidate master': '#a855f7',
      master: '#f97316',
      'international master': '#fb923c',
      grandmaster: '#ef4444',
      'international grandmaster': '#ef4444',
      'legendary grandmaster': '#ef4444',
    };
    return rankColors[rank?.toLowerCase()] || '#9ca3af';
  };

  if (!selectedTeamId) {
    return (
      <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-10 text-center text-gray-400 backdrop-blur-md">
        Select a team to view its leaderboard
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-10 text-center backdrop-blur-md">
        <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent"></div>
        <p className="text-gray-400 mt-4 text-sm">Loading leaderboard...</p>
      </div>
    );
  }

  // Handle both array and object formats
  let leaderboardData = [];
  let teamName = '';
  let memberCount = 0;

  if (Array.isArray(leaderboard)) {
    // If leaderboard is an array directly
    leaderboardData = leaderboard;
    memberCount = leaderboard.length;
  } else if (leaderboard && typeof leaderboard === 'object') {
    // If leaderboard is an object with nested structure
    leaderboardData = leaderboard.leaderboard || leaderboard.data || [];
    teamName = leaderboard.teamName || '';
    memberCount = leaderboard.memberCount || leaderboardData.length;
  }

  if (!leaderboardData || leaderboardData.length === 0) {
    return (
      <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-10 text-center text-gray-400 backdrop-blur-md">
        No leaderboard data available
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h2 className="text-3xl font-semibold text-white tracking-tight">
          {teamName || 'Team'} Leaderboard
        </h2>
        <span className="text-sm text-gray-400">
          {memberCount} member{memberCount !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Table Container */}
      <div className="bg-gray-900/80 border border-gray-800 rounded-2xl overflow-hidden backdrop-blur-md shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-gray-300">
            <thead className="bg-gray-800/80 border-b border-gray-700">
              <tr>
                {[
                  'Rank',
                  'Username',
                  'Rating',
                  'Max Rating',
                  'Rank Title',
                  'Solved',
                  'Country',
                ].map((heading, i) => (
                  <th
                    key={i}
                    className={`px-5 py-3 text-left font-semibold uppercase tracking-wider text-xs ${
                      i > 3 ? 'hidden sm:table-cell' : ''
                    }`}
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-800">
              {leaderboardData.map((user, index) => (
                <tr
                  key={index}
                  className={`hover:bg-gray-800/60 transition-all ${
                    user.error ? 'opacity-60' : ''
                  }`}
                >
                  {/* Rank */}
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-full font-bold text-xs shadow-md">
                      {user.position || index + 1}
                    </div>
                  </td>

                  {/* Username */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      {user.avatar && (
                        <img
                          src={user.avatar}
                          alt={user.username}
                          className="w-8 h-8 rounded-full border border-gray-700 object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      )}
                      <a
                        href={`https://codeforces.com/profile/${user.username}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-blue-400 hover:underline"
                      >
                        {user.username}
                      </a>
                    </div>
                  </td>

                  {/* Rating */}
                  <td
                    className="px-5 py-4 font-semibold"
                    style={{ color: getRankColor(user.rank) }}
                  >
                    {user.rating || 0}
                  </td>

                  {/* Max Rating */}
                  <td
                    className="px-5 py-4 hidden sm:table-cell"
                    style={{ color: getRankColor(user.maxRank) }}
                  >
                    {user.maxRating || 0}
                  </td>

                  {/* Rank Title */}
                  <td
                    className="px-5 py-4 hidden sm:table-cell capitalize"
                    style={{ color: getRankColor(user.rank) }}
                  >
                    {user.rank || 'Unrated'}
                  </td>

                  {/* Solved */}
                  <td className="px-5 py-4">
                    <span className="inline-block px-3 py-1 bg-gray-800 text-gray-100 rounded-md font-medium text-xs">
                      {user.solvedCount || 0}
                    </span>
                  </td>

                  {/* Country */}
                  <td className="px-5 py-4 text-gray-400 hidden sm:table-cell text-xs">
                    {user.country || 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
