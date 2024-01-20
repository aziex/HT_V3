import {configureStore} from '@reduxjs/toolkit'; 
//additional built-in functionalities simplified reducer setup, middleware configuration, and devtools integration.

import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
//hooks used for access Redux store and dispatch actions in function component

import rootReducer from './rootReducer';
//combined root reducer in application

export type RootState = ReturnType<typeof rootReducer>;
//type of the state managed by Redux store

const store = configureStore({
  reducer: rootReducer,
}); //creates and configures store with specied reducer and any additional options

export type AppDispatch = typeof store.dispatch;
//type of dispatch function for Redux store

export const useReduxDispatch = (): AppDispatch => useDispatch<AppDispatch>();
//custom hook that returns to dispatch function from Redux store

export const useReduxSelector: TypedUseSelectorHook<RootState> = useSelector;
// custom hook that provides type safety for accessing the state Redux store

export default store;
