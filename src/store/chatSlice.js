import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchMessages, sendMessage as apiSendMessage } from '../utils/mockAPI';

const loadPersistedState = () => {
  try {
    const serializedState = localStorage.getItem('chatState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Could not load state', err);
    return undefined;
  }
};

const initialState = loadPersistedState() || {
  messages: [],
  isLoading: false,
  error: null,
  user: { id: 'user-1', name: 'Guest User' },
  preferences: {
    theme: 'light',
    fontSize: 'medium',
    notifications: true,
  },
  networkStatus: 'connected'
};

export const fetchChatHistory = createAsyncThunk(
  'chat/fetchMessages',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchMessages();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async (messageText, { getState, rejectWithValue }) => {
    try {
      const { user } = getState().chat;
      const message = {
        id: `msg-${Date.now()}`,
        text: messageText,
        sender: user.id,
        timestamp: new Date().toISOString(),
      };
      return await apiSendMessage(message);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    updatePreferences: (state, action) => {
      state.preferences = { ...state.preferences, ...action.payload };
    },
    setNetworkStatus: (state, action) => {
      state.networkStatus = action.payload;
    },
    clearMessages: (state) => {
      state.messages = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatHistory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchChatHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.messages = action.payload;
        state.error = null;
      })
      .addCase(fetchChatHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(sendMessage.pending, (state) => {
   
        const pendingMessage = {
          id: `pending-${Date.now()}`,
          text: action.meta.arg,
          sender: state.user.id,
          timestamp: new Date().toISOString(),
          pending: true
        };
        state.messages.push(pendingMessage);
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
  
        const pendingIndex = state.messages.findIndex(msg => msg.pending);
        if (pendingIndex !== -1) {
          state.messages[pendingIndex] = action.payload.sentMessage;
        }
        state.messages.push(action.payload.response);
        state.error = null;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        const pendingIndex = state.messages.findIndex(msg => msg.pending);
        if (pendingIndex !== -1) {
          state.messages[pendingIndex] = {
            ...state.messages[pendingIndex],
            pending: false,
            error: true
          };
        }
        state.error = action.payload;
      });
  }
});

export const persistStateMiddleware = store => next => action => {
  const result = next(action);
  const state = store.getState();
  try {
    const serializedState = JSON.stringify(state.chat);
    localStorage.setItem('chatState', serializedState);
  } catch (err) {
    console.error('Could not save state', err);
  }
  return result;
};

export const { updatePreferences, setNetworkStatus, clearMessages } = chatSlice.actions;
export default chatSlice.reducer;