import { ExternalLink } from 'lucide-react';

const UniqueProblems = ({ username, problems, color }) => {
  const colorClasses = {
    blue: {
      bg: 'bg-blue-900/50',
      text: 'text-blue-300',
      border: 'border-blue-700',
      gradient: 'from-blue-500 to-blue-400',
    },
    purple: {
      bg: 'bg-purple-900/50',
      text: 'text-purple-300',
      border: 'border-purple-700',
      gradient: 'from-purple-500 to-purple-400',
    },
  };

  const colors = colorClasses[color];

  return (
    <div className="bg-gray-800/60 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-gray-700">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-white">
          {username}'s Unique Problems
        </h3>
        <span className={`${colors.bg} ${colors.text} px-4 py-2 rounded-full font-semibold text-sm border ${colors.border}`}>
          {problems.length}
        </span>
      </div>
      
      <div className="max-h-[500px] overflow-y-auto space-y-3 pr-2">
        {problems.slice(0, 20).map((problem, index) => (
          <div key={index} className="flex justify-between items-center p-4 bg-gray-900/50 rounded-xl hover:bg-gray-700/40 transition border border-gray-700">
            <div className="flex-1">
              <p className="font-medium text-gray-200 text-sm mb-2">{problem.name}</p>
              <div className="flex items-center space-x-2">
                <span className={`${colors.bg} ${colors.text} px-3 py-1 rounded-lg text-xs border ${colors.border} font-mono`}>
                  {problem.rating}
                </span>
                {problem.tags.slice(0, 2).map((tag, i) => (
                  <span key={i} className="bg-gray-700 text-gray-300 px-3 py-1 rounded-lg text-xs border border-gray-600">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <a
              href={`https://codeforces.com/problemset/problem/${problem.contestId}/${problem.index}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition ml-4"
            >
              <ExternalLink size={18} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UniqueProblems;
