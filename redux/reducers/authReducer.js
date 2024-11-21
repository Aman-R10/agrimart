import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  role: null, // Track selected role
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signupRequest: (state) => {
      console.log("Reducer: signupRequest");
      state.loading = true;
      state.error = null; // Reset error
    },
    signupSuccess: (state, action) => {
      console.log("Reducer: signupSuccess with payload:", action.payload);
      state.loading = false;
      state.user = action.payload;
    },
    signupFail: (state, action) => {
      console.error("Reducer: signupFail with error:", action.payload);
      state.loading = false;
      state.error = action.payload;
    },
    roleSelectionSuccess: (state, action) => {
      console.log("Reducer: roleSelectionSuccess with role:", action.payload);
      state.role = action.payload; // Store selected role
    },
  },
});

// Export actions
export const {
  signupRequest,
  signupSuccess,
  signupFail,
  roleSelectionSuccess,
} = authSlice.actions;

// Export the reducer to be included in the store
export default authSlice.reducer;
