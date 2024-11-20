import authReducer from './authReducer';  // Assuming authReducer is inside the same folder

const rootReducer = {
  auth: authReducer,  // Make sure this matches your store structure
};

export default rootReducer;
