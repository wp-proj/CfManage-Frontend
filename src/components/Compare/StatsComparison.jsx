const StatsComparison = ({ user1Data, user2Data, ratingComparison }) => {
  const stats = [
    {
      label: 'Current Rating',
      user1: user1Data.rating,
      user2: user2Data.rating,
      winner: user1Data.rating > user2Data.rating ? 1 : 2,
    },
    {
      label: 'Max Rating',
      user1: user1Data.maxRating,
      user2: user2Data.maxRating,
      winner: user1Data.maxRating > user2Data.maxRating ? 1 : 2,
    },
    {
      label: 'Problems Solved',
      user1: user1Data.solvedCount,
      user2: user2Data.solvedCount,
      winner: user1Data.solvedCount > user2Data.solvedCount ? 1 : 2,
    },
  ];

  return (
    <div className="bg-gray-800/60 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-gray-700">
      <h3 className="text-3xl font-bold text-white mb-8 text-center">Statistics Comparison</h3>
      
      <div className="space-y-8">
        {stats.map((stat, index) => (
          <div key={index}>
            <p className="text-center font-semibold text-gray-300 mb-4 text-lg">{stat.label}</p>
            <div className="grid grid-cols-3 gap-6 items-center">
              <div className={`text-right ${stat.winner === 1 ? 'text-green-400 font-bold' : 'text-gray-400'}`}>
                <span className="text-3xl">{stat.user1}</span>
              </div>
              <div className="text-center text-gray-500 font-bold text-xl">VS</div>
              <div className={`text-left ${stat.winner === 2 ? 'text-green-400 font-bold' : 'text-gray-400'}`}>
                <span className="text-3xl">{stat.user2}</span>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className={`h-3 rounded-full transition-all ${stat.winner === 1 ? 'bg-green-500 shadow-lg shadow-green-500/50' : 'bg-gray-700'}`}></div>
              <div className={`h-3 rounded-full transition-all ${stat.winner === 2 ? 'bg-green-500 shadow-lg shadow-green-500/50' : 'bg-gray-700'}`}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsComparison;
