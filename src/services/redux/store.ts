import { configureStore } from '@reduxjs/toolkit';
import { animalSlice, preloadedState } from './animalSlice';
import useSetToLocalStorage from './hooks/useSetToLocalStorage';

export const store = configureStore({
  reducer: animalSlice.reducer,
  preloadedState,
});

store.subscribe(() => {
  const state = store.getState();
  useSetToLocalStorage(state);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
