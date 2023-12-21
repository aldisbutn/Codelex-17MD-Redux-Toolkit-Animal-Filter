//import { useDispatch, useSelector } from 'react-redux';
import { Animal } from '../../../services/redux/animalSlice';
//import type { RootState } from '../../../services/redux/store';

const useHandleEdit = (
  animalList: Animal[],
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>,
  setEditID: React.Dispatch<React.SetStateAction<string>>,
  setNewName: React.Dispatch<React.SetStateAction<string>>,
  setNewPhotoURL: React.Dispatch<React.SetStateAction<string>>,
  id: string
) => {
 // const dispatch = useDispatch();
 // const editID = useSelector((state: RootState) => state.editID);
  
  const animalToEdit = animalList.find((animal) => animal.id === id);
  if (animalToEdit) {
    setEditMode(true);
   // dispatch(editID(id))
    setEditID(id);
    setNewName(animalToEdit.name);
    setNewPhotoURL(animalToEdit.photoURL);
  }
};

export default useHandleEdit;
