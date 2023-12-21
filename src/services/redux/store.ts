import { configureStore } from '@reduxjs/toolkit';
import { animalSlice, preloadedState, setToLocalStorage } from './animalSlice';

export const store = configureStore({
  reducer: animalSlice.reducer,
  preloadedState,
});

store.subscribe(() => {
  const state = store.getState();
  setToLocalStorage(state);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
