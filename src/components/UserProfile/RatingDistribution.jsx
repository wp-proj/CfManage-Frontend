import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const RatingDistribution = ({ data }) => {
  const chartData = Object.entries(data)
    .sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
    .map(([rating, count]) => ({
      rating: rating,
      count: count,
    }));

  return (
    <div className="bg-gray/95 backdrop-blur-sm rounded-xl shadow-xl p-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Problems by Rating</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="rating" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RatingDistribution;
