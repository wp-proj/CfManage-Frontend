import { ExternalLink } from 'lucide-react';

const SolvedProblems = ({ problems, totalCount }) => {
  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-bold text-gray-800">Solved Problems</h3>
        <span className="text-gray-600">Total: {totalCount}</span>
      </div>
      <div className="overflow-x-auto max-h-96 overflow-y-auto">
        <table className="w-full">
          <thead className="bg-gray-100 sticky top-0">
            <tr>
              <th className="px-4 py-3 text-left text-gray-700">Problem</th>
              <th className="px-4 py-3 text-left text-gray-700">Rating</th>
              <th className="px-4 py-3 text-left text-gray-700">Tags</th>
              <th className="px-4 py-3 text-left text-gray-700">Link</th>
            </tr>
          </thead>
          <tbody>
            {problems.map((problem, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-800 font-medium">{problem.name}</td>
                <td className="px-4 py-3">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                    {problem.rating}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {problem.tags.slice(0, 3).map((tag, i) => (
                      <span key={i} className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <a
                    href={`https://codeforces.com/problemset/problem/${problem.contestId}/${problem.index}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <ExternalLink size={18} />
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

export default SolvedProblems;
