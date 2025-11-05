import { CheckCircle, Code, Calendar } from 'lucide-react';

const UserStats = ({ data }) => {
  const stats = [
    {
      icon: <CheckCircle className="text-green-500" size={32} />,
      label: 'Problems Solved',
      value: data.solvedCount,
      color: 'from-green-500 to-emerald-600',
    },
    {
      icon: <Code className="text-blue-500" size={32} />,
      label: 'Total Submissions',
      value: data.submissionStats.total,
      color: 'from-blue-500 to-cyan-600',
    },
    {
      icon: <Calendar className="text-purple-500" size={32} />,
      label: 'Contests Participated',
      value: data.ratingHistory.length,
      color: 'from-purple-500 to-pink-600',
    },
  ];

  return (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {stats.map((stat, index) => (
      <div
        key={index}
        className="bg-gray-700 backdrop-blur-sm rounded-xl shadow-xl p-6 hover:scale-105 transition-transform flex flex-col items-center text-center"
      >
        <div className={`${stat.color} w-16 h-16 rounded-xl flex items-center justify-center mb-4`}>
          {stat.icon}
        </div>
        <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
        <div className="text-gray-300">{stat.label}</div>
      </div>
    ))}
  </div>
);

};

export default UserStats;
