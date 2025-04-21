import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from './slices/sessionSlice';
import preferencesReducer from './slices/preferencesSlice';
import chatReducer from './slices/chatSlice';
import networkReducer from './slices/networkSlice';

export const store = configureStore({
  reducer: {
    session: sessionReducer,
    preferences: preferencesReducer,
    chat: chatReducer,
    network: networkReducer,
  },
});