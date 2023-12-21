import { ActionCreatorWithPayload, UnknownAction } from '@reduxjs/toolkit';
import { Dispatch } from 'react';
import { Animal } from '../../../services/redux/animalSlice';
import { AnimalSchema } from '../../../services/zod/schemas';
import { toast } from 'react-toastify';
import { z } from 'zod';

type useHandleSaveProps = {
  dispatch: Dispatch<UnknownAction>;
  editAnimal: ActionCreatorWithPayload<Animal>;
  id: string;
  newName: string;
  newPhotoURL: string;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  setNewName: React.Dispatch<React.SetStateAction<string>>;
  setNewPhotoURL: React.Dispatch<React.SetStateAction<string>>;
};


const useHandleSave = ({
  dispatch,
  editAnimal,
  id,
  newName,
  newPhotoURL,
  setEditMode,
  setNewName,
  setNewPhotoURL,
}: useHandleSaveProps) => {
  try {
    AnimalSchema.parse({ id: id, name: newName, photoURL: newPhotoURL });
    dispatch(
      editAnimal({
        id: id,
        name: newName,
        photoURL: newPhotoURL,
      })
    );
    setEditMode(false);
    setNewName('');
    setNewPhotoURL('');
    toast.success('Animal edited successfully!');
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errMessages = error.errors.map((message) => toast.error(message.message));
      return errMessages;
    } else {
      return error;
    }
  }
};

export default useHandleSave;
