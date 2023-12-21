import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import useSetToLocalStorage from './hooks/useSetToLocalStorage';
import useGetFromLocalStorage from './hooks/useGetFromLocalStorage';

export type Animal = {
  id: string;
  name: string;
  photoURL: string;
};

const initialState: {
  animals: Animal[];
} = {
  animals: [],
};

export const animalSlice = createSlice({
  name: 'animals',
  initialState,
  reducers: {
    setAnimals: (state) => {
      state.animals = useGetFromLocalStorage();
    },
    addAnimal: (state, action: PayloadAction<Animal>) => {
      const newAnimal = {
        id: action.payload.id,
        name: action.payload.name,
        photoURL: action.payload.photoURL,
      };
      state.animals.push(newAnimal);
      useSetToLocalStorage(state);
    },
    deleteAnimal: (state, action: PayloadAction<string>) => {
      state.animals = state.animals.filter((animal) => animal.id !== action.payload);
    },
    editAnimal: (state, action: PayloadAction<Animal>) => {
      const editedAnimal = state.animals.find((animal) => animal.id === action.payload.id);
      if (editedAnimal) {
        editedAnimal.name = action.payload.name;
        editedAnimal.photoURL = action.payload.photoURL;
      }
    },
    sortAnimalsAscending: (state) => {
      state.animals.sort((a, b) => a.name.localeCompare(b.name));
    },
    sortAnimalsDescending: (state) => {
      state.animals.sort((a, b) => b.name.localeCompare(a.name));
    },
  },
});

export const { setAnimals, addAnimal, deleteAnimal, editAnimal, sortAnimalsAscending, sortAnimalsDescending } =
  animalSlice.actions;
export default animalSlice.reducer;

export const preloadedState = useGetFromLocalStorage();
