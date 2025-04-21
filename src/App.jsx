import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNetworkStatus } from './store/chatSlice';
import ChatWindow from './components/ChatWindow';
import PreferencesPanel from './components/Panel';

const App = () => {
  const [showPreferences, setShowPreferences] = useState(false);
  const dispatch = useDispatch();
  const { preferences } = useSelector(state => state.chat);
  
 
  useEffect(() => {
    if (preferences.theme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }, [preferences.theme]);
  
 
  useEffect(() => {
    document.documentElement.style.fontSize = {
      small: '14px',
      medium: '16px',
      large: '18px'
    }[preferences.fontSize];
  }, [preferences.fontSize]);
  
  useEffect(() => {
    const handleOnline = () => dispatch(setNetworkStatus('connected'));
    const handleOffline = () => dispatch(setNetworkStatus('disconnected'));
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [dispatch]);
  
  return (
    <div className={`min-h-screen flex flex-col p-4 ${
      preferences.theme === 'dark' ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      <header className="container mx-auto mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Chat Application</h1>
        <button
          onClick={() => setShowPreferences(!showPreferences)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
                    {showPreferences ? 'Close Settings' : 'Settings'}
        </button>
      </header>
      
      <main className="container mx-auto flex-1 flex flex-col md:flex-row gap-4">
        <div className={`${showPreferences ? 'hidden md:block md:w-2/3' : 'w-full'}`}>
          <ChatWindow />
        </div>
        
        {showPreferences && (
          <div className="md:w-1/3">
            <PreferencesPanel />
          </div>
        )}
      </main>
    
    </div>
  );
};

export default App;