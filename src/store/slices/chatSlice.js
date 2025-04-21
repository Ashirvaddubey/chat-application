import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Simulated AI response generator
const generateAIResponse = async (userMessage) => {
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
  
  const responses = [
    "I understand. Can you tell me more about that?",
    "That's interesting! How does that make you feel?",
    "I see. What would you like to know more about?",
    "Thanks for sharing. Let me help you with that.",
    "I'm processing your message. Could you elaborate?",
  ];
  
  // For demo purposes, we'll pick a random response
  return responses[Math.floor(Math.random() * responses.length)];
};

// Async thunk for sending messages
export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async (message) => {
    // First, return the user's message
    const userMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: message,
      timestamp: new Date().toISOString(),
    };

    // Then get AI response
    const aiResponse = await generateAIResponse(message);
    const aiMessage = {
      id: (Date.now() + 1).toString(),
      sender: 'ai',
      text: aiResponse,
      timestamp: new Date().toISOString(),
    };

    return { userMessage, aiMessage };
  }
);

// Simulated API call for fetching chat history
const fetchChatHistoryAPI = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return [
    {
      id: '1',
      sender: 'ai',
      text: 'Hello! How can I help you today?',
      timestamp: new Date(Date.now() - 100000).toISOString(),
    }
  ];
};

export const fetchChatHistory = createAsyncThunk(
  'chat/fetchHistory',
  async () => {
    const response = await fetchChatHistoryAPI();
    return response;
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: [],
    isLoading: false,
    error: null,
    isTyping: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch chat history
      .addCase(fetchChatHistory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchChatHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.messages = action.payload;
        state.error = null;
      })
      .addCase(fetchChatHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Send message
      .addCase(sendMessage.pending, (state) => {
        state.isTyping = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.messages.push(action.payload.userMessage);
        state.messages.push(action.payload.aiMessage);
        state.isTyping = false;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.isTyping = false;
        state.error = action.error.message;
      });
  },
});

export default chatSlice.reducer; 