import { configureStore } from '@reduxjs/toolkit';
import workersSlice from './slices/workersSlice';

const store = configureStore({
  reducer: {
    workers: workersSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;