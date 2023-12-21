import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import type { RootState } from '../../services/redux/store';
import { editAnimal, setAnimals } from '../../services/redux/animalSlice';

import Style from './Animals.module.css';

import useHandleEdit from './hooks/useHandleEdit';
import useHandleSave from './hooks/useHandleSave';

import AddAnimal from '../../components/AddAnimal/AddAnimal';
import ViewAnimalCard from '../../components/ViewAnimalCard/ViewAnimalCard';
import EditAnimalCard from '../../components/EditAnimalCard/EditAnimalCard';
import Sort from '../../components/Sort/Sort';

const Animals = () => {
  const dispatch = useDispatch();
  const animalList = useSelector((state: RootState) => state.sortedAnimals);

  useEffect(() => {
    setAnimals();
  });


  const [editMode, setEditMode] = useState(false);
  const [editID, setEditID] = useState('');
  const [newName, setNewName] = useState('');
  const [newPhotoURL, setNewPhotoURL] = useState('');

  const handleEdit = (id: string) => useHandleEdit(animalList, setEditMode, setEditID, setNewName, setNewPhotoURL, id);
  const handleSave = (id: string) =>
    useHandleSave({ dispatch, editAnimal, id, newName, newPhotoURL, setEditMode, setNewName, setNewPhotoURL });

  return (
    <div className={Style.app}>
      <AddAnimal />
      <Sort />
      <div className={Style.animalsWrapper}>
        {animalList.length === 0 ? (
          <h1>No animals found, please add some</h1>
        ) : (
          <>
            {animalList.map((animal) => (
              <div key={animal.id} className={Style.animalWrapper}>
                {editMode && editID === animal.id ? (
                  <EditAnimalCard
                    newName={newName}
                    setNewName={setNewName}
                    newPhotoURL={newPhotoURL}
                    setNewPhotoURL={setNewPhotoURL}
                    setEditMode={setEditMode}
                    handleSave={handleSave}
                    id={animal.id}
                  />
                ) : (
                  <ViewAnimalCard
                    id={animal.id}
                    name={animal.name}
                    photoURL={animal.photoURL}
                    dispatch={dispatch}
                    handleEdit={handleEdit}
                  />
                )}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Animals;
