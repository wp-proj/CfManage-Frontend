import { ExternalLink } from 'lucide-react';

const CommonProblems = ({ problems }) => {
  return (
    <div className="bg-gray-800/60 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-gray-700">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-3xl font-bold text-white">Common Problems Solved</h3>
        <span className="bg-green-900/50 text-green-300 px-5 py-2 rounded-full font-semibold border border-green-700">
          {problems.length} problems
        </span>
      </div>
      
      <div className="overflow-x-auto max-h-[500px] overflow-y-auto rounded-xl border border-gray-700">
        <table className="w-full">
          <thead className="bg-gray-900/80 sticky top-0 backdrop-blur-sm">
            <tr>
              <th className="px-6 py-4 text-left text-gray-300 font-semibold">Problem</th>
              <th className="px-6 py-4 text-left text-gray-300 font-semibold">Rating</th>
              <th className="px-6 py-4 text-left text-gray-300 font-semibold">Tags</th>
              <th className="px-6 py-4 text-left text-gray-300 font-semibold">Link</th>
            </tr>
          </thead>
          <tbody>
            {problems.map((problem, index) => (
              <tr key={index} className="border-b border-gray-700 hover:bg-gray-700/30 transition">
                <td className="px-6 py-4 text-gray-200 font-medium">{problem.name}</td>
                <td className="px-6 py-4">
                  <span className="bg-blue-900/50 text-blue-300 px-3 py-1 rounded-lg text-sm border border-blue-700 font-mono">
                    {problem.rating}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-2">
                    {problem.tags.slice(0, 2).map((tag, i) => (
                      <span key={i} className="bg-purple-900/50 text-purple-300 px-3 py-1 rounded-lg text-xs border border-purple-700">
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <a
                    href={`https://codeforces.com/problemset/problem/${problem.contestId}/${problem.index}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 transition"
                  >
                    <ExternalLink size={20} />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CommonProblems;
