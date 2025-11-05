import { AlertCircle } from 'lucide-react';

const ErrorMessage = ({ message }) => {
  return (
    <div className="max-w-2xl mx-auto bg-red-500/90 backdrop-blur-sm text-white px-6 py-4 rounded-xl shadow-xl flex items-center space-x-3">
      <AlertCircle size={24} />
      <span className="text-lg">{message}</span>
    </div>
  );
};

export default ErrorMessage;
