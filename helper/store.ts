import { configureStore } from '@reduxjs/toolkit';
import bitcoinReducer from './bitcoinSlice';

const store = configureStore({
  reducer: {
    bitcoin: bitcoinReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
