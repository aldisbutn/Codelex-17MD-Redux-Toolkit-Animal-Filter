import { Dispatch } from 'react';
import { deleteAnimal } from '../../../services/redux/animalSlice';
import { toast } from 'react-toastify';
import { UnknownAction } from '@reduxjs/toolkit';

type useHandleDeleteProps = {
  dispatch: Dispatch<UnknownAction>;
  id: string;
};

const useHandleDelete = ({ dispatch, id }: useHandleDeleteProps) => {
  dispatch(deleteAnimal(id));
  toast.success('Animal deleted successfully!');
};

export default useHandleDelete;
