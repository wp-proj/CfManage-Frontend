const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white"></div>
      <p className="text-white mt-4 text-lg">Loading profile...</p>
    </div>
  );
};

export default LoadingSpinner;
