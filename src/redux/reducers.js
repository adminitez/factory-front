import { clickReducer } from './clickReducer.js';
import { combineReducers } from 'redux';

export const Reducers = combineReducers({
  clickState: clickReducer
});