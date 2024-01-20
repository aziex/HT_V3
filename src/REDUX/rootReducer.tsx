import { combineReducers } from '@reduxjs/toolkit';
//combine multiple reducers into a single root reducer

import appReducer from './reducer_app';
//managing a specifc slice of the state relate to the "app"

import counterReducer from './reducer_demo';
//responsible  for managing a specific slice  of state related to the "counter"

import userReducer from './reducer_user';
//responsible  for managing a specific slice  of state related to the "user"

const rootReducer = combineReducers({
  counter: counterReducer,
  app: appReducer,
  user: userReducer,
});

//combination between user + app reducer

export default rootReducer;
