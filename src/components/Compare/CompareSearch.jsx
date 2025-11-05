import { useState } from 'react';
import { Users } from 'lucide-react';

const CompareSearch = ({ onCompare }) => {
  const [user1, setUser1] = useState('');
  const [user2, setUser2] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user1.trim() && user2.trim()) {
      onCompare(user1.trim(), user2.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center w-full">
      <div className="w-full max-w-3xl px-10 py-12 flex flex-col items-center space-y-10">
        {/* Title */}
        <div className="flex items-center justify-center gap-3 text-center">
          <Users className="text-blue-400" size={36} />
          <h2 className="text-3xl font-bold text-white tracking-tight">
            Compare Two Users
          </h2>
        </div>
        <div className='h-5'></div>
        {/* Input fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 w-full">
          <input
            type="text"
            value={user1}
            onChange={(e) => setUser1(e.target.value)}
            placeholder="First username (e.g., viditanupgupta)"
            className="w-full px-6 py-4 rounded-xl bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-700 transition-all"
          />
          <input
            type="text"
            value={user2}
            onChange={(e) => setUser2(e.target.value)}
            placeholder="Second username (e.g., Rushabh_26)"
            className="w-full px-6 py-4 rounded-xl bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-700 transition-all"
          />
        </div>
        <div className='h-5'></div>
        {/* Button */}
        <button
          type="submit"
          className="w-2/3 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.03]"
        >
          Compare Users
        </button>
        <div className='h-4'></div>
      </div>
    </form>
  );
};

export default CompareSearch;
