import { Dispatch, useEffect } from 'react';
import { Animal, addAnimal } from '../../../services/redux/animalSlice';
import { UnknownAction } from '@reduxjs/toolkit';

const useGetLocalStorage = (key: string, dispatch: Dispatch<UnknownAction>) => {
  useEffect(() => {
    const savedAnimalsString = localStorage.getItem(key);

    if (savedAnimalsString) {
      const savedAnimals = JSON.parse(savedAnimalsString);

      if (savedAnimals && savedAnimals.length) {
        savedAnimals.forEach((animal: Animal) => {
          dispatch(addAnimal(animal));
        });
      }
    }
  }, [key, dispatch]);
};

export default useGetLocalStorage;
