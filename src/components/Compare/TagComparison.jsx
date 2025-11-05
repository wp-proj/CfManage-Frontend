const TagComparison = ({ tagData }) => {
  const topTags = tagData.slice(0, 10);

  return (
    <div className="bg-gray-800/60 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-gray-700">
      <h3 className="text-3xl font-bold text-white mb-8">Tag Distribution Comparison</h3>
      
      <div className="space-y-6">
        {topTags.map((tag, index) => {
          const maxCount = Math.max(tag.user1, tag.user2);
          const user1Percent = (tag.user1 / maxCount) * 100;
          const user2Percent = (tag.user2 / maxCount) * 100;
          
          return (
            <div key={index}>
              <div className="flex justify-between items-center mb-3">
                <span className="font-semibold text-gray-200 text-lg">{tag.tag}</span>
                <div className="flex space-x-6 text-sm font-mono">
                  <span className="text-blue-400 font-bold">{tag.user1}</span>
                  <span className="text-purple-400 font-bold">{tag.user2}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-4 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-500 shadow-lg shadow-blue-500/50"
                    style={{ width: `${user1Percent}%` }}
                  ></div>
                </div>
                <div className="h-4 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full transition-all duration-500 shadow-lg shadow-purple-500/50"
                    style={{ width: `${user2Percent}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TagComparison;
