import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChatHistory, sendMessage } from '../store/chatSlice';
import MessageBubble from './MessageBubble';
import SkeletonMessage from './SkeletonMessage';

const ChatWindow = () => {
  const [messageText, setMessageText] = useState('');
  const [retryCount, setRetryCount] = useState(0);
  const dispatch = useDispatch();
  const { messages, isLoading, error, networkStatus } = useSelector(state => state.chat);
  const messagesEndRef = useRef(null);
  
  useEffect(() => {
    dispatch(fetchChatHistory());
  }, [dispatch]);
  
  useEffect(() => {
    if (error && retryCount < 3) {
      const timer = setTimeout(() => {
        dispatch(fetchChatHistory());
        setRetryCount(prev => prev + 1);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, retryCount, dispatch]);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (messageText.trim()) {
      dispatch(sendMessage(messageText));
      setMessageText('');
    }
  };
  console.log(messages);
  
  
  const handleRetry = (message) => {
    dispatch(sendMessage(message.text));
  };
  
  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto border rounded-lg shadow-lg">
      {/* Network status indicator */}
      {networkStatus !== 'connected' && (
        <div className="bg-yellow-100 border-b border-yellow-200 text-yellow-700 px-4 py-2 text-sm">
          <span className="animate-pulse mr-2">●</span>
          Connection lost. Trying to reconnect...
        </div>
      )}
      
      {/* Messages container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {error && retryCount >= 3 && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg">
            Error loading messages. Please try again later.
          </div>
        )}
        
        {isLoading && messages.length === 0 ? (
          <>
            <SkeletonMessage align="left" />
            <SkeletonMessage align="right" />
            <SkeletonMessage align="left" />
          </>
        ) : (
          messages.map(message => (
            <MessageBubble 
              key={message.id} 
              message={message} 
              onRetry={() => handleRetry(message)}
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Message input */}
      <form onSubmit={handleSendMessage} className="border-t p-4 flex">
        <input
          type="text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 border rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          type="submit"
          disabled={!messageText.trim()}
          className="bg-blue-500 text-white px-6 py-2 rounded-r-lg hover:bg-blue-600 disabled:bg-blue-300"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;