import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const RatingChart = ({ ratingHistory }) => {
  const chartData = ratingHistory.map((contest) => ({
    name: contest.contestName.slice(0, 20) + '...',
    rating: contest.newRating,
    date: new Date(contest.ratingUpdateTimeSeconds * 1000).toLocaleDateString(),
  }));

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Rating History</h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={['dataMin - 50', 'dataMax + 50']} />
          <Tooltip />
          <Line type="monotone" dataKey="rating" stroke="#8884d8" strokeWidth={2} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RatingChart;
