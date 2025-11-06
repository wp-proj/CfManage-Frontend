import React, { useState } from 'react';

const CreateTeamForm = ({ onSubmit, loading, onCancel }) => {
  const [teamName, setTeamName] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const [memberInput, setMemberInput] = useState('');
  const [members, setMembers] = useState([]);
  const [localError, setLocalError] = useState('');

  const handleAddMember = () => {
    const trimmedMember = memberInput.trim();
    if (!trimmedMember) return setLocalError('Please enter a username');
    if (members.includes(trimmedMember))
      return setLocalError('This member is already added');

    setMembers([...members, trimmedMember]);
    setMemberInput('');
    setLocalError('');
  };

  const handleRemoveMember = (memberToRemove) => {
    setMembers(members.filter((m) => m !== memberToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');

    if (members.length === 0) return setLocalError('Add at least one member');

    const result = await onSubmit({
      name: teamName,
      members,
      createdBy: createdBy || 'Anonymous',
    });

    if (result.success) {
      // Save only team ID to localStorage
      if (result.teamId) {
        const existingIds = JSON.parse(localStorage.getItem('myTeamIds') || '[]');
        
        if (!existingIds.includes(result.teamId)) {
          existingIds.push(result.teamId);
          localStorage.setItem('myTeamIds', JSON.stringify(existingIds));
        }
      }

      // Reset form
      setTeamName('');
      setCreatedBy('');
      setMembers([]);
      setMemberInput('');
    } else {
      setLocalError(result.error);
    }
  };

  return (
    <div className="bg-gray-900/80 backdrop-blur-lg border border-gray-800 rounded-2xl p-10 shadow-2xl mx-auto text-white space-y-8">
      <h2 className="text-3xl font-semibold text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
        Create a New Team
      </h2>

      {localError && (
        <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm text-center">
          {localError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Team Name */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Team Name *
          </label>
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="Enter team name"
            required
            className="w-full px-5 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>

        {/* Created By */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Created By
          </label>
          <input
            type="text"
            value={createdBy}
            onChange={(e) => setCreatedBy(e.target.value)}
            placeholder="Your name (optional)"
            className="w-full px-5 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
          />
        </div>

        {/* Add Members */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Add Team Members *
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={memberInput}
              onChange={(e) => setMemberInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddMember())}
              placeholder="Enter Codeforces username"
              className="flex-1 px-5 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <button
              type="button"
              onClick={handleAddMember}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold hover:scale-[1.03] transition-transform"
            >
              Add
            </button>
          </div>
        </div>

        {/* Members List */}
        {members.length > 0 && (
          <div className="p-4 bg-gray-800/60 rounded-lg border border-gray-700">
            <h4 className="text-sm font-medium text-gray-300 mb-3">
              Team Members ({members.length})
            </h4>
            <div className="flex flex-wrap gap-2">
              {members.map((member, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium"
                >
                  {member}
                  <button
                    type="button"
                    onClick={() => handleRemoveMember(member)}
                    className="hover:bg-blue-500/20 rounded-full w-5 h-5 flex items-center justify-center transition-colors"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || !teamName || members.length === 0}
          className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-semibold text-lg hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Creating Team...' : 'Create Team'}
        </button>
      </form>
    </div>
  );
};

// ✅ ADD THIS LINE
export default CreateTeamForm;
