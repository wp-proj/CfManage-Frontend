export const formatDate = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const getRankColor = (rank) => {
  const colors = {
    'Legendary Grandmaster': '#ff0000',
    'International Grandmaster': '#ff3333',
    'Grandmaster': '#ff6666',
    'International Master': '#ff9900',
    'Master': '#ffcc00',
    'Candidate Master': '#aa00aa',
    'Expert': '#0000ff',
    'Specialist': '#03a89e',
    'Pupil': '#008000',
    'Newbie': '#808080',
  };
  return colors[rank] || '#808080';
};

export const abbreviateNumber = (num) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
};
