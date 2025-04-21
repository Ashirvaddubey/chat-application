import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Simulated API call for login
const loginAPI = async (credentials) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Simple validation
  if (credentials.username && credentials.password) {
    return {
      id: '123',
      username: credentials.username,
    };
  }
  throw new Error('Invalid credentials');
};

export const login = createAsyncThunk(
  'session/login',
  async (credentials) => {
    const response = await loginAPI(credentials);
    return response;
  }
);

const sessionSlice = createSlice({
  name: 'session',
  initialState: {
    user: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { logout } = sessionSlice.actions;
export default sessionSlice.reducer; 