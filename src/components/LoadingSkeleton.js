import React from 'react';

const LoadingSkeleton = ({ type = 'text', lines = 1 }) => {
  const getSkeletonClass = () => {
    switch (type) {
      case 'avatar':
        return 'h-10 w-10 rounded-full';
      case 'button':
        return 'h-10 w-24 rounded-md';
      case 'text':
      default:
        return 'h-4 w-full rounded';
    }
  };

  return (
    <div className="animate-pulse">
      {[...Array(lines)].map((_, index) => (
        <div
          key={index}
          className={`bg-gray-200 ${getSkeletonClass()} ${
            index < lines - 1 ? 'mb-2' : ''
          }`}
        />
      ))}
    </div>
  );
};

export default LoadingSkeleton; 