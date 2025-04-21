import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LandingPage from './components/LandingPage';
import SessionManager from './components/SessionManager';
import ChatHistory from './components/ChatHistory';
import ThemeSettings from './components/ThemeSettings';
import ErrorBoundary from './components/ErrorBoundary';
import NetworkIndicator from './components/NetworkIndicator';
import { setOnlineStatus } from './store/slices/networkSlice';

// Protected Route component to handle authentication
const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.session.user);
  return user ? children : <Navigate to="/login" replace />;
};

const App = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.preferences.theme);
  
  // Apply theme class to body
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Handle network status
  useEffect(() => {
    const handleOnline = () => dispatch(setOnlineStatus(true));
    const handleOffline = () => dispatch(setOnlineStatus(false));

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    dispatch(setOnlineStatus(navigator.onLine));

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [dispatch]);

  return (
    <Router>
      <ErrorBoundary>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
          <div className="container mx-auto min-h-screen">
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<SessionManager />} />
              
              {/* Protected routes */}
              <Route
                path="/chat"
                element={
                  <ProtectedRoute>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-4">
                      <div className="md:col-span-3 h-screen pt-4">
                        <ChatHistory />
                      </div>
                      <div className="md:pt-4">
                        <ThemeSettings />
                      </div>
                    </div>
                  </ProtectedRoute>
                }
              />
              
              {/* Redirect unknown routes to home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>

          <NetworkIndicator />
        </div>
      </ErrorBoundary>
    </Router>
  );
};

export default App; 