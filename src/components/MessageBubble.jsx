import React from 'react';

const MessageBubble = ({ message, onRetry }) => {
  const isBot = message.sender === 'bot';
  const isPending = message.pending;
  const hasError = message.error;
  
  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}>
      <div 
        className={`max-w-[80%] rounded-lg px-4 py-2 ${
          isBot 
            ? 'bg-gray-100 text-gray-800' 
            : 'bg-blue-500 text-white'
        } ${isPending ? 'opacity-70' : ''} ${hasError ? 'bg-red-100 text-red-700 border border-red-300' : ''}`}
      >
        <div className="mb-1">
          {message.text}
        </div>
        <div className="text-xs opacity-70 flex justify-between items-center">
          <span>
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
          
          {isPending && (
            <span className="ml-2 animate-pulse">Sending...</span>
          )}
          
          {hasError && (
            <button 
              onClick={() => onRetry(message)} 
              className="ml-2 text-red-700 underline"
            >
              Retry
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;