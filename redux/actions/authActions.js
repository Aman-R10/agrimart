import api from '../../utils/api';  // Import the configured axios instance
import { signupRequest, signupSuccess, signupFail } from '../reducers/authReducer';  // Adjust import path

// Signup action
export const signup = (userData) => async (dispatch) => {
  try {
    dispatch(signupRequest());
    const res = await api.post("/signup", userData);

    // Explicitly return the full response from API
    dispatch(signupSuccess(res.data.user));
    return res.data.user; // This ensures the correct object is returned
  } catch (error) {
    dispatch(signupFail(error.message));
    throw new Error(error.message);
  }
};


// Role selection action
export const selectRole = (userId, role) => async (dispatch) => {
  try {
    console.log('Selecting role for User ID:', userId, 'Role:', role);

    const res = await api.post('/select-role', { userId, role });
    console.log('Role selection API response:', res.data);

    dispatch({ type: 'ROLE_SELECTION_SUCCESS', payload: res.data.user });
    return res.data;
  } catch (error) {
    console.error('Role selection error:', error);
    throw new Error(error.response?.data?.message || 'Failed to select role');
  }
};

