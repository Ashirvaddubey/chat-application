import React from 'react';

const SkeletonMessage = ({ align = 'left' }) => {
  return (
    <div className={`flex ${align === 'left' ? 'justify-start' : 'justify-end'}`}>
      <div className={`max-w-[80%] rounded-lg px-4 py-2 ${
        align === 'left' ? 'bg-gray-200' : 'bg-blue-300'
      }`}>
        <div className="animate-pulse flex flex-col space-y-2">
          <div className="h-2 bg-gray-300 rounded w-32"></div>
          <div className="h-2 bg-gray-300 rounded w-40"></div>
          <div className="h-2 bg-gray-300 rounded w-24"></div>
        </div>
        <div className="animate-pulse mt-2">
          <div className="h-2 bg-gray-300 rounded w-16"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonMessage;