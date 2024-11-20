import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../redux/reducers/rootReducers';  // Correct path to rootReducer.js

const store = configureStore({
  reducer: rootReducer,  // Use rootReducer directly here
});

export default store;
