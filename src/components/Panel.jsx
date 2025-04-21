import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePreferences, clearMessages } from '../store/chatSlice';

const PreferencesPanel = () => {
  const dispatch = useDispatch();
  const { preferences } = useSelector(state => state.chat);
  
  const handleThemeChange = (e) => {
    const newTheme = e.target.value;
    dispatch(updatePreferences({ theme: newTheme }));
    
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };
  
  const handleFontSizeChange = (e) => {
    dispatch(updatePreferences({ fontSize: e.target.value }));
  };
  
  const handleNotificationsChange = (e) => {
    dispatch(updatePreferences({ notifications: e.target.checked }));
  };
  
  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear all chat history?')) {
      dispatch(clearMessages());
    }
  };
  
  return (
    <div className="border rounded-lg shadow-lg p-6 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Preferences</h2>
      
      <div className="space-y-4">
        {/* Theme Selection */}
        <div>
          <label className="block mb-2 text-sm font-medium">Theme</label>
          <select 
            value={preferences.theme}
            onChange={handleThemeChange}
            className="w-full p-2 border rounded-lg"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
        
        {/* Font Size Change */}
        <div>
          <label className="block mb-2 text-sm font-medium">Font Size</label>
          <select 
            value={preferences.fontSize}
            onChange={handleFontSizeChange}
            className="w-full p-2 border rounded-lg"
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>
        
        {/* Notifications */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="notifications"
            checked={preferences.notifications}
            onChange={handleNotificationsChange}
            className="h-4 w-4 text-blue-600 rounded"
          />
          <label htmlFor="notifications" className="ml-2 text-sm">
            Enable notifications
          </label>
        </div>
        
        {/* Clear History */}
        <button
          onClick={handleClearHistory}
          className="mt-4 w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
        >
          Clear Chat History
        </button>
      </div>
    </div>
  );
};

export default PreferencesPanel;