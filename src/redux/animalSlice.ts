import { configureStore, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const setToLocalStorage = (state: { animals: { id: string; name: string; photoURL: string }[] }) => {
  try {
    const serialisedState = JSON.stringify(state);
    localStorage.setItem('ANIMALS', serialisedState);
  } catch (e) {
    console.warn(e);
  }
};

const getFromLocalStorage = () => {
  try {
    const serialisedState = localStorage.getItem('ANIMALS');
    if (serialisedState === null) return undefined;
    return JSON.parse(serialisedState);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
};

export interface AnimalNameState {
  value: string;
}

export type Animal = {
  id: string;
  name: string;
  photoURL: string;
};

export const animalSlice = createSlice({
  name: 'animals',
  initialState: {
    animals: [] as Animal[],
  },
  reducers: {
    addAnimal: (state, action: PayloadAction<Animal>) => {
      const newAnimal = {
        id: action.payload.id,
        name: action.payload.name,
        photoURL: action.payload.photoURL,
      };
      state.animals.push(newAnimal);
      setToLocalStorage(state);
    },
    deleteAnimal: (state, action: PayloadAction<string>) => {
      state.animals = state.animals.filter((animal) => animal.id !== action.payload);
      setToLocalStorage(state);
    },
    editAnimal: (state, action: PayloadAction<Animal>) => {
      const editedAnimal = state.animals.find((animal) => animal.id === action.payload.id);
      if (editedAnimal) {
        editedAnimal.name = action.payload.name;
        editedAnimal.photoURL = action.payload.photoURL;
      }
      setToLocalStorage(state);
    },
  },
});

export const { addAnimal, deleteAnimal, editAnimal } = animalSlice.actions;
export default animalSlice.reducer;

export const preloadedState = getFromLocalStorage();

const store = configureStore({
  reducer: animalSlice.reducer,
  preloadedState,
});

store.subscribe(() => {
  const state = store.getState();
  setToLocalStorage(state);
});
