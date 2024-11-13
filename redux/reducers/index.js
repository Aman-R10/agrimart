// redux/reducers/index.js
import { combineReducers } from '@reduxjs/toolkit';
import someSlice from './someSlice';

const rootReducer = combineReducers({
  someSlice,
});

export default rootReducer;
