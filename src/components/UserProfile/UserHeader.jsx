import { User, MapPin, Building, Award, TrendingUp } from 'lucide-react';

const UserHeader = ({ user }) => {
  const getRankColor = (rank) => {
    const colors = {
      'Legendary Grandmaster': 'text-red-500',
      'International Grandmaster': 'text-red-400',
      'Grandmaster': 'text-red-300',
      'International Master': 'text-orange-500',
      'Master': 'text-orange-400',
      'Candidate Master': 'text-purple-500',
      'Expert': 'text-blue-500',
      'Specialist': 'text-cyan-500',
      'Pupil': 'text-green-500',
      'Newbie': 'text-gray-500',
    };
    return colors[rank] || 'text-gray-500';
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8">
      <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
        {/* Avatar */}
        <div className="flex-shrink-0">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.username}
              className="w-32 h-32 rounded-full border-4 border-purple-500"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
              <User size={64} className="text-white" />
            </div>
          )}
        </div>

        {/* User Info */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">{user.username}</h2>
          
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-4">
            <span className={`text-2xl font-bold ${getRankColor(user.rank)}`}>
              {user.rank}
            </span>
            <span className="text-gray-600">•</span>
            <span className="text-2xl font-bold text-purple-600">{user.rating}</span>
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-gray-600">
            {user.country && (
              <div className="flex items-center space-x-1">
                <MapPin size={16} />
                <span>{user.country}</span>
              </div>
            )}
            {user.organization && (
              <div className="flex items-center space-x-1">
                <Building size={16} />
                <span>{user.organization}</span>
              </div>
            )}
            <div className="flex items-center space-x-1">
              <Award size={16} />
              <span>Max: {user.maxRank} ({user.maxRating})</span>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center md:justify-start space-x-2 text-sm text-gray-500">
            <TrendingUp size={16} />
            <span>Contribution: {user.contribution}</span>
            <span>•</span>
            <span>Friends: {user.friendOfCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHeader;
