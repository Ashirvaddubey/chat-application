import React from 'react';
import { useSelector } from 'react-redux';

const NetworkIndicator = () => {
  const isOnline = useSelector((state) => state.network?.isOnline ?? true);

  return (
    <div className="fixed bottom-4 right-4">
      <div
        className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
          isOnline
            ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
            : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
        }`}
      >
        {isOnline ? 'Online' : 'Offline'}
      </div>
    </div>
  );
};

export default NetworkIndicator; 