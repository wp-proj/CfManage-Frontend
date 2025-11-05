const SubmissionStats = ({ stats }) => {
  const verdicts = [
    { label: 'Accepted', value: stats.accepted, color: 'bg-green-500', percentage: (stats.accepted / stats.total) * 100 },
    { label: 'Wrong Answer', value: stats.wrongAnswer, color: 'bg-red-500', percentage: (stats.wrongAnswer / stats.total) * 100 },
    { label: 'Time Limit', value: stats.timeLimitExceeded, color: 'bg-orange-500', percentage: (stats.timeLimitExceeded / stats.total) * 100 },
    { label: 'Runtime Error', value: stats.runtimeError, color: 'bg-yellow-500', percentage: (stats.runtimeError / stats.total) * 100 },
    { label: 'Compilation Error', value: stats.compilationError, color: 'bg-purple-500', percentage: (stats.compilationError / stats.total) * 100 },
    { label: 'Other', value: stats.other, color: 'bg-gray-500', percentage: (stats.other / stats.total) * 100 },
  ];

  return (
    <div className="bg-gray/95 backdrop-blur-sm rounded-xl shadow-xl p-6">
      <h3 className="text-2xl font-bold text-white-800 mb-6">Submission Statistics</h3>
      
      {/* Progress bars */}
      <div className="space-y-4">
        {verdicts.map((verdict) => (
          <div key={verdict.label}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-white-700 font-medium">{verdict.label}</span>
              <span className="text-white-600">{verdict.value} ({verdict.percentage.toFixed(1)}%)</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className={`${verdict.color} h-3 rounded-full transition-all duration-500`}
                style={{ width: `${verdict.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubmissionStats;
