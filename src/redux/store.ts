import { configureStore } from '@reduxjs/toolkit';
import { animalSlice, preloadedState } from './animalSlice';

export const store = configureStore({
  reducer: animalSlice.reducer,
  preloadedState,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
