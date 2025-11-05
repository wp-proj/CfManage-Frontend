import { useState } from 'react';
import CompareSearch from '../components/Compare/CompareSearch';
import UserComparison from '../components/Compare/UserComparison';

const ComparePage = () => {
  const [user1, setUser1] = useState('');
  const [user2, setUser2] = useState('');

  const handleCompare = (username1, username2) => {
    setUser1(username1);
    setUser2(username2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-white">
      {/* Hero Section */}
      <section className="container mx-auto px-6 pt-16 pb-12 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Compare Codeforces Profiles
        </h1>
        <p className="text-gray-400 text-lg mx-auto leading-relaxed">
          Analyze ratings, problem-solving stats, and tag distributions between any two users.
        </p>
      <div className='h-5'></div>
      </section>

      {/* Search Section */}
      <section className="container mx-auto px-6 mb-20">
        <div className="bg-gray-900/70 backdrop-blur-lg rounded-2xl shadow-lg p-8 border border-gray-800">
          <CompareSearch onCompare={handleCompare} />
        </div>
      </section>
      <div className='h-10'></div>
      {/* Comparison Section */}
      {user1 && user2 && (
        <section className="container mx-auto px-6 pb-24">
          <div className="bg-gray-900/80 backdrop-blur-lg rounded-2xl shadow-xl p-10 border border-gray-800 space-y-16">
            <UserComparison user1={user1} user2={user2} />
          </div>
        </section>
      )}
    </div>
  );
};

export default ComparePage;
