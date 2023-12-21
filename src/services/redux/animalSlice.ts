import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export const setToLocalStorage = (state: { animals: { id: string; name: string; photoURL: string }[] }) => {
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

const initialState: {
  animals: Animal[];
  sortedAnimals: Animal[];
  editMode: boolean;
  editID: string;
  newAnimal: Animal[];
} = {
  animals: [],
  sortedAnimals: [],
  editMode: false,
  editID: '',
  newAnimal: [],
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
  initialState,
  reducers: {
    setAnimals: (state) => {
      state.animals = getFromLocalStorage();
    },
    addAnimal: (state, action: PayloadAction<Animal>) => {
      const newAnimal = {
        id: action.payload.id,
        name: action.payload.name,
        photoURL: action.payload.photoURL,
      };
      state.animals.push(newAnimal);
      state.sortedAnimals.push(newAnimal);
      setToLocalStorage(state);
    },
    deleteAnimal: (state, action: PayloadAction<string>) => {
      state.animals = state.animals.filter((animal) => animal.id !== action.payload);
      state.sortedAnimals = state.animals.filter((animal) => animal.id !== action.payload);
      setToLocalStorage(state);
    },
    editMode: (state, action: PayloadAction<boolean>) => {
      state.editMode = action.payload;
    },
    editID: (state, action: PayloadAction<string>) => {
      state.editID = action.payload;
    },
    editAnimal: (state, action: PayloadAction<Animal>) => {
      const editedAnimal = state.animals.find((animal) => animal.id === action.payload.id);
      if (editedAnimal) {
        editedAnimal.name = action.payload.name;
        editedAnimal.photoURL = action.payload.photoURL;
      }
      const editedSortedAnimal = state.sortedAnimals.find((animal) => animal.id === action.payload.id);
      if (editedSortedAnimal) {
        editedSortedAnimal.name = action.payload.name;
        editedSortedAnimal.photoURL = action.payload.photoURL;
      }
      setToLocalStorage(state);
    },
    sortAnimalsAscending: (state) => {
      state.sortedAnimals = [...state.animals];
      state.sortedAnimals.sort((a, b) => a.name.localeCompare(b.name));
    },
    sortAnimalsDescending: (state) => {
      state.sortedAnimals = [...state.animals];
      state.sortedAnimals.sort((a, b) => b.name.localeCompare(a.name));
    },
    resetSort: (state) => {
      state.sortedAnimals = [...state.animals];
    },
  },
});

export const {
  setAnimals,
  addAnimal,
  deleteAnimal,
  editMode,
  editID,
  editAnimal,
  sortAnimalsAscending,
  sortAnimalsDescending,
  resetSort,
} = animalSlice.actions;
export default animalSlice.reducer;

export const preloadedState = getFromLocalStorage();
