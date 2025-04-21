import { createSlice } from '@reduxjs/toolkit';

const preferencesSlice = createSlice({
  name: 'preferences',
  initialState: {
    theme: 'light',
    fontSize: 'medium',
    notifications: true,
  },
  reducers: {
    updatePreferences: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { updatePreferences } = preferencesSlice.actions;
export default preferencesSlice.reducer; 