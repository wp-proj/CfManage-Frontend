import { Crown, TrendingUp } from 'lucide-react';

const UserComparisonHeader = ({ user1Data, user2Data }) => {
  const getRankColor = (rank) => {
    const colors = {
      'legendary grandmaster': 'text-red-500',
      'international grandmaster': 'text-red-400',
      'grandmaster': 'text-red-300',
      'international master': 'text-orange-500',
      'master': 'text-orange-400',
      'candidate master': 'text-purple-500',
      'expert': 'text-blue-500',
      'specialist': 'text-cyan-500',
      'pupil': 'text-green-500',
      'newbie': 'text-gray-400',
    };
    return colors[rank.toLowerCase()] || 'text-gray-400';
  };

  const higherRating = user1Data.rating > user2Data.rating ? 1 : 2;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-100">
      {/* User 1 */}
      <div className={`bg-gray-800/60 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border ${higherRating === 1 ? 'border-yellow-500 ring-2 ring-yellow-500/50' : 'border-gray-700'} relative transition-all hover:shadow-yellow-500/20`}>
        {higherRating === 1 && (
          <div className="absolute -top-4 -right-4 bg-gradient-to-br from-yellow-400 to-yellow-600 text-yellow-950 p-3 rounded-full shadow-xl">
            <Crown size={28} />
          </div>
        )}
        <div className="text-center">
          <h3 className="text-3xl font-bold text-white mb-3">{user1Data.username}</h3>
          <p className={`text-2xl font-bold mb-4 ${getRankColor(user1Data.rank)} uppercase tracking-wide`}>
            {user1Data.rank}
          </p>
          <div className="flex items-center justify-center space-x-4 text-lg mb-6">
            <div className="bg-blue-900/50 px-5 py-3 rounded-xl border border-blue-700">
              <span className="text-blue-300 font-bold text-xl">{user1Data.rating}</span>
              <span className="text-blue-400 text-sm ml-2">current</span>
            </div>
            <TrendingUp className="text-green-400" size={24} />
            <div className="bg-green-900/50 px-5 py-3 rounded-xl border border-green-700">
              <span className="text-green-300 font-bold text-xl">{user1Data.maxRating}</span>
              <span className="text-green-400 text-sm ml-2">max</span>
            </div>
          </div>
          <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700">
            <span className="font-bold text-3xl bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">{user1Data.solvedCount}</span>
            <p className="text-gray-400 text-sm mt-1">problems solved</p>
          </div>
        </div>
      </div>

      {/* User 2 */}
      <div className={`bg-gray-800/60 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border ${higherRating === 2 ? 'border-yellow-500 ring-2 ring-yellow-500/50' : 'border-gray-700'} relative transition-all hover:shadow-yellow-500/20`}>
        {higherRating === 2 && (
          <div className="absolute -top-4 -right-4 bg-gradient-to-br from-yellow-400 to-yellow-600 text-yellow-950 p-3 rounded-full shadow-xl">
            <Crown size={28} />
          </div>
        )}
        <div className="text-center">
          <h3 className="text-3xl font-bold text-white mb-3">{user2Data.username}</h3>
          <p className={`text-2xl font-bold mb-4 ${getRankColor(user2Data.rank)} uppercase tracking-wide`}>
            {user2Data.rank}
          </p>
          <div className="flex items-center justify-center space-x-4 text-lg mb-6">
            <div className="bg-blue-900/50 px-5 py-3 rounded-xl border border-blue-700">
              <span className="text-blue-300 font-bold text-xl">{user2Data.rating}</span>
              <span className="text-blue-400 text-sm ml-2">current</span>
            </div>
            <TrendingUp className="text-green-400" size={24} />
            <div className="bg-green-900/50 px-5 py-3 rounded-xl border border-green-700">
              <span className="text-green-300 font-bold text-xl">{user2Data.maxRating}</span>
              <span className="text-green-400 text-sm ml-2">max</span>
            </div>
          </div>
          <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700">
            <span className="font-bold text-3xl bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">{user2Data.solvedCount}</span>
            <p className="text-gray-400 text-sm mt-1">problems solved</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserComparisonHeader;
